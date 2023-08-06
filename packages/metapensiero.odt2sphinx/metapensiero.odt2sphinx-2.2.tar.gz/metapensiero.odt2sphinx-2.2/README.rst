odt2sphinx
==========

What is it ?
------------

Odt2sphinx converts OpenDocument Text file(s) to one or several .rst files.

This is a fork of Christophe de Vienne `odt2sphinx`__.

__ https://bitbucket.org/cdevienne/odt2sphinx

Install
-------

::

    pip install metapensiero.odt2sphinx


Usage
-----

::

    usage: odt2sphinx [-h] [--debug] [--download-source-link]
                      [--encoding ENCODING] [--test]
                      source [target]

    ODT to RST

    positional arguments:
      source                Source ODT file to be converted, or a directory
                            containing ODT files and corresponding .expected.rst
                            files in test mode
      target                Either destination directory, a single .rst target
                            filename or "-" for stdout

    optional arguments:
      -h, --help            show this help message and exit
      --debug               Emit debug noise
      --download-source-link
                            Add a link to the ODT source file
      --encoding ENCODING   Output encoding, by default UTF-8
      --test                Run in test mode, comparing output with expected reST
                            to be found in “source.expected.rst”

Output files
------------

There are three modes of operation:

1. Sphinx, splitting the source in multiple files, one per chapter
2. Monolithic single plain reST output
3. Stdout
4. Functional test

The first mode is selected by omitting the second positional argument, or giving it the name of
a directory. The second is selected by specifying a file name with a ``.rst`` extension as the
second positional argument. The third by specifying ``-`` as the target name. The latter by
using the ``--test`` option.

Multiple files mode
~~~~~~~~~~~~~~~~~~~

The files are generated in the target dir, which by default has the same name as the .odt file
minus the extension.

At least one file, ``index.rst``, will be written. Depending on the document content,
additional rst files may be generated.

Images are extracted and put together in an "images" directory inside the targetdir.

Monolithic output mode
~~~~~~~~~~~~~~~~~~~~~~

All the output goes into the single rst file specified as the second positional argument.

Images are extracted and put together in an "images" directory inside the directory containing
the output file.

Functional test mode
~~~~~~~~~~~~~~~~~~~~

This mode is used by the automatic tests: when the ``--test`` option is specified, the tool
loads the *expected* result from a file with the same name as the *source* one but with the
``.odt`` suffix replaced by ``.expected.rst``.

It will print out any discrepancy as a *unified diff*.

Styles mapping
--------------

The following rules will be applied to particulary styles when converting an .odt file. The
style names are case-insensitive.

Title
   Becomes the main document title (over- and underlined with ``=``)

Subtitle
   Becomes the document subtitle (over- and underlined with ``-``)

Title 1 ... Title 6
   Becomes sub-chapter titles, underlined respectively with ``#``, ``=``, ``-``, ``~``, ``+``
   and `````; in `multiple files mode` the source document is splitted on ``Title 1`` sections
   and a reference to the single files is inserted in a ``toctree`` directive in the
   ``index.rst`` file

"Warning" (or "Avertissement")
   The chapter becomes the content of a ``.. warning`` directive

"Tip" (or "Trucs & Astuces")
   The chapter becomes the content of a ``.. tip`` directive

"Note" or "Information"
   The chapter becomes the content of a ``.. note`` directive
