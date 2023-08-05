"""The pyang library for parsing, validating, and converting YANG modules"""

import os
import string
import sys
import zlib
import re

from . import error
from . import yang_parser
from . import yin_parser
from . import grammar
from . import util
from . import statements

__version__ = '1.6'
__date__ = '2015-10-06'

class Context(object):
    """Class which encapsulates a parse session"""

    def __init__(self, repository):
        """`repository` is a `Repository` instance"""

        self.modules = {}
        """dict of (modulename,revision):<class Statement>
        contains all modules and submodule found"""

        self.revs = {}
        """dict of modulename:(revision,handle)
        contains all modulenames and revisions found in the repository"""

        self.strict = False
        self.repository = repository
        self.errors = []
        self.canonical = False
        self.max_line_len = None
        self.max_identifier_len = None
        self.implicit_errors = True
        self.lax_xpath_checks = False
        self.deviation_modules = []
        self.features = {}
        self.keep_comments = False

        for mod, rev, handle in self.repository.get_modules_and_revisions(self):
            if mod not in self.revs:
                self.revs[mod] = []
            revs = self.revs[mod]
            revs.append((rev, handle))

    def add_module(self, ref, text, format=None,
                   expect_modulename=None, expect_revision=None,
                   expect_failure_error=True):
        """Parse a module text and add the module data to the context

        `ref` is a string which is used to identify the source of
              the text for the user.  used in error messages
        `text` is the raw text data
        `format` is one of 'yang' or 'yin'.

        Returns the parsed and validated module on success, and None on error.
        """
        if format == None:
            format = util.guess_format(text)

        if format == 'yin':
            p = yin_parser.YinParser()
        else:
            p = yang_parser.YangParser()

        module = p.parse(self, ref, text)
        if module is None:
            return None

        if expect_modulename is not None and expect_modulename != module.arg:
            if expect_failure_error:
                error.err_add(self.errors, module.pos, 'BAD_MODULE_NAME',
                              (module.arg, ref, expect_modulename))
                return None
            else:
                error.err_add(self.errors, module.pos, 'WBAD_MODULE_NAME',
                              (module.arg, ref, expect_modulename))
        latest_rev = util.get_latest_revision(module)
        if expect_revision is not None:
            if expect_revision != latest_rev:
                if expect_failure_error:
                    error.err_add(self.errors, module.pos, 'BAD_REVISION',
                                  (latest_rev, ref, expect_revision))
                    return None
                else:
                    error.err_add(self.errors, module.pos, 'WBAD_REVISION',
                                  (latest_rev, ref, expect_revision))

        if module.arg not in self.revs:
            self.revs[module.arg] = []
            revs = self.revs[module.arg]
            revs.append((latest_rev, None))

        if sys.version < '3':
            module.i_adler32 = zlib.adler32(text)
        else:
            module.i_adler32 = zlib.adler32(text.encode('UTF-8'))
        return self.add_parsed_module(module)

    def add_parsed_module(self, module):
        if module is None:
            return None
        if module.arg is None:
            error.err_add(self.errors, module.pos,
                          'EXPECTED_ARGUMENT', module.keyword)
            return None
        top_keywords = ['module', 'submodule']
        if module.keyword not in top_keywords:
            error.err_add(self.errors, module.pos,
                          'UNEXPECTED_KEYWORD_N',
                          (module.keyword, top_keywords))
            return None

        rev = util.get_latest_revision(module)
        if (module.arg, rev) in self.modules:
            other = self.modules[(module.arg, rev)]
            if (hasattr(other, 'i_adler32') and
                hasattr(module, 'i_adler32') and
                other.i_adler32 != module.i_adler32):
                error.err_add(self.errors, module.pos,
                              'DUPLICATE_MODULE', (module.arg, other.pos))
                return None
            # exactly same module
            return other

        self.modules[(module.arg, rev)] = module
        statements.validate_module(self, module)

        return module

    def del_module(self, module):
        """Remove a module from the context"""
        rev = util.get_latest_revision(module)
        del self.modules[(module.arg, rev)]

    def get_module(self, modulename, revision=None):
        """Return the module if it exists in the context"""
        if revision is None and modulename in self.revs:
            (revision, _handle) = self._get_latest_rev(self.revs[modulename])
        if revision is not None:
            if (modulename,revision) in self.modules:
                return self.modules[(modulename, revision)]
        else:
            return None

    def _get_latest_rev(self, revs):
        self._ensure_revs(revs)
        latest = None
        lhandle = None
        for (rev, handle) in revs:
            if rev is not None and (latest is None or rev > latest):
                latest = rev
                lhandle = handle
        return (latest, lhandle)

    def _ensure_revs(self, revs):
        i = 0
        length = len(revs)
        while i < length:
            (rev, handle) = revs[i]
            if rev is None:
                # now we must read the revision from the module
                try:
                    r = self.repository.get_module_from_handle(handle)
                except self.repository.ReadError as ex:
                    i += 1
                    continue
                (ref, format, text) = r

                if format == None:
                    format = util.guess_format(text)

                if format == 'yin':
                    p = yin_parser.YinParser({'no_include':True,
                                              'no_extensions':True})
                else:
                    p = yang_parser.YangParser()

                module = p.parse(self, ref, text)
                if module is not None:
                    rev = util.get_latest_revision(module)
                    revs[i] = (rev, ('parsed', module, ref))
            i += 1

    def search_module(self, pos, modulename, revision=None):
        """Searches for a module named `modulename` in the repository

        If the module is found, it is added to the context.
        Returns the module if found, and None otherwise"""

        if modulename not in self.revs:
            # this module doesn't exist in the repos at all
            error.err_add(self.errors, pos, 'MODULE_NOT_FOUND', modulename)
            # keep track of this to avoid multiple errors
            self.revs[modulename] = []
            return None
        elif self.revs[modulename] == []:
            # this module doesn't exist in the repos at all, error reported
            return None

        if revision is not None:
            if (modulename,revision) in self.modules:
                return self.modules[(modulename, revision)]
            self._ensure_revs(self.revs[modulename])
            x = util.keysearch(revision, 0, self.revs[modulename])
            if x is not None:
                (_revision, handle) = x
                if handle == None:
                    # this revision doesn't exist in the repos, error reported
                    return None
            else:
                # this revision doesn't exist in the repos
                error.err_add(self.errors, pos, 'MODULE_NOT_FOUND_REV',
                              (modulename, revision))
                # keep track of this to avoid multiple errors
                self.revs[modulename].append((revision, None))
                return None
        else:
            # get the latest revision
            (revision, handle) = self._get_latest_rev(self.revs[modulename])
            if (modulename, revision) in self.modules:
                return self.modules[(modulename, revision)]

        if handle is None:
            module = None
        elif handle[0] == 'parsed':
            module = handle[1]
            ref = handle[2]
            if modulename != module.arg:
                error.err_add(self.errors, module.pos, 'BAD_MODULE_NAME',
                              (module.arg, ref, modulename))
                module = None
            else:
                module = self.add_parsed_module(handle[1])
        else:
            # get it from the repos
            try:
                r = self.repository.get_module_from_handle(handle)
                (ref, format, text) = r
                module = self.add_module(ref, text, format,
                                         modulename, revision)
            except self.repository.ReadError as ex:
                error.err_add(self.errors, pos, 'READ_ERROR', str(ex))
                module = None

        if module == None:
            return None
        # if modulename != module.arg:
        #     error.err_add(self.errors, module.pos, 'BAD_MODULE_FILENAME',
        #                   (module.arg, ref, modulename))
        #     latest_rev = util.get_latest_revision(module)

        #     if revision is not None and revision != latest_rev:
        #         error.err_add(self.errors, module.pos, 'BAD_REVISION',
        #                       (latest_rev, ref, revision))

        #     self.del_module(module)
        #     self.modules[(modulename, latest_rev)] = None
        #     return None
        return module

    def read_module(self, modulename, revision=None, extra={}):
        """Searches for a module named `modulename` in the repository

        The module is just read, and not compiled at all.
        Returns the module if found, and None otherwise"""

        if modulename not in self.revs:
            # this module doesn't exist in the repos at all
            return None
        elif self.revs[modulename] == []:
            # this module doesn't exist in the repos at all, error reported
            return None

        if revision is not None:
            if (modulename,revision) in self.modules:
                return self.modules[(modulename, revision)]
            self._ensure_revs(self.revs[modulename])
            x = util.keysearch(revision, 1, self.revs[modulename])
            if x is not None:
                (_revision, handle) = x
                if handle == None:
                    # this revision doesn't exist in the repos, error reported
                    return None
            else:
                # this revision doesn't exist in the repos
                return None
        else:
            # get the latest revision
            (revision, handle) = self._get_latest_rev(self.revs[modulename])
            if (modulename, revision) in self.modules:
                return self.modules[(modulename, revision)]

        if handle[0] == 'parsed':
            module = handle[1]
            return module
        else:
            # get it from the repos
            try:
                r = self.repository.get_module_from_handle(handle)
                (ref, format, text) = r
                if format == None:
                    format = util.guess_format(text)

                if format == 'yin':
                    p = yin_parser.YinParser(extra)
                else:
                    p = yang_parser.YangParser(extra)

                return p.parse(self, ref, text)
            except self.repository.ReadError as ex:
                return None

    def validate(self):
        uris = {}
        for k in self.modules:
            m = self.modules[k]
            if m != None:
                namespace = m.search_one('namespace')
                if namespace != None:
                    uri = namespace.arg
                    if uri in uris:
                        if uris[uri] != m.arg:
                            error.err_add(self.errors, namespace.pos,
                                          'DUPLICATE_NAMESPACE',
                                          (uri, uris[uri]))
                    else:
                        uris[uri] = m.arg

class Repository(object):
    """Abstract base class that represents a module repository"""

    def __init__(self):
        pass

    def get_modules_and_revisions(self, ctx):
        """Return a list of all modules and their revisons

        Returns a tuple (`modulename`, `revision`, `handle`), where
        `handle' is used in the call to get_module_from_handle() to
        retrieve the module.
        """

    def get_module_from_handle(self, handle):
        """Return the raw module text from the repository

        Returns (`ref`, `format`, `text`) if found, or None if not found.
        `ref` is a string which is used to identify the source of
              the text for the user.  used in error messages
        `format` is one of 'yang' or 'yin' or None.
        `text` is the raw text data

        Raises `ReadError`
        """

    class ReadError(Exception):
        """Signals that an error occured during module retrieval"""

        def __init__(self, str):
            Exception.__init__(self, str)

class FileRepository(Repository):
    def __init__(self, path="", use_env=True, no_path_recurse=False):
        """Create a Repository which searches the filesystem for modules

        `path` is a `os.pathsep`-separated string of directories
        """

        Repository.__init__(self)
        self.dirs = path.split(os.pathsep)
        self.no_path_recurse = no_path_recurse

        if use_env:
            modpath = os.getenv('YANG_MODPATH')
            if modpath is not None:
                self.dirs.extend(modpath.split(os.pathsep))

            home = os.getenv('HOME')
            if home is not None:
                self.dirs.append(os.path.join(home, 'yang', 'modules'))

            inst = os.getenv('YANG_INSTALL')
            if inst is not None:
                self.dirs.append(os.path.join(inst, 'yang', 'modules'))
            else:
                self.dirs.append(os.path.join(sys.prefix,
                                              'share','yang','modules'))

        self.modules = None

    def _setup(self, ctx):
        # check all dirs for yang and yin files
        self.modules = []
        r = re.compile(r"^(.*?)(\@(\d{4}-\d{2}-\d{2}))?\.(yang|yin)$")
        def add_files_from_dir(d):
            try:
                files = os.listdir(d)
            except OSError:
                files = []
            for fname in files:
                absfilename = os.path.join(d, fname)
                if os.path.isfile(absfilename):
                    m = r.search(fname)
                    if m is not None:
                        (name, _dummy, rev, format) = m.groups()
                        if not os.access(absfilename, os.R_OK): continue
                        if absfilename.startswith("./"):
                            absfilename = absfilename[2:]
                        handle = (format, absfilename)
                        self.modules.append((name, rev, handle))
                elif (not self.no_path_recurse
                      and d != '.' and os.path.isdir(absfilename)):
                    add_files_from_dir(absfilename)
        for d in self.dirs:
            add_files_from_dir(d)

    # FIXME: bad strategy; when revisions are not used in the filename
    # this code parses all modules :(  need to do this lazily
    def _peek_revision(self, absfilename, format, ctx):
        try:
            fd = open(absfilename)
            text = fd.read()
            if sys.version < "3":
                text = unicode(text, encoding="utf-8")
        except IOError as ex:
            return None
        except UnicodeDecodeError as ex:
            return None
        if format == 'yin':
            p = yin_parser.YinParser()
        else:
            p = yang_parser.YangParser()

        # FIXME: optimization - do not parse the entire text
        # just to read the revisions...
        module = p.parse(ctx, absfilename, text)
        if module is None:
            return None
        return (util.get_latest_revision(module), module)

    def get_modules_and_revisions(self, ctx):
        if self.modules is None:
            self._setup(ctx)
        return self.modules

    def get_module_from_handle(self, handle):
        (format, absfilename) = handle
        try:
            fd = open(absfilename)
            text = fd.read()
            if sys.version < "3":
                text = unicode(text, encoding="utf-8")
        except IOError as ex:
            raise self.ReadError(absfilename + ": " + str(ex))
        except UnicodeDecodeError as ex:
            s = str(ex).replace('utf-8', 'utf8')
            raise self.ReadError(absfilename + ": unicode error: " + s)

        if format is None:
            format = util.guess_format(text)
        return (absfilename, format, text)
