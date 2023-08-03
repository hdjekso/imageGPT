import { useNavigate } from "react-router-dom";
import HomeCard from "./HomeCard";
import React, { useEffect, useState } from 'react';
import "./Home.css";
// import axios from 'axios';

function Home_() {
  var token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [oldIDs, setOldIDs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleNewQ = () => {
    localStorage.removeItem("convo");
    localStorage.removeItem("convoID");
    setTimeout(() => {
      navigate("/Chat");
    }, 0);
  }

  const handleSignOut = (event) => {
    event.preventDefault();
    let signObj = {}
    signObj["token"] = token;
    let myJSON = JSON.stringify(signObj);

    //make a post request to disable the session ID/ token
    fetch('http://127.0.0.1:5000/sessions/remove', {
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
      if (result.status === 200) {
        console.log("successfully disabled token");
        localStorage.removeItem("token");
        console.log("attempting to log localstorage token after removal: " + localStorage.getItem("token"));
      } else {
        console.log("token disabling failed");
      }

    }).catch(function (error) {
      console.warn('Something went wrong with sign out.', error);
    });

    navigate('/');
  }

  const fetchData = async () => {
    const apiURL = 'http://127.0.0.1:5000/conversations/retrieve/all/';
    const local_token = token;
    fetch(`http://127.0.0.1:5000/conversations/retrieve/all/${local_token}`)
      .then(response => response.json())
      .then(data => {
        // Process the retrieved data
        /*setOldIDs(data.slice(-5)); //retrieve the last 5 elements of the array
        setIsLoaded(true);
        console.log((oldIDs[4]["first_dialogue"]).length);*/

        let newArray = [];
        let i = data.length - 1;
        let count = 0;
        while (count < 5 && i >= 0) {
          if ((data[i]["first_dialogue"]).length !== 0) {
            console.log(data[i]["first_dialogue"]);
            newArray = [...newArray, data[i]];
            --i;
            count++;
          }
        }
        setOldIDs(newArray);
        console.log(oldIDs);
        setIsLoaded(true);
      })
      .catch(error => {
        console.error('Error occurred while fetching data:', error);
      });
  };

  useEffect(() => {
    //console.log("localstorage token: " + token);
    fetchData();
    console.log("oldIDs updated: " + oldIDs);
    //console.log("oldID 5: " + oldIDs[4]["conversation_token"]);
  }, []);

  // return (
  //   <div className="main">
  //     {/* <HomeAppbar /> */}

  //     <div className="carousel-container">

  //       <HomeCard msgID={isLoaded && oldIDs[0] ? oldIDs[0] : 'loading...'} />
  //       <HomeCard msgID={isLoaded && oldIDs[1] ? oldIDs[1] : 'loading...'} />
  //       <HomeCard msgID={isLoaded && oldIDs[2] ? oldIDs[2] : 'loading...'} />
  //       <HomeCard msgID={isLoaded && oldIDs[3] ? oldIDs[3] : 'loading...'} />
  //       <HomeCard msgID={isLoaded && oldIDs[4] ? oldIDs[4] : 'loading...'} />


  //     </div>
  //   </div>
  // );

  const samples = [
    { title: "title1", name: "#1" },
    { title: "title2", name: "#2" },
    { title: "title3", name: "#3" },
    { title: "title4", name: "#4" },
    { title: "title5", name: "#5" },
  ];

  return (
    <div className="main">
      <div className="bg-container">
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
      </div>

      <div className="content-container">
        <div className="header-menu">
          <a class="menu-link is-active" href="#">Home</a>
          <a class="menu-link" onClick={handleNewQ} >ChatBot</a>
          <a class="menu-link" onClick={handleSignOut} >Sign Out</a>
        </div>

        <div className="text">
          <h1>WELCOME to ImageGPT</h1>
          <p>Start converting images to text! And don't forget our handy GPT Tool!</p>
        </div>


        <div className="wrapper">
          <div className="carousel">
            {isLoaded && oldIDs.map((oldId, index) => (
              <HomeCard key={index} msgID={oldId ? oldId : 'loading...'} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home_;
