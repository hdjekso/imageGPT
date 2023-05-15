from flask import jsonify, make_response
import mysql.connector as MySQL
from ...services.db import Database
from ...services.dbQuery import DatabaseQuery

class Manager:
            
    def create(self, users):
        try:
            db = Database()
            dbQuery = DatabaseQuery()
            dbQuery.createUser(db, users)
            db.close()

            res = users.response()
        except MySQL.Error as e:
            res =  make_response(jsonify({'msg': str(e)}), 1) 

        return res
    