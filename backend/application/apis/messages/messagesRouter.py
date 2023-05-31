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
        image_txt = str(_request['image_txt'])
        users_inp = str(_request['users_inp'])

        sessions = Sessions(ID = None, fk_user_ID = None, token = token, create_date = None, modify_date = None)
        messages = Messages(ID = None, fk_user_ID = None, image_txt = image_txt, users_inp = users_inp, create_date = None, modify_date = None)
    except Exception as e:
        return make_response(jsonify({'description': 'Request missing parameters'}), 1) 

    return _manager.create(sessions, messages)
        

@messagesBlueprint.route('/retrieve/all/<token>', methods=['GET'])
def retrieveAll(token):
    try: 
        token = str(token)

        sessions = Sessions(ID = None, fk_user_ID = None, token = token, create_date = None, modify_date = None)
        messages = Messages(ID = None, fk_user_ID = None, image_txt = None, users_inp = None, create_date = None, modify_date = None)
    except Exception as e:
        print(e)
        return make_response(jsonify({'description': 'Request missing parameters'}), 1) 

    return _manager.retrieveAll(sessions, messages)