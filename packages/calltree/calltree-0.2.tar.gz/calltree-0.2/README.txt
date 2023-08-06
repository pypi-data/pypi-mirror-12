
.. sectnum::
.. contents:: Table Of Contents

********
calltree
********

Show Callgraph of a given function

=======
Purpose
=======
The understanding of the codeflow in a larger source of codebase, requires to list the caller and callee relationships for a given function. For linux and unix developers, cscope has been the primary utitlity to search and browse through the code.

This utility uses the generated cscope database to list and display the
callgraph, which is stored in a image format. 

=====
Usage
=====

    Command Line
    ------------

Usage: python -m calltree [options] functionname

Options:
  --version             show program's version number and exit
  -h, --help            show this help message and exit
  --everything          Recursively show all callers and callees
  -a, --showall         Show all callers and callees
  -c, --callers         Recursively show all callers
  -e, --callees         Recursively show all callees
  -l LEVEL, --level=LEVEL
                        Show Level of callers/callees
  -f OUTPUTFORMAT, --format=OUTPUTFORMAT
                        output format jpg/png
  -o OUTPUTDIR, --outputdir=OUTPUTDIR
                        Storage directory for output files
  -d SOURCEDB, --db=SOURCEDB
                        cscope database (cscope.out)

.. code-block::        
    import calltree
    f = calltree.calltree.calltree()
    f.showtree()
    f.showgraph()

