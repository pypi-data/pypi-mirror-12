import pytest

from .graphcore import Graphcore, PropertyType
from .rule import Rule
from .sql_query import SQLQuery
from .sql_reflect import sql_reflect

try:
    import sqlalchemy
except ImportError:
    sqlalchemy = None


@pytest.fixture
def engine():
    engine = sqlalchemy.create_engine('sqlite://')

    from sqlalchemy import MetaData, Table, Column, Integer, String

    meta = MetaData()
    users = Table(
        'users', meta,
        Column('id', Integer, primary_key=True),
        Column('name', String(255)),
    )
    users.create(engine)

    books = Table(
        'books', meta,
        Column('id', Integer, primary_key=True),
        Column('user_id', Integer),
    )
    books.create(engine)

    return engine


@pytest.fixture
def gc():
    return Graphcore()


def test_sql_reflect(gc, engine):
    sql_reflect(gc, engine)

    assert set(gc.rules) == set([
        Rule(SQLQuery(
            'users', 'users.name', {}, input_mapping={
                'id': 'users.id',
            }, one_column=True, first=True
        ), ['user.id'], 'user.name', 'one'),
        Rule(SQLQuery(
            'books', 'books.user_id', {}, input_mapping={
                'id': 'books.id',
            }, one_column=True, first=True
        ), ['book.id'], 'book.user.id', 'one'),
        Rule(SQLQuery(
            'books', 'books.id', {}, input_mapping={
                'id': 'books.user_id',
            }, one_column=True, first=False
        ), ['user.id'], 'user.books.id', 'many'),
    ])

    assert gc.schema.property_types == [
        PropertyType('book', 'user', 'user'),
        PropertyType('user', 'books', 'book'),
    ]
