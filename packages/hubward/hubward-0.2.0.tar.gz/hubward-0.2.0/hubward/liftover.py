"""
Module for converting genomic coordinates from one version of an assembly to
another
"""
import utils
import subprocess
import os
import shutil
import pybedtools


def download_chainfile(source_assembly, target_assembly):
    """
    Download if needed, putting in the cache_dir.

    If the environmental variable HUBWARD_CACHE_DIR does not exist, then use
    ~/.hubward_cache
    """
    cache_dir = os.environ.get(
        'HUBWARD_CACHE_DIR', os.path.expanduser('~/.hubward_cache'))
    utils.makedirs(cache_dir)
    url = chainfile_url(source_assembly, target_assembly)
    dest = os.path.join(cache_dir, os.path.basename(url))
    utils.download(url, dest)
    return dest


def chainfile_url(source_assembly, target_assembly):
    return ("http://hgdownload.cse.ucsc.edu/"
            "goldenPath/{0}/liftOver/{0}To{1}.over.chain.gz".format(
                source_assembly, target_assembly.title()))


def _liftover_bigwig(source_assembly, target_assembly, infile, outfile):
    chainfile = download_chainfile(source_assembly, target_assembly)
    cmds = [
        'CrossMap.py',
        'bigwig',
        chainfile,
        infile,
        outfile]
    p = subprocess.check_call(cmds)
    shutil.move(outfile + '.bw', outfile)
    return outfile


def _liftover_bigbed(source_assembly, target_assembly, infile, outfile):
    chainfile = download_chainfile(source_assembly, target_assembly)
    cmds = [
        'bigBedToBed',
        infile,
        outfile + '.bed']
    p = subprocess.check_call(cmds)

    cmds = [
        'CrossMap.py',
        'bed',
        chainfile,
        outfile + '.bed',
        outfile + '.converted']
    p = subprocess.check_call(cmds)

    tmp = pybedtools.BedTool(outfile + '.converted').sort()

    utils.bigbed(tmp.fn, target_assembly, outfile)
    return outfile


def liftover(from_, to_, infile, outfile, filetype):
    if filetype.lower() == 'bigwig':
        return _liftover_bigwig(from_, to_, infile, outfile)
    if filetype.lower() == 'bigbed':
        return _liftover_bigbed(from_, to_, infile, outfile)
