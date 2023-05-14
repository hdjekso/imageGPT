import { Button, Card, CardHeader, Grid, TextField, Typography, grid2Classes } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./Login.css"

const Login = () => {
  const navigate = useNavigate();
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');



  const handleSubmit = (e) => {
    console.log(Username);
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
          <input className="LogUsername" type="text" placeholder="Username" />
          <input className="LogPass" type="password" placeholder="Password" />
          <button className="LoginButton" type="submit" onClick={handleSubmit}>Sign In</button>
          <div onClick={switchLoginRegister} className="message">Not Registered? <a href="#">Create a new account!</a></div>

        </div>
        <div className={showLoginForm ? "register-form" : "register-form visible"}>

          <div className="title">
            <h1>IMAGEGPT</h1>
          </div>
          <input className="FName" type="text" placeholder="First Name" />
          <input className="LName" type="text" placeholder="Last Name" />
          <input className="RegUsername" type="text" placeholder="Username" />
          <input className="RegPass" type="password" placeholder="Password" />
          <input className="RegPassValid" type="password" placeholder="Confirm Password" />

          <button className="RegButton" type="submit" onClick={handleSubmit}>Register</button>
          <div onClick={switchLoginRegister} className="message">Already Registered? <a href="#">Login!</a></div>

        </div>



      </div>
    </div>


  );
}

export default Login;
