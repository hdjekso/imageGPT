import { Button, Card, CardHeader, Grid, TextField, Typography, grid2Classes } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
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
  //const [regPassValid, setRegPassValid] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    console.log(Username);
    console.log(Password);

    var obj = {};
    obj["username"] = Username;
    obj["password"] = Password;
    var myJSON = JSON.stringify(obj);
    console.log(myJSON);

    fetch('http://127.0.0.1:5001/sessions/create', {
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
      console.log(data.token);
    }).catch(function (error) {
      console.warn('Something went wrong.', error);
    });

  }

  const handleRegister = (e) => {
    e.preventDefault();
    const form_ = e.target;
    const formData = new FormData(form_);

    var obj = {};
    obj["fname"] = fName;
    obj["lname"] = lName;
    obj["email"] = email_;
    obj["username"] = regUserName;
    obj["password"] = regPass;
    var myJSON = JSON.stringify(obj);
    console.log(myJSON);

    fetch('http://127.0.0.1:5001/users/create', {
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
      console.warn('Something went wrong.', error);
    });

    switchLoginRegister();

    var obj = {};
    obj["fname"] = fName;
    obj["lname"] = lName;
    obj["email"] = email_;
    obj["username"] = regUserName;
    obj["password"] = regPass;
    var myJSON = JSON.stringify(obj);
    console.log(myJSON);

    switchLoginRegister();

  }

  const nextPage = () => {
    navigate("/Home");
  }

  const [showLoginForm, setShowLoginForm] = useState(true);

  const switchLoginRegister = () => {
    setShowLoginForm((prevState) => !prevState);
  }

  return (
    <div className="login-page">
      <div className="form">
        <div className={showLoginForm ? "login-form visible" : "login-form"}>

          <div className="title">
            <h1>IMAGEGPT</h1>
          </div>
          <form method="post" onSubmit={handleSubmit}>
            <input className="LogUsername" type="text" placeholder="Username" value={Username}
              onChange={(event) => {setUsername(event.target.value)}}/>
            <input className="LogPass" type="password" placeholder="Password" value={Password}
              onChange={(event) => {setPassword(event.target.value)}}/>
            <button className="LoginButton" type="submit">Sign In</button>
            <button onClick={nextPage}> Skip to next page</button>
            <div onClick={switchLoginRegister} className="message">Not Registered? <a href="#">Create a new account!</a></div>
          </form>
          

        </div>
        <div className={showLoginForm ? "register-form" : "register-form visible"}>

          <div className="title">
            <h1>IMAGEGPT</h1>
          </div>
          <form method="post" onSubmit={handleRegister}>
            <input className="FName" type="text" placeholder="First Name" value={fName}
              onChange={(event) => {setFName(event.target.value)}}/>
            <input className="LName" type="text" placeholder="Last Name" value={lName}
              onChange={(event) => {setLName(event.target.value)}}/>
            <input className="email" type="text" placeholder="Email" value={email_}
              onChange={(event) => {setEmail_(event.target.value)}}/>
            <input className="RegUsername" type="text" placeholder="Username" value={regUserName}
              onChange={(event) => {setRegUserName(event.target.value)}}/>
            <input className="RegPass" type="password" placeholder="Password" value={regPass}
              onChange={(event) => {setRegPass(event.target.value)}}/>
            {/*<input className="RegPassValid" type="password" placeholder="Confirm Password" value={regPassValid}
              onChange={(event) => {setRegPassValid(event.target.value)}}/>*/}

            <button className="RegButton" type="submit">Register</button>
          </form>
          <div onClick={switchLoginRegister} className="message">Already Registered? <a href="#">Login!</a></div>

        </div>



      </div>
    </div>


  );
}

export default Login;
