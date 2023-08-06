"""
This module contains the object classes to store the BibTeX *entries*.

"""

__license__ = "MIT"
__docformat__ = 'reStructuredText'
__revision__  = filter(str.isdigit, "$Revision: 92 $")


class Entry(object):
    """
    This is the generic class of a BibTeX Entry object.

    :param inputdict: initial data of the Entry
    :type inputdict: .Entry.datadict
    :return: BibTeX Entry object
    :rtype: Entry
    :raises NameError: if ENTRYTYPE is invalid or inconsistent with Entry object type
    :raises KeyError: if ENTRYTYPE is missed
    """

    #: List of tag names which are processed.
    #: *All other tags will be ignored!*
    processedTags = ['abstract', 'address', 'annote', 'author', 'booktitle', 'chapter', 'comment', 'crossref', 'doi',
                       'edition', 'editor', 'howpublished', 'institution', 'journal', 'key', 'keywords', 'month',
                       'note', 'number', 'organization', 'pages', 'publisher', 'school', 'series', 'title', 'type',
                       'url', 'volume', 'year']

    #: List of tag names which are protected from de- or encoding of LaTeX character code to
    #: unicode character or vice versa.
    protectedTags = ['doi', 'url']

    #: List containing the names of the tags which are required for the BibTeX entry type.
    #: *It will by overwritten by the subclass definition.*
    mandatoryTags = []

    #: Defines the BibTeX Entry type of the object class as a string.
    #: *It will by overwritten by the subclass definition.*
    BibTeXType = None

    #: Dictionary stores Entry type to class mapping
    _registeredTypes = {}


    @classmethod
    def _register(cls, registerCls):
        """
        Decorator to register Entry type classes.

        :param registerCls: class to register
        :type registerCls: class
        :return: class to register
        :rtype: class
        """
        type_name = registerCls.BibTeXType
        cls._registeredTypes[type_name] = registerCls
        return registerCls


    @classmethod
    def get_Instance(cls, inputdict):
        """
        This is the recommended method to generate a BibTeX Entry object.

        It returns an Entry object depending on the ENTRYTYPE as defined in the *inputdict*.
        To initialize an Entry object one need to commit an dictionary containing the initial tags
        of an Entry, like ``{'ID':'Doe2015', 'ENTRYTYPE':'article', 'year':'2015', ...}``.

        :param inputdict: the initial values of an Entry
        :type inputdict: .Entry.datadict
        :return: BibTeX Entry object
        :rtype: :class:`.Article` | :class:`.Book` | ...
        :raises NameError: if ENTRYTYPE is invalid
        :raises KeyError: if ENTRYTYPE is missed
        """

        if 'ENTRYTYPE' not in inputdict:
            msg = 'Entry type is not defined'
            raise KeyError(msg)

        if inputdict['ENTRYTYPE'] not in cls._registeredTypes:
            msg = inputdict['ENTRYTYPE'] + ' is not a valid Entry type!'
            raise NameError(msg)

        return cls._registeredTypes[inputdict['ENTRYTYPE']](inputdict)


    def __init__(self, inputdict):
        """
        This method initially populates the Entry object with key/value pairs.

        :param inputdict: dictionary containing the initial values of an Entry
        :type inputdict: dict
        """

        if 'ENTRYTYPE' not in inputdict:
            msg = 'Entry type is not defined'
            raise KeyError(msg)

        # initialize self._datadict
        self._datadict = {}

        # check if Entry type is consistent with object type
        if self.__class__.BibTeXType:
            if not inputdict['ENTRYTYPE'] == self.__class__.BibTeXType:
                msg = 'Unexpected Entry type!'
                raise NameError(msg)

        # set initial citation id of the article if given
        self.__ckey = inputdict.get('ID', None)

        # populate self._datadict
        for name in Entry.processedTags:
            if name not in inputdict: continue
            self.set_tag(name, inputdict[name])


    def set_tag(self, name, contents):
        """
        Method to (re)set a tag.

        :param name: tag name
        :type name: str
        :param contents: tag contents
        :type contents: str
        :raises KeyError: if name is invalid (not in :py:attr:`.processedTags`)
        """
        if name not in Entry.processedTags:
            msg = 'Invalid tag name!'
            raise KeyError(msg)
        self._datadict[name] = contents


    def get_tag(self, name, default=None):
        """
        Return the contents for a tag name if tag is defined for the Entry, else default.

        :param name: tag name
        :type name: str
        :param default: default return if tag is not defined
        :return: tag contents
        :rtype: str
        """
        return self._datadict.get(name, default=default)


    def del_tag(self, name):
        """
        Method to delete a tag.

        :param name: tag name
        :type name: str
        :raises KeyError: if Entry did not have the tag
        """
        if name not in self._datadict:
            msg = 'Tag not found in Entry!'
            raise KeyError(msg)
        del self._datadict[name]


    def missingTags(self):
        """
        Checks if all tags which are defined as required (:attr:`.Entry.mandatoryTags`) are set.
        It returns name of the tags which are not meet as a list of strings.
        If all requirements are fulfilled it will return *None*.

        :return: list of missing tag names
        :rtype: list
        """
        missing = []
        for tag_name in self.__class__.mandatoryTags:
            if tag_name not in self._datadict:
                missing.append(tag_name)
        if not len(missing) == 0:
            return missing
        else:
            return None


    def AuthorsList(self) :
        """
        Parses a **valid** BibTeX author string, like  *"John Doe and ..."* or
        *"Doe, John and ..."* and returns a list of
        dictionaries like ``[{'given': 'John', 'family': 'Doe'}, ...]``.

        :return: list of dicts
        :rtype: list
        :raises NameError: if *author* tag is not defined
        """
        # check if author field is set
        if 'author' not in self._datadict:
            msg = 'Author field not defined!'
            raise NameError(msg)
        res = []
        authors = self._datadict['author'].split('and')
        for author in authors :
            _author = author.split(',')
            if len(_author) == 1:
                __author = _author[0].strip().rstrip().split(' ')
                family = __author[-1]
                rec = {'family':family}
                if len(__author) > 1:
                    given = " ".join(str(x) for x in __author[:-1]).decode('utf8')
                    rec['given'] = given
                res.append( rec )
            else:
                family = _author[0].strip().rstrip()
                rec = {'family':family}
                try :
                    given = _author[1].strip().rstrip()
                    rec['given'] = given
                except IndexError:
                    pass
                res.append( rec )
        return res


    def bibtex(self, ckey=None):
        """
        Returns the BibTeX formatted string of the Entry object.
        If *ckey* is not defined, the initial :attr:`.ckey` will be used.

        .. deprecated:: 0.1-r67
            Use function :func:`.entry_to_string` instead.

        :param ckey: BibTeX citation-key
        :type ckey: str
        :return: BibTeX formated Entry
        :rtype: str
        """
        entry = self._datadict
        if not ckey:
            if self.ckey:
                ckey = self.ckey
            else:
                ckey = 'undefined'
        bibtex = ''
        # Write BibTeX key
        bibtex += '@' + self.__class__.BibTeXType + '{' + ckey
        for field in [i for i in sorted(entry)]:
            bibtex += ",\n" + '	' + field + " = {" + entry[field] + "}"
        bibtex += "\n}\n\n"
        return bibtex


    @property
    def datadict(self):
        """
        Property containing the BibTeX tag names and contents of the Entry as key-value pairs
        in a dictionary like ``{'ID':'Doe2015', 'ENTRYTYPE':'article', 'year':'2015', ...}``.
        The keys *ENTRYTYPE* and *ID* are of special interest, they refer to the BibTeX Entry
        type, respectively the citation-key.
        """
        dict = {'ENTRYTYPE': self.__class__.BibTeXType, 'ID': self.ckey}
        dict.update(self._datadict)
        return dict


    @property
    def ckey(self):
        """
        Property containing the *initial* BibTeX citation-key of the Entry.
        """
        return self.__ckey


# ------------------------------------------------------------------------------

@Entry._register
class Article(Entry):
    """ An article from a journal or magazine. """

    #: List containing the names of the tags which are required for the BibTeX entry type.
    mandatoryTags = ['author', 'title', 'journal', 'year']

    BibTeXType = 'article'


@Entry._register
class Book(Entry):
    """ A book with an explicit publisher. """

    #: List containing the names of the tags which are required for the BibTeX entry type.
    mandatoryTags = ['author', 'title', 'publisher', 'year']

    BibTeXType = 'book'


@Entry._register
class Booklet(Entry):
    """ A work that is printed and bound, but without a named publisher or sponsoring institution. """
    mandatoryTags = ['title']
    BibTeXType = 'booklet'


@Entry._register
class Inbook(Entry):
    """ A part of a book, e.g., a chpater, section, or whatever and/or a range of pages. """
    mandatoryTags = ['author', 'title', 'publisher', 'year', 'chapter', 'pages']
    BibTeXType = 'inbook'


@Entry._register
class Incollection(Entry):
    """ A part of a book having its own title. """
    mandatoryTags = ['author', 'title', 'booktitle', 'publisher', 'year']
    BibTeXType = 'incollection'


@Entry._register
class Inproceedings(Entry):
    """ An article in a conference proceedings. """
    mandatoryTags = ['author', 'title', 'booktitle', 'year']
    BibTeXType = 'inproceedings'


@Entry._register
class Manual(Entry):
    """ Technical documentation. """
    mandatoryTags = ['title']
    BibTeXType = 'manual'


@Entry._register
class Mastersthesis(Entry):
    """ A master's thesis. """
    mandatoryTags = ['author', 'title', 'school', 'year']
    BibTeXType = 'mastersthesis'


@Entry._register
class Misc(Entry):
    """ Use this type when nothing else fits. """
    mandatoryTags = []
    BibTeXType = 'misc'


@Entry._register
class Phdthesis(Entry):
    """ A Ph.D. thesis. """
    mandatoryTags = ['author', 'title', 'school', 'year']
    BibTeXType = 'phdthesis'


@Entry._register
class Proceedings(Entry):
    """ Conference proceedings. """
    mandatoryTags = ['title', 'year']
    BibTeXType = 'proceedings'


@Entry._register
class Techreport(Entry):
    """ A report published by a school or other institution, usually numbered within a series. """
    mandatoryTags = ['author', 'title', 'note']
    BibTeXType = 'techreport'


@Entry._register
class Unpublished(Entry):
    """ A document having an author and title, but not formally published. """
    mandatoryTags = ['author', 'title', 'institution', 'year']
    BibTeXType = 'unpublished'
