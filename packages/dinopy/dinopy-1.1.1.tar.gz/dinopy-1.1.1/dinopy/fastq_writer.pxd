# -*- coding: utf-8 -*-

cimport cython
from cpython cimport bool
from dinopy.definitions cimport basenumbers, two_bit, four_bit
from dinopy.conversion cimport basenumbers_to_bytes, string_to_bytes

cdef class FastqWriter:
    cdef object _filepath
    cdef object _opener
    cdef object _fastq_file
    cdef bool _file_open
    cdef bool _stream_open
    cdef bool _is_buffered
    cdef str _mode
    cdef bool _force_overwrite
    cdef bool _append

    cpdef write_reads(
            self,
            object reads,
            bool quality_values= *,
            type dtype= *,
    )

    cpdef write(
            self,
            object seq,
            bytes name,
            bytes quality_values= *,
            type dtype= *,
    )

    cdef _write_bytes(self, bytes seq, bytes name, bytes quality_values)
