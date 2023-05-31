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

### Url1

POST: <http://127.0.0.1:5001/users/create>

### JSON Body1

{
  "fname": "Peter",
  "lname": "Parker",
  "email": "pp@ucdavis.edu",
  "username": "Spiderman",
  "password": "webs12345"
}

### Url2

POST: <http://127.0.0.1:5000/messages/create>

### JSON Body2

{
  "token": "7ee36376-f9c2-11ed-af15-ec2e9898d84a",
  "image_txt": "Math function a b c",
  "users_inp": "Solve this equation"
}

### Url3

POST: <http://127.0.0.1:5000/sessions/authenticate>

### JSON Body3

{
  "token": "7ee36376-f9c2-11ed-af15-ec2e9898d84a"
}

### Url4

GET: <http://127.0.0.1:5000/messages/retrieve/all>

### JSON Body4

{
  "token": "7ee36376-f9c2-11ed-af15-ec2e9898d84a"
}

## ERROR Messages 1 - 7

### 1

Missing Parameters

### 2

Invalid Token

### 3

MySQL Database Error

### 4

Invalid Username or Password

### 5

Invalid Token in session authenticate

### 6

Email taken

### 7

Username taken

### 200

Success!
