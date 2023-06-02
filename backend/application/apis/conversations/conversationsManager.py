from flask import jsonify, make_response
import mysql.connector as MySQL
from ...services.db import Database
from ...services.dbQuery import DatabaseQuery

class Manager:
            
    def create(self, sessions, conversations):
        try:
            db = Database()
            dbQuery = DatabaseQuery()

            fk_user_ID = dbQuery.retrieveUserIdToken(db, sessions)
            
            if fk_user_ID: 
                conversations.set_fk_user_ID(int(fk_user_ID))
                dbQuery.createConversation(db, conversations)
                res = make_response(jsonify({'status': 'Success!', 'conversation_token': conversations.get_conversation_token()}), 200)
            else:
                res = make_response(jsonify({'description': 'Invalid session token'}), 2)

            db.close()
        except MySQL.Error as e:
            res =  make_response(jsonify({'description': 'MySQL DB Service error: ' + str(e)}), 3) 

        return res

    def retrieveAll(self, sessions):
        try:
            db = Database()
            dbQuery = DatabaseQuery()

            fk_user_ID = dbQuery.retrieveUserIdToken(db, sessions)

            if fk_user_ID: 
                sessions.set_fk_user_ID(int(fk_user_ID))
                res = dbQuery.retrieveAllConversations(db, sessions)
                res = make_response(jsonify(res), 200)
            else:
                res = make_response(jsonify({'description': 'Invalid session token'}), 2)

            db.close()
        except MySQL.Error as e:
            res =  make_response(jsonify({'description': 'MySQL DB Service error: ' + str(e)}), 3) 

        return res
    