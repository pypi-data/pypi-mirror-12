===============
Primer designer
===============

.. list-table::
    :stub-columns: 1

    * - tests
      - | |travis| |requires| |coveralls|
        | |quantified_code|
    * - package
      - |version| |wheel| |supported_versions| |supported_implementations|

.. |travis| image:: https://travis-ci.org/carlosp420/primer-designer.svg?branch=master
    :alt: Travis-CI Build Status
    :target: https://travis-ci.org/carlosp420/primer-designer

.. |requires| image:: https://requires.io/github/carlosp420/primer-designer/requirements.svg?branch=master
    :alt: Requirements Status
    :target: https://requires.io/github/carlosp420/primer-designer/requirements/?branch=master

.. |coveralls| image:: https://coveralls.io/repos/carlosp420/primer-designer/badge.svg?branch=master&service=github
    :alt: Coverage Status
    :target: https://coveralls.io/r/carlosp420/primer-designer

.. |version| image:: https://img.shields.io/pypi/v/primer_designer.svg?style=flat
    :alt: PyPI Package latest release
    :target: https://pypi.python.org/pypi/primer_designer

.. |quantified_code| image:: https://www.quantifiedcode.com/api/v1/project/23f9326bf0484aebb952f2d821969436/badge.svg
    :target: https://www.quantifiedcode.com/app/project/23f9326bf0484aebb952f2d821969436
    :alt: Code issues

.. |wheel| image:: https://img.shields.io/pypi/wheel/primer_designer.svg?style=flat
    :alt: PyPI Wheel
    :target: https://pypi.python.org/pypi/primer_designer

.. |supported_versions| image:: https://img.shields.io/pypi/pyversions/primer_designer.svg?style=flat
    :alt: Supported versions
    :target: https://pypi.python.org/pypi/primer_designer

.. |supported_implementations| image:: https://img.shields.io/pypi/implementation/primer_designer.svg?style=flat
    :alt: Supported implementations
    :target: https://pypi.python.org/pypi/primer_designer

Designs primers from a FASTA file using primers4clades website

* Free software: BSD license

Installation
============

::

    pip install primer_designer

Usage
=====
It will send a FASTA alignment to `primers4clades`_ in order to design
degenerate primers. Input data needed is an alignment in FASTA format
containing at least 4 sequences.
It is recommended that the beginning of each FASTA sequence description
contains the taxon name between square brackets.

Parameters:

* folder (str):         path of folder containing the FASTA file alignments
* tm (str):             temperature
* min_amplength (str):  minimum amplicon length
* max_amplength (str):  maximum amplicon length
* gencode (str):        genetic code. See below for all available genetic codes
* clustype (str):       cluster distance metric: ``dna``, ``protein``.
* amptype (str):        substitution model used to estimate phylogenetic information
* email (str):          your email address so that primer4clades can send you email with detailed results

Example:

.. code-block:: python

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

The evolutionary substitution model can be any of the following (variable ``amptype``):

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

Documentation
=============

https://primer-designer.readthedocs.org/

Development
===========

To run the all tests run::

    tox
