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

            return make_response(jsonify({'status': 'Success!'}), 200)
        except MySQL.Error as e:
            err = str(e)

            if "Duplicate" in err and "uc_email" in err:
                return make_response(jsonify({'description': 'Email was already taken'}), 6)
            elif "Duplicate" in err and "uc_username" in err:
                return make_response(jsonify({'description': 'Username was already taken'}), 7)
            else: 
                return  make_response(jsonify({'description': 'MySQL DB Service error: ' + str(e)}), 3) 
    