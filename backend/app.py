# Blueprints.
from application.apis.users.usersRouter import usersBlueprint

# Flask and Flask Cors import.
from flask import Flask, jsonify, make_response
from flask_cors import CORS, cross_origin

# Flask app.
app = Flask(__name__)

# Cross Origin. Supports transfer of data from different servers(localhosts).
CORS(app)

# Register Blueprints.
app.register_blueprint(usersBlueprint)

@app.route('/', methods=['GET'])
def index():
    res =  make_response(jsonify({'msg': 'Hello World'}), 200)
    return res

if __name__ == '__main__':
    app.run()