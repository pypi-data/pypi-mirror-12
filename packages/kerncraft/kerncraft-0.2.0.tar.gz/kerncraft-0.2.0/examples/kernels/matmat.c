double a[N][M];
double b[M][N];
double c[N][N];

for(int k=0; k<N; ++k) {
    for(int j=0; j<N; ++j) {
        for(int i=0; i<M; ++i) {
            c[k][j] += a[i][j] * b[k][i];
        }
    }
}

