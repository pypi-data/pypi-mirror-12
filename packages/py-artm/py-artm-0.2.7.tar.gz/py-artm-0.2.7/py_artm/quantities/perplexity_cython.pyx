#cython: boundscheck=False, wraparound=False, embedsignature=True, cdivision=True
import scipy.linalg.blas as blas
from cpython cimport PyCObject_AsVoidPtr

ctypedef float (*sdot_ptr) (const int *N, const float *X, const int *incX, const float *Y, const int *incY) nogil
cdef sdot_ptr sdot=<sdot_ptr>PyCObject_AsVoidPtr(blas.sdot._cpointer)


def perplexity_sparse(nwd,
                      float[:, ::1] phi,
                      float[::1, :] theta):
    nwd = nwd.tocsr()
    cdef int[:] nwd_indptr = nwd.indptr
    cdef int[:] nwd_indices = nwd.indices
    cdef float[:] nwd_data = nwd.data

    cdef int W = phi.shape[0]
    cdef int T = phi.shape[1]
    cdef int D = theta.shape[1]

    cdef int w, i, d
    cdef int i_0, i_1

    cdef float pwd_val
    cdef float result = 0

    cdef int ix = 1

    for w in range(W):
        i_0 = nwd_indptr[w]
        i_1 = nwd_indptr[w + 1]

        for i in range(i_0, i_1):
            d = nwd_indices[i]
            pwd_val = sdot(&T, &phi[w, 0], &ix, &theta[0, d], &ix)
            result += nwd_data[i] * ((<int*>&pwd_val)[0] * <float>8.2629582881927490e-8 - <float>87.989971088)

    return result
