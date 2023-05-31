from flask import Blueprint, request, jsonify, make_response
from ...models.sessions import Sessions
from ...models.inputs import Inputs
from ...models.messages import Messages
from .inputsManager import Manager

_manager = Manager()

inputsBlueprint = Blueprint("inputs", __name__, url_prefix="/inputs")

@inputsBlueprint.route('/create', methods=['POST'])
def create():
    _request = request.json

    try: 
        token = str(_request['token'])
        input = str(_request['input'])
        response = str(_request['response'])
        messageID = int(_request['messageID'])

        sessions = Sessions(ID = None, fk_user_ID = None, token = token, create_date = None, modify_date = None)
        inputs = Inputs(ID = None, fk_user_ID = None, fk_message_ID = messageID, input = input, response = response, create_date = None, modify_date = None)
    except Exception as e:
        return make_response(jsonify({'description': 'Request missing parameters'}), 1) 

    return _manager.create(sessions, inputs)

@inputsBlueprint.route('/retrieve/all/<token>', methods=['GET'])
def retrieveAll(token):
    try:
        _request = request.json
        token = str(token)
        messageID = int(_request['messageID'])
        
        sessions = Sessions(ID = None, fk_user_ID = None, token = token, create_date = None, modify_date = None)
        messages = Messages(ID = messageID, fk_user_ID = None, image_txt = None, users_inp = None, create_date = None, modify_date = None)
    except Exception as e:
        return make_response(jsonify({'description': 'Request missing parameters'}), 1) 

    return _manager.retrieveAll(sessions, messages)