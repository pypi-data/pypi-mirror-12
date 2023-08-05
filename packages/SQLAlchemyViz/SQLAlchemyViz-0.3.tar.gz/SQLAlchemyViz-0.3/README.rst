=============
SQLAlchemyViz
=============

SQLAlchemyViz is a command line utility to create entity-relations diagrams
from database schemas modeled with `SQLAlchemy <http://www.sqlalchemy.org/>`_
using `Graphviz <http://www.graphviz.org/>`_.

============
Requirements
============

Requires `Graphviz <http://www.graphviz.org/>`_ installed on your machine and the
`SQLAlchemy <http://www.sqlalchemy.org/>`_ and `pydot <https://pypi.python.org/pypi/pydot>`_ packages.

=======
License
=======

SQLAlchemyViz is distributed under the `MIT License <http://www.opensource.org/licenses/mit-license.php>`_.

==========
Quickstart
==========
Create an ER diagram from a sqlalchemy schema object.

positional arguments:
  pkg.module:metadata   Import path for the metadata identifier.

optional arguments:
  -h, --help            show this help message and exit
  -f FILE, --file FILE  Write diagram to specified file {default:
                        diagram.pdf}.
  -p PROG, --prog PROG  Name of the graphviz layout program to use {default:
                        "neato"}. Other choices are: "dot", "twopi", "circo"
                        or "fdp".
  -o OPTION, --opt OPTION
                        Where OPTION is e.g. "graph_bgcolor=red". May be
                        supplied multiple times.
  -g GRAPHVIZ_PATH, --graphviz GRAPHVIZ_PATH
                        Path to folder containing the graphviz executables.
  -i INCLUDE_TABLES, --include INCLUDE_TABLES
                        Include the given comma separated list of tables or
                        classes. If omitted, create diagram for all.
  -x EXCLUDE_TABLES, --exclude EXCLUDE_TABLES
                        Exclude the given comma separated list of tables or
                        classes.
  --sort-columns        Sort columns by whether they are primary or foreign
                        keys and (case-insensitive) alphabetically.
  --unique-relations    Draw relations between tables only once (if multiple
                        foreign keys reference the same table).
  --show-constraints    Show table constraints.
  --max-cols MAX_COLS   Limit amount of columns shown per table.