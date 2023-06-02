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

  const handleNewQ = () => {
    navigate("/Chat");
  }

  const fetchData = async () => {
    const apiURL = 'http://127.0.0.1:5000/messages/retrieve/all/';
    const local_token = token;
    fetch(`http://127.0.0.1:5000/messages/retrieve/all/${local_token}`)
      .then(response => response.json())
      .then(data => {
        // Process the retrieved data
        console.log(data);
      })
      .catch(error => {
        console.error('Error occurred while fetching data:', error);
      });
  };

  useEffect(() => {
    console.log("localstorage token: " + token);
    fetchData();
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
          <HomeCard />
          <HomeCard />
        </Stack>
      </Container>
    </Grid>

  );
}

export default Home_;
