Lognotify
=========

This is yet another log scanner done for the ever reoccurring reason of failure to find an existing suitable tool.

Features
--------

* simple, yet flexible configuration in the `YAML <http://yaml.org>`_ format
* actions programmable in Python, Tcl or Bash
* log rotation detection

Configuration
-------------

Lognotify reads a configuration file specified on the command line with the ``--config`` or ``-c`` option. The
configuration specifies what content to search for and what to do if some is found in the log.

Overview
........

Consider this example::

    when:
        - error
        - '"Warning"'
        - problem
        - critical
        - fatal
        - bad
        - '/[Cc]obol/'
        -
            - "not "
            - ^perl
            - '^/[Pp]ascal/'
    do:
        - python
        - |
            if logfile:
                print('{}: {}'.format(logfile, message))
    ---
    when:
        - strange
    do: |
        echo $logfile: $message

A configuration can have one ore more sections, denoted by a ``---`` delimiting line. Each section specifies what to
look for and what to do if something interesting is found.

Sections
........

Each section consists of a `when` clause and a `do` clause. For every line from a logfile, all sections are checked for
matching search expressions in the `when` clause.  When a match is found for a section, the corresponding `do` clause
is executed.

`When` clause
.............

The `when` clause contains an itemized list of expressions to searche for in every incoming line from the log.
Variations in syntax specify how to search for the item. The expressions are tried in order. As soon as a match is
found, the `do` clause is executed and processing of this particular section is terminated.

The `when` list forms an `OR`-expression. Within the list, sublists may specify `AND`-expressions. Thus ::

    - expr1
    -
        - expr2a
        - expr2b

means ::

    expr1 OR (expr2a AND expr2b)

Groups can be infinitely nested. The general rule is that every group within an `OR` group is an `AND` group and vice
versa.

Search expressions
..................

A search expression can have one of the following forms:

**word**
    Search for `word` irrespective of case and match only at word boundaries. Thus ``error`` matches in the following
    lines:

        Error: invalid syntax

        An error occurred.

        No error-checking enabled.

    but *not* in:

        No errorchecking.

    If you want to match irrespective of word boundaries, you have to use quoted expressions or regular expressions
    (see below).

**"word"** or **'word'**
    Search for an exact occurrence of `word`. Case is relevant.

**/word/[flags]**
    Search for a `regular expression <https://docs.python.org/2/library/re.html>`_. Some flags for altering the
    operation are available:

    *i*
        match case insensitive. See *IGNORECASE* in the documentation.

    *m*
        match in multi-line mode. Probably not very useful. See *MULTILINE* in the documentation.

    *l*
        match according to the current locale. See *LOCALE* in the documentation.

    *s*
        make '.' match any character, including newline. See *DOTALL* in the documentation.

    *u*
        match according to the Unicode character properties table. See *UNICODE* in the documentation.

    *x*
        parse verbose regex with comments and white space. See *VERBOSE* in the documentation.


All these expressions can be prefixed with a caret (``^``) to mean "do not match word":

**^word**

**^"word"** or **^'word'**

**^/word/**

.. note::

    Since the whole configuration is expressed in YAML, strings containing certain characters must be quoted in order
    not to interfere with the YAML syntax. These characters are: ``[ ] { } ! " ' : ? % @ , - # ~ | > * &``. This means
    that quoted expressions must be quoted themselves with the alternate quote, either as ``"'word'"`` or as
    ``'"word"'``. Also, certain words have special meaning in YAML and must therefore also be quoted: ``yes``, ``no``,
    ``on``, ``off``, ``true``, ``false``, ``null``.

Pitfalls
........

The search algorithm gives rise to surprises in certain constellations. One common error is to request something
like this::

    -
        - not
        - ^this
    -
        - not
        - ^that

where `^this` and `^that` cancel each other out. If a line contains 'not' it will always match, no matter whether `this`
or `that` occurs in the line. The proper way would be ::

    -
        - not
        - ^this
        - ^that

The most common pattern is to search for any line containing `word1`, `word2` or `word3` but not `except1` or `except2`.
You might be inclined to write this as ::

    - word1
    - word2
    - word3
    -
        - ^except1
        - ^except2

But this would not work. The way to do it goes along the follong lines: written as a logical expression, it would be ::

    (word1 OR word2 OR word3) AND (NOT except1 OR NOT except2)

which translates to ::

    (word1 OR word2 OR word3) AND NOT except1 AND NOT except2

which, expressed as list operations, translates as ::

    AND(OR(word1, word2, word3), NOT(except1), NOT(except2))

We have therefore an AND list on top. However, in lognotify we start out in an OR list. We therefore have to put our AND
list as the single element into the top OR list. The final result would be ::

    # OR list
    -
        # AND list
        -
            # OR list
            - word1
            - word2
            - word3
        - ^except1
        - ^except2

`Do` clause
...........

The `do` clause specifies what action to take when one of the expressions in the `when` clause matches. To run commands
on the selected logfile lines, `Python <http://python.org>`_, Bash or `Tcl <http://tcl.tk>`_ can be used. Some variables
are injected:

**logfile**
    The path of the logfile where the message appears

**sequenceNo**
    sequence number

**message**
    The line in the logfile

**context**
    A list containing lines running up to the current one

Python example::

    do:
        - python
        - |
            print('%s: %s' % (logfile, message))

Tcl example::

    do:
        - tcl
        - |
            puts "$logfile $sequenceNo: $message"

Bash example::

    do:
        - bash
        - |
            echo $logfile: $message

But since `bash` is the default language, it can be written as::

    do: |
        echo $logfile: $message

.. note::

    The pipe character at the end of a line causes YAML to process the following indented block without
    interpretation, leaving line endings intact.

The `do` clause can be omitted altogether in which case a default of ::

    do:
        - python
        - |
            print('%s: %s' % (logfile, message))

is assumed.

Running
-------

Command synopsis:

    ``lognotify`` [``-h``] ``--config`` `CONFIG` [``--full``] [``--debug``] [``--version``] ``logfile`` [``logfile`` ...]

    positional arguments:
      ``logfile``

    optional arguments:
      -h, --help            show this help message and exit
      --config CONFIG, -c CONFIG
                            specify config file
      --full, -f            scan files from beginning
      --debug, -d           Print some debug information to stderr
      --version, -v         display version and exit

At least one path to an existing, readable log file is expected.

The ``--full`` or ``-f`` option requests reading files from the start. Without the flag, reading begins at the current
end of file.

The ``--debug`` or ``-d`` option sends information to the standard error file. Repeating the flag increases the
amount of information.