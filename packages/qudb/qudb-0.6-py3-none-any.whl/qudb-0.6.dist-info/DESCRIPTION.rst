qudb: Question Database
=======================

*Manage a database of questions and use it to generate assessments, e.g.
assignments, quizzes, and exams.*

*qudb* is a personal question bank for instructors. It allows you to:

1. Manage your collection of questions for a given course, and assemble
   various assessments out of them.

2. Track how you are using your questions. Query your database for
   *questions*, *terms*, *assessments*, or *assessment types*.

   An *assessment type* refers to a type of assessments that recur at
   most once every term, such as *quiz1*, *assignment2*, and *final*. It
   can be any arbitrary string identifying a type of assessment. An
   *assessment* is a specific occurrence of an *assessment type* in a
   given *term*, and hence is identified by a pair of a *term* and an
   *assessment type*.

   Example queries:

   -  In which assessments has a given question been used?
   -  What questions make up a given assessment?
   -  What questions have been used in a given term?
   -  What questions have been used in final exams across all terms?

3. Use a template to render an assessment document using its questions.

4. Distinguish between essay questions (default) and multiple-choice
   questions.

5. Use arbitrary additional variables in your templates, so you can use
   the same templates across courses by introducing, for example, an
   additional *course name* variable.

Getting Started
---------------

1. Create a database:

   ::

       qm init

   By default, this command creates a ``./qu.db`` database file. Use the
   ``-D`` (or ``--database``) option to specify the database file
   location.

2. Add questions to assessments (an assessment is identified by a *term*
   and an *assessment type*):

   ::

       qm add --term 151 --assessment-type quiz1 questions/chapter1/whats-your-name.tex
       qm add --term 151 --assessment-type quiz1 questions/chapter1/mcq/choose-a-month.tex

   Use the ``-Q`` (or ``--questions-directory``) option to specify where
   to look for the question files. You can also specify a question's
   *points* (``-p``), whether it's a *bonus* question (``-b``), and its
   *order* in the assessment (``-o``) if you want to insert it somewhere
   in the middle. The *points*, *bonus*, and *order* fields of a
   question are per assessment, and can change from one assessment to
   another.

3. Generate an assessment:

   ::

       qm render --term 151 --assessment-type quiz1 --pdflatex quiz-template.tex

   The ``--pdflatex`` option (or ``-P``) assumes that your template is a
   LaTeX file, requires the ``pdflatex`` program, and generates a PDF.
   Without it, you get a rendered template.

   The ``--config`` option (or ``-C``) allows specifying additional
   arbitrary template variables using an `INI-style configuration
   file <https://docs.python.org/3/library/configparser.html#supported-ini-file-structure>`__.

Commands
--------

Although the ``init``, ``add``, and ``render`` commands described above
are often enough, there are a few other commands that complement them.
Moreover, these three commands have a few options that control their
operation. Here are all the supported commands and their options.

``init``
~~~~~~~~

::

    usage: qm init [-h] [-D DATABASE]

    Create a new database file as specified by the -D option. Defaults to ./qu.db.
    If the database exists, do nothing

    optional arguments:
      -h, --help            show this help message and exit
      -D DATABASE, --database DATABASE
                            SQLite database file path

``list``
~~~~~~~~

::

    usage: qm list [-h] [-D DATABASE] [-Q QUESTIONS_DIRECTORY] [-t TERM]
                   [-y ASSESSMENT_TYPE] [-q QUESTION] [-m]
                   {terms,assessment-types,assessments,questions}

    List existing entities: terms, assessment-types, assessments, or questions

    positional arguments:
      {terms,assessment-types,assessments,questions}
                            what to list

    optional arguments:
      -h, --help            show this help message and exit
      -D DATABASE, --database DATABASE
                            SQLite database file path
      -Q QUESTIONS_DIRECTORY, --questions-directory QUESTIONS_DIRECTORY
                            where to look for questions. Question paths stored in
                            the database are relative to this path
      -t TERM, --term TERM  academic semester code, e.g. 142
      -y ASSESSMENT_TYPE, --assessment-type ASSESSMENT_TYPE
                            examples: major1, assignment2, quiz3
      -q QUESTION, --question QUESTION
                            include results related to this question only
      -m, --mcq             whether to retrieve MCQs or non-MCQs. cannot retrieve
                            both at once

``add``
~~~~~~~

::

    usage: qm add [-h] [-D DATABASE] [-Q QUESTIONS_DIRECTORY] -t TERM -y
                  ASSESSMENT_TYPE [-b] [-p POINTS] [-o ORDER] [-d DATE]
                  question

    Add a question file to a given assessment, specified by a term and an
    assessment-type (required options)

    positional arguments:
      question              path to the question file

    optional arguments:
      -h, --help            show this help message and exit
      -D DATABASE, --database DATABASE
                            SQLite database file path
      -Q QUESTIONS_DIRECTORY, --questions-directory QUESTIONS_DIRECTORY
                            where to look for questions. Question paths stored in
                            the database are relative to this path
      -t TERM, --term TERM  academic semester (3 digits)
      -y ASSESSMENT_TYPE, --assessment-type ASSESSMENT_TYPE
                            examples: major1, assignment2, quiz3
      -b, --bonus           this is a bonus question
      -p POINTS, --points POINTS
                            default points for question
      -o ORDER, --order ORDER
                            the order of the question in this assessment; defaults
                            to last
      -d DATE, --date DATE  assessment date; format YYYY-MM-DD

``update``
~~~~~~~~~~

::

    usage: qm update [-h] [-D DATABASE] [-Q QUESTIONS_DIRECTORY] -t TERM -y
                     ASSESSMENT_TYPE [-b] [-p POINTS] [-o ORDER] [-d DATE]
                     question

    Update an existing assessment or question

    positional arguments:
      question              path to the question file

    optional arguments:
      -h, --help            show this help message and exit
      -D DATABASE, --database DATABASE
                            SQLite database file path
      -Q QUESTIONS_DIRECTORY, --questions-directory QUESTIONS_DIRECTORY
                            where to look for questions. Question paths stored in
                            the database are relative to this path
      -t TERM, --term TERM  academic semester (3 digits)
      -y ASSESSMENT_TYPE, --assessment-type ASSESSMENT_TYPE
                            examples: major1, assignment2, quiz3
      -b, --bonus           this is a bonus question
      -p POINTS, --points POINTS
                            default points for question
      -o ORDER, --order ORDER
                            the order of the question in this assessment; defaults
                            to last
      -d DATE, --date DATE  assessment date; format YYYY-MM-DD

``remove`` (or ``rm``)
~~~~~~~~~~~~~~~~~~~~~~

::

    usage: qm remove [-h] [-D DATABASE] [-Q QUESTIONS_DIRECTORY] -t TERM -y
                     ASSESSMENT_TYPE

    Remove a question from an assessment

    optional arguments:
      -h, --help            show this help message and exit
      -D DATABASE, --database DATABASE
                            SQLite database file path
      -Q QUESTIONS_DIRECTORY, --questions-directory QUESTIONS_DIRECTORY
                            where to look for questions. Question paths stored in
                            the database are relative to this path
      -t TERM, --term TERM  academic semester (3 digits)
      -y ASSESSMENT_TYPE, --assessment-type ASSESSMENT_TYPE
                            examples: major1, assignment2, quiz3

``render``
~~~~~~~~~~

::

    usage: qm render [-h] [-D DATABASE] [-Q QUESTIONS_DIRECTORY] -t TERM -y
                     ASSESSMENT_TYPE [-O OUTPUT_DIRECTORY] [-C CONFIG] [-P]
                     [-l MATERIAL]
                     template

    Generate assessment documents using the specified template. Two documents are
    generated: TERM-ASSESSMENT_TYPE.tex and TERM-ASSESSMENT_TYPE-solution.tex,
    with the template variable "solution" set to False and True, respectively.
    Templates are rendered using the Jinja2 template engine, with the following
    delimiters: <% block %><% endblock %>, << variable >>, <# comment #>

    positional arguments:
      template              path to the jinja2 template file

    optional arguments:
      -h, --help            show this help message and exit
      -D DATABASE, --database DATABASE
                            SQLite database file path
      -Q QUESTIONS_DIRECTORY, --questions-directory QUESTIONS_DIRECTORY
                            where to look for questions. Question paths stored in
                            the database are relative to this path
      -t TERM, --term TERM  academic semester (3 digits)
      -y ASSESSMENT_TYPE, --assessment-type ASSESSMENT_TYPE
                            examples: major1, assignment2, quiz3
      -O OUTPUT_DIRECTORY, --output-directory OUTPUT_DIRECTORY
                            the directory in which the rendered files will be
                            saved
      -C CONFIG, --config CONFIG
                            ini-style configuration file defining additional
                            template variables. (Use section [templates])
      -P, --pdflatex        process rendered file with pdflatex (4 runs)
      -l MATERIAL, --material MATERIAL
                            specify the material to which this assessment
                            pertains. Available to the template in the "material"
                            variable

``export``
~~~~~~~~~~

::

    usage: qm export [-h] [-D DATABASE] [--overwrite] file

    Export the database to a YAML file (does not include the contents of question
    files)

    positional arguments:
      file                  YAML file to export to

    optional arguments:
      -h, --help            show this help message and exit
      -D DATABASE, --database DATABASE
                            SQLite database file path
      --overwrite           overwrite the file if it already exists

``import``
~~~~~~~~~~

::

    usage: qm import [-h] [-D DATABASE] [-Q QUESTIONS_DIRECTORY] [-u] file

    Import data from a YAML file into the database. To learn the YAML schema,
    export a minimal database, or see the README.md file

    positional arguments:
      file                  YAML file to import

    optional arguments:
      -h, --help            show this help message and exit
      -D DATABASE, --database DATABASE
                            SQLite database file path
      -Q QUESTIONS_DIRECTORY, --questions-directory QUESTIONS_DIRECTORY
                            where to look for questions. Question paths stored in
                            the database are relative to this path
      -u, --update          ignore existing, identical questions

Example valid YAML data:

.. code:: yaml

    '142':          # term code
      quiz1:  # assessment type: creates an assessment in the parent term
      - file: questions/chapter1/q1.tex  # each item in the list is a question
      - file: questions/chapter2/q5.tex  # file: the file containing the question text
        date: 2015-02-14  # a date in any question sets the assessment date
      - bonus: true  # set this question as a bonus question
        file: questions/chapter2/arm-gcc.tex
        points: 20   # how many points are assigned to this question in this assessment
      quiz2:   # another assessment in the same term
      - date: 2015-03-07
        file: questions/chapter3/q2.tex
      - file: questions/chapter3/q3.tex
        points: 20
    '151':          # another term
      quiz1:  # this is a different assessment from the previous quiz1,
              # because it belongs to a different term
      - file: questions/chapter6/q3.tex

Templates
---------

Templates use the `Jinja2 <http://jinja.pocoo.org/>`__ template
language. The ``render`` command requires the ``--term`` and
``--assessment-type`` options to specify an *assessment*. The following
assessment variables are available in the template:

-  ``term``: the term of the specified assessment.
-  ``title``: assessment title, based on its type. For example, *quiz1*
   results in the title *Quiz 1*, and *major1* results in the title
   *Major Exam 1*.
-  ``date``: assessment date, as specified using the ``--date`` option
   of the ``add`` and ``update`` commands.
-  ``solution`` (Boolean): whether we are rendering the solution.
-  ``qs``: an ordered list of question objects belonging to this
   assessment. Includes the following fields:

   -  ``question.file``: path of the question file.
   -  ``points``: question points.
   -  ``bonus`` (Boolean): whether this is a bonus question.

-  ``mcqs``: an ordered list of multiple-choice question objects,
   otherwise similar to ``qs``.
-  ``questions_relpath``: the relative path from the current directory
   to the questions as specified by the ``-Q``/``--questions-directory``
   option.

Variables can be referenced in the template by enclosing them in ``<<``
and ``>>``. For example, ``<< title >>`` renders the assessment's
*title*.

To use some basic logic in the template, use template statements, such
as ``for`` loops or ``if`` conditionals, by enclosing them in ``<%`` and
``%>``. For example:

.. code:: jinja

    <% for q in qs %>
        <% if q.bonus %>
            \bonusquestion
        <% else %>
            \question
        <% endif %>
        <% if q.points %>[<< q.points >>]<% endif %>
        \input{<< questions_relpath >>/<< q.question.file >>}
    <% endfor %>

For information about the template language, consult the `Jinja2
Template Designer
Documentation <http://jinja.pocoo.org/docs/dev/templates/>`__.

Assumptions
-----------

-  One `SQLite <https://www.sqlite.org/>`__ database file per course.
-  Questions and templates are text files.
-  Multiple choice questions have an ``/mcq/`` component in their paths.
-  Each question file includes the question's solution in a way that
   allows it to be easily listed or omitted in a template.
-  Although it is not required, *qudb* works well with the
   `exam <https://www.ctan.org/pkg/exam>`__ LaTeX package. For example,
   each question file can wrap the solution in a ``solution``
   environment, then the template can easily include or exclude the
   solution based on the value of the ``solution`` template variable as
   follows:

.. code:: jinja

    <% if solution %>
    \printanswers
    <% endif %>

License
-------

BSD (2-clause).


