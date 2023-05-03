//import React from "react";
import Login from "./Login.js";
import Home_ from "./Home.js";
import Chat from "./Chat.js"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar.js";

const App = () => {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/Home" element={<Home_ />} />
          <Route path="/Chat" element={<Chat />} />
        </Routes>
      </Router>
    );
  };

export default App;
