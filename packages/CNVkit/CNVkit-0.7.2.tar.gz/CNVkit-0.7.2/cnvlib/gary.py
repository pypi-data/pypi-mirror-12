"""A generic array of genomic positions."""
from __future__ import print_function, absolute_import, division

import sys

import numpy as np
import pandas as pd

from . import core, ngfrills


def _make_blank(required_cols, dtypes=(("chromosome", "string"),
                                       ("start", "int"),
                                       ("end", "int"))):
    table = pd.DataFrame({key: [] for key in required_cols})
    for col, dtype in dtypes:
        table[col] = table[col].astype(dtype)
    return table


class GenomicArray(object):
    """An array of genomic intervals. Base class for genomic data structures.

    Can represent most BED-like tabular formats with arbitrary additional
    columns.
    """
    _required_columns = ("chromosome", "start", "end")

    def __init__(self, data_table, meta_dict=None):
        # Validation
        if len(data_table):
            if not all(c in data_table.columns for c in self._required_columns):
                raise ValueError("data table must have at least columns "
                                 + repr(self._required_columns))
            # Ensure chromosomes are strings to avoid integer conversion of 1, 2...
            if not isinstance(data_table.chromosome.iat[0], basestring):
                data_table["chromosome"] = (data_table["chromosome"]
                                            .astype("string"))
        elif not isinstance(data_table, pd.DataFrame):
            # Empty but conformant table
            data_table = _make_blank(self._required_columns)
        self.data = data_table
        self.meta = (dict(meta_dict)
                     if meta_dict is not None and len(meta_dict)
                     else {})

    @staticmethod
    def row2label(row):
        return "{}:{}-{}".format(row['chromosome'], row['start'], row['end'])

    @classmethod
    def from_columns(cls, columns, meta_dict=None):
        """Create a new instance from column arrays, given as a dict."""
        table = pd.DataFrame.from_dict(columns)
        ary = cls(table, meta_dict)
        ary.sort_columns()
        return ary

    @classmethod
    def from_rows(cls, rows, columns=None, meta_dict=None):
        """Create a new instance from a list of rows, as tuples or arrays."""
        if columns is None:
            columns = cls._required_columns
        table = pd.DataFrame.from_records(rows, columns=columns)
        return cls(table, meta_dict)

    def as_columns(self, **columns):
        """Extract a subset of columns, reusing this instance's metadata."""
        return self.__class__.from_columns(columns, self.meta)
        # return self.__class__(self.data.loc[:, columns], self.meta.copy())

    def as_dataframe(self, dframe):
        return self.__class__(dframe.reset_index(drop=True), self.meta.copy())

    # def as_index(self, index):
    #     """Subset with fancy/boolean indexing; reuse this instance's metadata."""
    #     if isinstance(index, (int, slice)):
    #         return self.__class__(self.data.iloc[index], self.meta.copy())
    #     else:
    #         return self.__class__(self.data[index], self.meta.copy())

    def as_rows(self, rows):
        """Extract rows by indices, reusing this instance's metadata."""
        return self.from_rows(rows,
                              columns=self.data.columns,
                              meta_dict=self.meta)

    # Container behaviour

    def __eq__(self, other):
        return (isinstance(other, self.__class__) and
                self.data.equals(other.data))

    def __len__(self):
        return len(self.data)

    def __contains__(self, key):
        return key in self.data.columns

    def __getitem__(self, index):
        """Access a portion of the data.

        Cases:

        - single integer: a row, as pd.Series
        - string row name: a column, as pd.Series
        - a boolean array: masked rows, as_dataframe
        - tuple of integers: selected rows, as_dataframe
        """
        if isinstance(index, int):
            # A single row
            return self.data.iloc[index]
            # return self.as_dataframe(self.data.iloc[index:index+1])
        elif isinstance(index, basestring):
            # A column, by name
            return self.data[index]
        elif (isinstance(index, tuple) and
              len(index) == 2 and
              index[1] in self.data.columns):
            # Row index, column index -> cell value
            return self.data.loc[index]
        elif isinstance(index, slice):
            # return self.as_dataframe(self.data.take(index))
            return self.as_dataframe(self.data[index])
        else:
            # Iterable -- selected row indices or boolean array, probably
            try:
                if isinstance(index, type(None)) or len(index) == 0:
                    empty = pd.DataFrame(columns=self.data.columns)
                    return self.as_dataframe(empty)
            except TypeError:
                raise TypeError("object of type %r " % type(index) +
                                "cannot be used as an index into a " +
                                self.__class__.__name__)
            return self.as_dataframe(self.data[index])
            # return self.as_dataframe(self.data.take(index))

    def __setitem__(self, index, value):
        """Assign to a portion of the data.
        """
        # self.data[index] = value
        if isinstance(index, int):
            self.data.iloc[index] = value
        elif isinstance(index, basestring):
            self.data[index] = value
        elif (isinstance(index, tuple) and
              len(index) == 2 and
              index[1] in self.data.columns):
            self.data.loc[index] = value
        else:
            assert isinstance(index, slice) or len(index) > 0
            self.data[index] = value

    def __delitem__(self, index):
        return NotImplemented

    def __iter__(self):
        return (row for i, row in self.data.iterrows())

    __next__ = next

    @property
    def chromosome(self):
        return self.data['chromosome']

    @property
    def start(self):
        return self.data['start']

    @property
    def end(self):
        return self.data['end']

    @property
    def sample_id(self):
        return self.meta.get('sample_id')

    # Traversal

    def by_chromosome(self):
        """Iterate over bins grouped by chromosome name."""
        for chrom, subtable in self.data.groupby("chromosome", sort=False):
            yield chrom, self.as_dataframe(subtable)

    def by_ranges(self, other, mode='trim', keep_empty=True):
        """Group rows by another GenomicArray's bin coordinate ranges.

        Returns an iterable of (bin, GenomicArray of overlapping rows))

        `mode` determines what to do with bins that overlap a boundary of the
        selection.  Values are:

        - ``inner``: Drop the bins on the selection boundary, don't emit them.
        - ``outer``: Keep/emit those bins as they are.
        - ``trim``: Emit those bins but alter their boundaries to match the
          selection; the bin start or end position is replaced with the
          selection boundary position. [default]

        Bins in this array that fall outside the other array's bins are skipped.
        """
        chrom_lookup = dict(self.by_chromosome())
        for chrom, bin_rows in other.by_chromosome():
            if chrom in chrom_lookup:
                cn_rows = chrom_lookup[chrom]
                # ENH: searchsorted w/ start/end arrays?
                for bin_row in bin_rows:
                    yield bin_row, cn_rows.in_range(start=bin_row['start'],
                                                    end=bin_row['end'],
                                                    mode=mode)
            else:
                if keep_empty:
                    for bin_row in bin_rows:
                        yield bin_row, self.as_rows([])

    def coords(self, also=()):
        """Iterate over plain coordinates of each bin: chromosome, start, end.

        With `also`, also include those columns.

        Example, yielding rows in BED format:

        >>> probes.coords(also=["name", "strand"])
        """
        cols = list(GenomicArray._required_columns)
        if also:
            cols.extend(also)
        coordframe = self.data.loc[:, cols]
        return coordframe.itertuples(index=False)

    def labels(self):
        return self.data.apply(self.row2label, axis=1)

    def in_range(self, chrom=None, start=0, end=None, mode='inner'):
        """Get the GenomicArray portion within the given genomic range.

        `mode` works as in `by_ranges`: ``outer`` includes bins straddling the
        range boundaries, ``trim`` additionally alters the straddling bins'
        endpoints to match the range boundaries, and ``inner`` excludes those
        bins.
        """
        assert mode in ('inner', 'outer', 'trim')
        if chrom:
            try:
                table = self.data[self.data['chromosome'] == chrom]
            except KeyError:
                raise KeyError("Chromosome %s is not in this probe set" % chrom)
        else:
            # Unsafe, but faster if we've already subsetted by chromosome
            table = self.data
        if start or end:
            if start:
                if mode == 'inner':
                    # Only rows entirely after the start point
                    start_idx = table.start.searchsorted(start)
                else:
                    # Include all rows overlapping the start point
                    start_idx = table.end.searchsorted(start, 'right')
            else:
                start_idx = 0
            if end:
                if mode == 'inner':
                    end_idx = table.end.searchsorted(end, 'right')
                else:
                    end_idx = table.start.searchsorted(end)
            else:
                end_idx = len(table)
            table = table[start_idx:end_idx]
            if mode == 'trim':
                table = table.copy()
                # Update 5' endpoints to the boundary
                table.start = table.start.clip_lower(start)
                # Update 3' endpoints to the boundary
                table.end = table.end.clip_upper(end)
        return self.as_dataframe(table)

    def in_ranges(self, chrom, starts=None, ends=None, mode='inner'):
        """Get the GenomicArray portion within the given array's ranges.
        """
        assert isinstance(chrom, basestring)  # ENH: take array?
        try:
            table = self.data[self.data['chromosome'] == chrom]
        except KeyError:
            raise KeyError("Chromosome %s is not in this probe set" % chrom)
        if starts is None and ends is None:
            return self.as_dataframe(table)
        # ENH: Take a series of slices...
        # XXX Slow path:
        if starts is None:
            starts = np.zeros(len(ends), dtype=np.int_)
        subtables = [self.in_range(chrom, start, end, mode).data
                     for start, end in zip(starts, ends)]
        table = pd.concat(subtables)
        return self.as_dataframe(table)

    def match_to_bins(self, other, key, default=0.0, fill=False,
                      summary_func=np.median):
        """Take values of the other array at each of this array's bins.

        Assign `default` to indices that fall outside the other array's bins, or
        chromosomes that appear in `self` but not `other`.

        Return an array of the `key` column values in `other` corresponding to this
        array's bin locations, the same length as this array.
        """
        def rows2value(rows):
            if len(rows) == 0:
                return default
            elif len(rows) == 1:
                return rows[0, key]
            else:
                return summary_func(rows[key])

        all_out_vals = [rows2value(other_rows) for _bin, other_rows in
                        other.by_ranges(self, mode='outer', keep_empty=True)]
        return np.asarray(all_out_vals)

    # Modification

    def concat(self, other):
        """Combine this array's data with another GenomicArray (in-place).

        Any optional columns must match between both arrays.
        """
        if not isinstance(other, self.__class__):
            raise ValueError("Argument (type %s) is not a %s instance"
                             % (type(other), self.__class__))
        if len(other.data):
            self.data = pd.concat([self.data, other.data])
        self.sort()

    def copy(self):
        """Create an independent copy of this object."""
        return self.as_dataframe(self.data.copy())

    def add_columns(self, **columns):
        """Create a new CNA, adding the specified extra columns to this CNA."""
        # return self.as_dataframe(self.data.assign(**columns))
        result = self.copy()
        for key, values in columns.iteritems():
            result[key] = values
        return result

    def keep_columns(self, columns):
        """Extract a subset of columns, reusing this instance's metadata."""
        return self.__class__(self.data.loc[:, columns], self.meta.copy())

    def drop_extra_columns(self):
        """Remove any optional columns from this GenomicArray.

        Returns a new copy with only the core columns retained:
            log2 value, chromosome, start, end, bin name.
        """
        table = self.data.loc[:, self._required_columns]
        return self.as_dataframe(table)

    def select(self, selector=None, **kwargs):
        """Take a subset of rows where the given condition is true.

        Arguments can be a function (lambda expression) returning a bool, which
        will be used to select True rows, and/or keyword arguments like
        gene="Background" or chromosome="chr7", which will select rows where the
        keyed field equals the specified value.
        """
        table = self.data
        if selector is not None:
            table = table[table.apply(selector, axis=1)]
        for key, val in kwargs.items():
            assert key in self
            table = table[table[key] == val]
        return self.as_dataframe(table)

    def shuffle(self):
        """Randomize the order of bins in this array (in-place)."""
        np.random.seed(0xA5EED)  # For reproducible results
        order = np.arange(len(self.data))
        np.random.shuffle(order)
        self.data = self.data.iloc[order]
        return order

    def sort(self):
        """Sort this array's bins in-place, with smart chromosome ordering."""
        table = self.data.copy()
        table['SORT_KEY'] = self.chromosome.apply(core.sorter_chrom)
        table.sort_index(by=['SORT_KEY', 'start'], inplace=True)
        del table['SORT_KEY']
        self.data = table.reset_index(drop=True)

    def sort_columns(self):
        """Sort this array's columns in-place, per class definition."""
        extra_cols = []
        for col in self.data.columns:
            if col not in self._required_columns:
                extra_cols.append(col)
        sorted_colnames = list(self._required_columns) + sorted(extra_cols)
        assert len(sorted_colnames) == len(self.data.columns)
        self.data = self.data.reindex(columns=sorted_colnames)

    # I/O

    @classmethod
    def read(cls, infile, sample_id=None):
        if sample_id is None:
            if isinstance(infile, basestring):
                sample_id = core.fbase(infile)
            else:
                sample_id = '<unknown>'
        # Create a multi-index of genomic coordinates (like GRanges)
        try:
            table = pd.read_table(infile, na_filter=False,
                                  dtype={'chromosome': 'string'},
                                  # index_col=['chromosome', 'start']
                                 )
        except ValueError:
            # File is blank/empty, most likely
            ngfrills.echo("Blank file", infile)
            table = _make_blank(cls._required_columns)
        # XXX Pending pandas 0.17: https://github.com/pydata/pandas/issues/10505
        # table['chromosome'] = pd.Categorical(table['chromosome'],
        #                                      table.chromosome.drop_duplicates(),
        #                                      ordered=True)
        # table.set_index(['chromosome', 'start'], inplace=True)
        return cls(table, {"sample_id": sample_id})

    def write(self, outfile=sys.stdout):
        """Write the wrapped data table to a file or handle in tabular format.

        The format is BED-like, but with a header row included and with
        arbitrary extra columns.

        To combine multiple samples in one file and/or convert to another
        format, see the 'export' subcommand.
        """
        with ngfrills.safe_write(outfile) as handle:
            self.data.to_csv(handle, index=False, sep='\t', float_format='%.6g')

