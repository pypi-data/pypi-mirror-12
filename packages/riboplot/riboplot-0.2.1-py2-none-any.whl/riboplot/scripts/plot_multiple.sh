#!/bin/bash
RIBO_FILE='tests/data/5hRPFsorted.bam'
RNA_FILE='tests/data/5hmRNAsorted.bam'
TRANSCRIPTOME_FASTA='tests/data/zebrafish.fna'

COUNT=1
while read line
do 
    riboplot -b $RIBO_FILE -n $RNA_FILE -f $TRANSCRIPTOME_FASTA -t "$line" -o output
    if [ -f output/riboplot.png ]
    then
        mv output/riboplot.png output/riboplot$COUNT.png
        ((COUNT+=1))
    fi
done < transcripts.txt

