import psycopg2
from psycopg2.extensions import AsIs
from psycopg2.extras import RealDictCursor
from pg4nosql import DEFAULT_JSON_COLUMN_NAME, DEFAULT_ROW_IDENTIFIER, DEFAULT_ROW_IDENTIFIER_TYPE
from pg4nosql.PostgresNoSQLTable import PostgresNoSQLTable
from pg4nosql.PostgresNoSQLView import PostgresNoSQLView


class PostgresNoSQLDatabase(object):
    __SQL_CREATE_JSON_TABLE = 'CREATE TABLE %s (%s %s PRIMARY KEY %s, ' + DEFAULT_JSON_COLUMN_NAME + ' JSON);'
    __SQL_DROP_JSON_TABLE = 'DROP TABLE IF EXISTS %s;'
    __SQL_TABLE_EXISTS = "SELECT EXISTS(SELECT relname FROM pg_class WHERE relname=%s)"

    def __init__(self, name, host, port, user, password):
        self.name = name
        self.connection = psycopg2.connect(host=host, database=name, port=port, user=user, password=password)
        self.tuple_cursor = self.connection.cursor()
        self.connection.cursor_factory = RealDictCursor
        self.cursor = self.connection.cursor()

    def close(self):
        self.connection.close()

    def commit(self):
        self.connection.commit()

    def execute(self, sql_query):
        self.cursor.execute(sql_query)
        if self.cursor.rowcount > 0:
            return self.cursor.fetchall()
        else:
            return None

    def create_table(self, table_name, row_identifier_type=DEFAULT_ROW_IDENTIFIER_TYPE, **relational_columns):
        # create additional columns string
        columns_str = ''.join(', %s %s' % (key, val) for (key, val) in relational_columns.items())
        self.cursor.execute(self.__SQL_CREATE_JSON_TABLE,
                            (AsIs(table_name),
                             AsIs(DEFAULT_ROW_IDENTIFIER),
                             AsIs(row_identifier_type),
                             AsIs(columns_str)))
        self.commit()
        return PostgresNoSQLTable(table_name, self.connection)

    def drop_table(self, table_name):
        self.cursor.execute(self.__SQL_DROP_JSON_TABLE, (AsIs(table_name),))
        self.commit()

    def get_table(self, table_name):
        if self.table_exists(table_name):
            return PostgresNoSQLTable(table_name, self.connection)
        else:
            return None

    def get_view(self, view_name):
        # todo: check if view exists
        return PostgresNoSQLView(view_name, self.connection)

    def get_or_create_table(self, table_name, row_identifier_type=DEFAULT_ROW_IDENTIFIER_TYPE, **relational_columns):
        table = self.get_table(table_name)
        if not table:
            table = self.create_table(table_name, row_identifier_type=row_identifier_type, **relational_columns)
        return table

    def table_exists(self, table_name):
        exists = False
        try:
            self.tuple_cursor.execute(self.__SQL_TABLE_EXISTS, (table_name,))
            exists = self.tuple_cursor.fetchone()[0]
        except psycopg2.Error as e:
            print(e)
        return exists

    def __getitem__(self, item):
        return self.get_or_create_table(item)
