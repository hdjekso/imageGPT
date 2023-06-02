# Blueprints.
from application.apis.users.usersRouter import usersBlueprint
from application.apis.sessions.sessionsRouter import sessionsBlueprint
from application.apis.conversations.conversationsRouter import conversationsBlueprint
from application.apis.dialogues.dialoguesRouter import dialoguesBlueprint

# Flask and Flask Cors import.
from flask import Flask, jsonify, make_response
from flask_cors import CORS, cross_origin

# Flask app.
app = Flask(__name__)

# Cross Origin. Supports transfer of data from different servers(localhosts).
CORS(app)

# CORS for blueprint
CORS(usersBlueprint, resources={r"/*": {"origins": "*"}})
CORS(sessionsBlueprint, resources={r"/*": {"origins": "*"}})
CORS(messagesBlueprint, resources={r"/*": {"origins": "*"}})

# Register Blueprints.
app.register_blueprint(usersBlueprint)
app.register_blueprint(sessionsBlueprint)
app.register_blueprint(conversationsBlueprint)
app.register_blueprint(dialoguesBlueprint)

@app.route('/', methods=['GET'])
def index():
    res =  make_response(jsonify({'msg': 'Hello World'}), 200)
    return res

if __name__ == '__main__':
    app.run()