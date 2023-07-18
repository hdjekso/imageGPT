import { Button, Card, CardHeader, Grid, TextField, Typography, grid2Classes } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./Login.css"

const Login = () => {
  const navigate = useNavigate();
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');

  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email_, setEmail_] = useState('');
  const [regUserName, setRegUserName] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regFailed, setRegFailed] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [userAuth, setUserAuth] = useState(false); // determines whether the user has been authenticated on Sign In
  //const [regPassValid, setRegPassValid] = useState('');
  const [token, setToken] = useState(''); //session token
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log("Token updated: " + token);
    localStorage.setItem("token", token);
    console.log(localStorage.getItem("token"));
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    console.log(Username);
    console.log(Password);

    let obj = {};
    obj["username"] = Username;
    obj["password"] = Password;
    let myJSON = JSON.stringify(obj);
    console.log(myJSON);

    fetch('http://127.0.0.1:5000/sessions/create', {
      method: 'POST',
      body: myJSON,
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    }).then(function (data) {
      console.log(data);
      localStorage.setItem("token", data.token);
      console.log("data token: " + data.token);
      console.log("local storage token: " + localStorage.getItem("token"));
      setToken(data.token);
      attemptSignIn(obj, data.token); // sign in verification, pass in "data" to prevent empty username/ pw
    }).catch(function (error) {
      setLoginFailed(true);
      console.warn('Something went wrong?????', error);
    });

  }

  const handleRegister = (e) => {
    e.preventDefault();
    const form_ = e.target;
    const formData = new FormData(form_);

    let obj = {};
    obj["fname"] = fName;
    obj["lname"] = lName;
    obj["email"] = email_;
    obj["username"] = regUserName;
    obj["password"] = regPass;
    let notEmpty = (obj["fname"] !== '' && obj["lname"] !== '' && obj["email"] !== '' && obj["username"] !== '' && obj["password"] !== '');
    let myJSON = JSON.stringify(obj);
    console.log(myJSON);

    fetch('http://127.0.0.1:5000/users/create', {
      method: 'POST',
      body: myJSON,
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(function (response) {
      if (response.ok) {
        return { data: response.json(), status: response.status };
      }
      return Promise.reject(response);
    }).then(function (result) {
      console.log(result.data);
      if (result.status === 200) {
        setRegFailed(false);
        switchLoginRegister();
      }
    }).catch(function (error) {
      setRegFailed(true);
      console.warn('Something went wrong.', error);
      if (error.status === 1 || !notEmpty) {
        console.log("at least one of the fields is empty");
        setErrorMessage("At least one of the fields is empty");
        setRegFailed(true);
      } else if (error.status === 6) {
        console.log("an account with this email already exists");
        setErrorMessage("An account with this email already exists");
        setRegFailed(true);
      } else if (error.status === 7) {
        console.log("an account with this username already exists");
        setErrorMessage("An account with this username already exists");
        setRegFailed(true);
      } else {
        console.log("some other error was encountered");
        setErrorMessage("Some other error was encountered");
        setRegFailed(true);
      }
    });
  }

  const attemptSignIn = (userInfo, token_) => {
    setToken(token_);
    let signObj = {}
    signObj["token"] = token_;
    console.log("Attempt sign in token: " + token_);
    setToken(token_);
    console.log("useState token: " + token);
    let signJSON = JSON.stringify(signObj);

    fetch('http://127.0.0.1:5000/sessions/authenticate', {
      method: 'POST',
      body: signJSON,
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(function (response) {
      if (response.ok) {
        return { data: response.json(), status: response.status };
      }
      return Promise.reject(response);
    }).then(function (result) {
      console.log(result.data);
      if (result.status === 200 && userInfo["username"] !== '' && userInfo["password"] !== '') {
        setLoginFailed(false);
        nextPage();
      } else {
        setLoginFailed(true);
        console.log("credentials invalid");
      }

    }).catch(function (error) {
      setLoginFailed(true);
      // console.log("hey");
      console.warn('Something went wrong.', error);
    });

    /*fetch('http://127.0.0.1:5000/sessions/authenticate', {
  method: 'POST',
  body: myJSON,
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  }
}).then(function (response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response);
}).then(function (data) {
  console.log(data);
}).catch(function (error) {
  console.warn('Something went wrong!!', error);
});*/
  }

  const nextPage = () => {
    navigate("/Home");
  }

  const [showLoginForm, setShowLoginForm] = useState(true);

  const switchLoginRegister = () => {
    setRegFailed(false);
    setLoginFailed(false);
    setShowLoginForm((prevState) => !prevState);
  }

  return (
    <div className="login-page">
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet"></link>
      <div className="form">
        <div className={showLoginForm ? "login-form visible" : "login-form"}>

          <div className="title">
            <h1>IMAGEGPT</h1>
          </div>
          <form method="post" onSubmit={handleSubmit}>
            <input className="LogUsername" type="text" placeholder="Username" value={Username}
              onChange={(event) => { setUsername(event.target.value) }} />
            <input className="LogPass" type="password" placeholder="Password" value={Password}
              onChange={(event) => { setPassword(event.target.value) }} />
            {/* <button className="LoginButton" type="submit" onClick={attemptSignIn}>Sign In</button> */}
            <button className={`LoginButton ${loginFailed ? 'failed' : ''}`} type="submit">Log In</button>
            <p className={`LoginFailedMSG ${loginFailed ? 'failed' : ''}`}>Sign In Failed, Please try again.</p>
            {/* <button onClick={nextPage}> Skip to next page</button> */}
            <div onClick={switchLoginRegister} className="message">Not Signed Up? <a href="#">Create a new account!</a></div>
          </form>


        </div>
        <div className={showLoginForm ? "register-form" : "register-form visible"}>

          <div className="title">
            <h1>IMAGEGPT</h1>
          </div>
          <form method="post" onSubmit={handleRegister}>
            <input className="FName" type="text" placeholder="First Name" value={fName}
              onChange={(event) => { setFName(event.target.value) }} />
            <input className="LName" type="text" placeholder="Last Name" value={lName}
              onChange={(event) => { setLName(event.target.value) }} />
            <input className="email" type="text" placeholder="Email" value={email_}
              onChange={(event) => { setEmail_(event.target.value) }} />
            <input className="RegUsername" type="text" placeholder="Username" value={regUserName}
              onChange={(event) => { setRegUserName(event.target.value) }} />
            <input className="RegPass" type="password" placeholder="Password" value={regPass}
              onChange={(event) => { setRegPass(event.target.value) }} />
            {/*<input className="RegPassValid" type="password" placeholder="Confirm Password" value={regPassValid}
              onChange={(event) => {setRegPassValid(event.target.value)}}/>*/}

            {/* <button className="RegButton" type="submit">Register</button> */}
            <button className={`RegButton ${regFailed ? 'failed' : ''}`} type="submit">Sign Up</button>
            <p className={`RegFailedMSG ${regFailed ? 'failed' : ''}`}>Registration Failed, {errorMessage}</p>
          </form>
          <div onClick={switchLoginRegister} className="message">Already Signed Up? <a href="#">Login!</a></div>

        </div>



      </div>
    </div>


  );
}

export default Login;
