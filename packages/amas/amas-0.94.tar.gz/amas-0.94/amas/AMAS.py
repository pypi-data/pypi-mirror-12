#! /usr/bin/env python3

#   Program to calculate various statistics on a multiple sequence alignment
#   and allow efficient manipulation of phylogenomic data sets

#   Copyright (C) 2015 Marek Borowiec

#   This program is free software: you can redistribute it and/or modify
#   it under the terms of the GNU General Public License as published by
#   the Free Software Foundation, either version 3 of the License, or
#   (at your option) any later version.
  
#   This program is distributed in the hope that it will be useful,
#   but WITHOUT ANY WARRANTY; without even the implied warranty of
#   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#   GNU General Public License for more details.

#   You should have received a copy of the GNU General Public License
#   along with this program.  If not, see <http://www.gnu.org/licenses/>.

"""
This stand-alone program allows manipulations of multiple sequence
alignments. It supports sequential FASTA, PHYLIP, NEXUS, and interleaved PHYLIP 
and NEXUS formats for DNA and aino acid sequences. It can print summary statistics,
convert among formats, and concatenate alignments.

Current statistics include the number of taxa, alignment length, total number
of matrix cells, overall number of undetermined characters, percent of missing 
data, AT and GC contents (for DNA alignments), number and proportion of 
variable sites, number and proportion of parsimony informative sites,
and counts of all characters present in the relevant (nucleotide or amino acid) alphabet.
"""


import argparse, re, sys
from random import sample
from os import path
from collections import defaultdict

class ParsedArgs:

    def __init__(self):
        parser = argparse.ArgumentParser(
            usage='''AMAS <command> [<args>]

The AMAS commands are:
  concat      Concatenate input alignments
  convert     Convert to other file format
  replicate   Create replicate data sets for phylogenetic jackknife
  split       Split alignment according to a partitions file
  summary     Write alignment summary

Use AMAS <command> -h for help with arguments of the command of interest
'''
        )

        parser.add_argument(
            "command", 
            help="Subcommand to run"
        )

        # parse_args defaults to [1:] for args, but you need to
        # exclude the rest of the args too, or validation will fail
        self.args = parser.parse_args(sys.argv[1:2])
        if not hasattr(self, self.args.command):
            print('Unrecognized command')
            parser.print_help()
            exit(1)
        # use dispatch pattern to invoke method with same name
        getattr(self, self.args.command)()

    # define required arguments for every command
    def add_common_args(self, parser):

        requiredNamed = parser.add_argument_group('required arguments')
        parser.add_argument(
            "-e",
            "--check-align",
            dest = "check_align",
            action = "store_true",
            default = False,
            help = "Check if input sequences are aligned. Default: no check"
        )
        
        requiredNamed.add_argument(
            "-i",
            "--in-files",
            nargs = "+",
            type = str,
            dest = "in_files",
            required = True,
            help = """Alignment files to be taken as input.
            You can specify multiple files using wildcards (e.g. --in-files *fasta)"""
        )
        requiredNamed.add_argument(
            "-f",
            "--in-format",
            dest = "in_format",
            required = True,
            choices = ["fasta", "phylip", "nexus", "phylip-int", "nexus-int"],
            help = "The format of input alignment"
        )
        requiredNamed.add_argument(
            "-d",
            "--data-type",
            dest = "data_type",
            required = True,
            choices = ["aa", "dna"],
            help = "Type of data"
        )

    # summary command
    def summary(self):
        parser = argparse.ArgumentParser(
            description="Write alignment summary",
        )

        parser.add_argument(
            "-o",
            "--summary-out",
            dest = "summary_out",
            default = "summary.txt",
            help = "File name for the alignment summary. Default: 'summary.txt'"
        )
        # add shared arguments
        self.add_common_args(parser)
        args = parser.parse_args(sys.argv[2:])
        return args

    # concat command
    def concat(self):
        parser = argparse.ArgumentParser(
            description="Concatenate input alignments"
        )
        parser.add_argument(
            "-p",
            "--concat-part",
            dest = "concat_part",
            default = "partitions.txt",
            help = "File name for the concatenated alignment partitions. Default: 'partitions.txt'"
        ) 
        parser.add_argument(
            "-t",
            "--concat-out",
            dest = "concat_out",
            default = "concatenated.out",
            help = "File name for the concatenated alignment. Default: 'concatenated.out'"
        )
        parser.add_argument(
            "-u",
            "--out-format",
            dest = "out_format",
            choices = ["fasta", "phylip", "nexus", "phylip-int", "nexus-int"],
            default = "fasta",
            help = "File format for the output alignment. Default: fasta"
        ) 
        # add shared arguments
        self.add_common_args(parser)
        args = parser.parse_args(sys.argv[2:])
        return args

    # convert command
    def convert(self):
        parser = argparse.ArgumentParser(
            description="Convert to other file format",
        )
        parser.add_argument(
            "-u",
            "--out-format",
            dest = "out_format",
            choices = ["fasta", "phylip", "nexus", "phylip-int", "nexus-int"],
            default = "fasta",
            help = "File format for the output alignment. Default: fasta"
        )
        # add shared arguments
        self.add_common_args(parser)
        args = parser.parse_args(sys.argv[2:])
        return args

    # replicate command
    def replicate(self):
        parser = argparse.ArgumentParser(
            description="Create replicate datasets for phylogenetic jackknife",
        )
        parser.add_argument(
            "-r",
            "--rep-aln",
            nargs = 2,
            type = int,
            dest = "replicate_args",
            help = "Create replicate data sets for phylogenetic jackknife [replicates, no alignments for each replicate]",
            required = True
        ) 
        parser.add_argument(
            "-u",
            "--out-format",
            dest = "out_format",
            choices = ["fasta", "phylip", "nexus", "phylip-int", "nexus-int"],
            default = "fasta",
            help = "File format for the output alignment. Default: fasta"
        ) 
        # add shared arguments
        self.add_common_args(parser)
        args = parser.parse_args(sys.argv[2:])
        return args

    # split command
    def split(self):
        parser = argparse.ArgumentParser(
            description="Split alignment according to a partitions file",
        )
        parser.add_argument(
            "-l",
            "--split-file",
            dest = "split_file",
            help = "File name for partitions to be used for alignment splitting.",
            required = True
        )
        parser.add_argument(
            "-u",
            "--out-format",
            dest = "out_format",
            choices = ["fasta", "phylip", "nexus", "phylip-int", "nexus-int"],
            default = "fasta",
            help = "File format for the output alignment. Default: fasta"
        ) 
        # add shared arguments
        self.add_common_args(parser)
        args = parser.parse_args(sys.argv[2:])
        return args

    def get_args_dict(self):

        command = self.args.__dict__
        arguments = getattr(self, self.args.command)().__dict__
        argument_dictionary = command.copy()
        argument_dictionary.update(arguments)
        
        return argument_dictionary
    

class FileHandler:
    """Define file handle that closes when out of scope"""

    def __init__(self, file_name):
        self.file_name = file_name

    def __enter__(self):
        try:
            self.in_file = open(self.file_name, "r")
        except FileNotFoundError:
            print("ERROR: File '" + self.file_name + "' not found.")
            sys.exit()
        return self.in_file

    def __exit__(self, *args):
        self.in_file.close()
    
    def get_file_name(self):
        return self.file_name
        
class FileParser:
    """Parse file contents and return sequences and sequence names"""
    
    def __init__(self, in_file):
        self.in_file = in_file
        with FileHandler(in_file) as handle:
            self.in_file_lines = handle.read().rstrip("\r\n")    

    def fasta_parse(self):
    # use regex to parse names and sequences in sequential fasta files
        matches = re.finditer(
            r"^>(.*[^$])([^>]*)",
            self.in_file_lines, re.MULTILINE
        )

        records = {}
 
        for match in matches:
            name_match = match.group(1).replace("\n","")
            seq_match = match.group(2).replace("\n","").upper()
            seq_match = self.translate_ambiguous(seq_match)
            records[name_match] = seq_match

        return records
    
    def phylip_parse(self):
    # use regex to parse names and sequences in sequential phylip files
        matches = re.finditer(
            r"^(\s+)?(\S+)\s+([A-Za-z*?.{}-]+)",
            self.in_file_lines, re.MULTILINE
        )

        records = {}

        for match in matches:
            name_match = match.group(2).replace("\n","")
            seq_match = match.group(3).replace("\n","").upper()
            seq_match = self.translate_ambiguous(seq_match)
            records[name_match] = seq_match

        return records    

    def phylip_interleaved_parse(self):
    # use regex to parse names and sequences in interleaved phylip files
        name_matches = re.finditer(
            r"^(\s+)?(\S+)[ \t]+[A-Za-z*?.{}-]+",
            self.in_file_lines, re.MULTILINE
        )
        seq_matches = re.finditer(
            r"(^(\s+)?\S+[ \t]+|^)([A-Za-z*?.{}-]+)$",
            self.in_file_lines, re.MULTILINE
        )
        # initiate lists for taxa names and sequence strings on separate lines
        taxa = []
        sequences = []
        # initiate a dictionary for the name:sequence records
        records = {}
        # initiate a counter to keep track of sequences strung together
        # from separate lines
        counter = 0
        
        for match in name_matches:
            name_match = match.group(2).replace("\n","")
            taxa.append(name_match)

        for match in seq_matches:
            seq_match = match.group(3).replace("\n","").upper()
            seq_match = self.translate_ambiguous(seq_match)
            sequences.append(seq_match)

        for taxon_no in range(len(taxa)):
            sequence = ""

            for index in range(counter,len(sequences),len(taxa)):
                sequence += sequences[index] 
           
            records[taxa[taxon_no]] = sequence
            counter += 1 

        return records

        
    def nexus_parse(self):
    # use regex to parse names and sequences in sequential nexus files
    # find the matrix block
        matches = re.finditer(
            r"(\s+)?(MATRIX\n|matrix\n|MATRIX\r\n|matrix\r\n)(.*?;)",
            self.in_file_lines, re.DOTALL
        )
        
        records = {}
        # get names and sequences from the matrix block

        for match in matches:
            matrix_match = match.group(3)
            seq_matches = re.finditer(
                 r"^(\s+)?[']?(\S+\s\S+|\S+)[']?\s+([A-Za-z*?.{}-]+)($|\s+\[[0-9]+\]$)",
                 matrix_match, re.MULTILINE
             )

            for match in seq_matches:
                name_match = match.group(2).replace("\n","")
                seq_match = match.group(3).replace("\n","").upper()
                seq_match = self.translate_ambiguous(seq_match)
                records[name_match] = seq_match

        return records
        
    def nexus_interleaved_parse(self):
    # use regex to parse names and sequences in sequential nexus files
    # find the matrix block
        matches = re.finditer(
            r"(\s+)?(MATRIX\n|matrix\n|MATRIX\r\n|matrix\r\n)(.*?;)",
            self.in_file_lines, re.DOTALL
        )
        # initiate lists for taxa names and sequence strings on separate lines
        taxa = []
        sequences = []
        # initiate a dictionary for the name:sequence records
        records = {}
        # initiate a counter to keep track of sequences strung together
        # from separate lines
        counter = 0

        for match in matches:
            matrix_match = match.group(3)
            # get names and sequences from the matrix block
            seq_matches = re.finditer(
                r"^(\s+)?[']?(\S+\s\S+|\S+)[']?\s+([A-Za-z*?.{}-]+)($|\s+\[[0-9]+\]$)",
                matrix_match, re.MULTILINE
            )

            for match in seq_matches:
                name_match = match.group(2).replace("\n","")
                if name_match not in taxa:
                    taxa.append(name_match)
                seq_match = match.group(3).replace("\n","").upper()
                seq_match = self.translate_ambiguous(seq_match)
                sequences.append(seq_match)

        for taxon_no in range(len(taxa)):

            full_length_sequence = ""
            for index in range(counter,len(sequences),len(taxa)):
                full_length_sequence += sequences[index]
            
            counter += 1 
            records[taxa[taxon_no]] = full_length_sequence

        return records

    def translate_ambiguous(self, seq):
    # translate ambiguous characters from curly bracket format
    # to single letter format 
        seq = seq.replace("{GT}","K")
        seq = seq.replace("{AC}","M")
        seq = seq.replace("{AG}","R")
        seq = seq.replace("{CT}","Y")
        seq = seq.replace("{CG}","S")
        seq = seq.replace("{AT}","W")
        seq = seq.replace("{CGT}","B")
        seq = seq.replace("{ACG}","V")
        seq = seq.replace("{ACT}","H")
        seq = seq.replace("{AGT}","D")
        seq = seq.replace("{GATC}","N")
        return seq

    def partitions_parse(self):
        # parse partitions file using regex
        matches = re.finditer(r"^(\s+)?([^ =]+)[ =]+([\\0-9, -]+)", self.in_file_lines, re.MULTILINE)
        
        # initiate list to store dictionaries with lists
        # of slice positions as values
        partitions = []
        
        for match in matches:
            # initiate dictionary of partition name as key
            dict_of_dicts = {}
            # and list of dictionaries with slice positions
            list_of_dicts = []
            # get parition name and numbers from parsed partiion strings
            partition_name = match.group(2)
            numbers = match.group(3)
        
            positions = re.findall(r"([^ ,]+)", numbers)
        
            for position in positions:
                # create dictionary for slicing input sequence
                # conditioning on whether positions are represented
                # by range, range with stride, or single number
                pos_dict = {}
        
                if "-" in position:
                    m = re.search(r"([0-9]+)-([0-9]+)", position)
                    pos_dict["start"] = int(m.group(1)) - 1
                    pos_dict["stop"] = int(m.group(2))
                else:
                    pos_dict["start"] = int(position) - 1
                    pos_dict["stop"] = int(position)
        
                if "\\" in position:
                    pos_dict["stride"] = 3
                elif "\\" not in position:
                    pos_dict["stride"] = 1
        
                list_of_dicts.append(pos_dict)
                
            dict_of_dicts[partition_name] = list_of_dicts
 
            partitions.append(dict_of_dicts)

        return partitions

 
class Alignment:
    """Gets in parsed sequences as input and summarizes their stats"""
    
    def __init__(self, in_file, in_format, data_type):
    
    # initialize alignment class with parsed records and alignment name as arguments,
    # create empty lists for list of sequences, sites without
    # ambiguous or missing characters, and initialize variable for the number
    # of parsimony informative sites

        self.in_file = in_file
        self.in_format = in_format
        self.data_type = data_type

        self.parsed_aln = self.get_parsed_aln()
        
    def __str__(self):
        return self.get_name

    def get_aln_input(self):
        # open and parse input file
        aln_input = FileParser(self.in_file)
        return aln_input

    def get_parsed_aln(self):
    # parse according to the given format
        aln_input = self.get_aln_input()
        if self.in_format == "fasta":
            parsed_aln = aln_input.fasta_parse()
        elif self.in_format == "phylip":
            parsed_aln = aln_input.phylip_parse()
        elif self.in_format == "phylip-int":
            parsed_aln = aln_input.phylip_interleaved_parse()
        elif self.in_format == "nexus":
            parsed_aln = aln_input.nexus_parse()
        elif self.in_format == "nexus-int":
            parsed_aln = aln_input.nexus_interleaved_parse()

        return parsed_aln
        
    def summarize_alignment(self):
    # call methods to create sequences list, matrix, sites without ambiguous or
    # missing characters; get and summarize alignment statistics
        summary = []
        self.list_of_seqs = self.seq_grabber()
        self.matrix = self.matrix_creator()
        self.no_missing_ambiguous = self.get_sites_no_missing_ambiguous()
        self.variable_sites = self.get_variable()
        self.prop_variable = self.get_prop_variable()
        self.parsimony_informative = self.get_parsimony_informative()
        self.prop_parsimony = self.get_prop_parsimony()
        name = str(self.get_name())
        taxa_no = str(self.get_taxa_no())
        length = str(self.get_alignment_length())
        cells = str(self.get_matrix_cells())
        missing = str(self.get_missing())
        missing_percent = str(self.get_missing_percent())
        self.check_data_type()
        summary = [name, taxa_no, length, cells, missing, missing_percent, \
         str(self.variable_sites), str(self.prop_variable), str(self.parsimony_informative), str(self.prop_parsimony)]
        return summary

    def get_char_summary(self):
    # get summary of frequencies for all characters
        characters = []
        counts = []
        
        for item in self.get_counts():
            for char, count in item.items():
                characters.append(str(char))
                counts.append(str(count))
        return characters, counts
     
    def seq_grabber(self):
    # create a list of sequences from parsed dictionary of names and seqs 
        list_of_seqs = [seq for name, seq in self.parsed_aln.items()]
        return list_of_seqs

               
    def matrix_creator(self):
    # decompose character matrix into a two-dimensional list
        matrix = [list(sequence) for sequence in self.list_of_seqs]
        return matrix

    def get_column(self, i):
    # get site from the character matrix
        return [row[i] for row in self.matrix]
        
    def all_same(self, site):
    # check if all elements of a site are the same
        return all(base == site[0] for base in site)
        
    def get_sites_no_missing_ambiguous(self):
    # get each site without missing or ambiguous characters
        no_missing_ambiguous_sites = []  
        for column in range(self.get_alignment_length()):
            site = self.get_column(column)
            site = [char for char in site if char not in self.missing_ambiguous_chars]
            no_missing_ambiguous_sites.append(site)
        return no_missing_ambiguous_sites
        
    def get_variable(self):
    # if all elements of a site without missing or ambiguous characters 
    # are not the same, consider it variable
        variable = len([site for site in self.no_missing_ambiguous \
         if not self.all_same(site)])      
        return variable
    
    def get_parsimony_informative(self):
    # if the count for a unique character in a site is at least two, 
    # and there are at least two such characters in a site without missing
    # or ambiguous characters, consider it parsimony informative
        parsimony_informative = 0
        for site in self.no_missing_ambiguous:
            unique_chars = set(site)
            
            pattern = [base for base in unique_chars if site.count(base) >= 2]
            no_patterns = len(pattern)
            
            if no_patterns >= 2:
                parsimony_informative += 1
        return parsimony_informative
    
    def get_prop_variable(self):
    # get proportion of variable sites to all sites
        prop_variable = self.variable_sites / len(self.list_of_seqs[0])
        return round(prop_variable, 3)
        
    def get_prop_parsimony(self):
    # get proportion of parsimony informative sites to all sites
        prop_parsimony = self.parsimony_informative / len(self.list_of_seqs[0])
        return round(prop_parsimony, 3)

    def get_name(self):
        in_filename = path.basename(self.in_file)
        return in_filename
        
    def get_taxa_no(self):
        return len(self.list_of_seqs)
    
    def get_alignment_length(self):
        return len(self.list_of_seqs[0])

    def get_matrix_cells(self):
        self.all_matrix_cells = len(self.list_of_seqs) \
         * len(self.list_of_seqs[0])
        return self.all_matrix_cells

    def get_missing_percent(self):
        missing_percent = round((self.missing / self.all_matrix_cells * 100), 3)
        return missing_percent
        
    def get_missing(self):
        self.missing = sum(sum(seq.count(char) for seq in self.list_of_seqs) \
         for char in self.missing_chars)
        return self.missing
    
    def get_counts(self):
    # get counts of each character in the used alphabet
        counts = []
        
        for char in self.alphabet:
            count = sum(seq.count(char) for seq in self.list_of_seqs)
            counts.append({char : count})
        return counts

    def check_data_type(self):
    # check if the data type is correct
        self.check = any(any(char in self.non_alphabet for char in seq) \
         for seq in self.list_of_seqs)
        if self.check is True:
            print("WARNING: found non-" + self.data_type + " characters. "\
             "Are you sure you specified the right data type?")


class AminoAcidAlignment(Alignment):
    """Alphabets specific to amino acid alignments"""

    alphabet = ["A","C","D","E","F","G","H","I","K","L","M","N","P","Q","R", \
     "S","T","V","W","Y","B","J","Z","X",".","*","-","?"]
    missing_ambiguous_chars = ["B","J","Z","X",".","*","-","?"]
    missing_chars = ["X",".","*","-","?"]
    non_alphabet = ["O"]

    def get_summary(self):
        data = self.summarize_alignment()
        new_data = data + list(self.get_char_summary()[1])
        
        return new_data

           
class DNAAlignment(Alignment):
    """Alphabets specific to DNA alignments"""
    
    alphabet = ["A","C","G","T","K","M","R","Y","S","W","B","V","H","D","X", \
     "N", "O", "-","?"]
    missing_ambiguous_chars = ["K","M","R","Y","S","W","B","V","H","D","X", \
     "N", "O", "-","?"] 
    missing_chars = ["X","N","O","-","?"]
    non_alphabet = ["E", "F", "I", "L", "P", "Q", "J", "Z", ".", "*"]    

    def get_summary(self):
        data = self.summarize_alignment()
        
        new_data = data + self.get_atgc_content() \
         + list(self.get_char_summary()[1])
        
        return new_data
        
    def get_atgc_content(self):
    # get AC and GC contents
        atgc_content = []
        
        at_count = sum((seq.count("A") + seq.count("T") + seq.count("W")) \
         for seq in self.list_of_seqs)
        gc_count = sum((seq.count("G") + seq.count("C") + seq.count("S")) \
         for seq in self.list_of_seqs)
        
        at_content = str(round(at_count / (at_count + gc_count), 3))
        gc_content = str(round(1 - float(at_content), 3))
        
        atgc_content.extend((at_content, gc_content))
        return atgc_content

class MetaAlignment():
    """Class of multiple sequence alignments"""
 
    def __init__(self, **kwargs):

        # set defaults and get values from kwargs
        self.in_files = kwargs.get("in_files")
        self.in_format = kwargs.get("in_format")
        self.data_type = kwargs.get("data_type")
        self.command = kwargs.get("command")
        self.concat_out = kwargs.get("concat_out", "concatenated.out")
        self.check_align = kwargs.get("check_align", False)
     
        if self.command == "replicate":
            self.no_replicates = kwargs.get("replicate_args")[0]
            self.no_loci = kwargs.get("replicate_args")[1]

        if self.command == "split":
            self.split = kwargs.get("split_file")
       
        self.alignment_objects = self.get_alignment_objects()
        self.parsed_alignments = self.get_parsed_alignments()           

    def get_partitions(self, partitions_file):
        
        partitions = FileParser(partitions_file)
        parsed_partitions = partitions.partitions_parse()
        
        return parsed_partitions

    def get_alignment_objects(self):
        # get alignment objects on which statistics can be computed
        alignments = []
        for alignment in self.in_files:
            # parse according to the given alphabet
            if self.data_type == "aa":
                aln = AminoAcidAlignment(alignment, self.in_format, self.data_type)
            elif self.data_type == "dna":
                aln = DNAAlignment(alignment, self.in_format, self.data_type)
            alignments.append(aln)
        return alignments

    def get_parsed_alignments(self):
        # get parsed dictionaries with taxa and sequences
        parsed_alignments = []
        for alignment in self.alignment_objects:
            parsed = alignment.parsed_aln
            parsed_alignments.append(parsed)
        # checking if every seq has the same length or if parsed is not empty; exit if false
            if self.check_align == True:
                equal = all(x == [len(list(parsed.values())[i]) for i in range(0,len(list(parsed.values())))][0] 
                 for x in [len(list(parsed.values())[i]) for i in range(0,len(list(parsed.values())))])
                if equal is False:
                    print("ERROR: Sequences in input are of varying lengths. Be sure to align them first.")
                    sys.exit()
            empty = len(list(parsed.keys()))
            if empty == 0:
                print("ERROR: Parsed sequences are empty. "\
                 "Are you sure you specified the right input format and/or that all input files are valid alignments?")
                sys.exit()
 
        return parsed_alignments

    def get_partitioned(self, partitions_file):

        partitions = self.get_partitions(partitions_file)

        alignment = self.parsed_alignments[0]

        # initiate list of newly partitioned alignments 
        list_of_parts = []
        
        for partition in partitions:
            # loop over all parsed partitions, adding taxa and sliced sequences
            for name, elements in partition.items():
        
                new_dict = {}
         
                for taxon, seq in alignment.items():
         
                    new_seq = ""
         
                    for dictionary in elements:
        
                        new_seq = new_seq + seq[dictionary["start"]:dictionary["stop"]:dictionary["stride"]]
                        new_dict[taxon] = new_seq
            # add partition name : dict of taxa and sequences to the list
            list_of_parts.append({name : new_dict})
    
        return list_of_parts

    def get_summaries(self):
        # get summaries for all alignment objects

        # define different headers for aa and dna alignments
        aa_header = [
            "Alignment_name",
            "No_of_taxa",
            "Alignment_length",
            "Total_matrix_cells",
            "Undetermined_characters",
            "Missing_percent",
            "No_variable_sites",
            "Proportion_variable_sites",
            "Parsimony_informative_sites",
            "Proportion_parsimony_informative"
        ]

        dna_header = [
            "Alignment_name",
            "No_of_taxa",
            "Alignment_length",
            "Total_matrix_cells",
            "Undetermined_characters",
            "Missing_percent",
            "No_variable_sites",
            "Proportion_variable_sites",
            "Parsimony_informative_sites",
            "Proportion_parsimony_informative",
            "AT_content",
            "GC_content"
        ]

        alignments = self.alignment_objects
        parsed_alignments = self.parsed_alignments
        freq_header = [char for char in alignments[0].alphabet]
        
        if self.data_type == "aa":
            header = aa_header + freq_header
        elif self.data_type == "dna":
            header = dna_header + freq_header
 
        summaries = [alignment.get_summary() for alignment in alignments]            
        return header, summaries


    def write_summaries(self, file_name):
        # write summaries to file

        if path.exists(file_name):
            print("WARNING: You are overwriting '" + file_name + "'")

        summary_file = open(file_name, "w")
        summary_out = self.get_summaries()
        header = '\t'.join(summary_out[0])
        new_summ = ['\t'.join(summary) for summary in summary_out[1]]
        summary_file.write(header + '\n')
        summary_file.write('\n'.join(new_summ))
        summary_file.close()
        print("Wrote summaries to file '" + file_name + "'") 
       
    def get_replicate(self, no_replicates, no_loci):
        # construct replicate data sets for phylogenetic jackknife
        replicates = []
        counter = 1
        for replicate in range(no_replicates):
            
            try:
                random_alignments = sample(self.parsed_alignments, no_loci)
            except ValueError:
                print("ERROR: You specified more loci per replicate than there are in your input.")
                sys.exit()

            random_alignments = sample(self.parsed_alignments, no_loci)
            concat_replicate = self.get_concatenated(random_alignments)[0]
            replicates.append(concat_replicate)
            counter += 1
        
        return replicates 

    def get_concatenated(self, alignments):

        # create empty dictionary of lists
        concatenated = defaultdict(list)

        # first create list of taxa in all alignments
        # you need this to insert empty seqs in
        # the concatenated alignment
        all_taxa = []

        for alignment in alignments:
            for taxon in alignment.keys():
                if taxon not in all_taxa:
                    all_taxa.append(taxon)

        # start counters to keep track of partitions
        partition_counter = 1
        position_counter = 1
        # get dict for alignment name and partition
        partitions = {}

        for alignment in alignments:        
            
            # get alignment length from a random taxon
            partition_length = len(alignment[list(alignment.keys())[0]])
            # get base name of each alignment for use when writing partitions file
            # NOTE: the base name here is whatever comes before fist perion in the file name
            alignment_name = self.alignment_objects[partition_counter - 1].get_name().split('.')[0]
            # add a prefix to the partition names
            partition_name = "p" + str(partition_counter) + "_" + alignment_name
            
            start = position_counter
            position_counter += partition_length
            end = position_counter - 1
            partitions[partition_name] = str(start) + "-" + str(end)
            partition_counter += 1
            
            # get empty sequence if there is missing taxon
            # getting length from first element of list of keys
            # created from the original dict for this alignment
            empty_seq = '?' * partition_length

            for taxon in all_taxa:

                if taxon not in alignment.keys():
                    concatenated[taxon].append(empty_seq)
                else:
                    concatenated[taxon].append(alignment[taxon])
 
        concatenated = {taxon:''.join(seqs) for taxon, seqs in concatenated.items()}
        
        return concatenated, partitions

    def print_fasta(self, source_dict):
        # print fasta-formatted string from a dictionary
        
        fasta_string = ""
        # each sequence line will have 80 characters 
        n = 80
        
        for taxon, seq in sorted(source_dict.items()):
            # split dictionary values to a list of string, each n chars long
            seq = [seq[i:i+n] for i in range(0, len(seq), n)]
            # in case there are unwanted spaces in taxon names
            taxon = taxon.replace(" ","_").strip("'")
            fasta_string += ">" + taxon + "\n"
            for element in seq:
                fasta_string += element + "\n"

        return fasta_string

    def print_phylip(self, source_dict):
        # print phylip-formatted string from a dictionary

        taxa_list = list(source_dict.keys())
        no_taxa = len(taxa_list)
        # figure out the max length of a taxon for nice padding of sequences
        pad_longest_name = len(max(taxa_list, key=len)) + 3
        # get sequence length from a random value
        seq_length = len(next(iter(source_dict.values())))
        header = str(len(source_dict)) + " " + str(seq_length)
        phylip_string = header + "\n"
        for taxon, seq in sorted(source_dict.items()):
            taxon = taxon.replace(" ","_").strip("'")
            # left-justify taxon names relative to sequences
            phylip_string += taxon.ljust(pad_longest_name, ' ') + seq + "\n"
 
        return phylip_string

    def print_phylip_int(self, source_dict):
        # print phylip interleaved-formatted string from a dictionary
        
        taxa_list = list(source_dict.keys())
        no_taxa = len(taxa_list)
        pad_longest_name = len(max(taxa_list, key=len)) + 3
        seq_length = len(next(iter(source_dict.values())))
        header = str(len(source_dict)) + " " + str(seq_length)
        phylip_int_string = header + "\n\n"
        seq = []
        
        # each sequence line will have 500 characters
        n = 500
        
        for taxon, seq in sorted(source_dict.items()):
            seq = [seq[i:i+n] for i in range(0, len(seq), n)]
            taxon = taxon.replace(" ","_").strip("'")
            phylip_int_string += taxon.ljust(pad_longest_name, ' ') + seq[0] + "\n"
        phylip_int_string += "\n"

        for element in range(len(seq[1:])):
            for taxon, seq in sorted(source_dict.items()):
                seq = [seq[i:i+n] for i in range(0, len(seq), n)]
                phylip_int_string += seq[element + 1] + "\n"
            phylip_int_string += "\n"

        return phylip_int_string

    def print_nexus(self, source_dict):
        # print nexus-formatted string from a dictionary
        
        if self.data_type == "aa":
            data_type = "PROTEIN"
        elif self.data_type == "dna":
            data_type = "DNA"
        
        taxa_list = list(source_dict.keys())
        no_taxa = len(taxa_list)
        pad_longest_name = len(max(taxa_list, key=len)) + 3
        seq_length = len(next(iter(source_dict.values())))
        header = str(len(source_dict)) + " " + str(seq_length)
        nexus_string = "#NEXUS\n\nBEGIN DATA;\n\tDIMENSIONS  NTAX=" + str(no_taxa) +\
         " NCHAR=" + str(seq_length) + ";\n\tFORMAT DATATYPE=" + data_type +\
          "  GAP = - MISSING = ?;\n\tMATRIX\n"

        for taxon, seq in sorted(source_dict.items()):
            taxon = taxon.replace(" ","_").strip("'")
            nexus_string += "\t" + taxon.ljust(pad_longest_name, ' ') + seq + "\n"
        nexus_string += "\n;\n\nEND;"
        
        return nexus_string

    def print_nexus_int(self, source_dict):
        # print nexus interleaved-formatted string from a dictionary

        if self.data_type == "aa":
            data_type = "PROTEIN"
        elif self.data_type == "dna":
            data_type = "DNA"
        
        taxa_list = list(source_dict.keys())
        no_taxa = len(taxa_list)
        pad_longest_name = len(max(taxa_list, key=len)) + 3
        seq_length = len(next(iter(source_dict.values())))
        header = str(len(source_dict)) + " " + str(seq_length)
        # create empty list for seq fragments
        seq = []
        
        nexus_int_string = "#NEXUS\n\nBEGIN DATA;\n\tDIMENSIONS  NTAX=" +\
         str(no_taxa) + " NCHAR=" + str(seq_length) + ";\n\tFORMAT   INTERLEAVE" +\
          "   DATATYPE=" + data_type + "  GAP = - MISSING = ?;\n\tMATRIX\n"

        n = 500
        
        # first need to create list of seq strings chunks n characters-long
        for taxon, seq in sorted(source_dict.items()):
            seq = [seq[i:i+n] for i in range(0, len(seq), n)]
            taxon = taxon.replace(" ","_").strip("'")
            nexus_int_string += "\t" + taxon.ljust(pad_longest_name, ' ') + seq[0] + "\n"

        nexus_int_string += "\n"

        # now use the length of that initial seq list to loop over
        # for each taxon and sequence
        for element in range(len(seq[1:])):
            for taxon, seq in sorted(source_dict.items()):
                seq = [seq[i:i+n] for i in range(0, len(seq), n)]
                nexus_int_string += "\t" + taxon.ljust(pad_longest_name, ' ') +\
                 seq[element + 1] + "\n"
            nexus_int_string += "\n"

        nexus_int_string += "\n;\n\nEND;"
        
        return nexus_int_string

    def natural_sort(self, a_list):
        # create a function that does 'human sort' on a list
        convert = lambda text: int(text) if text.isdigit() else text.lower() 
        alphanum_key = lambda key: [convert(c) for c in re.split('([0-9]+)', key)] 
        return sorted(a_list, key = alphanum_key)

    def print_partitions(self):
        # print partitions for concatenated alignment
        part_string = ""
        part_dict = self.get_concatenated(self.parsed_alignments)[1]
        part_list = self.natural_sort(part_dict.keys())
        for key in part_list:
            part_string += key + "=" + str(part_dict[key]) + "\n"

        return part_string

    def write_partitions(self, file_name):
        # write partitions file for concatenated alignment

         if path.exists(file_name):
             print("WARNING: You are overwriting '" + file_name + "'")
            
         part_file = open(file_name, "w")
         part_file.write(self.print_partitions())
         print("Wrote partitions for the concatenated file to '" + file_name + "'")

    def write_out(self, action, file_format):
        # write other output files depending on action 
        if file_format == "phylip":
            extension = "-out.phy"
        elif file_format == "phylip-int":
            extension = "-out.int-phy"
        elif file_format == "fasta":
            extension = "-out.fas"
        elif file_format == "nexus":
            extension = "-out.nex"
        elif file_format == "nexus-int":
            extension = "-out.int-nex"

        if action == "concat":
            
            concatenated_alignment = self.get_concatenated(self.parsed_alignments)[0]
            file_name = self.concat_out

            if path.exists(file_name):
                print("WARNING: You are overwriting '" + file_name + "'")
           
            concatenated_file = open(file_name, "w")
            if file_format == "phylip":
                concatenated_file.write(self.print_phylip(concatenated_alignment))
            elif file_format == "fasta":
                concatenated_file.write(self.print_fasta(concatenated_alignment))
            elif file_format == "phylip-int":
                concatenated_file.write(self.print_phylip_int(concatenated_alignment))
            elif file_format == "nexus":
                concatenated_file.write(self.print_nexus(concatenated_alignment))
            elif file_format == "nexus-int":
                concatenated_file.write(self.print_nexus_int(concatenated_alignment))
            concatenated_file.close()
            print("Wrote concatenated sequences to " + file_format + " file '" + file_name + "'")

        elif action == "convert":
    
            # start a counter to keep track of files to be converted
            file_counter = 0
    
            for alignment in self.parsed_alignments:
                file_name = self.alignment_objects[file_counter].get_name() + extension

                if path.exists(file_name):
                    print("WARNING: You are overwriting '" + file_name + "'")
                
                converted_file = open(file_name, "w")
                if file_format == "phylip":
                    converted_file.write(self.print_phylip(alignment))
                elif file_format == "fasta":
                    converted_file.write(self.print_fasta(alignment))
                elif file_format == "phylip-int":
                    converted_file.write(self.print_phylip_int(alignment))
                elif file_format == "nexus":
                    converted_file.write(self.print_nexus(alignment))
                elif file_format == "nexus-int":
                    converted_file.write(self.print_nexus_int(alignment))
                converted_file.close()

                file_counter += 1
            
            print("Converted " + str(file_counter) + " files from " + self.in_format + " to " + file_format)

        elif action == "replicate":

            file_counter = 1

            for alignment in self.get_replicate(self.no_replicates, self.no_loci):
                file_name = "replicate" + str(file_counter) + "_" + str(self.no_loci) + "-loci" + extension

                if path.exists(file_name):
                    print("WARNING: You are overwriting '" + file_name + "'")
                
                replicate_file = open(file_name, "w")

                if file_format == "phylip":
                    replicate_file.write(self.print_phylip(alignment))
                elif file_format == "fasta":
                    replicate_file.write(self.print_fasta(alignment))
                elif file_format == "phylip-int":
                    replicate_file.write(self.print_phylip_int(alignment))
                elif file_format == "nexus":
                    replicate_file.write(self.print_nexus(alignment))
                elif file_format == "nexus-int":
                    replicate_file.write(self.print_nexus_int(alignment))
                replicate_file.close()

                file_counter += 1

            print("Constructed " + str(self.no_replicates) + " replicate data sets, each from " \
             + str(self.no_loci) + " alignments")

        elif action == "split":

            list_of_alignments = self.get_partitioned(self.split)
            file_counter = 0

            for item in list_of_alignments:
            # bad practice with the dicts; figure out better solution
                file_name = str(self.in_files[0].split('.')[0]) + "_" + list(item.keys())[0] + extension
                alignment = list(item.values())[0]

                if path.exists(file_name):
                    print("WARNING: You are overwriting '" + file_name + "'")
                
                from_partition_file = open(file_name, "w")

                if file_format == "phylip":
                    from_partition_file.write(self.print_phylip(alignment))
                elif file_format == "fasta":
                    from_partition_file.write(self.print_fasta(alignment))
                elif file_format == "phylip-int":
                    from_partition_file.write(self.print_phylip_int(alignment))
                elif file_format == "nexus":
                    from_partition_file.write(self.print_nexus(alignment))
                elif file_format == "nexus-int":
                    from_partition_file.write(self.print_nexus_int(alignment))
                from_partition_file.close()

                file_counter += 1

            print("Wrote " + str(file_counter) + " " + str(file_format) + " files from partitions provided")


def main():
    
    # initialize parsed arguments and meta alignment objects
    kwargs = run()
    meta_aln = MetaAlignment(**kwargs)
       
    if meta_aln.command == "summary":
        meta_aln.write_summaries(kwargs["summary_out"])
    if meta_aln.command == "convert":
        meta_aln.write_out("convert", kwargs["out_format"])
    if meta_aln.command == "concat":
        meta_aln.write_out("concat", kwargs["out_format"])
        meta_aln.write_partitions(kwargs["concat_part"])
    if meta_aln.command == "replicate":
        meta_aln.write_out("replicate", kwargs["out_format"])
    if meta_aln.command == "split":
        meta_aln.write_out("split", kwargs["out_format"])
  
def run():

    # initialize parsed arguments
    config = ParsedArgs()
    # get arguments
    config_dict = config.get_args_dict()
    return config_dict
    
if __name__ == '__main__':
        
        main()
