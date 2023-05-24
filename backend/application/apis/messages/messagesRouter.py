from flask import Blueprint, request, jsonify, make_response
from ...models.sessions import Sessions
from ...models.messages import Messages
from .messageManager import Manager

_manager = Manager()

messagesBlueprint = Blueprint("messages", __name__, url_prefix="/messages")

@messagesBlueprint.route('/create', methods=['POST'])
def create():
    _request = request.json

    try: 
        token = str(_request['token'])
        message = str(_request['message'])

        sessions = Sessions(ID = None, fk_user_ID = None, token = token, create_date = None, modify_date = None)
        messages = Messages(ID = None, fk_user_ID = None, message = message, create_date = None, modify_date = None)

        res = _manager.create(sessions, messages)
    except Exception as e:
        print(e)
        res =  make_response(jsonify({'msg': 'Failed'}), 1) 
        
    return res

#def validate():
    #_request = request.json

    #try: