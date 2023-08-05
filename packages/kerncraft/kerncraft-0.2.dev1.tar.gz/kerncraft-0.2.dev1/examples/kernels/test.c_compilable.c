#include "kerncraft.h"
#include <stdlib.h>

void dummy(double *);
extern int var_false;
int main(int argc, char **argv)
{
  const int N = atoi(argv[2]);
  const int M = atoi(argv[1]);
  double *a = aligned_malloc((sizeof(double)) * (N * N), 32);
  for (int i = 0; i < (N * N); ++i)
    a[i] = 0.23;

  if (var_false)
  {
    dummy(a);
  }

  double *b = aligned_malloc((sizeof(double)) * (N * N), 32);
  for (int i = 0; i < (N * N); ++i)
    b[i] = 0.23;

  if (var_false)
  {
    dummy(b);
  }

  for (int j = 0; j < N; ++j)
  {
    for (int i = 0; i < N; ++i)
    {
      a[j + (i * N)] = b[j + (i * N)];
    }

  }

}

