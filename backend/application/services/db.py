import mysql.connector as MySQL

# Database Class.

class Database:

    # Connect.
    def __init__(self):
        self._mysqldb = MySQL.connect(
            host = 'moonlight.mysql.database.azure.com',
            user = 'moonlightAdmin',
            password = 'mlLogin123',
            database = 'moonlight',
            port = '3306'
        )
        self._cursor = self._mysqldb.cursor()

    # Execute. 
    def execute(self, query, args):
        self._cursor.execute(query, (args))

    # Close. 
    def close(self):
        self._cursor.close()
        self._mysqldb.close()

    # Commit. 
    def commit(self):
        self._mysqldb.commit()

    # Fetches.
    def fetchall(self):
        records = self._cursor.fetchall()
        return records
    
    def fetchone(self, query, args):
        self._cursor.execute(query, (args))
        records = self._cursor.fetchone()
        return records


