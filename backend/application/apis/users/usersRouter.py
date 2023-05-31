from flask import Blueprint, request, jsonify, make_response
from ...models.users import Users
from .usersManager import Manager

_manager = Manager()

usersBlueprint = Blueprint("users", __name__, url_prefix="/users")

@usersBlueprint.route('/create', methods=['POST'])
def create():
    _request = request.json

    try: 
        fname = str(_request['fname'])
        lname = str(_request['lname'])
        email = str(_request['email'])
        username = str(_request['username'])
        password = str(_request['password'])

        users = Users(ID = None, fname = fname, lname = lname, email = email, username = username, password = password, create_date = None, modify_date = None)

        res = _manager.create(users)
    except Exception as e:
        print(e)
        res =  make_response(jsonify({'description': 'Request missing parameters'}), 1) 
        
    return res