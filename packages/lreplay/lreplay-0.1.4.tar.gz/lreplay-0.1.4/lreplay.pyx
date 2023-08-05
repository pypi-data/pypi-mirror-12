# distutils: language = c++
from libcpp cimport bool
cdef extern from "replay_cpp/replay.h":
    cdef cppclass Replay:
        Replay(bool verbose)
        void add(double loudness_400, double loudness_3000)
        double get_loudness_range() const
        double get_integrated_loudness() const

cdef class LReplay:

    cdef Replay *_thisptr

    def __cinit__(self, verbose=False):
        self._thisptr = new Replay(verbose)
        if self._thisptr == NULL:
            raise MemoryError()

    def __dealloc__(self):
        if self._thisptr != NULL:
            del self._thisptr

    cpdef void add(self, loudness_400, loudness_3000):
        self._thisptr.add(loudness_400, loudness_3000)

    cpdef double get_loudness_range(self):
        return self._thisptr.get_loudness_range()

    cpdef double get_integrated_loudness(self):
        return self._thisptr.get_integrated_loudness()
