
# Structure to handle genomic regions or ranges.
#
# This file is part of gepyto.
#
# This work is licensed under the Creative Commons Attribution-NonCommercial
# 4.0 International License. To view a copy of this license, visit
# http://creativecommons.org/licenses/by-nc/4.0/ or send a letter to Creative
# Commons, PO Box 1866, Mountain View, CA 94042, USA.

__author__ = "Marc-Andre Legault"
__copyright__ = ("Copyright 2014 Marc-Andre Legault and Louis-Philippe "
                 "Lemieux Perreault. All rights reserved.")
__license__ = "Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)"


import re

from .. import settings
from . import sequences

import numpy as np
from six.moves import range


class _Segment(object):
    def __init__(self, chrom, start, end):
        chrom = str(chrom)
        assert re.match(settings.CHROM_REGEX, chrom)
        self.chrom = chrom
        self.start = int(start)
        self.end = int(end)
        assert self.start < self.end

    def overlaps_with(self, segment):
        return (self.chrom == segment.chrom and
                self.start <= segment.end and
                self.end >= segment.start)

    def distance_to(self, segment):
        if self.chrom != segment.chrom:
            raise Exception("Comparing segments from different chromosomes.")
        if self.overlaps_with(segment):
            return 0
        if self.end < segment.start:
            return segment.start - self.end
        else:
            return self.start - segment.end

    def as_range(self, iterator=False):
        if iterator:
            return range(self.start, self.end + 1)
        return np.arange(self.start, self.end + 1)

    def __eq__(self, seg):
        return (self.chrom == seg.chrom and self.start == seg.start and
                self.end == seg.end)

    def __ne__(self, seg):
        return not self.__eq__(seg)

    def __contains__(self, o):
        if hasattr(o, "chrom") and hasattr(o, "pos"):
            return o.chrom == self.chrom and (self.start <= o.pos <= self.end)
        elif hasattr(o, "chrom") and hasattr(o, "start") and hasattr(o, "end"):
            return (o.chrom == self.chrom and
                    (self.start <= o.start <= o.end <= self.end))
        else:
            raise TypeError("Object needs to have either (chrom, start, end) "
                            "or (chrom, pos) attributes to test if it is in "
                            "a _Segment or Region.")

    def to_sequence(self):
        return sequences.Sequence.from_reference(self.chrom, self.start,
                                                 self.end)

    @staticmethod
    def merge_segments(li):
        """Merge overlapping segments in a sorted list."""

        for i in range(len(li) - 1):
            cur = li[i]
            nxt = li[i + 1]
            if nxt.start < cur.start:
                raise Exception("Only sorted lists of segments can be "
                                "merged. Sort using the position first.")

            if cur.chrom != nxt.chrom:
                raise Exception("Can't merge segments from different "
                                "chromosomes.")

        merged_segments = []
        i = 0
        while i < len(li) - 1:
            j = i

            # Walk as long as the segments are overlapping.
            cur = li[i]
            nxt = li[i + 1]
            block = [cur.start, cur.end]
            if nxt.start <= cur.end:
                block[1] = max(block[1], nxt.end)

            while nxt.start <= block[1] and j + 1 < len(li) - 1:
                block[1] = max(block[1], nxt.end)
                j += 1
                cur = li[j]
                nxt = li[j + 1]

            merged_segments.append(
                _Segment(cur.chrom, block[0], block[1])
            )
            i = j + 1

        if li[-1].start > li[-2].end:
            merged_segments.append(li[-1])

        return merged_segments

    def __repr__(self):
        return "<_Segment object chr{}:{}-{}>".format(self.chrom, self.start,
                                                      self.end)


class Region(object):
    """Region object to represent a part of the genome.

    :param chrom: The chromosome.
    :type chrom: str

    :param start: The start of the region.
    :type start: int

    :param end: The end of the region.
    :type end: int

    This can either represent a contiguous region or a fragmented region
    with multiple non-overlaping segments. This object can easily be converted
    to a Sequence using the :py:func:`Region.sequence` property. It is
    also easy to test overlap with another region or to test if an object is
    contained within this region using the `in` operator.

    """
    def __init__(self, chrom, start, end):
        self.segments = []
        self.segments.append(_Segment(chrom, start, end))

    def union(self, region):
        """Primary method to create non contiguous regions.

        This will create a region represented by the union of the current
        Region and the provided Region. This means that overlapping segments
        will be merged to avoid redundancy.

        """
        segments = self.segments + region.segments
        segments = sorted(segments, key=lambda x: x.start)
        segments = _Segment.merge_segments(segments)
        return Region._from_segments(segments)

    def overlaps_with(self, region):
        """Tests overlap with another region."""
        for seg1 in self.segments:
            for seg2 in region.segments:
                if seg1.overlaps_with(seg2):
                    return True

        return False

    def distance_to(self, region):
        """Computes the distance to the given Region."""
        min_dist = float("infinity")
        for seg1 in self.segments:
            for seg2 in region.segments:
                d = seg1.distance_to(seg2)
                if d < min_dist:
                    min_dist = d
        return min_dist

    def as_range(self, iterator=False):
        """Get a range corresponding to all the nucleotide positions."""
        if self.is_contiguous:
            return self.segments[0].as_range(iterator)
        else:
            return set([seg.as_range(iterator) for seg in self.segments])

    @property
    def chrom(self):
        if self.is_contiguous:
            return self.segments[0].chrom
        else:
            chrom = {seg.chrom for seg in self.segments}
            if len(chrom) > 1:
                raise Exception("Ambiguous chromosome for non contiguous "
                                "region.")
            return chrom[0]

    @property
    def start(self):
        if self.is_contiguous:
            return self.segments[0].start
        return min([seg.start for seg in self.segments])

    @property
    def end(self):
        if self.is_contiguous:
            return self.segments[0].end
        return max([seg.end for seg in self.segments])

    @property
    def is_contiguous(self):
        return len(self.segments) == 1

    @property
    def sequence(self):
        """Builds a Sequence object representing the region.

        If the region is non contiguous, a tuple of sequences is returned.
        """
        sequences = []
        for seg in self.segments:
            sequences.append(seg.to_sequence())

        return sequences[0] if len(sequences) == 1 else tuple(sequences)

    @staticmethod
    def _from_segments(segments):
        region = Region(1, 1, 2)
        region.segments = segments
        return region

    @staticmethod
    def from_str(s):
        """Parses the region object (contiguous only) from a string.

        The expected format is `chrX:START-END`.
        """
        regex = (
            r"^chr" + settings.CHROM_REGEX.pattern +
            ":([0-9]+)-([0-9]+)$"
        )
        match = re.match(regex, s)
        if match is None:
            raise TypeError("Invalid format for Region string. Expected the "
                            "form 'chrXX:START-END' and got '{}'."
                            "".format(s))
        chrom, start, end = match.groups()
        start = int(start)
        end = int(end)
        assert end >= start
        seg = _Segment(chrom, start, end)
        region = Region._from_segments([seg, ])
        return region

    def __contains__(self, o):
        """Tests if an object is in the region.

        This is valid for any object with (`chrom` and `pos`) or (`chrom`,
        `start` and `end`) attributes.

        """
        for seg in self.segments:
            if o in seg:
                return True
        return False

    def __repr__(self):
        return "<{}Region: {}>".format(
            "Contiguous" if self.is_contiguous else "NonContiguous",
            self.segments
        )
