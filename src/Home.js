import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useNavigate } from "react-router-dom";
import HomeAppbar from "./HomeAppbar";
import HomeCard from "./HomeCard";
import React, { useEffect, useState } from 'react';
import "./Home.css"
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

  const fetchData = async () => {
    const apiURL = 'http://127.0.0.1:5000/conversations/retrieve/all/';
    const local_token = token;
    fetch(`http://127.0.0.1:5000/conversations/retrieve/all/${local_token}`)
      .then(response => response.json())
      .then(data => {
        // Process the retrieved data
        setOldIDs(data.slice(-5)); //retrieve the last 5 elements of the array
        setIsLoaded(true);
        //console.log(oldIDs);
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

  return (
    <div className="home-page">
      <HomeAppbar />
      <div className="container">
        <button className="StartNewQuest" onClick={handleNewQ}> + </button>
        <h2>Previous Chat</h2>
        <div className="previous-chat">
          <div className="previous-chat-list">
            <Carousel className="chatCaro">
              {isLoaded && oldIDs.map((oldID, index) => (
                <div key={index}>
                  <HomeCard msgID={oldID ? oldID["conversation_token"] : 'loading...'} />
                </div>
              ))}
            </Carousel>
            {/* <HomeCard msgID={isLoaded && oldIDs[4] ? oldIDs[4]["conversation_token"] : 'loading...'} />
            <HomeCard msgID={isLoaded && oldIDs[3] ? oldIDs[3]["conversation_token"] : 'loading...'} />
            <HomeCard msgID={isLoaded && oldIDs[2] ? oldIDs[2]["conversation_token"] : 'loading...'} />
            <HomeCard msgID={isLoaded && oldIDs[1] ? oldIDs[1]["conversation_token"] : 'loading...'} />
            <HomeCard msgID={isLoaded && oldIDs[0] ? oldIDs[0]["conversation_token"] : 'loading...'} /> */}
          </div>

        </div>
      </div>
    </div>



  );
}

export default Home_;
