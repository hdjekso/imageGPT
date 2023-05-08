### python -m venv ./venv

Create a python virual environment in the backend directory.

### .\venv\Scripts\activate.bat

Activate virtual environment.

### pip list

List your current libraries in your virtual environment. Should be none. 

### pip install flask
### pip install flask-cors

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

### Response 
{
  "ID": null,
  "create_date": null,
  "email": "pp@ucdavis.edu",
  "fname": "Peter",
  "lname": "Parker",
  "modify_date": null,
  "password": "webs12345",
  "username": "Spiderman"
}

### API Request
let headersList = {
 "Accept": "*/*",
 "User-Agent": "Thunder Client (https://www.thunderclient.com)",
 "Content-Type": "application/json"
}

let bodyContent = JSON.stringify({
  "fname": "Peter",
  "lname": "Parker",
  "email": "pp@ucdavis.edu",
  "username": "Spiderman",
  "password": "webs12345"
});

let response = await fetch("http://127.0.0.1:5001/users/create", { 
  method: "POST",
  body: bodyContent,
  headers: headersList
});

let data = await response.text();
console.log(data);