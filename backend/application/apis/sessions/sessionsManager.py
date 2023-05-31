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

            if fk_user_ID: 
                sessions.set_fk_user_ID(int(fk_user_ID))
                dbQuery.createSession(db, sessions)
                res = make_response(jsonify({'status': 'Success!', 'token': sessions.token}), 200)
            else:
                res = make_response(jsonify({'description': 'Invalid username or password'}), 4)

            db.close()
        except MySQL.Error as e:
            res =  make_response(jsonify({'description': 'MySQL DB Service error: ' + str(e)}), 3) 

        return res

    def authenticate(self, sessions):
        try:
            db = Database()
            dbQuery = DatabaseQuery()

            if not dbQuery.authenticateSession(db, sessions): 
                res =  make_response(jsonify({'err': "Session is Invalid!"}), 5)  
            else : 
                res = make_response(jsonify({'status': 'Success!', 'token': sessions.token}), 200)

            db.close()
        except MySQL.Error as e:
            res =  make_response(jsonify({'description': 'MySQL DB Service error: ' + str(e)}), 3) 

        return res

    def remove(self, sessions):
        try:
            db = Database()
            dbQuery = DatabaseQuery()

            fk_user_ID = dbQuery.retrieveUserIdToken(db, sessions)

            if fk_user_ID: 
                sessions.set_fk_user_ID(int(fk_user_ID))
                dbQuery.removeSession(db, sessions)
                res = make_response(jsonify({'status': 'Success!', 'token': sessions.token}), 200)
            else:
                res = make_response(jsonify({'description': 'Invalid session token'}), 2)

            db.close()
        except MySQL.Error as e:
            res =  make_response(jsonify({'description': 'MySQL DB Service error: ' + str(e)}), 3) 

        return res
    