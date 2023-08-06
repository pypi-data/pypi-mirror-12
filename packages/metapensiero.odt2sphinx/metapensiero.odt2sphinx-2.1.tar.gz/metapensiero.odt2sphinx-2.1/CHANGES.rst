Changes
-------

2.1 (2015-11-17)
~~~~~~~~~~~~~~~~

- Center cell content of header rows

- Let the content of multi-rows cell flow thru the separator border

- Use LibreOffice to convert WMF images to PNG

- Restore handling of --download-source-link option

2.0 (2015-11-14)
~~~~~~~~~~~~~~~~

- Code overhaul, in particular the reST Writer has been rewritten from scratch and the Visitor
  streamlined

  - reST generation is now done using a stack of objects, easier to understand and to extend
  - honor the auto-numerated and nested list styles
  - handle line breaks in paragraphs
  - honor the title and subtitle of the document, using different decorations than those used
    for section titles
  - respect the styling of the section titles
  - support multi-rows header in tables
  - handle subscript and superscript text styles

- New automatic tests, comparing the output with an expected result

- Print to stdout alternative mode

1.1 (2015-11-05)
~~~~~~~~~~~~~~~~

- Fix release version, removing the date tag

1.0 (2015-11-05)
~~~~~~~~~~~~~~~~

- Forked from https://bitbucket.org/cdevienne/odt2sphinx

- Drop support for Python 2

- Use Pillow instead of PIL

- Rewrap output text for enhanced readability

- Single monolithic alternative mode

0.2.3 (2012-09-06)
~~~~~~~~~~~~~~~~~~

- Fix filename generation by replacing any non-alphanumeric character (issue #3).

- Fix handling of non-styled lists.

0.2.2 (2012-07-04)
~~~~~~~~~~~~~~~~~~

- Fix the sdist archive on pypi.

0.2.1 (2012-06-24)
~~~~~~~~~~~~~~~~~~

- Add support for numbered lists, hyperlinks, underlined text (translated to italic).

- Fix bold text support.

0.2 (2012-05-28)
~~~~~~~~~~~~~~~~

- Now supports python 3

- Explicitely added PIL as a dependency (issue #2).

0.1.2 (2012-05-22)
~~~~~~~~~~~~~~~~~~

- Add "Information" to the styles mapping.

- Handle note, tip and warning styles in lists items. This allows to use lists inside a note, a
  tip or a warning.

- Now handle external images (issue #1).

0.1.1 (2011-12-20)
~~~~~~~~~~~~~~~~~~

- Improved the RstFile for use in third-party code: it is now possible to insert code and not
  just append it.

- Add a README file

0.1.0
~~~~~

Initial release
