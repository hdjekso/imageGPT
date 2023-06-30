from flask import Blueprint, request, jsonify, make_response
from ...models.sessions import Sessions
from ...models.conversations import Conversations
from ...models.dialogues import Dialogues
from .dialoguesManager import Manager

_manager = Manager()

dialoguesBlueprint = Blueprint("dialogues", __name__, url_prefix="/dialogues")

@dialoguesBlueprint.route('/create', methods=['POST'])
def create():
    _request = request.json

    try: 
        token = str(_request['token'])
        usr_content = str(_request['usr_content'])
        gpt_content = str(_request['gpt_content'])
        conversation_token = str(_request['conversation_token'])

        sessions = Sessions(ID = None, fk_user_ID = None, token = token, create_date = None, modify_date = None)
        conversations = Conversations(ID = None, conversation_token = conversation_token, fk_user_ID = None, create_date = None, modify_date = None)
        dialogues = Dialogues(ID = None, fk_user_ID = None, fk_conversation_ID = None, usr_content = usr_content, gpt_content = gpt_content, create_date = None, modify_date = None)
    except Exception as e:
        return make_response(jsonify({'description': 'Request missing parameters'}), 1) 

    return _manager.create(sessions, conversations, dialogues)

@dialoguesBlueprint.route('/retrieve/all/<token>/<conversation_token>', methods=['GET'])
def retrieveAll(token, conversation_token):
    try:
        token = str(token)
        conversation_token = str(conversation_token)
        
        sessions = Sessions(ID = None, fk_user_ID = None, token = token, create_date = None, modify_date = None)
        conversations = Conversations(ID = None, conversation_token = conversation_token, fk_user_ID = None, create_date = None, modify_date = None)
    except Exception as e:
        return make_response(jsonify({'description': 'Request missing parameters'}), 1) 

    return _manager.retrieveAll(sessions, conversations)