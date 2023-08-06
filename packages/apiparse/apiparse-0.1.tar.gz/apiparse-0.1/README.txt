
.. sectnum::
.. contents:: Table Of Contents

********
apiparse
********

Parse the patterns of apis of each module

=======
Purpose
=======
    This program is used to list all the basic building block apis in
sources or files to understand the fundamental complexity of the program
development. The basic devleoquestion to be answered:
     - How may threads? types of threads/processes?
     - How much memory? Greedy and non-greedy memory allocation?
     - Atomic Locks and thread synchronization?
     - System APIs used?

=====
Usage
=====

    Command Line
    ------------

Usage: python -m apiparse

Options:
  --version             show program's version number and exit
  -h, --help            show this help message and exit
  -a, --showall         Show all apis
  -g APIGROUP, --group=APIGROUP
                        api groups:
  -p, --showpath        list file xtension paths
  -f FILENAME, --file=FILENAME
                        filename
  -d DESTNDIR, --destn=DESTNDIR
                        Destination Directory
  -t, --tree            Show Directory Tree


    API
    ---
.. code-block::        
    import apiparse
    f = apiparse.apiparse.funcnode()
    f.showapis()

