"""
This package contains object classes and functions to manage BibTeX
entries and databases within Python.

Terms are used here according to http://www.bibtex.org.

"""

__license__   = "MIT"
__docformat__ = 'reStructuredText'
__version__   = '0.1.dev1'
__revision__  = filter(str.isdigit, "$Revision: 91 $")


# main modules
from ._entry import (Entry, Techreport, Phdthesis, Misc, Inproceedings, Incollection, Unpublished,
                     Manual, Mastersthesis, Proceedings, Book, Booklet, Inbook, Article)
from ._bibdb import BibDB
from ._reader import (db_from_string, db_from_file, db_from_doi, db_from_isbn)
from ._writer import (db_to_string, db_to_file, entry_to_string)


__all__ = ( 'Entry', 'Techreport', 'Phdthesis', 'Misc', 'Inproceedings', 'Incollection', 'Unpublished',
            'Manual', 'Mastersthesis', 'Proceedings', 'Book', 'Booklet', 'Inbook', 'Article',
            'BibDB', 'db_from_string', 'db_from_file', 'db_from_doi', 'db_from_isbn',
            'db_to_string', 'db_to_file', 'entry_to_string' )

