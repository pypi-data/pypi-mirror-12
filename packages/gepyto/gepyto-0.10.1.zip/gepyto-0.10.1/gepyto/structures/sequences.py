
# Structures to handle biological sequences.
#
# This file is part of gepyto.
#
# This work is licensed under the Creative Commons Attribution-NonCommercial
# 4.0 International License. To view a copy of this license, visit
# http://creativecommons.org/licenses/by-nc/4.0/ or send a letter to Creative
# Commons, PO Box 1866, Mountain View, CA 94042, USA.
from __future__ import division

__author__ = "Marc-Andre Legault"
__copyright__ = ("Copyright 2014 Marc-Andre Legault and Louis-Philippe "
                 "Lemieux Perreault. All rights reserved.")
__license__ = "Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)"


try:
    from string import maketrans, translate
except ImportError:
    maketrans = str.maketrans
    translate = str.translate

import textwrap
import collections
import multiprocessing
import itertools
import logging
logger = logging.getLogger(__name__)

import numpy as np
from six.moves import range as xrange

from .. import reference
from .. import settings


DNA_GENETIC_CODE = dict(
    GCT="A", GCC="A", GCA="A", GCG="A",
    CGT="R", CGC="R", CGA="R", CGG="R", AGA="R", AGG="R",
    AAT="N", AAC="N", GAT="D", GAC="D", TGT="C", TGC="C", CAA="Q", CAG="Q",
    GAA="E", GAG="E",
    GGT="G", GGC="G", GGA="G", GGG="G",
    CAT="H", CAC="H", ATT="I", ATC="I", ATA="I",
    TTA="L", TTG="L", CTT="L", CTC="L", CTA="L", CTG="L",
    AAA="K", AAG="K", ATG="M", TTT="F", TTC="F",
    CCT="P", CCC="P", CCA="P", CCG="P",
    TCT="S", TCC="S", TCA="S", TCG="S", AGT="S", AGC="S",
    ACT="T", ACC="T", ACA="T", ACG="T",
    TGG="W", TAT="Y", TAC="Y",
    GTT="V", GTC="V", GTA="V", GTG="V",
)


REVERSE_COMPLEMENT_DNA = dict(
    A="T", C="G", G="C", T="A", M="K", R="Y", W="W", S="S", Y="R", K="M",
    V="B", H="D", D="H", B="V",
)


# For both DNA and RNA.
STOP_CODONS = {"TAA", "TAG", "TGA", "UAA", "UAG", "UGA"}


def _build_coding_sequences(orf, s=None):
        if type(orf) is tuple:
            orf, s = orf  # map passes arguments as a tuple.

        if s is None:
            raise TypeError("_build_coding_sequences() takes either a tuple "
                            "of (orf name, sequence) or the two corresponding "
                            "distinct arguments.")

        # Sequences are actually: (orf, start, end, sequence)
        sequences = []
        start_codons = []
        i = 0
        while i + 3 <= len(s):
            codon = s[i:(i+3)]
            if codon == "ATG":
                start_codons.append(i)
            elif codon in STOP_CODONS:
                # Close all open sequences.
                for j in start_codons:
                    if orf > 0:
                        start = j + orf - 1
                        end = (i+3) + orf - 1
                    else:
                        start = len(s) - (i+3)
                        end = len(s) - j
                    sequences.append(
                        (orf, start, end, s[j:i])
                    )
                start_codons = []
            elif codon not in DNA_GENETIC_CODE:
                # This should not happen in a real protein, so we'll close the
                # sequences.
                start_codons = []

            i += 3

        return sequences


class Sequence(object):
    """Object to represent biological sequences.

    :param uid: The identifier for this sequence.
    :type uid: str

    :param s: The actual sequence.
    :type s: str

    :param seq_type: The sequence type (DNA, RNA or AA).
    :type seq_type: str

    :param info: A python dict of extra parameters (optional).
    :type info: dict

    Common examples for the info attributes:

    * ``species``: Homo sapiens
    * ``species_ncbi_tax_id``: 9606
    * ``description``: dystroglycan 1
    * ``db_name``: RefSeq
    * ``db_acc``: NM_004393

    """

    types = set(["DNA", "RNA", "AA"])

    def __init__(self, uid, s, seq_type, info=None):
        if seq_type not in Sequence.types:
            raise ValueError("Invalid sequence type {}. Allowed types are: "
                             "{}".format(seq_type, list(Sequence.types)))

        self.uid = uid
        self.seq = str(s.upper())
        self.seq_type = seq_type
        self.info = info
        self._annotations = []

    def __repr__(self):
        return "<Sequence: {}>".format(self.uid)

    def __eq__(self, seq1):
        return bool(
            self.uid == seq1.uid and
            self.seq == seq1.seq and
            self.seq_type == seq1.seq_type
        )

    def __len__(self):
        return len(self.seq)

    @classmethod
    def from_reference(cls, chrom, start, end=None, length=None):
        """Create a Sequence object from a given locus."""
        with reference.Reference() as ref:
            seq = ref.get_sequence(chrom, start, end, length)

        if length:
            end = start + length - 1
        uid = "chr{}:{}-{}".format(chrom, start, end)
        seq_type = "DNA"
        info = {
            "species": "Homo sapiens",
            "species_ncbi_tax_id": 9606,
            "build": settings.BUILD
        }

        return cls(uid, seq, seq_type, info)

    def to_fasta(self, line_len=80, full_header=False):
        """Converts the sequence to a valid fasta string.

        :param line_len: The maximum line length for the sequence.
        :type line_len: int

        :param full_header: Add the contents of the info field to the header.
                            (default: False).
        :type full_header: bool

        :returns: A fasta string.
        :rtype: str

        """

        s = "> {}".format(self.uid)
        if full_header:
            s += " - "
            s += ", ".join(
                ["'{}'='{}'".format(k, v) for k, v in self.info.items()]
            )
        s = [s, ] + textwrap.wrap(self.seq, line_len)
        return "\n".join(s) + "\n"

    def get_annotations(self):
        """Return a list of bound SequenceAnnotation objects.

        :returns: A list of annotations for the sequence representing
                  different kind of information about sub-sequences like
                  protein domains.
        :rtype: list

        """

        return self._annotations

    def translate(self, no_check=False):
        """Use the genetic code to translate a DNA or RNA sequence into an
           amino acid sequence.

        """

        if self.seq_type not in ("DNA", "RNA"):
            raise Exception("Can only translate DNA or RNA sequences.")

        if self.seq_type == "RNA":
            # We need to convert the genetic code to RNA.
            code = {}
            for k, v in DNA_GENETIC_CODE.items():
                k = k.replace("T", "U")
                code[k] = v

        else:
            code = DNA_GENETIC_CODE

        s = self.seq
        if len(s) % 3 != 0:
            raise Exception("Invalid sequence length for translation.")

        if not no_check:
            if s[:3] not in ("ATG", "AUG"):
                raise Exception("Sequence does not start with START codon "
                                "(ATG).")

        if s[-3:] not in STOP_CODONS:
            if not no_check:
                raise Exception("Sequence does not end with STOP codon.")
        else:
            # Sequence ends with stop codon, we'll remove it for translation.
            s = s[:-3]

        return Sequence(
            uid="translated_{}".format(self.uid),
            seq_type="AA",
            s=Sequence._translate(s, code=code),
            info=self.info
        )

    @staticmethod
    def _translate(s, code=DNA_GENETIC_CODE):
        """Translate a string. Used internally for translation."""
        try:
            s = "".join(
                [code[s[i:i+3]] for i in xrange(0, len(s) - 2, 3)]
            )
        except KeyError as e:
            raise ValueError("Can't find amino acid for codon '{}'".format(
                e.message
            ))

        return s

    def find_coding_sequences(self, cpu=6):
        """Tries all the ORFs and translates every possible protein.

        :returns: A tuple containing the information of the coding sequence.
                  (ORF, start, end, sequence)
        :rtype: tuple

        .. warning::

            This is currently **untested**.

        """
        orfs = collections.OrderedDict([
            (1, self.seq),
            (2, self.seq[1:]),
            (3, self.seq[2:]),
            (-1, Sequence._str_reverse_complement(self.seq))
        ])
        orfs.update([
            (-2, orfs[-1][1:]),
            (-3, orfs[-1][2:]),
        ])

        if cpu == 1:
            # Single processor.
            coding_sequences = []
            for orf, seq in orfs.items():
                coding_sequences.extend(_build_coding_sequences(orf, seq))

        else:
            p = multiprocessing.Pool(cpu)
            coding_sequences = p.map(_build_coding_sequences, orfs.items())

        coding_sequences = list(itertools.chain(*coding_sequences))
        return coding_sequences

    def find_translations(self, cpu=6):
        """Finds and translates peptides from any ORF in the sequence."""
        coding_sequences = self.find_coding_sequences(cpu)
        peptides = []
        for i, tu in enumerate(coding_sequences):
            tu = list(tu)
            tu[-1] = Sequence._translate(tu[-1])
            peptides.append(tu)

        return peptides

    def reverse_complement(self):
        """Reverse complement the sequence (compatible with IUPAC codes)."""
        if self.seq_type != "DNA":
            raise NotImplementedError("reverse_complement is only available "
                                      "for DNA sequences.")
        seq = Sequence._str_reverse_complement(self.seq)
        return Sequence(
            uid="reversed_compl_{}".format(self.uid),
            seq_type="DNA",
            s=seq,
            info=self.info
        )

    @staticmethod
    def _str_reverse_complement(seq):
        seq = seq[::-1]
        before, after = zip(*REVERSE_COMPLEMENT_DNA.items())
        trans = maketrans("".join(before), "".join(after))
        seq = translate(seq, trans)
        return seq

    def gc_content(self):
        """Computes the GC content for the sequence."""
        counter = collections.Counter(self.seq)
        return (counter["G"] + counter["C"]) / sum(counter.values())

    def bbc(self, k=10, alphabet=None):
        """Shortcut to base_base_correlation.

        """
        return self.base_base_correlation(k, alphabet)

    def base_base_correlation(self, k=10, alphabet=None):
        """Compute the base base correlation (BBC) for the sequence.

        :param k: k is a parameter of the BBC. Intuitively, it represents
                  the maximum distance to observe correlation between bases.
        :type k: int

        :param alphabet: List of possible characters. This can be used to avoid
                         autodetection of the alphabet in the case where
                         sequences with missing letters are to be compared.
        :type alphabet: iterable

        :returns: A 16 dimensional vector representing the BBC.
        :rtype: :py:class:`np.ndarray`

        A description of the method can be found here:
        http://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=4272582

        Liu, Zhi-Hua, et al. "Base-Base Correlation a Novel Sequence Feature
        and its Applications." Bioinformatics and Biomedical Engineering, 2007.
        ICBBE 2007. The 1st International Conference on. IEEE, 2007.

        This implementation is generalized for any sequence type.

        """

        s = self.seq
        if k > len(s) - 2:
            raise Exception("Sequence too short to compute BBC with "
                            "k={}".format(k))

        if alphabet is None:
            alphabet = set(s)
        alphabet = sorted(list(alphabet))
        alphabet = dict(zip(alphabet, xrange(len(alphabet))))
        L = len(alphabet)

        # Compute the base probabilities for every character.
        p = np.zeros(L)
        for c in s:
            p[alphabet[c]] += 1
        p /= np.sum(p)
        p.shape = (1, L)

        # Now we need to compute
        bbc = np.zeros((L, L))
        for l in xrange(1, k + 2):
            # We need to compute $p_{ij}(l)$ representing the probability of
            # observing the bases i and j separated by l "gaps".
            # We will compute it for all 16 combinations of alleles.
            l_dist_correlations = np.zeros((L, L))
            for i in xrange(len(s) - l):
                nuc1 = alphabet[s[i]]
                nuc2 = alphabet[s[i + l]]
                l_dist_correlations[nuc1][nuc2] += 1
            l_dist_correlations /= np.sum(l_dist_correlations)

            # We can now compute the D_{ij}(l) which is the deviation from
            # statistical independance.
            # $D_{ij}(l) = p_{ij}(l) - p_i p_j$
            D = l_dist_correlations - np.dot(p.T, p)

            bbc += D + (D ** 2 / 2 * np.dot(p.T ** 2, p ** 2)) + D ** 3

        # We can now flatten the bbc into a 16 feature vector.
        bbc.shape = (1, L * L)

        return bbc


def smith_waterman(seq1, seq2, penalties=None, output="sequences"):
    """Compute a pairwise local sequence alignment using the Smith Waterman
    algorithm.

    The output parameter determines how results will be represented:

    If "sequences" is chosen, the two aligned sequences will be returned with
    gaps represented by dashes ("-").

    If "alignment" is chosen, a single encoded string will be reterned where
    "M" represents matches, "I" represents insertions, "D" represents deletions
    and "X" represents mismatches. This is done with respect to the first
    sequence.

    In any mode, the first returned element is always the raw similarity score.
    Note that because this is local alignment, gaps at both ends won't be
    penalized. Also, only one of the potentially many best alignments will be
    output.

    .. warning::

        This implementation is not very optimized. It is not written in a low
        level language. It can be used for small sequences or for low number of
        comparisons, but should not be used in large scale products.

    .. note::

        Some functionality like affine gap penalties, or substitution matrices
        are not implemented.

    The default penalty scheme is the following:

    .. code-block:: python

        {
            "match": 2,
            "mismatch": -1,
            "gap": -1
        }

    You can follow this pattern to set your own penalty scores.

    """
    if isinstance(seq1, Sequence):
        seq1 = seq1.seq
    if isinstance(seq2, Sequence):
        seq2 = seq2.seq

    # The return mode.
    SEQUENCES = "sequences"
    ALIGNMENT = "alignment"

    if output == SEQUENCES:
        mode = SEQUENCES
    elif output == ALIGNMENT:
        mode = ALIGNMENT
    else:
        msg = "Invalid output mode '{}'. Accepted values are: {}."
        raise TypeError(
            msg.format(output, ", ".join([SEQUENCES, ALIGNMENT]))
        )

    # Default penalties.
    if penalties is None:
        default_penalties = {
            "match": 2,
            "mismatch": -1,
            "gap": -1
        }
        penalties = {}
    elif type(penalties) is not dict:
        raise ValueError("The penalties dict should have keys for a subset of "
                         "match, mismatch and gap scores.")

    default_penalties.update(penalties)
    p = default_penalties

    msg = ("Computing local alignment using the Smith Waterman algorithm "
           "with match={}, mismatch={}, gap={}. Return mode: {}.")
    logger.info(msg.format(p["match"], p["mismatch"], p["gap"], mode))

    m = len(seq1) + 1
    n = len(seq2) + 1
    mat = np.empty((m, n), dtype=int)
    pointers = np.zeros((m, n), dtype=int) - 1
    mat[0, :] = 0
    mat[:, 0] = 0

    # This implementation will use the naive algorithm to generate the matrix.
    # Better high performance implementations exist.
    # Also, affine panelties are not implemented. It's a constant cost per
    # gap.
    for i in xrange(1, mat.shape[0]):
        for j in xrange(1, mat.shape[1]):
            if seq1[i - 1] == seq2[j - 1]:
                diag_score = p["match"]
            else:
                diag_score = p["mismatch"]

            choices = [
                0,
                mat[i - 1, j - 1] + diag_score,
                mat[i - 1, j] + p["gap"],
                mat[i, j - 1] + p["gap"]
            ]
            max_idx = np.argmax(choices)
            mat[i, j] = choices[max_idx]
            pointers[i, j] = max_idx

    # Take the max and trackback.
    i, j = np.unravel_index(mat.argmax(), mat.shape)
    # If we did not finish at the bottom right, we need to start off the
    # alignment with the gaps.
    align1 = ""
    align2 = ""

    # Case 1, seq 1 ends with gaps.
    tail = collections.defaultdict(str)
    if j < (mat.shape[1] - 1):
        tail[2] += seq2[j:][::-1]

    # Case 2, seq 2 ends with gaps.
    if i < (mat.shape[0] - 1):
        tail[1] += seq1[i:][::-1]

    score = mat[i, j]
    while mat[i][j] != 0:
        op = pointers[i, j]
        if op == 1:
            align1 += seq1[i - 1]
            align2 += seq2[j - 1]
            i -= 1
            j -= 1
        elif op == 2:
            align1 += seq1[i - 1]
            align2 += "-"
            i -= 1
        elif op == 3:
            align1 += "-"
            align2 += seq2[j - 1]
            j -= 1

    # Case 3, seq 1 starts with gaps.
    head = collections.defaultdict(str)
    if j > 0:
        head[2] += seq2[:j][::-1]

    # Case 4, seq 2 starts with gaps.
    if i > 0:
        head[1] += seq1[:i][::-1]

    if tail:
        if tail.get(1):
            align1 = tail[1] + align1
            align2 = "-" * len(tail[1]) + align2
        if tail.get(2):
            align2 = tail[2] + align2
            align1 = "-" * len(tail[2]) + align1

    if head:
        if head.get(1):
            align1 += head[1]
            align2 += "-" * len(head[1])
        if head.get(2):
            align2 += head[2]
            align1 += "-" * len(head[2])

    align1 = align1[::-1]
    align2 = align2[::-1]

    if mode == SEQUENCES:
        return score, align1, align2

    if mode == ALIGNMENT:
        return score, _represent_alignment(align1, align2)


def _represent_alignment(s1, s2):
    """Represent two aligned sequences."""
    n = len(s1)
    if len(s2) != n:
        raise ValueError("Can't represent an alignment between strings of "
                         "different lengths.")

    alignment = ""
    for i in xrange(n):
        assert not (s1[i] == "-" == s2[i]), ("Gap in both sequences at "
                                             "position {}.".format(i))
        if s1[i] == s2[i]:
            # Match.
            alignment += "M"

        elif s1[i] == "-":
            # Deletion.
            alignment += "D"

        elif s2[i] == "-":
            # Insertion.
            alignment += "I"

        elif s1[i] != "-" and s2[i] != "-" and s1[i] != s2[i]:
            # Mismatch.
            alignment += "X"

    return alignment
