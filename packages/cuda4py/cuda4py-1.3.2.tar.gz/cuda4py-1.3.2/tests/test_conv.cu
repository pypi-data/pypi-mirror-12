////////////////////////////////////////////////////////////////////////////////
/// Position convolution kernel center at (0, 0) in the image
////////////////////////////////////////////////////////////////////////////////
extern "C"
__global__ void padKernel(
    dtype *d_Dst,
    dtype *d_Src,
    int fftH,
    int fftW,
    int kernelH,
    int kernelW,
    int kernelY,
    int kernelX
)
{
    const int y = blockDim.y * blockIdx.y + threadIdx.y;
    const int x = blockDim.x * blockIdx.x + threadIdx.x;

    if (y < kernelH && x < kernelW)
    {
        int ky = y - kernelY;

        if (ky < 0)
        {
            ky += fftH;
        }

        int kx = x - kernelX;

        if (kx < 0)
        {
            kx += fftW;
        }

        d_Dst[ky * fftW + kx] = d_Src[y * kernelW + x];
    }
}


////////////////////////////////////////////////////////////////////////////////
// Prepare data for "pad to border" addressing mode
////////////////////////////////////////////////////////////////////////////////
extern "C"
__global__ void padData(
    dtype *d_Dst,
    dtype *d_Src,
    int fftH,
    int fftW,
    int dataH,
    int dataW,
    int kernelH,
    int kernelW,
    int kernelY,
    int kernelX
)
{
    const int y = blockDim.y * blockIdx.y + threadIdx.y;
    const int x = blockDim.x * blockIdx.x + threadIdx.x;
    const int borderH = dataH + kernelY;
    const int borderW = dataW + kernelX;

    if (y < fftH && x < fftW)
    {
        int dy, dx;

        if (y < dataH)
        {
            dy = y;
        }

        if (x < dataW)
        {
            dx = x;
        }

        if (y >= dataH && y < borderH)
        {
            dy = dataH - 1;
        }

        if (x >= dataW && x < borderW)
        {
            dx = dataW - 1;
        }

        if (y >= borderH)
        {
            dy = 0;
        }

        if (x >= borderW)
        {
            dx = 0;
        }

        d_Dst[y * fftW + x] = d_Src[dy * dataW + dx];
    }
}


// a = (a * b) * c
extern "C"
__global__ void mul_scale(dtype *a, const dtype *b, const dtype c, const int limit) {
  int idx = blockDim.x * blockIdx.x + threadIdx.x;

  if (idx < limit) {
    idx <<= 1;
    dtype ax = a[idx], ay = a[idx + 1];
    dtype bx = b[idx], by = b[idx + 1];
    a[idx] = (ax * bx - ay * by) * c;
    a[idx + 1] = (ay * bx + ax * by) * c;
  }
}
