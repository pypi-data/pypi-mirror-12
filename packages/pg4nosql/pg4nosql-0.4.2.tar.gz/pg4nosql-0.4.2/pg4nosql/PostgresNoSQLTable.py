import copy
import json
from psycopg2.extensions import AsIs
from psycopg2.extras import RealDictCursor
from pg4nosql import DEFAULT_JSON_COLUMN_NAME, DEFAULT_ROW_IDENTIFIER
from pg4nosql.PostgresNoSQLQueryStructure import PostgresNoSQLQueryStructure
from pg4nosql.PostgresNoSQLResultItem import PostgresNoSQLResultItem
from pg4nosql.PostgresNoSQLUtil import to_nullable_string


class PostgresNoSQLTable(PostgresNoSQLQueryStructure):
    __SQL_INSERT_JSON = "INSERT INTO %s(" + DEFAULT_JSON_COLUMN_NAME + " %s) VALUES(%s %s) RETURNING " + DEFAULT_ROW_IDENTIFIER
    __SQL_GET_JSON = 'SELECT * FROM %s WHERE ' + DEFAULT_ROW_IDENTIFIER + '=%s'
    __SQL_GET_COLUMNS = 'select column_name from information_schema.columns where table_name = %s'
    __SQL_DELETE_JSON = 'DELETE FROM %s WHERE ' + DEFAULT_ROW_IDENTIFIER + '=%s'
    __SQL_UPDATE_JSON = 'UPDATE %s SET ' + DEFAULT_JSON_COLUMN_NAME + '=%s %s WHERE ' + DEFAULT_ROW_IDENTIFIER + '=%s;'

    __SQL_INSERT = "INSERT INTO %s(%s) VALUES(%s) RETURNING " + DEFAULT_ROW_IDENTIFIER
    __SQL_UPDATE = 'UPDATE %s SET %s WHERE ' + DEFAULT_ROW_IDENTIFIER + '=%s;'

    __SQL_QUERY_WITH_JOIN = 'SELECT %s FROM %s AS a JOIN %s AS b ON %s WHERE %s'

    def __init__(self, name, connection):
        super(PostgresNoSQLTable, self).__init__(name, connection)
        self.super = super(PostgresNoSQLTable, self)

    def commit(self):
        """
        Use commit only if auto_commit in put or save are disabled!
        :return: None
        """
        self.connection.commit()

    def insert(self, auto_commit=True, **data):
        relational_data = data

        relational_data_columns = ''
        relational_data_values = ''

        if relational_data:
            relational_data_columns = ",".join(relational_data.keys())
            data_list = map(str, map(to_nullable_string, relational_data.values()))
            relational_data_values = ",".join(data_list)

        self.cursor.execute(self.__SQL_INSERT, (AsIs(self.name),
                                                AsIs(relational_data_columns),
                                                AsIs(relational_data_values)))

        if auto_commit:
            self.commit()

        return self.cursor.fetchone()[DEFAULT_ROW_IDENTIFIER]

    def update(self, object_id, auto_commit=True, **relational_data):
        relational_data_sql = ','.join(
            "%s=%s" % (key, str(to_nullable_string(val))) for (key, val) in relational_data.items())

        self.cursor.execute(self.__SQL_UPDATE, (AsIs(self.name),
                                                AsIs(relational_data_sql), object_id))

        if auto_commit:
            self.commit()

    def put(self, json_data, auto_commit=True, **relational_data):
        relational_data.update({DEFAULT_JSON_COLUMN_NAME: json_data})
        return self.insert(auto_commit=auto_commit, **relational_data)

    def save(self, record, auto_commit=True):
        data = copy.deepcopy(record.get_record())
        object_id = data.pop(DEFAULT_ROW_IDENTIFIER)
        self.update(object_id, auto_commit=auto_commit, **data)

    def get(self, object_id):
        self.cursor.execute(self.__SQL_GET_JSON, (AsIs(self.name), object_id))
        record = self.cursor.fetchone()

        if record is None:
            return record

        return PostgresNoSQLResultItem(record, self)

    def query_join(self, table_name, on_statement, query='True', columns='*'):
        self.cursor.execute(self.__SQL_QUERY_WITH_JOIN, (AsIs(columns),
                                                         AsIs(self.name),
                                                         AsIs(table_name),
                                                         AsIs(on_statement),
                                                         AsIs(query)))
        rows = [item for item in self.cursor.fetchall()]
        items = map(lambda r: PostgresNoSQLResultItem(r, self), rows)
        return items

    def query_one(self, query='True', columns='*'):
        result = self.query(query, columns)
        if not result:
            return None
        return result[0]

    def get_columns(self):
        self.cursor.execute(self.__SQL_GET_COLUMNS, (self.name,))
        columns = map(lambda m: m['column_name'], self.cursor.fetchall())
        return columns

    def delete(self, object_id, auto_commit=True):
        self.cursor.execute(self.__SQL_DELETE_JSON, (AsIs(self.name), object_id))
        if auto_commit:
            self.commit()

    def execute(self, sql_query):
        self.cursor.execute(sql_query)
        return self.cursor.fetchall()
