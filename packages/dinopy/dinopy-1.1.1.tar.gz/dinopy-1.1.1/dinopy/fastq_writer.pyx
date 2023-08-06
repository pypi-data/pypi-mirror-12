# -*- coding: utf-8 -*-
#cython: wraparound=False
import gzip
import os
import sys
from io import IOBase, BufferedWriter, DEFAULT_BUFFER_SIZE
from .exceptions import InvalidDtypeError

cimport cython

cdef class FastqWriter:
    @cython.embedsignature(False)
    def __init__(self, target, force_overwrite=False, append=False):
        """__init__(target, force_overwrite=False, append=False)

        Create a new FastqWriter for writing reads to disk in fastq format.

        Manages opening and closing of files. This works best when using a with
        environment (see Examples), but the open and clode methods of the
        writer can also be called directly. This can be useful, when the
        number of files to be opened is depending on the input data.

        Arguments:
            target (str, bytes, file or sys.stdout): Path where the file will be written to.
                If the path ends with the suffix .gz a gzipped file will be created.
            force_overwrite (bool): If set to True, an existing file will be overwritten.
                (Default: False)
            append (bool): If set to True, existing file will not be overwritten.
                Reads will be appended at the end of the file. (Default: False)

        Raises:
            ValueError: If the filename is invalid.
            ValueError: If contradicting parameters are passed (overwrite=True and append=True).
            TypeError: If target is neither a file, nor a path nor stdout.
            IOError: If target is a file opened in the wrong mode.
            IOError: If target file already exists and neither overwrite nor append are specified.

        Methods intended for public use are:

          - :py:meth:`write`: Write one read to the opened file.

          - :py:meth:`write_reads`: Writes given reads to file, where reads must
            be an Iterable over either `(sequence, sequence_id, quality_values)`
            or `(sequence, sequence_id)` tuples.

        Examples:

            Writing reads from a list::

                reads = [("TTTTTTTTGGANNNNN", b"sequence_id", b"#+++3#+/-.1/1/.<")]
                with dinopy.FastqWriter("somefile.fastq") as fqw:
                    fqw.write_reads(reads, dtype=str)

            Results in:

            | @sequence_id
            | TTTTTTTTGGANNNNN
            | +
            | #+++3#+/-.1/1/.<
            |
            |

            Writing a single read::

                with dinopy.FastqWriter("somefile.fastq.gz") as fqw:
                    fqw.write(b"TTTTTTTTGGANNNNN", b"sequence_id", b"#+++3#+/-.1/1/.<")

            Results in:

            | @sequence_id
            | TTTTTTTTGGANNNNN
            | +
            | #+++3#+/-.1/1/.<
            |
            |

            Using a FastqWriter without the with-environment.
            Make sure the file is closed after you finished writing.::

                fqw = dinopy.FastqWriter("somefile.fastq")
                fqw.open()
                fqw.write(b"TTTTTTTTGGANNNNN", b"sequence_id", None, dtype=bytes)
                fqw.close()

            Results in:

            | @sequence_id
            | TTTTTTTTGGANNNNN
            |
            |

            Using a variable number of writers.::

                # create a dict of writers
                writers = {name: dinopy.FastqWriter(path) for name, path in zip(specimen, input_filepaths)}
                # open all writers
                for writer in writers:
                    writer.open()

                for read in reads:
                    # pick a writer / output file according to some properties of the read
                    # and write the read using the picked writer.
                    picked_writer = pick(read, writers)
                    picked_writer.write(read)

                # close all writers
                for writer in writers:
                    writer.close()

        """
        # set desired write mode and save append / overwrite policy
        if append and force_overwrite:
            raise ValueError(
                "Please specify either force_overwrite (to overwrite an existing file) OR append (to append to an existing file). These options exclude each other.")
        elif append and not force_overwrite:
            self._mode = u"ab"
            self._append = True
            self._force_overwrite = False
        elif not append and force_overwrite:
            self._mode = u"wb"
            self._append = False
            self._force_overwrite = True
        else:
            # neither append, nor overwrite. This will raise an IOError if
            # called on an existing file.
            self._mode = u"wb"
            self._append = False
            self._force_overwrite = False

        # convert bytes paths to str paths
        if isinstance(target, bytes):
            target = target.decode("utf-8")
        # check type of target
        if isinstance(target, str):
            if target == "":
                raise ValueError("Filename can not be an empty string.")
            self._filepath = os.path.abspath(os.path.expanduser(target))
            if self._filepath.endswith(".gz"):
                self._opener = gzip.open
                self._is_buffered = True
            else:
                self._opener = open
                self._is_buffered = False
            self._file_open = False
            self._stream_open = False
        elif isinstance(target, IOBase):
            # check if target is opened in the right mode or a stream
            if self._mode == target.mode and not target.isatty():
                self._file_open = True
                self._stream_open = False
                self._fastq_file = target
                if isinstance(target, BufferedWriter):
                    self._is_buffered = True
                else:
                    self._is_buffered = False
            elif target.isatty() and target.writable():
                self._file_open = False
                self._stream_open = True
                self._is_buffered = True
                self._fastq_file = sys.stdout.buffer
            else:
                raise IOError("Target has to be a file in 'wb' or 'ab' mode (if append=True), or sys.stdout(.buffer).")
            self._filepath = None
        else:
            raise TypeError(
                "Target must either be a file object, a path to a file (as bytes or str) or a filelike object like sys.stdout.")

    cpdef write_reads(self, object reads, bool quality_values=True, type dtype=bytes):
        """Write multiple reads to file.

        Arguments:
            reads (Iterable): Containing reads, i.e. tuples of sequence, name
                and (optionally) quality values
            quality_values(bool): If set to True (Default) quality values are written to file.
            dtype(type): Type of the sequence(s) (See :ref:`dtype <dtype>`; Default: bytes)

        Raises:
            IOError: If no file has been opened, i.e. the writer has neither
                been opened using a with environment nor the open method has been
                called explicitly.

        Example:

            Write a list of reads to file::

                reads = [("TTTTTTTTGGANNNNN", b"sequence_id", b"#+++3#+/-.1/1/.<")]
                with dinopy.FastqWriter("somefile.fastq") as fqw:
                    fqw.write_reads(reads, dtype=str)

        """
        try:
            if self._file_open or self._stream_open:
                if dtype in (bytes, bytearray):
                    if quality_values:
                        for (seq, seq_id, qvs) in reads:
                            self._write_bytes(seq, seq_id, qvs)
                    else:
                        # catch (and ignore) quality values
                        for (seq, seq_id, *_) in reads:
                            self._write_bytes(seq, seq_id, None)
                elif dtype == str:
                    if quality_values:
                        for (seq, seq_id, qvs) in reads:
                            self._write_bytes(string_to_bytes(seq), seq_id, qvs)
                    else:
                        # catch (and ignore) quality values
                        for (seq, seq_id, *_) in reads:
                            self._write_bytes(string_to_bytes(seq), seq_id, None)
                elif dtype == basenumbers:
                    if quality_values:
                        for (seq, seq_id, qvs) in reads:
                            self._write_bytes(basenumbers_to_bytes(seq), seq_id, qvs)
                    else:
                        # catch (and ignore) quality values
                        for (seq, seq_id, *_) in reads:
                            self._write_bytes(basenumbers_to_bytes(seq), seq_id, None)
                else:
                    raise InvalidDtypeError("Unrecognized dtype {}".format(dtype))
            else:
                raise IOError(
                    "No file openend. Use a with environment like:\nwith FastqWriter(target) as fqw:\n  fqw.write_reads(...)")
        except TypeError as te:
            raise


    cpdef write(self, object seq, bytes name, bytes quality_values=None, type dtype=bytes):
        """Write a single read to file.

        Arguments:
            seq (dtype): Sequence of the read
            name (bytes): Name line for the read
            quality_values (bytes): Quality values of the read.
            dtype(type): Type of the sequence(s) (See :ref:`dtype <dtype>`; Default: bytes)

        Raises:
            IOError: If FastqWriter was not used in an environment. → No file has been opened.
            InvalidDtypeError: If an invalid encoding for the sequence has been given.

        Example:
            Write a single read to file::

                with dinopy.FastqWriter("somefile.fastq") as fqw:
                    fqw.write(b"TTTTTTTTGGANNNNN", b"sequence_id", b"#+++3#+/-.1/1/.<")
        """
        try:
            if self._file_open or self._stream_open:
                if dtype in (bytes, bytearray):
                    self._write_bytes(seq, name, quality_values)
                elif dtype == str:
                    self._write_bytes(string_to_bytes(seq), name, quality_values)
                elif dtype == basenumbers:
                    try:
                        self._write_bytes(basenumbers_to_bytes(seq), name, quality_values)
                    except KeyError:
                        raise InvalidDtypeError("Error treating sequence {} as basenumbers for conversion.".format(seq))
                elif dtype in (two_bit, four_bit):
                    raise InvalidDtypeError("two_bit or four_bit encoding not permitted here.")
            else:
                raise IOError("No file openend. Use with FastqWriter(target) as fqw:\ fqw.write(...)")
        except TypeError as te:
            raise
            

    cdef _write_bytes(self, bytes seq, bytes name, bytes quality_values):
        """Write a given read to the file.

        The plus-line stays empty, to save disk space.

        Arguments:
            seq (bytes): Sequence of the read
            name (bytes): Nameline of the read without leading @
            quality_values (bytes): Quality values for the read. If this is
                 None, no quality values and no plus-line are written.
        """
        cdef object outfile = self._fastq_file
        cdef bytes line
        line = b'@' + name + b'\n' + seq + b'\n'
        if quality_values is not None:
            line += b'+\n' + quality_values + b'\n'
        outfile.write(line)

    def open(self):
        """Open the file for writing.

        Note:
            This should only be used if the exact number of files is not known
            at develpoment time. Otherwise the use of the environment is
            encouraged, as it is much harder to 'forget' closing an opened file.
        """
        if not self._file_open and not self._stream_open:
            if os.path.exists(self._filepath) and not self._append and not self._force_overwrite:
                raise IOError(
                    "File {} already exists, but neither force_overwrite nor append are set.".format(self._filepath))
            path, filename = os.path.split(self._filepath)
            if not os.path.exists(path):
                os.makedirs(path)
            if self._is_buffered:
                # The gzip library does not use a buffered writer as a default.
                self._fastq_file = BufferedWriter(self._opener(self._filepath, self._mode),
                                                  buffer_size=DEFAULT_BUFFER_SIZE * 64)
            else:
                # the open function provides a buffered writer, if the mode is set to 'b'
                self._fastq_file = self._opener(self._filepath, self._mode)
            self._file_open = True

    def close(self):
        """Close the file (after writing).

        Note:
            This should only be used if the exact number of files is not known
            at develpoment time. Otherwise the use of the environment is
            encouraged, as it is much harder to 'forget' closing an opened file.
        """
        if self._file_open:
            self._fastq_file.close()
            self._file_open = False

    def __enter__(self):
        """Open the file for writing when the environment is entered."""
        self.open()
        return self

    def __exit__(self, type, value, traceback):
        """Close the file after leaving the environment."""
        self.close()
        if value is not None:
            raise value
