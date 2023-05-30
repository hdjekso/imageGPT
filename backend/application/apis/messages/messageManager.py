from flask import jsonify, make_response
import mysql.connector as MySQL
from ...services.db import Database
from ...services.dbQuery import DatabaseQuery

class Manager:
            
    def create(self, sessions, messages):
        try:
            db = Database()
            dbQuery = DatabaseQuery()

            fk_user_ID = dbQuery.retrieveUserIdToken(db, sessions)
            messages.set_fk_user_ID(int(fk_user_ID))
            sessions.set_fk_user_ID(int(fk_user_ID))

            dbQuery.createMessage(db, messages)

            db.close()

            res = messages.response()
        except MySQL.Error as e:
            res =  make_response(jsonify({'msg': str(e)}), 1) 

        return res

    def retrieveAll(self, sessions, messages):
        try:
            db = Database()
            dbQuery = DatabaseQuery()

            fk_user_ID = dbQuery.retrieveUserIdToken(db, sessions)
            messages.set_fk_user_ID(int(fk_user_ID))
            sessions.set_fk_user_ID(int(fk_user_ID))

            res = dbQuery.retrieveAllMessages(db, messages)
            print(res)

            db.close()
        except MySQL.Error as e:
            res =  make_response(jsonify({'msg': str(e)}), 1) 

        return res
    