__author__ = 'AniaF'


import os
import django

# set the DJANGO_SETTINGS_MODULE environment variable to "mips.settings"
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mips.settings")

# setup
django.setup()

# import proper classes to play with
# from mips.models import Mip, Subspecies, SampleSubspecies, Samples, Paralog, Instance
from mips.models import Mip, SampleSubspecies, Samples, Paralog, Instance



# example data
reference_name="c132510_g1_i1"
reference_list = ["c132510_g1_i1","c150407_g1_i1","c150408_g1_i1","c107721_g1_i1","c129997_g1_i1", "c129907_g1_i1","c130723_g1_i1"]
mip_list = ["177","178","179","180"]
sample_list = ["1737","1738","1739","1740","1741","1742","1743"]






# How many mips are in a particular reference transcript?
#print Mip.objects.filter(reference_id=reference_name).count()


# For a reference select and print all mips and their sequences
def select_mips_for_reference(reference):

    for mip in Mip.objects.filter(reference_id=reference):
        print mip, mip.mip_sequence

#select_mips_for_reference(reference_name)




# For a list of references, check if they have a mip, how many, and how many mapping mips there are

def check_mips_for_reference_list(lista):

    for ref in lista:
        if Mip.objects.filter(reference_id=ref).exists():
            mapping_mips = [mip.mip_func_mapping for mip in Mip.objects.filter(reference_id=ref)].count(True)
            print ref, Mip.objects.filter(reference_id=ref).count(), mapping_mips
        else:
            print ref, 'no mip'

#check_mips_for_reference_list(reference_list)




# For a list of references, print mips they have (mip_id), and their function

def mips_for_reference_list(lista):

    for ref in lista:
        for mip in Mip.objects.filter(reference_id=ref):
            print ref, mip.mip_id, ['immuno' if mip.mip_func_immuno else '-'][0], ['mapping' if mip.mip_func_mapping else '-'][0], \
                ['random' if mip.mip_func_random else '-'][0], ['utr' if mip.mip_func_utr else '-'][0]

#mips_for_reference_list(reference_list)



# For a list of references check if there are mips, for which individuals they were sequenced and their performance

def samples_for_mips(lista):

    for ref in lista:
        for mip in Mip.objects.filter(reference_id=ref):
            for sample in Samples.objects.filter(mip_fk=mip):
                print ref, mip, sample.sample_fk, sample.mip_performance

#samples_for_mips(reference_list)



# For a list of references, print all mips and count in how many samples they were sequenced

def count_samples_for_mips(lista):

    for ref in lista:
        for mip in Mip.objects.filter(reference_id=ref):
            samp = Samples.objects.filter(mip_fk=mip).count()
            print ref, mip, samp

#count_samples_for_mips(reference_list)




# For a list of mips check in which subspecies they are paralogs

def mips_with_paralogs(lista):

    for mip in lista:
        for subsp in Paralog.objects.filter(mip_fk=mip):
            print mip, subsp.subspecies_fk, subsp.mip_subspecies_paralog

#mips_with_paralogs(mip_list)



# Print all mips that are paralogs and in which subspecies

def all_mips_paralogs():

    for para in Paralog.objects.filter(mip_subspecies_paralog="paralog"):
        print para.mip_fk, para.subspecies_fk, para.mip_subspecies_paralog

#all_mips_paralogs()



# Find all mips for montandoni

def all_mips_for_species():

    for montandoni_samples in SampleSubspecies.objects.filter(subspecies_fk="montandoni"):
        for mip in Samples.objects.filter(sample_fk=montandoni_samples.sample_id):
            print mip.mip_fk, mip.sample_fk


#all_mips_for_species()



# For a list of samples find all mips and their reference 

def mips_for_samples(lista):

    for indiv in lista:
        for samps in Samples.objects.filter(sample_fk=indiv):
            print samps.sample_fk, samps.mip_fk, samps.mip_fk.reference_id

#mips_for_samples(sample_list)



# For all mips in montandoni, print only mapping mips

def func_mips_for_montandoni():

    for montandoni_samples in SampleSubspecies.objects.filter(subspecies_fk="montandoni"):
        for Sample_mip in Samples.objects.filter(sample_fk=montandoni_samples.sample_id):
            if Sample_mip.mip_fk.mip_func_mapping is True:
                print Sample_mip.mip_fk.mip_id

#func_mips_for_montandoni()




# Select one random mapping mip for a list of references

import random

def random_mip_for_reference(lista):

    for ref in lista:
        if Mip.objects.filter(reference_id=ref, mip_func_mapping=True).exists():

            ref_mips = list(Mip.objects.filter(reference_id=ref, mip_func_mapping=True))
            one_mip = random.sample(ref_mips, 1)[0]
            print one_mip.reference_id, one_mip.mip_id


#random_mip_for_reference(reference_list)




# Read in one column (txt file) and convert it into a list

def read_column(txt_file):
    fh = open(txt_file,'r')
    linie = fh.readlines()
    K = [ele.split()[0] for ele in linie]
    print K

#read_column("example_list.txt")




# For a list of mips print producer and production date

def instance_for_mip(lista):

    for mip in lista:
        for mip_inst in Instance.objects.filter(mip_fk=mip):
            print mip_inst.mip_fk, mip_inst.mip_production_data, mip_inst.mip_producer

#instance_for_mip(mip_list)




# For a list of mips print producer and production date and write it to a file

wh = open('output.tab','w')
def instance_for_mip_and_write(lista):

    for mip in lista:
        for mip_inst in Instance.objects.filter(mip_fk=mip):
            output = str(mip_inst.mip_fk) +'\t'+ str(mip_inst.mip_production_data) +'\t'+ str(mip_inst.mip_producer)+'\n'
            wh.write(output)

instance_for_mip_and_write(mip_list)

wh.flush()
wh.close()







