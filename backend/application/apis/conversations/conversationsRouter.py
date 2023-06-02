from flask import Blueprint, request, jsonify, make_response
from ...models.sessions import Sessions
from ...models.conversations import Conversations
from .conversationsManager import Manager
import uuid

_manager = Manager()

conversationsBlueprint = Blueprint("conversations", __name__, url_prefix="/conversations")

@conversationsBlueprint.route('/create', methods=['POST'])
def create():
    _request = request.json

    try: 
        token = str(_request['token'])
        conversation_token = str(uuid.uuid1())

        sessions = Sessions(ID = None, fk_user_ID = None, token = token, create_date = None, modify_date = None)
        conversations = Conversations(ID = None, conversation_token = conversation_token, fk_user_ID = None, create_date = None, modify_date = None)
    except Exception as e:
        return make_response(jsonify({'description': 'Request missing parameters'}), 1) 

    return _manager.create(sessions, conversations)

@conversationsBlueprint.route('/retrieve/all/<token>', methods=['GET'])
def retrieveAll(token):
    try: 
        token = str(token)

        sessions = Sessions(ID = None, fk_user_ID = None, token = token, create_date = None, modify_date = None)
    except Exception as e:
        print(e)
        return make_response(jsonify({'description': 'Request missing parameters'}), 1) 

    return _manager.retrieveAll(sessions)
        

