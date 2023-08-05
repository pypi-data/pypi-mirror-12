peeksrc
+++++++

Peek into the sources and list the file types contained in the sources.
Also, enable display the sources in tree format.

Purpose
=======

    This tool can be used as the first step for source code reading and
    understand the basic design.
        * What are the different file types in the sources.
            * To understand file interface design.
        * Walk over specific extenstion on all directories.
        * Show directories and files with max depth level.
        * Generate header file path for doxygen

Interface
=========

    commandline
    -----------
    peeksrc
        -e [list] : Extension Lists
        -g group  : Extension group
        -l level  : File/Directory Level depth
        -u        : All unknown files
        -p        : List File extension Paths
        -d        : Destination Dir
        -t        : Directory Tree Structure
        -o        : Output File
        
    API
    ---

    source = peeksrc()
    source.showextn()

Logging and Reporting
=====================

    Console Logs and formatting
    Generate HTML report
    Generate Doxy tool input
    Generate files to pipe

DataStructures
==============

    Data Associations
        File Extens -> Files 
        File Extens -> Paths
        Directory -> File Extens -> Files

    Data Structure
        
        dirtree = ['dir1', "dir1", ..., ]

        ExtnNodes = { 
            "group1" : {
                'extn1' : {
                            'desc' : "Description",
                            'files' : 
                                    { 'dir1' : [file1, file2, file3, ...]
                                      'dir2' : [file1, file2, file3, ...]
                                    }
                            }
                'extn2' : {
                            'descr' : "Description",
                            'files' : 
                                    { 'dir1' : [file1, file2, file3, ...]
                                      'dir2' : [file1, file2, file3, ...]
                                    }
                }
            }
