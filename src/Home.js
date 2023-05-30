import { Button, Grid, Typography, Stack, Container} from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeAppbar from "./HomeAppbar";
import HomeCard from "./HomeCard";
import React, {useEffect, useState} from 'react';
import axios from 'axios';

function Home_() {
  var token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const handleNewQ = () => {
    navigate("/Chat");
  }

  const fetchData = async () => {
    try {
      const body = JSON.stringify({ token });
      const local_token = token;
      const apiURL = 'http://127.0.0.1:5000/messages/retrieve/all';
      const urlWithToken = apiURL + "/" + local_token;
      console.log(urlWithToken);

      const response = await fetch(urlWithToken, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setData(responseData);
      } else {
        // Handle error response
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      // Handle network error
      console.error('Request failed:', error);
    }
  };
  
  /*const fetchData = async () => {
    let obj = {};
    obj["token"] = token;
    let myJSON = JSON.stringify(obj);

    fetch('http://127.0.0.1:5000/messages/retrieve/all', {
      method: 'GET',
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
  }*/

  useEffect(() => {
    console.log("localstorage token: " + token);
    fetchData();
  }, []);

  return (
    <Grid sx={{
      display:'flex',
      flexDirection:'column',
      backgroundColor:'#99C0FB',
      width:'100vw',
      height:'100vh'
    }}>
      <HomeAppbar />
      <Container sx={{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        height:'100%'
      }}>
        <Button 
          onClick={handleNewQ}
          variant='solid'
          sx={{
            marginTop:'40px',
            padding:'10px 20px',
            fontSize:'25px',
            backgroundColor: '#26487A',
            fontWeight: 'bold',
            color: 'white',
            border: '2px solid #26487A',
            borderRadius:'15px',
            '&:hover':{
              border: '2px solid #26487A',
              backgroundColor: 'white',
              color: '#26487A',
              cursor:'default'
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

        <Stack spacing ={2} sx={{
          display:'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width:'100%'
        }}>
          <HomeCard />
          <HomeCard />
        </Stack>
      </Container>
    </Grid>

  );
}

export default Home_;
