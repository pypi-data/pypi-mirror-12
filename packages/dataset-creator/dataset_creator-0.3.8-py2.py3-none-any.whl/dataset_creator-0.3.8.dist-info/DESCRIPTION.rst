.. image:: https://rawgit.com/carlosp420/dataset-creator/master/media/logo.svg
    :width: 240px
    :align: center
    :alt: Dataset-creator

=========================================
Dataset creator for phylogenetic software
=========================================

.. list-table::
    :stub-columns: 1

    * - tests
      - | |travis| |requires| |coveralls|
        | |quantified-code|
    * - package
      - |version| |wheel| |supported-versions| |supported-implementations|

.. |travis| image:: https://travis-ci.org/carlosp420/dataset-creator.svg?branch=master
    :alt: Travis-CI Build Status
    :target: https://travis-ci.org/carlosp420/dataset-creator

.. |requires| image:: https://requires.io/github/carlosp420/dataset-creator/requirements.svg?branch=master
    :alt: Requirements Status
    :target: https://requires.io/github/carlosp420/dataset-creator/requirements/?branch=master

.. |coveralls| image:: https://coveralls.io/repos/carlosp420/dataset-creator/badge.svg?branch=master&service=github
    :alt: Coverage Status
    :target: https://coveralls.io/r/carlosp420/dataset-creator

.. |version| image:: https://img.shields.io/pypi/v/dataset-creator.svg?style=flat
    :alt: PyPI Package latest release
    :target: https://pypi.python.org/pypi/dataset-creator

.. |wheel| image:: https://img.shields.io/pypi/wheel/dataset-creator.svg?style=flat
    :alt: PyPI Wheel
    :target: https://pypi.python.org/pypi/dataset-creator

.. |supported-versions| image:: https://img.shields.io/pypi/pyversions/dataset-creator.svg?style=flat
    :alt: Supported versions
    :target: https://pypi.python.org/pypi/dataset-creator

.. |supported-implementations| image:: https://img.shields.io/pypi/implementation/dataset-creator.svg?style=flat
    :alt: Supported implementations
    :target: https://pypi.python.org/pypi/dataset-creator

.. |quantified-code| image:: https://www.quantifiedcode.com/api/v1/project/f059ab475f2547758722b80ea528c457/badge.svg
  :target: https://www.quantifiedcode.com/app/project/f059ab475f2547758722b80ea528c457
  :alt: Code issues

Takes SeqRecordExpanded objects and creates datasets for phylogenetic software

* Free software: BSD license

Installation
============

::

    pip install dataset_creator

Usage
=====
The list of SeqRecordExpanded objects should be sorted by gene_code first then
by voucher_code.

.. code-block:: python

    >>> from seqrecord_expanded import SeqRecord
    >>> from dataset_creator import Dataset
    >>>
    >>> # `table` is the Translation Table code based on NCBI
    >>> seq_record1 = SeqRecord('ACTACCTA', reading_frame=2, gene_code='RpS5',
    ...                         table=1, voucher_code='CP100-10',
    ...                         taxonomy={'genus': 'Aus', 'species': 'bus'})
    >>>
    >>> seq_record2 = SeqRecord('ACTACCTA', reading_frame=2, gene_code='RpS5',
    ...                         table=1, voucher_code='CP100-10',
    ...                         taxonomy={'genus': 'Aus', 'species': 'bus'})
    >>>
    >>> seq_record3 = SeqRecord('ACTACCTA', reading_frame=2, gene_code='wingless',
    ...                         table=1, voucher_code='CP100-10',
    ...                         taxonomy={'genus': 'Aus', 'species': 'bus'})
    >>>
    >>> seq_record4 = SeqRecord('ACTACCTA', reading_frame=2, gene_code='winglesss',
    ...                         table=1, voucher_code='CP100-10',
    ...                         taxonomy={'genus': 'Aus', 'species': 'bus'})
    >>>
    >>> seq_records = [
    ...    seq_record1, seq_record2, seq_record3, seq_record4,
    ... ]
    >>> # codon positions can be 1st, 2nd, 3rd, 1st-2nd, ALL (default)
    >>> dataset = Dataset(seq_records, format='NEXUS', partitioning='by gene',
    ...                   codon_positions='1st',
    ...                   )
    >>> print(dataset.dataset_str)
    """#NEXUS
    blah blah
    """



Development
===========

To run the all tests run::

    tox

Changelog
=========

0.3.8 (2015-10-30)
------------------
* Fixed making dataset as aminoacid seqs for MEGA format.
* Fixed making dataset as degenerated seqs for MEGA format.
* Fixed making dataset as degenerated seqs for TNT format.
* Fixed making dataset as aa seqs with specified outgroup for TNT format.
* Raise ValueError when asked to degenerate seqs that will go to partitioning
  based on codon positions.
* Dataset creator returns warnings if translated sequences have stop codons '*'.
* Cannot generate MEGA datasets with partitioning.

0.3.7 (2015-10-30)
------------------
* Fixed 2nd, 3rd codon positions bug that returned empty FASTA datasets.

0.3.6 (2015-10-30)
------------------
* Fixed 3rd codon positions bug that returned FASTA datasets with 3rd codon
  positions even if they were not needed.

0.3.5 (2015-10-29)
------------------
* If user provides outgroup, then TNT datasets will place its sequences in first
  position in the dataset blocks.

0.3.4 (2015-10-02)
------------------
* Fixed bug that did not show DATATYPE=PROTEIN in Nexus files when aminoacid
  sequences were requested by user.

0.3.3 (2015-10-02)
------------------
* Fixed bug that raised an exception when SeqExpandedRecords did not have data
  in the ``taxonomy`` field.

0.3.2 (2015-10-01)
------------------
* Fixed bug that raised an exception when user wanted partitioned dataset as
  1st-2nd and 3rd codon positions of only one codon.

0.3.1 (2015-10-01)
------------------
* Fixed bug that raised an exception when user wanted partitioned dataset by
  codon positions of only one codon.

0.3.0 (2015-10-01)
------------------
* Accepts voucher code as string that will be used to generate the outgroup
  string needed for NEXUS and TNT files.

0.2.0 (2015-09-30)
------------------
* Creates datasets as degenerated sequences using the method by Zwick et al.

0.1.1 (2015-09-30)
------------------

* It will issue errors if reading frames are not specified unless they
  are strictly necessary to build the dataset (datasets need to be divided by
  codon positions).
* Added documentation using sphinx-doc
* Creates datasets as aminoacid sequences.

0.1.0 (2015-09-23)
------------------

* Creates Nexus, Tnt, Fasta, Phylip and Mega dataset formats.

0.0.1 (2015-06-10)
------------------

* First release on PyPI.


