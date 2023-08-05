#!/usr/bin/env python3
# coding=utf-8
"""
Give a rating for a python folder

Usage:
  pycodequality.py [options] <folder>

Options:
  -h --help             Show this screen.
  -s --showhints        Show hints to make the code betterq

author  : rabshakeh (erik@a8.nl)
project : pycodequality
created : 26-05-15 / 15:00
"""
from __future__ import division
from __future__ import print_function
from __future__ import unicode_literals
from __future__ import absolute_import
from builtins import open
from builtins import super
from future import standard_library
standard_library.install_aliases()
from builtins import str
from past.utils import old_div
import os
from cmdssh import call_command
from arguments import Arguments
from consoleprinter import query_yes_no


def get_pylint_conf():
    """
    return pylint configuration
    """
    return """


[MASTER]
# Specify a configuration file.
#rcfile=
# Python code to execute, usually for sys.path manipulation such as
# pygtk.require().
#init-hook=
# Profiled execution.
profile=no

# Add files or directories to the blacklist. They should be base names, not
# paths.
ignore=CVS

# Pickle collected data for later comparisons.
persistent=yes

# List of plugins (as comma separated values of python modules names) to load,
# usually to register additional checkers.
load-plugins=

# Deprecated. It was used to include symbolic ids of messages in output. Use
# --msg-template instead.
# Use multiple processes to speed up Pylint.
jobs=16

# Allow loading of arbitrary C extensions. Extensions are imported into the
# active Python interpreter and may run arbitrary code.
unsafe-load-any-extension=no

# A comma-separated list of package or module names from where C extensions may
# be loaded. Extensions are loading into the active Python interpreter and may
# run arbitrary code
extension-pkg-whitelist=

# Allow optimization of some AST trees. This will activate a peephole AST
# optimizer, which will apply various small optimizations. For instance, it can
# be used to obtain the result of joining multiple strings with the addition
# operator. Joining a lot of strings can lead to a maximum recursion error in
# Pylint and this flag can prevent that. It has one side effect, the resulting
# AST will be different than the one from reality.
optimize-ast=no


[REPORTS]
# Set the output format. Available formats are text, parseable, colorized, msvs
# (visual studio) and html. You can also give a reporter class, eg
# mypackage.mymodule.MyReporterClass.
output-format=text

# Put messages in a separate file for each module / package specified on the
# command line instead of printing them on stdout. Reports (if any) will be
# written in a file name "pylint_global.[txt|html]".
files-output=no

# Tells whether to display a full report or only the messages
reports=yes

# Python expression which should return a note less than 10 (10 is the highest
# note). You have access to the variables errors warning, statement which
# respectively contain the number of errors / warnings messages and the total
# number of statements analyzed. This is used by the global evaluation report
# (RP0004).
evaluation=10.0 - ((float(5 * error + warning + refactor + convention) / statement) * 10)

# Add a comment according to your evaluation note. This is used by the global
# evaluation report (RP0004).
comment=no

# Template used to display messages. This is a python new-style format string
# used to format the message information. See doc for all details
msg-template={msg_id}:{path}:{line}
             {column}:{msg}
             '


[MESSAGES CONTROL]
# Only show warnings with the listed confidence levels. Leave empty to show
# all. Valid levels: HIGH, INFERENCE, INFERENCE_FAILURE, UNDEFINED
confidence=

# Enable the message, report, category or checker with the given id(s). You can
# either give multiple identifier separated by comma (,) or put this option
# multiple time. See also the "--disable" option for examples.
#enable=
# Disable the message, report, category or checker with the given id(s). You
# can either give multiple identifiers separated by comma (,) or put this
# option multiple times (only on the command line, not in the configuration
# file where it should appear only once).You can also use "--disable=all" to
# disable everything first and then reenable specific checks. For example, if
# you want to run only the similarities checker, you can use "--disable=all
# --enable=similarities". If you want to run only the classes checker, but have
# no Warning level messages displayed, use"--disable=all --enable=classes
# --disable=W"
disable=W1630,E1606,W1604,I0021,E1605,W1623,W1615,E1608,W1636,W1626,W1629,W1627,W1611,W1628,W1601,W1621,E1607,E1601,W1614,W1620,W1602,E1604,W1608,W1639,W1607,W1613,W1638,W1619,W1616,E1602,E1603,W0704,W1622,W1612,W1625,W1617,W1632,W1606,W1610,W1618,I0020,W1603,W1635,W1637,W1605,W1634,W1633,W1609,W1624,W1640


[BASIC]
# Required attributes for module, separated by a comma
required-attributes=

# List of builtins function names that should not be used, separated by a comma
bad-functions=map,filter

# Good variable names which should always be accepted, separated by a comma
good-names=i,j,k,ex,Run,_

# Bad variable names which should always be refused, separated by a comma
bad-names=foo,bar,baz,toto,tutu,tata

# Colon-delimited sets of names that determine each other's naming style when
# the name regexes allow several styles.
name-group=

# Include a hint for the correct naming format with invalid-name
include-naming-hint=no

# Regular expression matching correct inline iteration names
inlinevar-rgx=[A-Za-z_][A-Za-z0-9_]*$

# Naming hint for inline iteration names
inlinevar-name-hint=[A-Za-z_][A-Za-z0-9_]*$

# Regular expression matching correct class names
class-rgx=[A-Z_][a-zA-Z0-9]+$

# Naming hint for class names
class-name-hint=[A-Z_][a-zA-Z0-9]+$

# Regular expression matching correct attribute names
attr-rgx=[a-z_][a-z0-9_]{2,30}$

# Naming hint for attribute names
attr-name-hint=[a-z_][a-z0-9_]{2,30}$

# Regular expression matching correct function names
function-rgx=[a-z_][a-z0-9_]{2,30}$

# Naming hint for function names
function-name-hint=[a-z_][a-z0-9_]{2,30}$

# Regular expression matching correct module names
module-rgx=(([a-z_][a-z0-9_]*)|([A-Z][a-zA-Z0-9]+))$

# Naming hint for module names
module-name-hint=(([a-z_][a-z0-9_]*)|([A-Z][a-zA-Z0-9]+))$

# Regular expression matching correct class attribute names
class-attribute-rgx=([A-Za-z_][A-Za-z0-9_]{2,30}|(__.*__))$

# Naming hint for class attribute names
class-attribute-name-hint=([A-Za-z_][A-Za-z0-9_]{2,30}|(__.*__))$

# Regular expression matching correct variable names
variable-rgx=[a-z_][a-z0-9_]{2,30}$

# Naming hint for variable names
variable-name-hint=[a-z_][a-z0-9_]{2,30}$

# Regular expression matching correct method names
method-rgx=[a-z_][a-z0-9_]{2,30}$

# Naming hint for method names
method-name-hint=[a-z_][a-z0-9_]{2,30}$

# Regular expression matching correct constant names
const-rgx=(([A-Z_][A-Z0-9_]*)|(__.*__))$

# Naming hint for constant names
const-name-hint=(([A-Z_][A-Z0-9_]*)|(__.*__))$

# Regular expression matching correct argument names
argument-rgx=[a-z_][a-z0-9_]{2,30}$

# Naming hint for argument names
argument-name-hint=[a-z_][a-z0-9_]{2,30}$

# Regular expression which should only match function or class names that do
# not require a docstring.
no-docstring-rgx=__.*__

# Minimum line length for functions/classes that require docstrings, shorter
# ones are exempt.
docstring-min-length=-1


[FORMAT]
# Maximum number of characters on a single line.
max-line-length=300

# Allow the body of an if to be on the same line as the test if there is no
# else.
single-line-if-stmt=no

# List of optional constructs for which whitespace checking is disabled
no-space-check=trailing-comma,dict-separator

# Maximum number of lines in a module
max-module-lines=1000

# String used as indentation unit. This is usually " " (4 spaces) or "\t" (1
# tab).
indent-string='    '

# Number of spaces of indent required inside a hanging or continued line.
indent-after-paren=4

# Expected format of line ending, e.g. empty (any line ending), LF or CRLF.
expected-line-ending-format=


[LOGGING]
# Logging modules to check that the string format arguments are in logging
# function parameter format
logging-modules=logging


[MISCELLANEOUS]
# List of note tags to take in consideration, separated by a comma.
notes=FIXME,XXX,TODO


[SIMILARITIES]
# Minimum lines number of a similarity.
min-similarity-lines=4

# Ignore comments when computing similarities.
ignore-comments=yes

# Ignore docstrings when computing similarities.
ignore-docstrings=yes

# Ignore imports when computing similarities.
ignore-imports=no


[SPELLING]
# Spelling dictionary name. Available dictionaries: none. To make it working
# install python-enchant package.
spelling-dict=

# List of comma separated words that should not be checked.
spelling-ignore-words=

# A path to a file that contains private dictionary; one word per line.
spelling-private-dict-file=

# Tells whether to store unknown words to indicated private dictionary in
# --spelling-private-dict-file option instead of raising a message.
spelling-store-unknown-words=no


[TYPECHECK]
# Tells whether missing members accessed in mixin class should be ignored. A
# mixin class is detected if its name ends with "mixin" (case insensitive).
ignore-mixin-members=yes

# List of module names for which member attributes should not be checked
# (useful for modules/projects where namespaces are manipulated during runtime
# and thus existing member attributes cannot be deduced by static analysis
ignored-modules=

# List of classes names for which member attributes should not be checked
# (useful for classes with attributes dynamically set).
ignored-classes=SQLObject

# When zope mode is activated, add a predefined set of Zope acquired attributes
# to generated-members.
zope=no

# List of members which are set dynamically and missed by pylint inference
# system, and so shouldn't trigger E0201 when accessed. Python regular
# expressions are accepted.
generated-members=REQUEST,acl_users,aq_parent


[VARIABLES]
# Tells whether we should check for unused import in __init__ files.
init-import=no

# A regular expression matching the name of dummy variables (i.e. expectedly
# not used).
dummy-variables-rgx=_$|dummy

# List of additional names supposed to be defined in builtins. Remember that
# you should avoid to define new builtins when possible.
additional-builtins=

# List of strings which can identify a callback function by name. A callback
# name must start or end with one of those strings.
callbacks=cb_,_cb


[CLASSES]
# List of interface methods to ignore, separated by a comma. This is used for
# instance to not check methods defines in Zope's Interface base class.
ignore-iface-methods=isImplementedBy,deferred,extends,names,namesAndDescriptions,queryDescriptionFor,getBases,getDescriptionFor,getDoc,getName,getTaggedValue,getTaggedValueTags,isEqualOrExtendedBy,setTaggedValue,isImplementedByInstancesOf,adaptWith,is_implemented_by

# List of method names used to declare (i.e. assign) instance attributes.
defining-attr-methods=__init__,__new__,setUp

# List of valid names for the first argument in a class method.
valid-classmethod-first-arg=cls

# List of valid names for the first argument in a metaclass class method.
valid-metaclass-classmethod-first-arg=mcs

# List of member names, which should be excluded from the protected access
# warning.
exclude-protected=_asdict,_fields,_replace,_source,_make


[DESIGN]
# Maximum number of arguments for function / method
max-args=5

# Argument names that match this expression will be ignored. Default to name
# with leading underscore
ignored-argument-names=_.*

# Maximum number of locals for function / method body
max-locals=15

# Maximum number of return / yield for function / method body
max-returns=6

# Maximum number of branch for function / method body
max-branches=12

# Maximum number of statements in function / method body
max-statements=50

# Maximum number of parents for a class (see R0901).
max-parents=7

# Maximum number of attributes for a class (see R0902).
max-attributes=7

# Minimum number of public methods for a class (see R0903).
min-public-methods=2

# Maximum number of public methods for a class (see R0904).
max-public-methods=20


[IMPORTS]
# Deprecated modules which should not be used, separated by a comma
deprecated-modules=stringprep,optparse

# Create a graph of every (i.e. internal and external) dependencies in the
# given file (report RP0402 must not be disabled)
import-graph=

# Create a graph of external dependencies in the given file (report RP0402 must
# not be disabled)
ext-import-graph=

# Create a graph of internal dependencies in the given file (report RP0402 must
# not be disabled)
int-import-graph=


[EXCEPTIONS]
# Exceptions that will emit a warning when being caught. Defaults to
# "Exception"
overgeneral-exceptions=Exception
"""


class IArguments(Arguments):
    """
    IArguments
    """
    def __init__(self, doc=None):
        """
        @type doc: str, None
        @return: None
        """
        self.folder = ""
        self.help = False
        self.showhints = False
        super().__init__(doc)


def check_files(checkfiles, files, filepatho):
    """
    @type checkfiles: set
    @type files: list
    @type filepatho: str
    @return: None
    """
    for file in files:
        if file.endswith(".py"):
            filepath = os.path.join(filepatho, file)

            if os.path.exists(filepath):
                checkfiles.add(filepath)
            else:
                raise RuntimeError(str(filepath) + " does not exist")


def cleanresult(result):
    """
    @type result: str
    @return: None
    """
    result1 = result.replace("Your code has been rated at", "").replace("previous run", "was").replace("/10", "").strip()
    if result1.strip() != "":
        if "(was" in result1:
            pass
        else:
            result1 = str(max(0, float(result1)))

    return result1


def doreport(cnt, filepath, numfiles, rest, showhints):
    """
    @type cnt: int
    @type filepath: str
    @type numfiles: int
    @type rest: tuple
    @type showhints: bool
    @return: None
    """
    result, result1, result2 = rest
    try:
        float(result1)
    except ValueError:
        result1 = "0"
    try:
        float(result2)
    except ValueError:
        result2 = "0"
    if float(result1) < 10 and showhints:
        if float(result1) < 5.5:
            result1 = "\033[31m" + str(result) + "\033[0m"

        cmd = "pylint -j 8 --rcfile=~/.pylint.conf --load-plugins pylint_django " + filepath
        hints = call_command(cmd, streamoutput=False, returnoutput=True, ret_and_code=True)
        print("\033[37mreturncode: " + str(hints[0]) + "\033[0m")
        reports = hints[1].split("Report")[0].strip().split("---------------")

        for reportline in reports:
            first = True
            reportlinesegment(first, reportline)

        if cnt < numfiles:
            if not query_yes_no("Continue with next file?", default=False):
                raise SystemExit()

    color = 30
    try:
        float(result1)
    except ValueError:
        result1 = "0"
    try:
        float(result2)
    except ValueError:
        result2 = "0"

    if "invalid syntax" in result:
        print("\033[34m" + str(cnt) + ". " + os.path.join(os.path.basename(os.path.dirname(filepath)), os.path.basename(filepath)) + ":\033[34m", result1, "\n\033[31m" + result2, "\033[0m")
    else:
        if ", -" in result2:
            color = 31
        elif ", +" in result2:
            color = 32
        else:
            if float(result1) < 5.5:
                color = 31
            elif float(result1) > 5.5 and float(result1) < 10:
                color = 33
            elif float(result1) == 10:
                color = 92

        print("\033[34m" + str(cnt) + ". " + os.path.join(os.path.basename(os.path.dirname(filepath)), os.path.basename(filepath)) + ":\033[" + str(color) + "m", result1, "\033[90m" + result2, "\033[0m")


def reportlinesegment(first, reportline):
    """
    @type first: bool
    @type reportline: str
    @return: None
    """
    for reportlineseg in reportline.split("***************"):
        try:
            if first:
                for lines in reportlineseg.split("\n\n"):
                    linecnt = 0

                    for line in lines.split("\n"):
                        if ":" not in line:
                            print("\033[34m" + line.replace("************* ", "") + "\033[0m\n-------")
                        else:
                            if linecnt % 2 == 0:
                                color = 37
                            else:
                                color = 33

                            print("\033[" + str(color) + "m" + line + "\033[0m")
                            linecnt += 1

                    print()
            else:
                print("\033[97m" + reportlineseg + "\033[0m")

            first = False
        except BaseException as exc:
            print(exc)
            print(reportlineseg)


def rate_code(cnt, filepath, showhints, numfiles):
    """
    @type cnt: int
    @type filepath: str
    @type showhints: bool
    @type numfiles: int
    @return: None
    """
    cmd = "pylint -j 8 --rcfile=~/.pylint.conf --load-plugins pylint_django " + filepath + " | grep -e 'Your code has' -e 'invalid syntax'"
    result = call_command(cmd, streamoutput=False, returnoutput=True, ret_and_code=True)[1]

    if "invalid syntax" in result:
        result1 = "0"
        cmd = "pylint -j 8 --rcfile=~/.pylint.conf --load-plugins pylint_django " + filepath
        result = call_command(cmd, streamoutput=False, returnoutput=True, ret_and_code=True)[1]
        result2 = result.split("************* Module pycodequality.__init__")[0]
    elif "0.00)" in result:
        result1 = result.split("(")[0].strip()
        result2 = ""
    else:
        rsp = result.split("(")
        result1 = rsp[0].strip()

        if len(rsp) > 1:
            result2 = "(" + rsp[1].strip()
        else:
            result2 = str(result)

    if "(was" in result:
        fresult1 = result1 = cleanresult(result1)
        result2 = cleanresult(result2)
    elif "invalid syntax" not in result:
        fresult1 = result1 = cleanresult(result1)
        result2 = cleanresult(result2)
    else:
        fresult1 = result2

    doreport(cnt, filepath, numfiles, (result, result1, result2), showhints)
    if "invalid syntax" in fresult1:
        print("invalid syntax detected (py3 only?)")
        exit(1)
    return float(fresult1)


def main():
    """
    main
    """
    arguments = IArguments(__doc__)
    confilepathath = os.path.expanduser("~/.pylint.conf")
    pylintconf = get_pylint_conf()

    pylintconf += "\n# Regexp for a line that is allowed to be longer than the limit.\n"
    pylintconf += r"ignore-long-lines=^\s*(# )?<?https?://\S+>?$\n\n"

    print("\033[91mRating your code:", arguments.folder, "\033[0m")
    open(confilepathath, "w").write(pylintconf)
    checkfiles = set()

    if os.path.isfile(arguments.folder):
        checkfiles = [os.path.expanduser(arguments.folder)]
        arguments.showhints = True
    else:
        for root, _, files in os.walk(arguments.folder):
            check_files(checkfiles, files, root)

    checkfiles = list(checkfiles)
    checkfiles.sort(key=lambda x: (os.path.dirname(x), os.path.basename(x)))
    cnt = 0
    totalscore = 0.0

    for filepath in checkfiles:
        cnt += 1
        totalscore += rate_code(cnt, filepath, arguments.showhints, len(checkfiles))

    if cnt > 0:
        print("\033[34m---\nstotalscore:\033[34m {:.2f}".format(old_div(totalscore, cnt)), "\033[0m")


if __name__ == "__main__":
    try:
        main()
    except SystemExit as exitmsg:
        print(exitmsg)
        exit(0)
