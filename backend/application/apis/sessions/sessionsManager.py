from flask import jsonify, make_response
import mysql.connector as MySQL
from ...services.db import Database
from ...services.dbQuery import DatabaseQuery

class Manager:
            
    def create(self, sessions, users):
        try:
            db = Database()
            dbQuery = DatabaseQuery()

            fk_user_ID = dbQuery.retrieveUserIdSession(db, users)
            users.set_ID(int(fk_user_ID))
            sessions.set_fk_user_ID(int(fk_user_ID))

            dbQuery.createSession(db, sessions)

            db.close()

            res = sessions.response()
        except MySQL.Error as e:
            res =  make_response(jsonify({'msg': str(e)}), 1) 

        return res
    