# Copyright (c) 2015 Florian Wagner
#
# This file is part of GOParser.
#
# GOParser is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License, Version 3,
# as published by the Free Software Foundation.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program. If not, see <http://www.gnu.org/licenses/>.

"""
GOParser: A parser for gene ontology (GO) data
"""

import csv
import gzip
import re
import sys
import logging
import bisect
import cPickle as pickle
from collections import Counter

from genometools import misc
from go_objects import GOTerm, GOAnnotation

def open_plain_or_gzip(fn):
    try:
        gzip.open(fn).next()
        return gzip.open(fn)
    except IOError:
        return open(fn)

class GOParser(object):
    """
    The main class that contains both a representation of the ontology and gene annotations.
    """

    short_ns = {'biological_process': 'BP', 'molecular_function': 'MF', 'cellular_component': 'CC'}
    def __init__(self,logger=None,quiet=False,verbose=False):
        self.terms = None
        self.term_annotations = None
        self.gene_annotations = None

        # create logger
        if logger is None:
            self.logger = misc.get_logger(None,logging.INFO)
        else:
            self.logger = logger.getChild('goparser')
    
        # set log level
        self.quiet = quiet
        self.verbose = verbose
        self.update_log_level()

        self.syn2id = {}
        self.alt_id = {}
        self.name2id = {}
        self.flattened = False

    def update_log_level(self):
        # call this after self.quiet or self.verbose has been chagned
        log_level = logging.INFO
        if self.quiet:
            log_level = logging.WARNING
        elif self.verbose:
            log_level = logging.DEBUG
        self.logger.setLevel(log_level)

    # logging convenience functions
    def debug(self,s,*args):
        self.logger.debug(s,*args)

    def info(self,s,*args):
        self.logger.info(s,*args)

    def warning(self,s,*args):
        self.logger.warning(s,*args)

    def error(self,s,*args):
        self.logger.error(s,*args)


    def get_id_from_acc(self,acc):
        return 'GO:%07' %(acc)

    def get_term_by_id(self,id_):
        return self.terms[id_]

    def get_term_by_acc(self,acc):
        return self.terms[self.get_id_from_acc(acc)]

    def get_term_by_name(self,name):
        term = None
        try:
            term = self.name2id[name]
        except KeyError:
            try:
                term = self.syn2id[name]
            except KeyError:
                pass

        if term is None:
            raise ValueError("Term name not found!")

        return term

    def clear_ontology_data(self):
        self.terms = {}
        self.alt_id = {}
        self.syn2id = {}
        self.name2id = {}
        self.flattened = False
        
    def parse_ontology(self,fn,flatten=True,part_of_cc_only=False):
        """ This function parses an .obo file. """

        # part_of_cc_only: use only for backwards compatability
        # requires file to end with a newline
        # overwrites all previously parsed data
        self.clear_ontology_data()

        fh = open(fn)
        n = 0
        while True:
            try:
                nextline = fh.next()
            except StopIteration:
                break
            if nextline == '[Term]\n':
                n+=1
                id_ = fh.next()[4:-1]
                #acc = get_acc(id_)
                name = fh.next()[6:-1]
                self.name2id[name] = id_
                namespace = fh.next()[11:-1]
                is_a = set()
                part_of = set()
                l = fh.next()
                while l != '\n':
                    if l.startswith('alt_id:'): self.alt_id[l[8:-1]] = id_
                    elif l.startswith('is_a:'): is_a.add(l[6:16])
                    elif l.startswith('synonym:'):
                        idx = l[10:].index('"')
                        if l[(10+idx+2):].startswith("EXACT"):
                            s = l[10:(10+idx)]
                            self.syn2id[s] = id_
                    #elif namespace == 'cellular_component' and l.startswith('relationship: part_of'): part_of.add(l[22:32])
                    elif l.startswith('relationship: part_of'):
                        if part_of_cc_only:
                            if namespace == 'cellular_component':
                                part_of.add(l[22:32])
                        else:
                            part_of.add(l[22:32])
                    l = fh.next()
                self.terms[id_] = GOTerm(id_,name,namespace,is_a,part_of)

        self.info('Parsed %d GO term definitions.', n)

        # store children and parts
        self.info('Adding child and part relationships...')
        for id_,term in self.terms.iteritems():
            for parent in term.is_a:
                self.terms[parent].children.add(id_)
            for whole in term.part_of:
                self.terms[whole].parts.add(id_)

        if flatten:
            self.flatten()

    def flatten(self):
        self.info('Flattening ancestors...')
        self.flatten_ancestors()
        self.info('Flattening descendants...')
        self.flatten_descendants()
        self.flattened = True

    def flatten_ancestors(self,include_part_of=True):

        def get_all_ancestors(term):
            ancestors = set()
            for id_ in term.is_a:
                ancestors.add(id_)
                ancestors.update(get_all_ancestors(self.terms[id_]))
            if include_part_of:
                for id_ in term.part_of:
                    ancestors.add(id_)
                    ancestors.update(get_all_ancestors(self.terms[id_]))
            return ancestors

        for term in self.terms.itervalues():
            term.ancestors = get_all_ancestors(term)

    def flatten_descendants(self,include_parts=True):

        def get_all_descendants(term):
            descendants = set()
            for id_ in term.children:
                descendants.add(id_)
                descendants.update(get_all_descendants(self.terms[id_]))
            if include_parts:
                for id_ in term.parts:
                    descendants.add(id_)
                    descendants.update(get_all_descendants(self.terms[id_]))
            return descendants

        for term in self.terms.itervalues():
            term.descendants = get_all_descendants(term)

    def save(self,ofn,compress=False):
        store = self
        self.info('Saving pickle...')
        if compress:
            with gzip.open(ofn,'wb') as ofh:
                pickle.dump(store,ofh,pickle.HIGHEST_PROTOCOL)
        else:
            with open(ofn,'wb') as ofh:
                pickle.dump(store,ofh,pickle.HIGHEST_PROTOCOL)

    def clear_annotation_data(self):
        self.genes = set()
        self.annotations = []
        self.term_annotations = {}
        self.gene_annotations = {}

    def parse_annotations(self,annotation_file,gene_file,db_sel='UniProtKB',\
            select_evidence=[],exclude_evidence=[],exclude_ref=[],strip_species=False,ignore_case=False):
        """ This function parses an annotation file. """

        if not self.terms:
            raise ValueError("You need to parse an ontology first (OBO file)!")

        # always overwrite all previously parsed annotations
        self.clear_annotation_data()

        # read genes
        genes = set()
        genes_upper = {}
        with open(gene_file) as fh:
            reader = csv.reader(fh,dialect='excel-tab')
            for l in reader:
                genes.add(l[0])
                if ignore_case:
                    genes_upper[l[0].upper()] = l[0]
        self.genes = genes # store the list of genes for later use
        self.info('Read %d genes.', len(genes))

        # read annotations
        self.term_annotations = dict((id_,[]) for id_ in self.terms)
        self.gene_annotations = dict((g,[]) for g in self.genes)
        gene_terms = dict((g,set()) for g in self.genes) # only used for statistics

        isoform_pattern = re.compile(r"UniProtKB:([A-Z][0-9A-Z]{5}-\d+)")
        gene_pattern = re.compile(r"[a-zA-Z0-9]+\.\d+$")
        pmid_pattern = re.compile(r"(?:PMID:\d+|DOI:[^\s]+)")
        uniprot_pattern = re.compile(r"UniProtKB:([A-Z][0-9A-Z]{5}(?:-\d+)?)")

        unknown_gene_names = Counter()
        unknown_gene_annotations = 0

        unknown_term_ids = Counter()
        unknown_term_annotations = 0

        # Parsing!
        self.info('Parsing annotations...')
        n = 0
        excluded_evidence_annotations = 0
        excluded_reference_annotations = 0
        valid_annotations = 0
        with open_plain_or_gzip(annotation_file) if annotation_file != '-' else sys.stdin as fh:
            reader = csv.reader(fh,dialect='excel-tab')
            for i,l in enumerate(reader):
                target = None

                if not l: continue
                if ((not db_sel) or l[0] == db_sel) and l[3] != 'NOT':
                    n+=1

                    # test if evidence code is excluded
                    if (select_evidence and l[6] not in select_evidence) or l[6] in exclude_evidence:
                        excluded_evidence_annotations += 1
                        continue

                    # test if reference is excluded
                    db_ref = []
                    if l[5]:
                        db_ref = l[5].split('|')
                        if len(db_ref) == 1 and db_ref[0] in exclude_ref:
                            excluded_reference_annotations += 1
                            continue
                            

                    # determine target
                    if not l[2]: raise Exception('Missing target gene in line %d:\n%s' %(i+1, '\t'.join(l)))

                    gene = l[2]
                    db = l[0]
                    db_id = l[1]
                    if strip_species:
                        try:
                            gene = gene[:gene.rindex('_')]
                        except ValueError as e:
                            pass

                    term_id = l[4]
                    evidence = l[6]

                    invalid = False

                    if (ignore_case and gene.upper() not in genes_upper) or ((not ignore_case) and gene not in self.genes):
                        unknown_gene_annotations += 1
                        unknown_gene_names[l[2]] += 1
                        invalid = True

                    if term_id not in self.terms:
                        unknown_term_annotations += 1
                        unknown_term_ids[term_id] += 1
                        invalid = True

                    if not invalid:
                
                        valid_annotations += 1

                        # if ignore_case, convert gene to "original" name
                        if ignore_case:
                            gene = genes_upper[gene.upper()]

                        term = self.terms[term_id]

                        # parse secondary information (associated UniProt and PubMed entries)
                        #pmid = pmid_pattern.search(l[5])
                        #if pmid is not None: pmid = pmid.group(0)
                        #uniprot = uniprot_pattern.search(l[7])
                        #if uniprot is not None: uniprot = uniprot.group(1)
                        with_ = []
                        if l[7]:
                            with_ = l[7].split('|')

                        # generate annotation
                        ann = GOAnnotation(target=gene,term=term,evidence=evidence,db_id=db_id,db_ref=db_ref,with_=with_)

                        # add annotation to global list
                        self.annotations.append(ann)

                        # add annotation under term ID
                        self.term_annotations[term_id].append(ann)

                        # add annotation under gene
                        self.gene_annotations[gene].append(ann)
                        gene_terms[gene].add(term_id)

        # output some statistics
        if n > 0:
            self.info('Parsed %d positive GO annotations (%d = %.1f%% excluded based on evidence type).', \
                    n,excluded_evidence_annotations,100*(excluded_evidence_annotations/float(n)))
        if unknown_gene_annotations > 0:
            self.warning('Warning: %d annotations with %d unkonwn gene names.', \
                    unknown_gene_annotations,len(unknown_gene_names))
        if unknown_term_annotations > 0:
            self.warning('Warning: %d annotations with %d unkonwn term IDs.',\
                    unknown_term_annotations,len(unknown_term_ids))
        self.info('Found a total of %d valid annotations.', valid_annotations)
        self.info('%d unique Gene-Term associations.', sum(len(gene_terms[g]) for g in genes))

    def get_annotations(self):
        return self.annotations

    def get_gene_goterms(self,gene,ancestors=False):
        # get all GO terms a gene is annotated with (including their ancestors, if requested)
        # (if a gene is annotated with a GO term, it can also be considered annotated with all ancestors of that GO term)
        annotations = self.gene_annotations[gene]
        terms = set(ann.term for ann in annotations)

        if ancestors:
            assert self.flattened
            ancestor_terms = set()
            for t in terms:
                ancestor_terms.update(self.terms[id_] for id_ in t.ancestors)
            terms |= ancestor_terms

        return terms

    def get_goterm_genes(self,id_,descendants=True,verbose=False):
        # get all genes annotated with a GO term (include genes annotated with a descendant GO term, if requested)

        # determine which terms to include
        main_term = self.terms[id_]
        check_terms = set([main_term])

        if descendants:
            assert self.flattened
            check_terms.update([self.terms[id_] for id_ in main_term.descendants])

        # get annotations of all included terms
        genes = set()
        for term in check_terms:
            genes.update(ann.target for ann in self.term_annotations[term.id])

        return genes
