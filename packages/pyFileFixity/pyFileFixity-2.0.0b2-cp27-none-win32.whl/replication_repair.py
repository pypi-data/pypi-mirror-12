#!/usr/bin/env python
#
# Replication repair
# Copyright (C) 2015 Larroque Stephen
#
# Licensed under the MIT License (MIT)
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#
#=================================
#                   Replication repair
#                by Stephen Larroque
#                      License: MIT
#              Creation date: 2015-11-11
#=================================
#

from _infos import __version__

# Include the lib folder in the python import path (so that packaged modules can be easily called, such as gooey which always call its submodules via gooey parent module)
import sys, os
thispathname = os.path.dirname(sys.argv[0])
sys.path.append(os.path.join(thispathname, 'lib'))

# Import necessary libraries
from lib.aux_funcs import *
import lib.argparse as argparse
import datetime, time
import lib.tqdm as tqdm
import itertools
import math
#import operator # to get the max out of a dict
import csv # to process the database file from rfigc.py
import shlex # for string parsing as argv argument to main(), unnecessary otherwise
from lib.tee import Tee # Redirect print output to the terminal as well as in a log file
#import pprint # Unnecessary, used only for debugging purposes



#***********************************
#     AUXILIARY FUNCTIONS
#***********************************






#***********************************
#        GUI AUX FUNCTIONS
#***********************************

# Try to import Gooey for GUI display, but manage exception so that we replace the Gooey decorator by a dummy function that will just return the main function as-is, thus keeping the compatibility with command-line usage
try:  # pragma: no cover
    import lib.gooey as gooey
except ImportError as exc:
    # Define a dummy replacement function for Gooey to stay compatible with command-line usage
    class gooey(object):  # pragma: no cover
        def Gooey(func):
            return func
    # If --gui was specified, then there's a problem
    if len(sys.argv) > 1 and sys.argv[1] == '--gui':  # pragma: no cover
        print('ERROR: --gui specified but an error happened with lib/gooey, cannot load the GUI (however you can still use this script in commandline). Check that lib/gooey exists and that you have wxpython installed. Here is the error: ')
        raise(exc)

def conditional_decorator(flag, dec):  # pragma: no cover
    def decorate(fn):
        if flag:
            return dec(fn)
        else:
            return fn
    return decorate

def check_gui_arg():  # pragma: no cover
    '''Check that the --gui argument was passed, and if true, we remove the --gui option and replace by --gui_launched so that Gooey does not loop infinitely'''
    if len(sys.argv) > 1 and sys.argv[1] == '--gui':
        # DEPRECATED since Gooey automatically supply a --ignore-gooey argument when calling back the script for processing
        #sys.argv[1] = '--gui_launched' # CRITICAL: need to remove/replace the --gui argument, else it will stay in memory and when Gooey will call the script again, it will be stuck in an infinite loop calling back and forth between this script and Gooey. Thus, we need to remove this argument, but we also need to be aware that Gooey was called so that we can call gooey.GooeyParser() instead of argparse.ArgumentParser() (for better fields management like checkboxes for boolean arguments). To solve both issues, we replace the argument --gui by another internal argument --gui_launched.
        return True
    else:
        return False

def AutoGooey(fn):  # pragma: no cover
    '''Automatically show a Gooey GUI if --gui is passed as the first argument, else it will just run the function as normal'''
    if check_gui_arg():
        return gooey.Gooey(fn)
    else:
        return fn



#***********************************
#                       MAIN
#***********************************

#@conditional_decorator(check_gui_arg(), gooey.Gooey) # alternative to AutoGooey which also correctly works
@AutoGooey
def main(argv=None):
    if argv is None: # if argv is empty, fetch from the commandline
        argv = sys.argv[1:]
    elif isinstance(argv, basestring): # else if argv is supplied but it's a simple string, we need to parse it to a list of arguments before handing to argparse or any other argument parser
        argv = shlex.split(argv) # Parse string just like argv using shlex

    #==== COMMANDLINE PARSER ====

    #== Commandline description
    desc = '''Replication Repair
Description: Given a set of directories (or files), try to repair your files by scanning each byte, cast a majority vote among all copies, and then output the winning byte. This process is usually called triple-modular redundancy (but here it should be called n-modular redundancy since you can use as many copies as you have).
It is recommended for long term storage to store several copies of your files on different storage mediums. Everything's fine until all your copies are partially corrupted. In this case, this script can help you, by taking advantage of your multiple copies, without requiring a pregenerated ecc file. Just specify the path to every copies, and the script will try to recover them.
This script can also take advantage of a database generated by rfigc.py to make sure that the recovered files are correct.
    '''
    ep = '''Use --gui as the first argument to use with a GUI (via Gooey).
'''

    #== Commandline arguments
    #-- Constructing the parser
    # Use GooeyParser if we want the GUI because it will provide better widgets
    if len(argv) > 0 and (argv[0] == '--gui' and not '--ignore-gooey' in argv):  # pragma: no cover
        # Initialize the Gooey parser
        main_parser = gooey.GooeyParser(add_help=True, description=desc, epilog=ep, formatter_class=argparse.RawTextHelpFormatter)
        # Define Gooey widget types explicitly (because type auto-detection doesn't work quite well)
        widget_dir = {"widget": "DirChooser"}
        widget_filesave = {"widget": "FileSaver"}
        widget_file = {"widget": "FileChooser"}
        widget_text = {"widget": "TextField"}
        widget_multidir = {"widget": "MultiDirChooser"}
    else: # Else in command-line usage, use the standard argparse
        # Delete the special argument to avoid unrecognized argument error in argparse
        if '--ignore-gooey' in argv[0]: argv.remove('--ignore-gooey') # this argument is automatically fed by Gooey when the user clicks on Start
        # Initialize the normal argparse parser
        main_parser = argparse.ArgumentParser(add_help=True, description=desc, epilog=ep, formatter_class=argparse.RawTextHelpFormatter)
        # Define dummy dict to keep compatibile with command-line usage
        widget_dir = {}
        widget_filesave = {}
        widget_file = {}
        widget_text = {}

    # Required arguments
    main_parser.add_argument('-i', '--input', metavar='/path/to/copy1/ /path/to/copy2/ etc.', type=is_dir_or_file, nargs='+', required=True,
                        help='Specify the paths to every copies you have (minimum 3 copies, else it won\'t work!). Can be folders or files (if you want to repair only one file). Order matters: in case of ambiguity, the first folder where the file exists will be chosen.', **widget_multidir)
    main_parser.add_argument('-o', '--output', metavar='/ouput/folder/', type=is_dir, nargs=1, required=True, #type=argparse.FileType('rt')
                        help='Where the recovered files will be stored.', **widget_dir)

    # Optional general arguments
    main_parser.add_argument('-d', '--database', metavar='database.csv', type=is_file, required=False,
                        help='Path to a previously generated rfigc.py database. If provided, this will be used to check that the repaired files are correct (and also to find already correct files in copies).', **widget_file)
    main_parser.add_argument('-r', '--report', metavar='/some/folder/report.csv', type=str, required=False,
                        help='Save all results of the repair process in a report file, with detailed descriptions of ambiguous repairs (ie, when majority vote came to a draw).', **widget_filesave)
    main_parser.add_argument('-l', '--log', metavar='/some/folder/filename.log', type=str, nargs=1, required=False,
                        help='Path to the log file. (Output will be piped to both the stdout and the log file)', **widget_filesave)
    main_parser.add_argument('-f', '--force', action='store_true', required=False, default=False,
                        help='Force overwriting the output folder even if it already exists.')
    main_parser.add_argument('-v', '--verbose', action='store_true', required=False, default=False,
                        help='Verbose mode (show more output).')
    main_parser.add_argument('--silent', action='store_true', required=False, default=False,
                        help='No console output (but if --log specified, the log will still be saved in the specified file).')

    #== Parsing the arguments
    args = main_parser.parse_args(argv) # Storing all arguments to args

    #-- Set variables from arguments
    inputpaths = [fullpath(x) for x in args.input] # path to the files to repair (ie, paths to all the different copies the user has)

    # TODO FROM HERE
    rootfolderpath = inputpaths # path to the root folder (to compute relative paths)
    database = fullpath(args.database[0])
    generate = args.generate
    correct = args.correct
    force = args.force
    stats_only = args.stats_only
    max_block_size = args.max_block_size
    header_size = args.size
    resilience_rate = args.resilience_rate
    resilience_rate_intra = args.resilience_rate_intra
    replication_rate = args.replication_rate
    enable_erasures = args.enable_erasures
    only_erasures = args.only_erasures
    erasure_symbol = args.erasure_symbol
    ignore_size = args.ignore_size
    skip_missing = args.skip_missing
    skip_size_below = args.skip_size_below
    always_include_ext = args.always_include_ext
    if always_include_ext: always_include_ext = tuple(['.'+ext for ext in always_include_ext.split('|')]) # prepare a tuple of extensions (prepending with a dot) so that str.endswith() works (it doesn't with a list, only a tuple)
    hash_algo = args.hash
    if not hash_algo: hash_algo = "md5"
    ecc_algo = args.ecc_algo
    fast_check = not args.no_fast_check
    verbose = args.verbose
    silent = args.silent

    if len(inputpaths) < 3:
        raise Exception('Need at least 3 copies to do a replication repair/majority vote!')

    if os.path.isfile(inputpath): # if inputpath is a single file (instead of a folder), then define the rootfolderpath as the parent directory (for correct relative path generation, else it will also truncate the filename!)
        rootfolderpath = os.path.dirname(inputpath)

    if correct:
        if not args.output:
            raise NameError('Output path is necessary when in correction mode!')
        outputpath = fullpath(args.output[0])

    errors_file = None
    if args.errors_file: errors_file = os.path.basename(fullpath(args.errors_file[0]))

    # -- Checking arguments
    if not stats_only and not generate and not os.path.isfile(database):
        raise NameError('Specified database ecc file %s does not exist!' % database)
    elif generate and os.path.isfile(database) and not force:
        raise NameError('Specified database ecc file %s already exists! Use --force if you want to overwrite.' % database)

    if resilience_rate <= 0 or resilience_rate_intra <= 0:
        raise ValueError('Resilience rate cannot be negative nor zero and it must be a float number.');

    if max_block_size < 2 or max_block_size > 255:
        raise ValueError('RS max block size must be between 2 and 255.')

    if header_size < 1:
        raise ValueError('Header size cannot be negative.')
    
    if replication_rate < 0 or replication_rate == 2:
        raise ValueError('Replication rate must either be 1 (no replication) or above 3 to be useful (cannot disambiguate with only 2 replications).')

    # -- Configure the log file if enabled (ptee.write() will write to both stdout/console and to the log file)
    if args.log:
        ptee = Tee(args.log[0], 'a', nostdout=silent)
        #sys.stdout = Tee(args.log[0], 'a')
        sys.stderr = Tee(args.log[0], 'a', nostdout=silent)
    else:
        ptee = Tee(nostdout=silent)


    # == PROCESSING BRANCHING == #

    # Precompute some parameters and load up ecc manager objects (big optimization as g_exp and g_log tables calculation is done only once)
    ptee.write("Initializing the ECC codecs, please wait...")
    hasher = Hasher(hash_algo)
    hasher_intra = Hasher('none') # for intra_ecc we don't use any hash
    ecc_params = compute_ecc_params(max_block_size, resilience_rate, hasher)
    ecc_manager = ECCMan(max_block_size, ecc_params["message_size"], algo=ecc_algo)
    ecc_params_intra = compute_ecc_params(max_block_size, resilience_rate_intra, hasher_intra)
    ecc_manager_intra = ECCMan(max_block_size, ecc_params_intra["message_size"], algo=ecc_algo)
    ecc_params_idx = compute_ecc_params(27, 1, hasher_intra)
    ecc_manager_idx = ECCMan(27, ecc_params_idx["message_size"], algo=ecc_algo)

    # == Precomputation of ecc file size
    # Precomputing is important so that the user can know what size to expect before starting (and how much time it will take...).
    filescount = 0
    sizetotal = 0
    sizeheaders = 0
    ptee.write("Precomputing list of files and predicted statistics...")
    for (dirpath, filename) in tqdm.tqdm(recwalk(inputpath)):
        filescount = filescount + 1 # counting the total number of files we will process (so that we can show a progress bar with ETA)
        # Get full absolute filepath
        filepath = os.path.join(dirpath, filename)
        relfilepath = path2unix(os.path.relpath(filepath, rootfolderpath)) # File relative path from the root (we truncate the rootfolderpath so that we can easily check the files later even if the absolute path is different)
        # Get the current file's size
        size = os.stat(filepath).st_size
        # Check if we must skip this file because size is too small, and then if we still keep it because it's extension is always to be included
        if skip_size_below and size < skip_size_below and (not always_include_ext or not relfilepath.lower().endswith(always_include_ext)): continue

        # Compute total size of all files
        sizetotal = sizetotal + size
        # Compute predicted size of their headers
        if size >= header_size: # for big files, we limit the size to the header size
            header_size_add = header_size
        else: # else for size smaller than the defined header size, it will just be the size of the file
            header_size_add = size
        # Size of the ecc entry for this file will be: entrymarker-bytes + field_delim-bytes*occurrence + length-filepath-string + length-size-string + length-filepath-ecc + size of the ecc per block for all blocks in file header + size of the hash per block for all blocks in file header.
        sizeheaders = sizeheaders + replication_rate * (len(entrymarker) + len(field_delim)*3 + len(relfilepath) + len(str(size)) + int(float(len(relfilepath))*resilience_rate_intra) + (int(math.ceil(float(header_size_add) / ecc_params["message_size"])) * (ecc_params["ecc_size"]+ecc_params["hash_size"])) ) # Compute the total number of bytes we will add with ecc + hash (accounting for the padding of the remaining characters at the end of the sequence in case it doesn't fit with the message_size, by using ceil() )
    ptee.write("Precomputing done.")
    if generate: # show statistics only if generating an ecc file
        # TODO: add the size of the ecc format header? (arguments string + PYHEADERECC identifier)
        total_pred_percentage = sizeheaders * 100 / sizetotal
        ptee.write("Total ECC size estimation: %s = %g%% of total files size %s." % (sizeof_fmt(sizeheaders), total_pred_percentage, sizeof_fmt(sizetotal)))
        ptee.write("Details: resiliency of %i%%: For the header (first %i characters) of each file: each block of %i chars will get an ecc of %i chars (%i errors or %i erasures)." % (resilience_rate*100, header_size, ecc_params["message_size"], ecc_params["ecc_size"], int(ecc_params["ecc_size"] / 2), ecc_params["ecc_size"]))

    if stats_only: return 0

    # == Generation mode
    # Generate an ecc file, containing ecc entries for every files recursively in the specified root folder.
    # The file header will be split by blocks depending on max_block_size and resilience_rate, and each of those blocks will be hashed and a Reed-Solomon code will be produced.
    if generate:
        ptee.write("====================================")
        ptee.write("Header ECC generation, started on %s" % datetime.datetime.now().isoformat())
        ptee.write("====================================")

        with open(database, 'wb') as db, open(database+".idx", 'wb') as dbidx:
            # Write ECC file header identifier (unique string + version)
            db.write("**PYHEADERECCv%s**\n" % (''.join([x * 3 for x in __version__]))) # each character in the version will be repeated 3 times, so that in case of tampering, a majority vote can try to disambiguate
            # Write the parameters (they are NOT reloaded automatically, you have to specify them at commandline! It's the user role to memorize those parameters (using any means: own brain memory, keep a copy on paper, on email, etc.), so that the parameters are NEVER tampered. The parameters MUST be ultra reliable so that errors in the ECC file can be more efficiently recovered.
            for i in xrange(3): db.write("** Parameters: "+" ".join(sys.argv[1:]) + "\n") # copy them 3 times just to be redundant in case of ecc file corruption
            db.write("** Generated under %s\n" % ecc_manager.description())
            # NOTE: there's NO HEADER for the ecc file! Ecc entries are all independent of each others, you just need to supply the decoding arguments at commandline, and the ecc entries can be decoded. This is done on purpose to be remove the risk of critical spots in ecc file.

            # Processing ecc on files
            files_done = 0
            files_skipped = 0
            for (dirpath, filename) in tqdm.tqdm(recwalk(inputpath), total=filescount, leave=True, unit="files"):
                # Get full absolute filepath
                filepath = os.path.join(dirpath, filename)
                # Get database relative path (from scanning root folder)
                relfilepath = path2unix(os.path.relpath(filepath, rootfolderpath)) # File relative path from the root (we truncate the rootfolderpath so that we can easily check the files later even if the absolute path is different)
                # Get file size
                filesize = os.stat(filepath).st_size
                # If skip size is enabled and size is below the skip size, we skip UNLESS the file extension is in the always include list
                if skip_size_below and filesize < skip_size_below and (not always_include_ext or not relfilepath.lower().endswith(always_include_ext)):
                    files_skipped += 1
                    continue

                # Opening the input file's to read its header and compute the ecc/hash blocks
                if verbose: ptee.write("\n- Processing file %s" % relfilepath)
                with open(os.path.join(rootfolderpath, filepath), 'rb') as file:
                    # -- Intra-ecc generation: Compute an ecc for the filepath and filesize, to avoid a critical spot here (so that we don't care that the filepath gets corrupted, we have an ecc to fix it!)
                    relfilepath_ecc = ''.join(compute_ecc_hash(ecc_manager_intra, hasher_intra, relfilepath, max_block_size, resilience_rate_intra, ecc_params_intra["message_size"], True))
                    filesize_ecc = ''.join(compute_ecc_hash(ecc_manager_intra, hasher_intra, str(filesize), max_block_size, resilience_rate_intra, ecc_params_intra["message_size"], True))
                    # -- Hash/Ecc encoding of file's content (everything is managed inside stream_compute_ecc_hash)
                    buf = file.read(header_size) # read the file's header
                    ecc_stream = compute_ecc_hash(ecc_manager, hasher, buf, max_block_size, resilience_rate, ecc_params["message_size"], True) # then compute the ecc/hash entry for this file's header (this will be a chain of multiple ecc/hash fields per block of data, because Reed-Solomon is limited to a maximum of 255 bytes, including the original_message+ecc!)
                    # -- Build the ecc entry
                    # First put the ecc metadata
                    ecc_entry = ("%s%s%s%s%s%s%s%s%s") % (entrymarker, relfilepath, field_delim, filesize, field_delim, relfilepath_ecc, field_delim, filesize_ecc, field_delim) # first save the file's metadata (filename, filesize, filepath ecc, ...)
                    # Then put the ecc stream (the ecc blocks for the file's data)
                    ecc_entry += ''.join(ecc_stream)
                    # -- Commit the ecc entry into the database
                    for i in xrange(replication_rate):
                        entrymarker_pos = db.tell() # backup the position of the start of this ecc entry
                        # -- Committing the hash/ecc encoding of the file's content
                        db.write(ecc_entry) # commit to the ecc file, and replicate the number of times required
                        # -- External indexes backup: calculate the position of the entrymarker and of each field delimiter, and compute their ecc, and save into the index backup file. This will allow later to retrieve the position of each marker in the ecc file, and repair them if necessary, while just incurring a very cheap storage cost.
                        markers_pos = [entrymarker_pos,
                                                    entrymarker_pos+len(entrymarker)+len(relfilepath),
                                                    entrymarker_pos+len(entrymarker)+len(relfilepath)+len(field_delim)+len(str(filesize)),
                                                    entrymarker_pos+len(entrymarker)+len(relfilepath)+len(field_delim)+len(str(filesize))+len(field_delim)+len(relfilepath_ecc),
                                                    entrymarker_pos+len(entrymarker)+len(relfilepath)+len(field_delim)+len(str(filesize))+len(field_delim)+len(relfilepath_ecc)+len(field_delim)+len(filesize_ecc),
                                                    ] # Make the list of all markers positions for this ecc entry. The first and last indexes are the most important (first is the entrymarker, the last is the field_delim just before the ecc track start)
                        markers_pos = [struct.pack('>Q', x) for x in markers_pos] # Convert to a binary representation in 8 bytes using unsigned long long (up to 16 EB, this should be more than sufficient)
                        markers_types = ["1", "2", "2", "2", "2"]
                        markers_pos_ecc = [ecc_manager_idx.encode(x+y) for x,y in zip(markers_types,markers_pos)] # compute the ecc for each number
                        dbidx.write(''.join([str(x) for items in zip(markers_types,markers_pos,markers_pos_ecc) for x in items])) # couple each marker's position with its ecc, and write them all consecutively into the index backup file
                files_done += 1
        ptee.write("All done! Total number of files processed: %i, skipped: %i" % (files_done, files_skipped))
        return 0

    # == Error Correction (and checking by hash) mode
    # For each file, check their headers by block by checking each block against a hash, and if the hash does not match, try to correct with Reed-Solomon and then check the hash again to see if we correctly repaired the block (else the ecc entry might have been corrupted, whether it's the hash or the ecc field, in both cases it's highly unlikely that a wrong repair will match the hash after this wrong repair)
    elif correct:
        ptee.write("====================================")
        ptee.write("Header ECC verification and correction, started on %s" % datetime.datetime.now().isoformat())
        ptee.write("====================================")

        # Prepare the list of files with errors to reduce the scan (only if provided)
        errors_filelist = []
        if errors_file:
            with open(errors_file, 'rb') as efile:
                for row in csv.DictReader(efile, lineterminator='\n', delimiter='|', quotechar='"', fieldnames=['filepath', 'error']): # need to specify the fieldnames, else the first row in the csv file will be skipped (it will be used as the columns names)
                    errors_filelist.append(row['filepath'])

        # Read the ecc file
        dbsize = os.stat(database).st_size # must get db file size before opening it in order not to move the cursor
        with open(database, 'rb') as db:
            # Counters
            files_count = 0
            files_corrupted = 0
            files_repaired_partially = 0
            files_repaired_completely = 0
            files_skipped = 0

            # Main loop: process each ecc entry
            entry = 1 # to start the while loop
            bardisp = tqdm.tqdm(total=dbsize, leave=True, desc='DBREAD', unit='B', unit_scale=True) # display progress bar based on reading the database file (since we don't know how many files we will process beforehand nor how many total entries we have)
            while entry:

                # -- Read the next ecc entry (extract the raw string from the ecc file)
                if replication_rate == 1:
                    entry = read_next_entry(db, entrymarker)
                    if entry: bardisp.update(len(entry)) # update progress bar

                # -- Disambiguation/Replication management: if replication rate was used, then fetch all entries for the same file at once, and then disambiguate by majority vote
                else:
                    entries = []
                    for i in xrange(replication_rate):
                        entries.append(read_next_entry(db, entrymarker))
                    entry = entries_disambiguate(entries, field_delim, ptee)
                    if entry: bardisp.update(len(entry)*replication_rate) # update progress bar
                # No entry? Then we finished because this is the end of file (stop condition)
                if not entry: break

                # -- Extract the fields from the ecc entry
                entry_p = entry_fields(entry, field_delim)

                # -- Get file path, check its correctness and correct it by using intra-ecc if necessary
                relfilepath = entry_p["relfilepath"] # Relative file path
                fpentry_fields = {"ecc_field": entry_p["relfilepath_ecc"]}
                relfilepath_correct = [] # will store each block of the corrected (or already correct) filepath
                fpcorrupted = False # check if filepath was corrupted
                fpcorrected = True # check if filepath was corrected (if it was corrupted)
                # Decode each block of the filepath
                for e in entry_assemble(fpentry_fields, ecc_params_intra, len(relfilepath), '', relfilepath):
                    # Check if this block of the filepath is OK, if yes then we just copy it over
                    if ecc_manager_intra.check(e["message"], e["ecc"]):
                        relfilepath_correct.append(e["message"])
                    else: # Else this block is corrupted, we will try to fix it using the ecc
                        fpcorrupted = True
                        try:
                            repaired_block, repaired_ecc = ecc_manager_intra.decode(e["message"], e["ecc"], enable_erasures=enable_erasures, erasures_char=erasure_symbol, only_erasures=only_erasures)
                        except (ReedSolomonError, RSCodecError), exc: # the reedsolo lib may raise an exception when it can't decode. We ensure that we can still continue to decode the rest of the file, and the other files.
                            repaired_block = None
                            repaired_ecc = None
                            print("Error: metadata field at offset %i: %s" % (entry_pos[0], exc))
                        # Check if the block was successfully repaired: if yes then we copy the repaired block...
                        if repaired_block is not None and ecc_manager_intra.check(repaired_block, repaired_ecc):
                            relfilepath_correct.append(repaired_block)
                        else: # ... else it failed, then we copy the original corrupted block and report an error later
                            relfilepath_correct.append(e["message"])
                            fpcorrected = False
                # Join all the blocks into one string to build the final filepath
                relfilepath = ''.join(relfilepath_correct)
                # Report errors
                if fpcorrupted:
                    if fpcorrected: ptee.write("\n- Fixed error in metadata field at offset %i filepath %s." % (entry_pos[0], relfilepath))
                    else: ptee.write("\n- Error in filepath, could not correct completely metadata field at offset %i with value: %s. Please fix manually by editing the ecc file or set the corrupted characters to null bytes and --enable_erasures." % (entry_pos[0], relfilepath))
                # -- End of intra-ecc on filepath

                # Build the absolute file path
                filepath = os.path.join(rootfolderpath, relfilepath) # Get full absolute filepath from given input folder (because the files may be specified in any folder, in the ecc file the paths are relative, so that the files can be moved around or burnt on optical discs)
                if errors_filelist and relfilepath not in errors_filelist: continue # if a list of files with errors was supplied (for example by rfigc.py), then we will check only those files and skip the others

                if verbose: ptee.write("\n- Processing file %s" % relfilepath)

                # -- Check filepath
                # Check that the filepath isn't corrupted (detectable mainly with replication_rate >= 3, but if a silent error erase a character (not only flip a bit), then it will also be detected this way
                if relfilepath.find("\x00") >= 0:
                    ptee.write("Error: ecc entry corrupted on filepath field, please try to manually repair the filepath (filepath: %s - missing/corrupted character at %i)." % (relfilepath, relfilepath.find("\x00")))
                    files_skipped += 1
                    continue
                # Check that file still exists before checking it
                if not os.path.isfile(filepath):
                    if not skip_missing: ptee.write("Error: file %s could not be found: either file was moved or the ecc entry was corrupted. If replication_rate is enabled, maybe the majority vote was wrong. You can try to fix manually the entry." % relfilepath)
                    files_skipped += 1
                    continue

                # -- Checking file size: if the size has changed, the blocks may not match anymore!
                filesize = os.stat(filepath).st_size
                if entry_p["filesize"] != filesize:
                    if ignore_size:
                        ptee.write("Warning: file %s has a different size: %s (before: %s). Will still try to correct it (but the blocks may not match!)." % (relfilepath, filesize, entry_p["filesize"]))
                    else:
                        ptee.write("Error: file %s has a different size: %s (before: %s). Skipping the file correction because blocks may not match (you can set --ignore_size to still correct even if size is different, maybe just the entry was corrupted)." % (relfilepath, filesize, entry_p["filesize"]))
                        files_skipped += 1
                        continue

                files_count += 1
                # -- Check blocks and repair if necessary
                entry_asm = entry_assemble(entry_p, ecc_params, header_size, filepath) # Extract and assemble each message block from the original file with its corresponding ecc and hash
                corrupted = False # flag to signal that the file was corrupted and we need to reconstruct it afterwards
                repaired_partially = False # flag to signal if a file was repaired only partially
                err_consecutive = True # flag to check if the ecc track is misaligned/misdetected (we only encounter corrupted blocks that we can't fix)
                # For each message block, check the message with hash and repair with ecc if necessary
                for i, e in enumerate(entry_asm):
                    # If the message block has a different hash, it was corrupted (or the hash is corrupted, or both)
                    if hasher.hash(e["message"]) != e["hash"] or (not fast_check and not ecc_manager.check(e["message"], e["ecc"])):
                        corrupted = True
                        # Try to repair the block using ECC
                        ptee.write("File %s: corruption in block %i. Trying to fix it." % (relfilepath, i))
                        try:
                            repaired_block, repaired_ecc = ecc_manager.decode(e["message"], e["ecc"], enable_erasures=enable_erasures, erasures_char=erasure_symbol, only_erasures=only_erasures)
                        except (ReedSolomonError, RSCodecError), exc: # the reedsolo lib may raise an exception when it can't decode. We ensure that we can still continue to decode the rest of the file, and the other files.
                            repaired_block = None
                            repaired_ecc = None
                            print("Error: file %s: block %i: %s" % (relfilepath, i, exc))
                        # Check if the repair was successful.
                        hash_ok = None
                        ecc_ok = None
                        if repaired_block is not None:
                            hash_ok = (hasher.hash(repaired_block) == e["hash"])
                            ecc_ok = ecc_manager.check(repaired_block, repaired_ecc)
                        if repaired_block is not None and (hash_ok or ecc_ok): # If either the hash or the ecc check now match the repaired message block, we commit the new block
                            entry_asm[i]["message_repaired"] = repaired_block # save the repaired block
                            # Show a precise report about the repair
                            if hash_ok and ecc_ok: ptee.write("File %s: block %i repaired!" % (relfilepath, i))
                            elif not hash_ok: ptee.write("File %s: block %i probably repaired with matching ecc check but with a hash error (assume the hash was corrupted)." % (relfilepath, i))
                            elif not ecc_ok: ptee.write("File %s: block %i probably repaired with matching hash but with ecc check error (assume the ecc was partially corrupted)." % (relfilepath, i))
                            err_consecutive = False
                        else: # Else the hash and the ecc check do not match: the repair failed (either because the ecc is too much tampered, or because the hash is corrupted. Either way, we don't commit).
                            ptee.write("Error: file %s could not repair block %i (both hash and ecc check mismatch)." % (relfilepath, i)) # you need to code yourself to use bit-recover, it's in perl but it should work given the hash computed by this script and the corresponding message block.
                            repaired_partially = True
                            # Detect if the ecc track is misaligned/misdetected (we encounter only errors that we can't fix)
                            if err_consecutive and i >= 10: # threshold is ten consecutive uncorrectable errors
                                ptee.write("Failure: Too many consecutive uncorrectable errors for %s. Most likely, the ecc track was misdetected (try to repair the entrymarkers and field delimiters). Skipping this track/file." % relfilepath)
                                break
                    else:
                        err_consecutive = False
                # -- Reconstruct/Copying the repaired file
                # If this file had a corruption in one of its header blocks, then we will reconstruct the file header and then append the rest of the file (which can then be further repaired by other tools such as PAR2).
                if corrupted:
                    # Counters...
                    files_corrupted += 1
                    if repaired_partially:
                        files_repaired_partially += 1
                    else:
                        files_repaired_completely += 1
                    # Reconstructing the file
                    outfilepath = os.path.join(outputpath, relfilepath) # get the full path to the output file
                    outfiledir = os.path.dirname(outfilepath)
                    if not os.path.isdir(outfiledir): os.makedirs(outfiledir) # if the target directory does not exist, create it (and create recursively all parent directories too)
                    with open(outfilepath, 'wb') as out:
                        # Reconstruct the header using repaired blocks (and the other non corrupted blocks)
                        out.write(''.join([e["message_repaired"] if "message_repaired" in e else e["message"] for e in entry_asm]))
                        # Append the rest of the file by copying from the original
                        with open(filepath, 'rb') as originalfile:
                            blocksize = 65535
                            originalfile.seek(header_size)
                            buf = originalfile.read(blocksize)
                            while buf:
                                out.write(buf)
                                buf = originalfile.read(blocksize)
                    # Copying the last access time and last modification time from the original file TODO: a more reliable way would be to use the db computed by rfigc.py, because if a software maliciously tampered the data, then the modification date may also have changed (but not if it's a silent error, in that case we're ok).
                    filestats = os.stat(filepath)
                    os.utime(outfilepath, (filestats.st_atime, filestats.st_mtime))
        # All ecc entries processed for checking and potentally repairing, we're done correcting!
        bardisp.close() # at the end, the bar may not be 100% because of the headers that are skipped by read_next_entry() and are not accounted in bardisp.
        ptee.write("All done! Stats:\n- Total files processed: %i\n- Total files corrupted: %i\n- Total files repaired completely: %i\n- Total files repaired partially: %i\n- Total files corrupted but not repaired at all: %i\n- Total files skipped: %i" % (files_count, files_corrupted, files_repaired_completely, files_repaired_partially, files_corrupted - (files_repaired_partially + files_repaired_completely), files_skipped) )
        return 0

# Calling main function if the script is directly called (not imported as a library in another program)
if __name__ == "__main__":  # pragma: no cover
    sys.exit(main())
