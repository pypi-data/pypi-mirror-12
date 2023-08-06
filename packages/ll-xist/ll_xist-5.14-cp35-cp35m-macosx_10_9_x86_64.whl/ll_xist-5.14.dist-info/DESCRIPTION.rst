XIST provides an extensible HTML and XML generator. XIST is also a XML parser
with a very simple and pythonesque tree API. Every XML element type corresponds
to a Python class and these Python classes provide a conversion method to
transform the XML tree (e.g. into HTML). XIST can be considered
'object oriented XSLT'.

XIST also includes the following modules and packages:

* ``ll.ul4c`` is compiler for a cross-platform templating language with
  similar capabilities to `Django's templating language`__. ``UL4`` templates
  are compiled to an internal format, which makes it possible to implement
  template renderers in other languages and makes the template code "secure"
  (i.e. template code can't open or delete files).

  __ https://docs.djangoproject.com/en/1.5/topics/templates/

  There are implementations for Python, Java and Javascript.

* ``ll.ul4on`` provides functions for encoding and decoding a lightweight
  machine-readable text-based format for serializing the object types supported
  by UL4. It is extensible to allow encoding/decoding arbitrary instances
  (i.e. it is basically a reimplementation of ``pickle``, but with string
  input/output instead of bytes and with an eye towards cross-plattform
  support).

  There are implementations for Python, Java, Javascript and PHP.

* ``ll.orasql`` provides utilities for working with cx_Oracle_:

  - It allows calling functions and procedures with keyword arguments.

  - Query results will be put into Record objects, where database fields
    are accessible as object attributes.

  - The ``Connection`` class provides methods for iterating through the
    database metadata.

  - Importing the modules adds support for URLs with the scheme ``oracle`` to
    ``ll.url``.

  .. _cx_Oracle: http://cx-oracle.sourceforge.net/

* ``ll.make`` is an object oriented make replacement. Like make it allows
  you to specify dependencies between files and actions to be executed
  when files don't exist or are out of date with respect to one
  of their sources. But unlike make you can do this in a object oriented
  way and targets are not only limited to files.

* ``ll.color`` provides classes and functions for handling RGB color values.
  This includes the ability to convert between different color models
  (RGB, HSV, HLS) as well as to and from CSS format, and several functions
  for modifying and mixing colors.

* ``ll.sisyphus`` provides classes for running Python scripts as cron jobs.

* ``ll.url`` provides classes for parsing and constructing RFC 2396
  compliant URLs.

* ``ll.nightshade`` can be used to serve the output of PL/SQL
  functions/procedures with CherryPy__.

* ``ll.misc`` provides several small utility functions and classes.

* ``ll.astyle`` can be used for colored terminal output (via ANSI escape
  sequences).

* ``ll.daemon`` can be used on UNIX to fork a daemon process.

* ``ll.xml_codec`` contains a complete codec for encoding and decoding XML.

__ http://www.cherrypy.org/


Changes in 5.14 (released 12/02/2015)
-------------------------------------

* Whitespace handling for UL4 templates has been extended. There are three
  possible whitespace handling modes now (specified via the new ``whitespace``
  parameter): ``"keep"`` (the old ``keepws=True``) ``"strip"`` (the old
  ``keepws=False``) and the new ``"smart"``.

  In smart mode if a line contains only indentation and one tag that doesn't
  produce output, the indentation and the linefeed after the tag will be
  stripped from the text. Furthermore the additional indentation that might be
  introduced by a ``for``, ``if``, ``elif``, ``else`` or ``def`` block will be
  ignored.

  Rendering a template from within another template will reindent the output
  of the inner template to the indentation of the outer template.

* Rendering an UL4 template from inside a UL4 template is now again done via
  the ``<?render?>`` tag.

* Whitespace handling mode for UL4 templates can now be specified in the
  template source itself via the ``<?whitepace?>`` tag::

    <?whitespace smart?>

* The name and signature of an UL4 template can now be specified in the
  template source too like this::

    <?ul4 name(x, y, *args, **kwargs)?>

* Closures in UL4 templates no longer see the state of the variables at the
  time when the local template was defined, but at the time when it is called.
  This is similar to most other languages that support closures.

* In UL4 tags whitespace is allowed now before the tag name, i.e.::

    <? for i in range(10) ?>
      <? print i ?>
    <? end for ?>

* Exposing attributes of objects to UL4 templates can now be customized via
  the methods ``ul4getattr`` and ``ul4setattr``. Support for making
  attributes writable or exposing them under a different name via ``ul4attrs``
  has been removed.

* An object can now be made renderable by UL4 templates by implementing the
  method ``ul4render``.

* An object can now be made callable by UL4 templates by implementing the
  method ``ul4call`` (``__call__`` is still supported).

* Stacktraces produced by UL4 templates now include less chained exceptions
  and are much more informative.

* The ``rul4`` option ``--keepws`` has been renamed to
  ``--whitespace`` and defaults to ``smart`` now.

* ``rul4`` got a new option ``--stacktrace``: ``full`` displays the full
  Python stack trace, ``short`` (the new default) only displays the exception
  chain without displaying any Python source.

* Templates used in ``rul4`` have access to a new function: ``import``, which
  can be used to load templates from any file.

* UL4 got two new comparison operators: ``is`` and ``is not`` for checking
  for object identity.

* ``oradd`` has been renamed to ``pysql``. The commands are now no longer
  limited to being on one line. Normal SQL commands are now also supported.
  Normal SQL commands must be terminated with a comment line starting with
  ``-- @@@`` and PySQL commands must be either on one line, or start with a
  line containing only ``{`` and end with a line containing only ``}``.

  Three new commands have been added: ``include`` includes another ``pysql``
  file. ``compileall`` recompiles all objects in the schema and ``checkerrors``
  raises an exception if there are objects with compilation errors in the schema.

  Also ``str``/``bytes`` values can be loaded from external files via the
  ``load`` class.

* If an identifier is given when invoking a ``sisyphus`` job it will be
  included in the log file name now by default.

* Three new helper functions were added to ``ll.misc``:
  ``format_class`` formats the name of a class object (e.g. ``ValueError``
  or ``http.client.HTTPException``). ``format_exception``
  formats an exception::

    >>> misc.format_exception(ValueError("bad value"))
    'ValueError: bad value'

  :func`exception_chain` traverses the chain of exceptions (via the
  ``__cause__`` and ``__context__`` attributes).

* ``+`` in the path part of URLs are now considered safe characters. Spaces
  will be escaped as ``%20`` and no longer as ``+``.

* ``ll.orasql.Comment`` has a new method ``comment`` that returns the
  text of the column comment itself.

* The database objects output by ``ll.orasql.Object.iterreferences`` and
  ``ll.orasql.Oracle.iterreferencedby`` are now sorted by name to get a
  stable order of dependencies.

* ``ll.misc`` has two new functions: ``notifystart`` and
  ``notifyfinish``. The can be used for issuing Mac OS X notifications.




