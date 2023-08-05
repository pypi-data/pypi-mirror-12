import glob
import os
import re

import requests
from Bio.Alphabet import IUPAC
from Bio.Seq import Seq
from Bio.SeqIO import SeqRecord
from Bio import SeqIO

from .utils import is_fasta


class PrimerDesigner:
    """Class for designing primers from FASTA files.

    It will send a FASTA alignment to `primers4clades`_ in order to design
    degenerate primers. Input data needed is an alignment in FASTA format
    containing at least 4 sequences.
    It is recommended that the beginning of each FASTA sequence description
    contains the taxon name between square brackets.

    Parameters:

        folder (str):                path of folder containing the FASTA file alignments
        taxon_for_codon_usage (str): optional taxon name that will be inserted in the
                                     description of FASTA sequences between square
                                     brackets so that can be used by primer4clades
                                     to infer the codon table to use
        tm (str):                    temperature
        min_amplength (str):         minimum amplicon length
        max_amplength (str):         maximum amplicon length
        gencode (str):               genetic code. See below for all available genetic
                                     codes
        clustype (str):              cluster distance metric: ``dna``, ``protein``.
        amptype (str):               substitution model used to estimate phylogenetic
                                     information
        email (str):                 your email address so that primer4clades can send
                                     you email with detailed results

    Example:

        >>> # The values shown are the default. Change them if needed.
        >>> from primer_designer import PrimerDesigner
        >>> pd = PrimerDesigner()
        >>> pd.folder = "alignments"   # folder containing the FASTA file alignments
        >>> pd.tm = "55"               # annealing temperature
        >>> pd.min_amplength = "250"   # minimum amplicon length
        >>> pd.max_amplength = "500"   # maximum amplicon length
        >>> pd.gencode = "universal"   # see below for all available genetic codes
        >>> pd.mode  = "primers"
        >>> pd.clustype = "dna"
        >>> pd.amptype = "dna_GTRG"    # substitution model used to estimate phylogenetic information
        >>> pd.email = "youremail@email.com"   # primer4clades will send you an email with very detailed results
        >>> pd.design_primers()
        >>>
        >>> # You can input a taxon name to include in the description of every
        >>> # FASTA sequence so that primer4clades can infer the correct codon
        >>> # table to apply to the analysis.
        >>> pd.taxon_for_codon_usage = "Bombyx mori"
        >>> pd.design_primers()

    The best primer pairs will be printed to your screen. Detailed results will
    be saved as HTML files in your alignments folder. But it is recommended if
    you also get the results by email. primers4clades_ will send you one email
    for each alignment.
    The genetic code table (variable ``gencode``) can be any of the following:

        * ``universal`` for standard
        * ``2`` for vertebrate mitochondrial
        * ``3`` for yeast mitochondrial
        * ``4`` for mold and protozoa mitochondrial
        * ``5`` for invertebrate mitochondrial
        * ``6`` for ciliate
        * ``9`` for echinoderm and flatworm
        * ``10`` for  euplotid nuclear
        * ``11`` for  bacterial and plastid
        * ``12`` for  alternative yeast nuclear
        * ``13`` for  ascidian mitochondrial
        * ``14`` for  flatworm mitochondrial
        * ``15`` for  Blepharisma nuclear
        * ``16`` for  Chlorophycean mitochondrial
        * ``21`` for  Trematode mitochondrial
        * ``22`` for  Scenedesmus obliquus mitochondrial
        * ``23`` for  Thraustochytrium mitochondrial

    The evolutionary substitution model can be any of the following (variable
    ``amptype``):

        * ``protein_WAGG``  for protein WAG+G
        * ``protein_JTTG``  for protein JTT+G
        * ``protein_Blosum62G``  for protein Blosum62+G
        * ``protein_VTG``  for protein VT+G
        * ``protein_DayhoffG``  for protein Dayhoff+G
        * ``protein_MtREVG``  for protein MtREV+G
        * ``dna_HKYG``  for dna HKY+G
        * ``dna_GTRG``  for dna GTR+G
        * ``dna_K80G``  for dna K80+G
        * ``dna_TrNG``  for dna TrN+G
        * ``dna_JC69G``  for dna JC69+G

    .. _primers4clades: http://floresta.eead.csic.es/primers4clades/#0
    """

    def __init__(self, folder=None, taxon_for_codon_usage=None, tm="55",
                 min_amplength="100", max_amplength="500", gencode="universal",
                 mode="primers", clustype="dna", amptype="dna_GTR", email=None):
        self.folder = folder
        self.taxon_for_codon_usage = taxon_for_codon_usage
        self.tm = tm
        self.min_amplength = min_amplength
        self.max_amplength = max_amplength
        self.gencode = gencode
        self.mode = mode
        self.clustype = clustype
        self.amptype = amptype
        self.email = email
        self.designed_primers = []

    def design_primers(self):
        if os.path.exists(self.folder):
            all_files = os.path.join(self.folder, "*")
            alns = glob.glob(all_files)

            if alns:
                for aln in alns:
                    if is_fasta(aln):

                        if self.taxon_for_codon_usage:
                            aln = self.insert_taxon_in_new_fasta_file(aln)

                        print("\nProcessing file \"{0}\"".format(aln))

                        r = self.request_primers(aln)
                        self.process_response(aln, r.text)

                # Write primers to alignment file
                SeqIO.write(self.designed_primers, "primers.fasta", "fasta")
                print("\nDone.\nAll primers have been saved in the file \"primers.fasta\"")
                return self.designed_primers
            else:
                print("\nError! the folder {0} is empty.\n".format(self.folder))
        else:
            print("\nError! the folder {0} does not exist.\n".format(self.folder))

    def insert_taxon_in_new_fasta_file(self, aln):
        """primer4clades infers the codon usage table from the taxon names in the
        sequences.

        These names need to be enclosed by square brackets and be
        present in the description of the FASTA sequence. The position is not
        important. I will insert the names in the description in a new FASTA
        file.

        Returns:
            Filename of modified FASTA file that includes the name of the taxon.
        """
        new_seq_records = []
        for seq_record in SeqIO.parse(aln, 'fasta'):
            new_seq_record_id = "[{0}] {1}".format(self.taxon_for_codon_usage, seq_record.id)
            new_seq_record = SeqRecord(seq_record.seq, id=new_seq_record_id)
            new_seq_records.append(new_seq_record)

        base_filename = os.path.splitext(aln)
        new_filename = '{0}_modified{1}'.format(base_filename[0], base_filename[1])
        SeqIO.write(new_seq_records, new_filename, "fasta")
        return new_filename

    def process_response(self, aln, response_body):
        this_file = os.path.split(aln)[1]
        this_file = re.sub(".fas.*", "", this_file)

        msg = 'Writing detailed results as file "{0}.html"'.format(aln)
        print(msg)

        with open("{0}.html".format(aln), "w") as handle:
            handle.write(response_body)

        # Show primer pair to user
        html_file = response_body.split("\n")
        i = 1
        while i < 4:
            for line in html_file:
                if "degen_corr" in line:
                    seq = line.split(" ")[0].strip()

                    description = line.split(" ")[2].strip()

                    this_id = this_file + "_" + line.split(" ")[1].strip()
                    this_id += "_" + str(i)

                    seq = Seq(seq, IUPAC.ambiguous_dna)
                    seq_record = SeqRecord(seq)
                    seq_record.id = this_id
                    seq_record.description = description
                    self.designed_primers.append(seq_record)
                i += 1

    def request_primers(self, aln):
        url = "http://floresta.eead.csic.es/primers4clades/primers4clades.cgi"
        params = {
            'tm': self.tm,
            'min_amplength': self.min_amplength,
            'max_amplength': self.max_amplength,
            'mode': self.mode,
            'gencode': self.gencode,
            'clustype': self.clustype,
            'email': self.email,
        }
        files = {'sequencefile': open(aln, 'rb')}
        r = requests.post(url, files=files, data=params)
        return r
