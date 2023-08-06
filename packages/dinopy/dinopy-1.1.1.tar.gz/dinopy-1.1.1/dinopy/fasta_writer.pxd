# -*- coding: utf-8 -*-
cimport cython

from cpython cimport bool
from dinopy.conversion import InvaliddtypeError

from dinopy.conversion cimport basenumbers_to_bytes, string_to_bytes
from dinopy.definitions cimport basenumbers

cdef class FastaWriter:
    cdef object _filepath
    cdef object _opener
    cdef object _fasta_file
    cdef object _fai_file
    cdef bool _file_open
    cdef bool _stream_open
    cdef bool _is_buffered
    cdef bool _needs_closing
    cdef str _mode
    cdef bool _force_overwrite
    cdef bool _append
    cdef bool _write_fai
    cdef object _fai_path
    cdef int _line_width

    cpdef write_genome(
            self,
            object genome,
            object chromosome_info= *,
            type dtype= *,
    )

    cpdef write_chromosomes(
            self,
            object chromosomes,
            type dtype= *,
    )

    cpdef write_entries(
            self,
            object chromosomes,
            type dtype= *,
    )

    cpdef write_chromosome(
            self,
            object chromosome,
            type dtype= *,
    )

    cpdef write_entry(
            self,
            object chromosome,
            type dtype= *,
    )

    cpdef _write_entry_iterable(
            self,
            object chromosomes,
            type dtype= *,
    )

    cpdef _write_entry(
            self,
            object sequence,
            bytes name,
            type dtype= *,
    )

    cpdef list _normalize_chromosome_info(
            self,
            object chr_info,
            int genome_length,
    )
