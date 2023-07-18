from flask import jsonify, make_response
import mysql.connector as MySQL
from ...services.db import Database
from ...services.dbQuery import DatabaseQuery

class Manager:
            
    def create(self, sessions, conversations, dialogues):
        try:
            db = Database()
            dbQuery = DatabaseQuery()

            fk_user_ID = dbQuery.retrieveUserIdToken(db, sessions)

            if fk_user_ID:
                dialogues.set_fk_user_ID(int(fk_user_ID))
                conversations.set_fk_user_ID(int(fk_user_ID))
            else:
                return make_response(jsonify({'description': 'Invalid session token'}), 2)
            
            fk_conversation_ID = dbQuery.retrieveConvoId(db, conversations)

            if fk_conversation_ID:
                dialogues.set_fk_conversation_ID(int(fk_conversation_ID))
            else:
                return make_response(jsonify({'description': 'Invalid conversation token'}), 8)

            dbQuery.createDial(db, dialogues)
            return make_response(jsonify({'status': 'Success!'}), 200)

            db.close()
        except MySQL.Error as e:
            res =  make_response(jsonify({'description': 'MySQL DB Service error: ' + str(e)}), 3)  

        return res

    def retrieveAll(self, sessions, conversations):
        try:
            db = Database()
            dbQuery = DatabaseQuery()

            fk_user_ID = dbQuery.retrieveUserIdToken(db, sessions)

            if fk_user_ID: 
                conversations.set_fk_user_ID(int(fk_user_ID))
            else:
                return make_response(jsonify({'description': 'Invalid session token'}), 2)

            fk_conversation_ID = dbQuery.retrieveConvoId(db, conversations)

            if fk_conversation_ID: 
                conversations.set_ID(int(fk_conversation_ID))
            else:
                return make_response(jsonify({'description': 'Invalid conversation token'}), 8)

            res = dbQuery.retrieveAllDials(db, conversations)
            res = make_response(jsonify(res), 200)

            db.close()
        except MySQL.Error as e:
            print(e)
            res =  make_response(jsonify({'description': 'MySQL DB Service error: ' + str(e)}), 3) 

        return res