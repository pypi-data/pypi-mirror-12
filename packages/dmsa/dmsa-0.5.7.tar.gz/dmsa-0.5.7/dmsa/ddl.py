import sys
import requests
from datetime import datetime
from sqlalchemy import (create_engine, MetaData, Table, Column,
                        Integer, Numeric, String, DateTime, text)
from sqlalchemy.ext.compiler import compiles
from sqlalchemy.schema import (CreateTable, AddConstraint, CreateIndex,
                               DropTable, DropConstraint, DropIndex,
                               ForeignKeyConstraint, CheckConstraint,
                               UniqueConstraint, PrimaryKeyConstraint)
from dmsa import __version__
from dmsa.settings import get_url, DMS_VERSION
from dmsa.makers import make_model


# Coerce Numeric type to produce NUMBER on Oracle backend.
@compiles(Numeric, 'oracle')
def _compile_numeric_oracle(type_, compiler, **kw):
    return 'NUMBER'


# and Integer type to produce NUMBER(10) on Oracle backend.
@compiles(Integer, 'oracle')
def _compile_integer_oracle(type_, compiler, **kw):
    return 'NUMBER(10)'


# Coerce String type without length to produce VARCHAR2(255) on Oracle.
@compiles(String, 'oracle')
def _compile_string_oracle(type_, compiler, **kw):

    if not type_.length:
        type_.length = 255
    visit_attr = 'visit_{0}'.format(type_.__visit_name__)
    return getattr(compiler, visit_attr)(type_, **kw)


# Coerce String type without length to produce VARCHAR(255) on MySQL.
@compiles(String, 'mysql')
def _compile_string_mysql(type_, compiler, **kw):

    if not type_.length:
        type_.length = 255
    visit_attr = 'visit_{0}'.format(type_.__visit_name__)
    return getattr(compiler, visit_attr)(type_, **kw)


# Add DEFERRABLE INITIALLY DEFERRED to Oracle constraints.
@compiles(ForeignKeyConstraint, 'oracle')
@compiles(UniqueConstraint, 'oracle')
@compiles(CheckConstraint, 'oracle')
def _compile_constraint_oracle(constraint, compiler, **kw):

    constraint.deferrable = True
    constraint.initially = 'DEFERRED'
    visit_attr = 'visit_{0}'.format(constraint.__visit_name__)
    return getattr(compiler, visit_attr)(constraint, **kw)


# Add DEFERRABLE INITIALLY DEFERRED to PostgreSQL constraints.
@compiles(ForeignKeyConstraint, 'postgresql')
@compiles(UniqueConstraint, 'postgresql')
@compiles(CheckConstraint, 'postgresql')
def _compile_constraint_postgresql(constraint, compiler, **kw):

    constraint.deferrable = True
    constraint.initially = 'DEFERRED'
    visit_attr = 'visit_{0}'.format(constraint.__visit_name__)
    return getattr(compiler, visit_attr)(constraint, **kw)


def main(argv=None):
    usage = """Data Model DDL Generator

    Generates data definition language for the data model specified in the
    given DBMS dialect. If passing a custom URL, the data model returned must
    be in the JSON format defined by the chop-dbhi/data-models package. See
    http://docs.sqlalchemy.org/en/rel_1_0/dialects/index.html for available
    dialects. The generated DDL is written to stdout.

    Usage: ddl.py [options] <model> <version> <dialect>

    Options:
        -h --help            Show this screen.
        -t --xtables         Exclude tables from the generated DDL.
        -c --xconstraints    Exclude constraints from the generated DDL.
        -i --xindexes        Exclude indexes from the generated DDL.
        -d --drop            Generate DDL to drop, instead of create, objects.
        -x --delete-data     Generate DML to delete data.
        -u URL --url=URL     Retrieve model JSON from this URL instead of the
                             default or environment-variable-passed URL.
        -r --return          Return DDL as python string object instead of
                             printing it to stdout.

    """  # noqa

    from docopt import docopt

    # Ignore command name if called from command line.
    argv = argv or sys.argv[1:]

    args = docopt(usage, argv=argv, version=__version__)
    url = args['--url'] or get_url(args['<model>'], args['<version>'])
    model_json = requests.get(url).json()

    metadata = MetaData()
    make_model(model_json, metadata)

    engine = create_engine(args['<dialect>'] + '://')

    output = []

    INSERT = ("INSERT INTO version_history (operation, model, model_version, "
              "dms_version, dmsa_version) VALUES ('{operation}', '"
              + args['<model>'] + "', '" + args['<version>'] + "', '" +
              DMS_VERSION + "', '" + __version__ + "');\n\n")

    version_history = Table(
        'version_history', MetaData(),
        Column('datetime', DateTime(), primary_key=True,
               server_default=text('CURRENT_TIMESTAMP')),
        Column('operation', String(24)),
        Column('model', String(16)),
        Column('model_version', String(16)),
        Column('dms_version', String(16)),
        Column('dmsa_version', String(16))
    )

    version_tbl_ddl = str(CreateTable(version_history).
                          compile(dialect=engine.dialect)).strip()

    if args['<dialect>'].startswith('mssql'):
        version_tbl_ddl = ("IF OBJECT_ID ('version_history', 'U') IS NULL " +
                           version_tbl_ddl)
    else:
        version_tbl_ddl = version_tbl_ddl.replace('CREATE TABLE',
                                                  'CREATE TABLE IF NOT EXISTS')

    if args['--delete-data']:

        output.append(INSERT.format(operation='delete data',
                                    datetime=str(datetime.now())))

        tables = reversed(metadata.sorted_tables)
        output.extend(delete_data(tables, engine))

        output.insert(0, version_tbl_ddl + ';\n\n')

        output = ''.join(output)

        if args['--return']:
            return output
        else:
            sys.stdout.write(output)
            return

    if not args['--xtables']:

        if not args['--drop']:

            output.append(INSERT.format(operation='create tables'))
            tables = metadata.sorted_tables
            output.extend(table_ddl(tables, engine, False))

        else:

            tables = reversed(metadata.sorted_tables)
            output.extend(table_ddl(tables, engine, True))
            output.insert(0, INSERT.format(operation='drop tables'))

    if not args['--xconstraints']:

        if not args['--drop']:

            output.append('\n')
            output.append(INSERT.format(operation='create constraints'))
            tables = metadata.sorted_tables
            output.extend(constraint_ddl(tables, engine, False))

        else:

            tables = reversed(metadata.sorted_tables)
            output.insert(0, '\n')
            output[0:0] = constraint_ddl(tables, engine, True)
            output.insert(0, INSERT.format(operation='drop constraints'))

    if not args['--xindexes']:

        if not args['--drop']:

            output.append('\n')
            output.append(INSERT.format(operation='create indexes'))
            tables = metadata.sorted_tables
            output.extend(index_ddl(tables, engine, False))

        else:

            tables = reversed(metadata.sorted_tables)
            output.insert(0, '\n')
            output[0:0] = index_ddl(tables, engine, True)
            output.insert(0, INSERT.format(operation='drop indexes'))

    output.insert(0, version_tbl_ddl + ';\n\n')

    output = ''.join(output)

    if args['--return']:
        return output
    else:
        sys.stdout.write(output)


def delete_data(tables, engine):

    output = []

    for table in tables:
        output.append(str(table.delete().compile(dialect=engine.dialect)).
                      strip())
        output.append(';\n\n')

    return output


def table_ddl(tables, engine, drop=False):

    output = []

    for table in tables:

        if not drop:
            ddl = CreateTable(table)
        else:
            ddl = DropTable(table)

        output.append(str(ddl.compile(dialect=engine.dialect)).strip())
        output.append(';\n\n')

    return output


def constraint_ddl(tables, engine, drop=False):

    output = []

    for table in tables:
        for constraint in table.constraints:

            # Avoid duplicating primary key constraint definitions (they are
            # included in CREATE TABLE statements).
            if not isinstance(constraint, PrimaryKeyConstraint):

                if not drop:
                    ddl = AddConstraint(constraint)
                else:
                    ddl = DropConstraint(constraint)

                output.append(str(ddl.compile(dialect=engine.dialect)).strip())
                output.append(';\n\n')

    return output


def index_ddl(tables, engine, drop=False):

    output = []

    for table in tables:
        for index in table.indexes:

            if not drop:
                ddl = CreateIndex(index)
            else:
                ddl = DropIndex(index)

            output.append(str(ddl.compile(dialect=engine.dialect)).strip())
            output.append(';\n\n')

    return output


if __name__ == '__main__':
    main()
