from flask import Flask, jsonify, make_response
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def index():
    res =  make_response(jsonify({'msg': 'Hello World'}), 200)
    return res

if __name__ == '__main__':
    app.run()