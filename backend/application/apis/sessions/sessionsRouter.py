from flask import Blueprint, request, jsonify, make_response
from ...models.sessions import Sessions
from ...models.users import Users
import uuid

sessionsBlueprint = Blueprint("sessions", __name__, url_prefix="/sessions")

@sessionsBlueprint.route('/create', methods=['POST'])
def create():
    _request = request.json

    try: 
        username = str(_request['username'])
        password = str(_request['password'])
        token = str(uuid.uuid1())

        sessions = Sessions(ID = None, fk_user_ID = None, token = token, create_date = None, modify_date = None, expire_date = None)
        users = Users(ID = None, fname = None, lname = None, email = None, username = username, password = password, create_date = None, modify_date = None)

        res = sessions.response()
    except Exception as e:
        print(e)
        res =  make_response(jsonify({'msg': 'Failed'}), 1) 
        
    return res