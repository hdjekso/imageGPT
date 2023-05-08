from flask import jsonify, make_response
import json

class Base:
    def __init__(self, ID, create_date, modify_date):
        self.ID = ID
        self.create_date = create_date
        self.modify_date = modify_date
    
    def set_ID(self, ID):
        self.ID = ID
    def get_ID(self):
        return self.ID
    
    def set_create_date(self, create_date):
        self.create_date = create_date
    def get_create_date(self):
        return self.create_date

    def set_modify_date(self, modify_date):
        self.mod_date = modify_date
    def get_modify_date(self):
        return self.modify_date
    
    def response(self):
        response = json.dumps(self.__dict__)
        response = json.loads(response)
        return make_response(jsonify(response), 200)