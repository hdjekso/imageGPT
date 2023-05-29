### python -m venv ./venv

Create a python virual environment in the backend directory.

### .\venv\Scripts\activate.bat

Activate virtual environment.

### pip list

List your current libraries in your virtual environment. Should be none. 

### pip install flask
### pip install flask-cors
### pip install mysql-connector

Get flask app started.

### flask run --port 5001

Assuming port 5000 is being used for front end. The localhost for backend will run on port 5001.

## Example api request

### Url

http://127.0.0.1:5001/users/create

### JSON Body

{
  "fname": "Peter",
  "lname": "Parker",
  "email": "pp@ucdavis.edu",
  "username": "Spiderman",
  "password": "webs12345"
}

### Url

http://127.0.0.1:5000/messages/create

### JSON Body

{
  "token": "7ee36376-f9c2-11ed-af15-ec2e9898d84a",
  "image_txt": "Math function a b c",
  "users_inp": "Solve this equation"
}