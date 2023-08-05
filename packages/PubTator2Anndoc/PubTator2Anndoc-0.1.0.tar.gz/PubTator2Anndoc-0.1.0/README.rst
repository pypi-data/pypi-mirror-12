PubTator2Anndoc
===============

Convert annotations in PubTator format to TagTog format.

PubTator Format
---------------

The PubTator format uses the following format:

.. code:: text

    <PMID>|t|<TITLE>
    <PMID>|a|<ABSTRACT>
    <PMID>  <START OFFSET 1>    <LAST OFFSET 1> <MENTION 1> <TYPE 1>    <IDENTIFIER 1>
    <PMID>  <START OFFSET 2>    <LAST OFFSET 2> <MENTION 2> <TYPE 2>    <IDENTIFIER 2>

    <PMID>|t|<TITLE>
    <PMID>|a|<ABSTRACT>
    <PMID>  <START OFFSET 1>    <LAST OFFSET 1> <MENTION 1> <TYPE 1>    <IDENTIFIER 1>
    <PMID>  <START OFFSET 2>    <LAST OFFSET 2> <MENTION 2> <TYPE 2>    <IDENTIFIER 2>

where:

-  The first line contains the title of the paper.
-  The second line contains the abstract of the paper.
-  The subsequent lines contain the annotations for the entities in a
   tab separated format:

   -  PMID
   -  Start Offset
   -  End Offset
   -  Mention (entity text)
   -  Type of Entity
   -  Identifier (normalized form)

For example,

.. code:: text

    20085714|t|Autosomal-dominant striatal degeneration is caused by a mutation in the phosphodiesterase 8B gene.
    20085714|a|Autosomal-dominant striatal degeneration is caused by a mutation in the phosphodiesterase 8B gene. Autosomal-dominant striatal degeneration (ADSD) is an autosomal-dominant movement disorder affecting the striatal part of the basal ganglia. ADSD is characterized by bradykinesia, dysarthria, and muscle rigidity. These symptoms resemble idiopathic Parkinson disease, but tremor is not present. Using genetic linkage analysis, we have mapped the causative genetic defect to a 3.25 megabase candidate region on chromosome 5q13.3-q14.1. A maximum LOD score of 4.1 (Theta = 0) was obtained at marker D5S1962. Here we show that ADSD is caused by a complex frameshift mutation (c.94G>C+c.95delT) in the phosphodiesterase 8B (PDE8B) gene, which results in a loss of enzymatic phosphodiesterase activity. We found that PDE8B is highly expressed in the brain, especially in the putamen, which is affected by ADSD. PDE8B degrades cyclic AMP, a second messenger implied in dopamine signaling. Dopamine is one of the main neurotransmitters involved in movement control and is deficient in Parkinson disease. We believe that the functional analysis of PDE8B will help to further elucidate the pathomechanism of ADSD as well as contribute to a better understanding of movement disorders.
    20085714    72  92  phosphodiesterase 8B    Gene    8622
    20085714    99  139 Autosomal-dominant striatal degeneration    Disease 609161
    20085714    671 678 c.94G>C Mutation    c|SUB|G|94|C
    20085714    679 687 c.95delT    Mutation    c|DEL|95|T
    20085714    696 716 phosphodiesterase 8B    Gene    8622
    20085714    981 989 Dopamine    Chemical    D004298

For more details about the PubTator format, visit this `link`_.

TagTog format - Anndoc
----------------------

| TagTog employs two files - one HTML (.html) file and one JSON
  (.ann.json) file to represent annotations.
| The HTML file is separated into parts - where each part has an ID.
| The JSON file has document specific annotations, followed by en

.. _link: http://www.ncbi.nlm.nih.gov/CBBresearch/Lu/Demo/PubTator/tutorial/index.html
