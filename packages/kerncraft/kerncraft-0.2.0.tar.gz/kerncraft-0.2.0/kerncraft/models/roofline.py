#!/usr/bin/env python

from __future__ import print_function
from __future__ import unicode_literals
from __future__ import absolute_import
from __future__ import division

from functools import reduce
import operator
import subprocess
import re
from copy import deepcopy
import sys

from kerncraft.intervals import Intervals
from kerncraft.prefixedunit import PrefixedUnit
from six.moves import filter
from six.moves import map
import six
from six.moves import range


class Roofline(object):
    """
    class representation of the Roofline Model

    more info to follow...
    """

    name = "Roofline"
    _expand_to_cacheline_blocks_cache = {}

    @classmethod
    def configure_arggroup(cls, parser):
        pass

    def __init__(self, kernel, machine, args=None, parser=None):
        """
        *kernel* is a Kernel object
        *machine* describes the machine (cpu, cache and memory) characteristics
        *args* (optional) are the parsed arguments from the comand line
        """
        self.kernel = kernel
        self.machine = machine
        self._args = args
        self._parser = parser

        if args:
            # handle CLI info
            pass

    def _calculate_relative_offset(self, name, access_dimensions):
        '''
        returns the offset from the iteration center in number of elements and the order of indices
        used in access.
        '''
        offset = 0
        base_dims = self.kernel._variables[name][1]

        for dim, offset_info in enumerate(access_dimensions):
            offset_type, idx_name, dim_offset = offset_info
            assert offset_type == 'rel', 'Only relative access to arrays is supported at the moment'

            if offset_type == 'rel':
                offset += dim_offset*reduce(operator.mul, base_dims[dim+1:], 1)
            else:
                # should not happen
                pass

        return offset

    def _calculate_iteration_offset(self, name, index_order, loop_index):
        '''
        returns the offset from one to the next iteration using *loop_index*.
        *index_order* is the order used by the access dimensions e.g. 'ijk' corresponse to [i][j][k]
        *loop_index* specifies the loop to be used for iterations (this is typically the inner
        moste one)
        '''
        offset = 0
        base_dims = self.kernel._variables[name][1]

        for dim, index_name in enumerate(index_order):
            if loop_index == index_name:
                offset += reduce(operator.mul, base_dims[dim+1:], 1)

        return offset

    def _get_index_order(self, access_dimensions):
        '''Returns the order of indices used in *access_dimensions*.'''
        return ''.join([d[1] for d in access_dimensions])

    def _expand_to_cacheline_blocks(self, first, last):
        '''
        Returns first and last values wich align with cacheline blocks, by increasing range.
        '''
        if (first,last) not in self._expand_to_cacheline_blocks_cache:
            # handle multiple datatypes
            element_size = self.kernel.datatypes_size[self.kernel.datatype]
            elements_per_cacheline = int(float(self.machine['cacheline size'])) / element_size

            self._expand_to_cacheline_blocks_cache[(first,last)] = [
                first - first % elements_per_cacheline,
                last - last % elements_per_cacheline + elements_per_cacheline - 1]

        return self._expand_to_cacheline_blocks_cache[(first,last)]

    def calculate_cache_access(self, CPUL1=True):
        results = {'bottleneck level': 0, 'mem bottlenecks': []}

        read_offsets = {var_name: dict() for var_name in list(self.kernel._variables.keys())}
        write_offsets = {var_name: dict() for var_name in list(self.kernel._variables.keys())}

        # handle multiple datatypes
        element_size = self.kernel.datatypes_size[self.kernel.datatype]
        elements_per_cacheline = int(float(self.machine['cacheline size'])) / element_size

        loop_order = ''.join([l[0] for l in self.kernel._loop_stack])

        for var_name in list(self.kernel._variables.keys()):
            var_type, var_dims = self.kernel._variables[var_name]

            # Skip the following access: (they are hopefully kept in registers)
            #   - scalar values
            if var_dims is None:
                continue
            #   - access does not change with inner-most loop index (they are hopefully kept in 
            #     registers)
            writes = [acs for acs in self.kernel._destinations.get(var_name, []) if loop_order[-1] in [a[1] for a in acs]]
            reads = [acs for acs in self.kernel._sources.get(var_name, []) if loop_order[-1] in [a[1] for a in acs]]

            # Compile access pattern
            for r in reads:
                offset = self._calculate_relative_offset(var_name, r)
                idx_order = self._get_index_order(r)
                read_offsets[var_name].setdefault(idx_order, [])
                read_offsets[var_name][idx_order].append(offset)
            for w in writes:
                offset = self._calculate_relative_offset(var_name, w)
                idx_order = self._get_index_order(w)
                write_offsets[var_name].setdefault(idx_order, [])
                write_offsets[var_name][idx_order].append(offset)

            # With ECM we would do unrolling, but not with roofline

        # initialize misses and hits
        misses = {}
        hits = {}
        evicts = {}
        total_misses = {}
        total_hits = {}
        total_evicts = {}
        
        memory_hierarchy = deepcopy(self.machine['memory hierarchy'])
        
        # L1-CPU level is special, because everything is a miss here
        if CPUL1:
            memory_hierarchy.insert(0, {
                'cores per group': 1,
                'cycles per cacheline transfer': None,
                'groups': 16,
                'level': 'CPU',
                'bandwidth': None,
                'size per group': 0,
                'threads per group': 2,
            })

        # Check for layer condition towards all cache levels
        for cache_level, cache_info in list(enumerate(memory_hierarchy))[:-1]:
            cache_size = int(float(cache_info['size per group']))

            trace_length = 0
            updated_length = True
            while updated_length:
                updated_length = False

                # Initialize cache, misses, hits and evicts for current level
                cache = {}
                misses[cache_level] = {}
                hits[cache_level] = {}
                evicts[cache_level] = {}

                # We consider everythin a miss in the beginning, unless it is completly cached
                # TODO here read and writes are treated the same, this implies write-allocate
                #      to support nontemporal stores, this needs to be changed
                for name in list(read_offsets.keys())+list(write_offsets.keys()):
                    cache[name] = {}
                    misses[cache_level][name] = {}
                    hits[cache_level][name] = {}

                    for idx_order in list(read_offsets[name].keys())+list(write_offsets[name].keys()):
                        cache[name][idx_order] = Intervals()
                        
                        # Check for complete caching/in-cache
                        # TODO change from pessimistic to more realistic approach (different 
                        #      indexes are treasted as individual arrays)
                        total_array_size = reduce(
                            operator.mul, self.kernel._variables[name][1])*element_size
                        if total_array_size < trace_length:
                            # all hits no misses
                            misses[cache_level][name][idx_order] = []
                            if cache_level-1 not in misses:
                                hits[cache_level][name][idx_order] = sorted(
                                    read_offsets.get(name, {}).get(idx_order, []) +
                                    write_offsets.get(name, {}).get(idx_order, []),
                                    reverse=True)
                            else:
                                hits[cache_level][name][idx_order] = list(
                                    misses[cache_level-1][name][idx_order])
                          
                        # partial caching (default case) 
                        else:
                            if cache_level-1 not in misses:
                                misses[cache_level][name][idx_order] = sorted(
                                    read_offsets.get(name, {}).get(idx_order, []) +
                                    write_offsets.get(name, {}).get(idx_order, []),
                                    reverse=True)
                            else:
                                misses[cache_level][name][idx_order] = list(
                                    misses[cache_level-1][name][idx_order])
                            hits[cache_level][name][idx_order] = []

                # Caches are still empty (thus only misses)
                trace_count = 0
                cache_used_size = 0

                # Now we trace the cache access backwards (in time/iterations) and check for hits
                for var_name in list(misses[cache_level].keys()):
                    for idx_order in list(misses[cache_level][var_name].keys()):
                        iter_offset = self._calculate_iteration_offset(
                            var_name, idx_order, loop_order[-1])

                        # Add cache trace
                        for offset in list(misses[cache_level][var_name][idx_order]):
                            # If already present in cache add to hits
                            if offset in cache[var_name][idx_order]:
                                misses[cache_level][var_name][idx_order].remove(offset)

                                # We might have multiple hits on the same offset (e.g in DAXPY)
                                if offset not in hits[cache_level][var_name][idx_order]:
                                    hits[cache_level][var_name][idx_order].append(offset)

                            # Add cache, we can do this since misses are sorted in reverse order of
                            # access and we assume LRU cache replacement policy
                            if iter_offset <= elements_per_cacheline:
                                # iterations overlap, thus we can savely add the whole range
                                cached_first, cached_last = self._expand_to_cacheline_blocks(
                                    offset-iter_offset*trace_length, offset+1)
                                cache[var_name][idx_order] &= Intervals(
                                    [cached_first, cached_last+1], sane=True)
                            else:
                                # There is no overlap, we can append the ranges onto one another
                                # TODO optimize this code section (and maybe merge with above)
                                new_cache = [self._expand_to_cacheline_blocks(o, o) for o in range(
                                    offset-iter_offset*trace_length, offset+1, iter_offset)]
                                new_cache = Intervals(*new_cache, sane=True)
                                cache[var_name][idx_order] &= new_cache

                        trace_count += len(cache[var_name][idx_order].data)
                        cache_used_size += len(cache[var_name][idx_order])*element_size
                
                # Calculate new possible trace_length according to free space in cache
                # TODO take CL blocked access into account
                # TODO make /2 customizable
                #new_trace_length = trace_length + \
                #    ((cache_size/2 - cache_used_size)/trace_count)/element_size
                if trace_count > 0:  # to catch complete caching
                    new_trace_length = trace_length + \
                        ((cache_size - cache_used_size)/trace_count)/element_size

                if new_trace_length > trace_length:
                    trace_length = new_trace_length
                    updated_length = True

                # All writes to require the data to be evicted eventually
                evicts[cache_level] = {
                    var_name: dict() for var_name in list(self.kernel._variables.keys())}
                for name in list(write_offsets.keys()):
                    for idx_order in list(write_offsets[name].keys()):
                        evicts[cache_level][name][idx_order] = list(write_offsets[name][idx_order])
            
            # Compiling stats
            total_misses[cache_level] = sum([sum(map(len, list(l.values()))) for l in list(misses[cache_level].values())])
            total_hits[cache_level] = sum([sum(map(len, list(l.values()))) for l in list(hits[cache_level].values())])
            total_evicts[cache_level] = sum([sum(map(len, list(l.values()))) for l in list(evicts[cache_level].values())])

            # Calculate performance (arithmetic intensity * bandwidth with
            # arithmetic intensity = flops / bytes transfered)
            bytes_transfered = (total_misses[cache_level]+total_evicts[cache_level])*element_size
            total_flops = sum(self.kernel._flops.values())
            arith_intens = float(total_flops)/float(bytes_transfered)

            # choose bw according to cache level and problem
            # first, compile stream counts at current cache level
            # write-allocate is allready resolved above
            read_streams = 0
            for var_name in list(misses[cache_level].keys()):
                for idx_order in misses[cache_level][var_name]:
                    read_streams += len(misses[cache_level][var_name][idx_order])
            write_streams = 0
            for var_name in list(evicts[cache_level].keys()):
                for idx_order in evicts[cache_level][var_name]:
                    write_streams += len(evicts[cache_level][var_name][idx_order])
            # second, try to find best fitting kernel (closest to stream seen stream counts):
            # write allocate has to be handled in kernel information (all writes are also reads)
            # TODO support for non-write-allocate architectures
            measurement_kernel = 'load'
            measurement_kernel_info = self.machine['benchmarks']['kernels'][measurement_kernel]
            for kernel_name, kernel_info in sorted(self.machine['benchmarks']['kernels'].items()):
                if (read_streams >= (kernel_info['read streams']['streams'] +
                                     kernel_info['write streams']['streams'] -
                                     kernel_info['read+write streams']['streams']) >
                        measurement_kernel_info['read streams']['streams'] +
                        measurement_kernel_info['write streams']['streams'] -
                        measurement_kernel_info['read+write streams']['streams'] and
                        write_streams >= kernel_info['write streams']['streams'] >
                        measurement_kernel_info['write streams']['streams']):
                    measurement_kernel = kernel_name
                    measurement_kernel_info = kernel_info

            # TODO choose smt and cores:
            threads_per_core, cores = 1, self._args.cores
            bw_level = memory_hierarchy[cache_level+1]['level']
            bw_measurements = \
                self.machine['benchmarks']['measurements'][bw_level][threads_per_core]
            assert threads_per_core == bw_measurements['threads per core'], \
                'malformed measurement dictionary in machine file.'
            run_index = bw_measurements['cores'].index(cores)
            bw = bw_measurements['results'][measurement_kernel][run_index]

            # Correct bandwidth due to miss-measurement of write allocation
            # TODO support non-temporal stores and non-write-allocate architectures
            measurement_kernel_info = self.machine['benchmarks']['kernels'][measurement_kernel]
            factor = (float(measurement_kernel_info['read streams']['bytes']) +
                      2.0*float(measurement_kernel_info['write streams']['bytes']) -
                      float(measurement_kernel_info['read+write streams']['bytes'])) / \
                     (float(measurement_kernel_info['read streams']['bytes']) +
                      float(measurement_kernel_info['write streams']['bytes']))
            bw = bw * factor

            performance = arith_intens * float(bw)
            results['mem bottlenecks'].append({
                'performance': PrefixedUnit(performance, 'FLOP/s'),
                'level': (memory_hierarchy[cache_level]['level'] + '-' +
                          memory_hierarchy[cache_level+1]['level']),
                'arithmetic intensity': arith_intens,
                'bw kernel': measurement_kernel,
                'bandwidth': bw})
            if performance <= results.get('min performance', performance):
                results['bottleneck level'] = len(results['mem bottlenecks'])-1
                results['min performance'] = performance
        return results

    def analyze(self):
        self.results = self.calculate_cache_access()
    
    def conv_perf(self, performance, unit, default='FLOP/s'):
        '''Convert performance (FLOP/s) to other units, such as It/s or cy/CL'''
        if not unit:
            unit = default
        
        clock = self.machine['clock']
        flops_per_it = sum(self.kernel._flops.values())
        it_s = performance/flops_per_it
        it_s.unit = 'It/s'
        element_size = self.kernel.datatypes_size[self.kernel.datatype]
        elements_per_cacheline = int(float(self.machine['cacheline size'])) / element_size
        cy_cl = clock/it_s*elements_per_cacheline
        cy_cl.unit = 'cy/CL'
        
        return {'It/s': it_s,
                'cy/CL': cy_cl,
                'FLOP/s': performance}[unit]

    def report(self, output_file=sys.stdout):
        precision = 'DP' if self.kernel.datatype == 'double' else 'SP'
        max_flops = self.machine['clock']*self._args.cores*sum(
            self.machine['FLOPs per cycle'][precision].values())
        max_flops.unit = "FLOP/s"
        if self._args and self._args.verbose >= 1:
            print('Bottlnecks:', file=output_file)
            print('  level | a. intensity |   performance   |   bandwidth  | bandwidth kernel',
                  file=output_file)
            print('--------+--------------+-----------------+--------------+-----------------',
                  file=output_file)
            print('    CPU |              | {!s:>15} |              |'.format(
                      self.conv_perf(max_flops, self._args.unit)),
                  file=output_file)
            for b in self.results['mem bottlenecks']:
                print('{level:>7} | {arithmetic intensity:>5.2} FLOP/B | {!s:>15} |'
                      ' {bandwidth!s:>12} | {bw kernel:<8}'.format(
                          self.conv_perf(b['performance'], self._args.unit), **b),
                      file=output_file)
            print('', file=output_file)

        if self.results['min performance'] > max_flops:
            # CPU bound
            print('CPU bound with {} cores(s)'.format(self._args.cores), file=output_file)
            print('{!s} due to CPU max. FLOP/s'.format(max_flops), file=output_file)
        else:
            # Cache or mem bound
            print('Cache or mem bound with {} core(s)'.format(self._args.cores), file=output_file)

            bottleneck = self.results['mem bottlenecks'][self.results['bottleneck level']]
            print('{!s} due to {} transfer bottleneck (bw with from {} benchmark)'.format(
                    self.conv_perf(bottleneck['performance'], self._args.unit),
                    bottleneck['level'],
                    bottleneck['bw kernel']),
                  file=output_file)
            print('Arithmetic Intensity: {:.2f} FLOP/B'.format(bottleneck['arithmetic intensity']),
                  file=output_file)

class RooflineIACA(Roofline):
    """
    class representation of the Roofline Model (with IACA throughput analysis)

    more info to follow...
    """

    name = "Roofline (with IACA throughput)"

    @classmethod
    def configure_arggroup(cls, parser):
        pass

    def __init__(self, kernel, machine, args=None, parser=None):
        """
        *kernel* is a Kernel object
        *machine* describes the machine (cpu, cache and memory) characteristics
        *args* (optional) are the parsed arguments from the comand line
        if *args* is given also *parser* has to be provided
        """
        Roofline.__init__(self, kernel, machine, args, parser)

    def analyze(self):
        self.results = self.calculate_cache_access(CPUL1=False)
        
        # For the IACA/CPU analysis we need to compile and assemble
        asm_name = self.kernel.compile(
            self.machine['compiler'], compiler_args=self.machine['compiler flags'])
        bin_name = self.kernel.assemble(
           self.machine['compiler'], asm_name, iaca_markers=True, asm_block=self._args.asm_block,
           asm_increment=self._args.asm_increment)

        # Get total cycles per loop iteration
        try:
            cmd = ['iaca.sh', '-64', '-arch', self.machine['micro-architecture'], bin_name]
            iaca_output = subprocess.check_output(cmd).decode('utf-8')
        except OSError as e:
            print("IACA execution failed:", ' '.join(cmd), file=sys.stderr)
            print(e, file=sys.stderr)
            sys.exit(1)
        except subprocess.CalledProcessError as e:
            print("IACA throughput analysis failed:", e, file=sys.stderr)
            sys.exit(1)
        
        match = re.search(
            r'^Block Throughput: ([0-9\.]+) Cycles', iaca_output, re.MULTILINE)
        assert match, "Could not find Block Throughput in IACA output."
        block_throughput = float(match.groups()[0])

        # Find ports and cyles per port
        ports = [l for l in iaca_output.split('\n') if l.startswith('|  Port  |')]
        cycles = [l for l in iaca_output.split('\n') if l.startswith('| Cycles |')]
        assert ports and cycles, "Could not find ports/cylces lines in IACA output."
        ports = [p.strip() for p in ports[0].split('|')][2:]
        cycles = [p.strip() for p in cycles[0].split('|')][2:]
        port_cycles = []
        for i in range(len(ports)):
            if '-' in ports[i] and ' ' in cycles[i]:
                subports = [p.strip() for p in ports[i].split('-')]
                subcycles = [c for c in cycles[i].split(' ') if bool(c)]
                port_cycles.append((subports[0], float(subcycles[0])))
                port_cycles.append((subports[0]+subports[1], float(subcycles[1])))
            elif ports[i] and cycles[i]:
                port_cycles.append((ports[i], float(cycles[i])))
        port_cycles = dict(port_cycles)

        match = re.search(r'^Total Num Of Uops: ([0-9]+)', iaca_output, re.MULTILINE)
        assert match, "Could not find Uops in IACA output."
        uops = float(match.groups()[0])
        
        # Get latency prediction from IACA
        try:
            iaca_latency_output = subprocess.check_output(
                ['iaca.sh', '-64', '-analysis', 'LATENCY', '-arch',
                 self.machine['micro-architecture'], bin_name]).decode('utf-8')
        except subprocess.CalledProcessError as e:
            print("IACA latency analysis failed:", e, file=sys.stderr)
            sys.exit(1)
        
        # Get predicted latency
        match = re.search(
            r'^Latency: ([0-9\.]+) Cycles', iaca_latency_output, re.MULTILINE)
        assert match, "Could not find Latency in IACA latency analysis output."
        block_latency = float(match.groups()[0])

        # Normalize to cycles per cacheline
        elements_per_block = abs(self.kernel.asm_block['pointer_increment']
                                 / self.kernel.datatypes_size[self.kernel.datatype])
        block_size = elements_per_block*self.kernel.datatypes_size[self.kernel.datatype]
        try:
            block_to_cl_ratio = float(self.machine['cacheline size'])/block_size
        except ZeroDivisionError as e:
            print("Too small block_size / pointer_increment:", e, file=sys.stderr)
            sys.exit(1)

        port_cycles = dict([(i[0], i[1]*block_to_cl_ratio) for i in list(port_cycles.items())])
        uops = uops*block_to_cl_ratio
        cl_throughput = block_throughput*block_to_cl_ratio
        cl_latency = block_latency*block_to_cl_ratio
        flops_per_element = sum(self.kernel._flops.values())

        # Create result dictionary
        self.results.update({
            'cpu bottleneck': {
                'port cycles': port_cycles,
                'cl throughput': cl_throughput,
                'cl latency': cl_latency,
                'uops': uops,
                'performance throughput':
                    self.machine['clock']/block_throughput*elements_per_block*flops_per_element
                    *self._args.cores,
                'performance latency':
                    self.machine['clock']/block_latency*elements_per_block*flops_per_element
                    *self._args.cores,
                'IACA output': iaca_output,
                'IACA latency output': iaca_latency_output}})
        self.results['cpu bottleneck']['performance throughput'].unit = 'FLOP/s'
        self.results['cpu bottleneck']['performance latency'].unit = 'FLOP/s'

    def report(self, output_file=sys.stdout):
        if not self._args.latency:
            cpu_flops = PrefixedUnit(
                self.results['cpu bottleneck']['performance throughput'], "FLOP/s")
        else:
            cpu_flops = PrefixedUnit(
                self.results['cpu bottleneck']['performance latency'], "FLOP/s")
        if self._args and self._args.verbose >= 1:
            print('Bottlnecks:', file=output_file)
            print('  level | a. intensity |   performance   |   bandwidth  | bandwidth kernel',
                  file=output_file)
            print('--------+--------------+-----------------+--------------+-----------------',
                  file=output_file)
            print('    CPU |              | {!s:>15} |              |'.format(
                      self.conv_perf(cpu_flops, self._args.unit)),
                  file=output_file)
            for b in self.results['mem bottlenecks']:
                print('{level:>7} | {arithmetic intensity:>5.2} FLOP/B | {!s:>15} |'
                      ' {bandwidth!s:>12} | {bw kernel:<8}'.format(
                          self.conv_perf(b['performance'], self._args.unit), **b),
                      file=output_file)
            print('', file=output_file)
            print('IACA analisys:', file=output_file)
            if self._args.verbose >= 3:
                print(self.results['cpu bottleneck']['IACA output'], file=output_file)
                print(self.results['cpu bottleneck']['IACA latency output'], file=output_file)
            print('{!s}'.format(
                     {k: v for k, v in list(self.results['cpu bottleneck'].items()) if k not in 
                     ['IACA output', 'IACA latency output']}),
                  file=output_file)

        if float(self.results['min performance']) > float(cpu_flops):
            # CPU bound
            print('CPU bound with {} core(s)'.format(self._args.cores), file=output_file)
            print('{!s} due to CPU bottleneck'.format(self.conv_perf(cpu_flops, self._args.unit)),
                  file=output_file)
        else:
            # Cache or mem bound
            print('Cache or mem bound with {} core(s)'.format(self._args.cores), file=output_file)

            bottleneck = self.results['mem bottlenecks'][self.results['bottleneck level']]
            print('{!s} due to {} transfer bottleneck (bw with from {} benchmark)'.format(
                      self.conv_perf(bottleneck['performance'], self._args.unit),
                      bottleneck['level'],
                      bottleneck['bw kernel']),
                  file=output_file)
            print('Arithmetic Intensity: {:.2g} FLOP/B'.format(bottleneck['arithmetic intensity']),
                  file=output_file)
