import { Button, Grid, Typography, Stack, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeAppbar from "./HomeAppbar";
import HomeCard from "./HomeCard";
import React, { useEffect, useState } from 'react';
// import axios from 'axios';

function Home_() {
  var token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [oldIDs, setOldIDs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleNewQ = async () => {
    await localStorage.removeItem("convo");
    await localStorage.removeItem("convoID");
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
        //console.log(oldIDs[4]);
      })
      .catch(error => {
        console.error('Error occurred while fetching data:', error);
      });
  };

  useEffect(() => {
    //console.log("localstorage token: " + token);
    fetchData();
    //console.log("oldIDs updated: " + oldIDs);
    //console.log("oldID 5: " + oldIDs[4]["conversation_token"]);
  }, []);

  return (
    <Grid sx={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#99C0FB',
      width: '100vw',
      height: '100vh'
    }}>
      <HomeAppbar />
      <Container sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }}>
        <Button
          onClick={handleNewQ}
          variant='solid'
          sx={{
            marginTop: '40px',
            padding: '10px 20px',
            fontSize: '25px',
            backgroundColor: '#26487A',
            fontWeight: 'bold',
            color: 'white',
            border: '2px solid #26487A',
            borderRadius: '15px',
            '&:hover': {
              border: '2px solid #26487A',
              backgroundColor: 'white',
              color: '#26487A',
              cursor: 'default'
            }
          }}>
          Start a new question
        </Button>

        <Typography
          fontSize={'20px'}
          fontWeight={'bold'}
          color={'black'}
          marginBottom={'20px'}
          marginTop={'40px'}>
          Previous chat
        </Typography>

        <Stack spacing={2} sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%'
        }}>
          <HomeCard msgID={isLoaded? oldIDs[4]["conversation_token"] : 'loading...'}/>
          <HomeCard msgID={isLoaded? oldIDs[3]["conversation_token"] : 'loading...'}/>
          <HomeCard msgID={isLoaded? oldIDs[2]["conversation_token"] : 'loading...'}/>
          <HomeCard msgID={isLoaded? oldIDs[1]["conversation_token"] : 'loading...'}/>
          <HomeCard msgID={isLoaded? oldIDs[0]["conversation_token"] : 'loading...'}/>
          
        </Stack>
      </Container>
    </Grid>

  );
}

export default Home_;
