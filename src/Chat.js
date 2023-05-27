import * as React from 'react';
import Input from "./Input.js";
import { Button, Card, CardHeader, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Icon from '@mui/material/Icon';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import "./Chat.css";
import "./Input.css";
import { Cloud } from '@mui/icons-material';

import Tesseract from 'tesseract.js';
import { createWorker } from 'tesseract.js';


const drawerWidth = 240;

/*function Chat() {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/home");
  }

  const handleSignOut = () => {
    navigate("/");
  }

  return (
    <Grid>
      <Typography>
        This is the conversations page
      </Typography>
    <Button onClick={handleHome}>
      Home
    </Button>
    <Button onClick={handleSignOut}>
      Sign Out
    </Button>
    </Grid>

  );
}*/

//const API_KEY = process.env.CHATGPT_API_KEY;
const apiKey = process.env.REACT_APP_GPT3_API_KEY;;
const apiUrl = 'https://api.openai.com/v1/chat/completions';
console.log(localStorage.getItem("token"));

/*async function generateChatMessage(user_prompt) {
  const requestBody = {
    prompt: user_prompt,
    max_tokens: 50, // Adjust the value based on your desired response length
    temperature: 0.7, // Adjust the value to control the randomness of the output
    model: 'gpt-3.5-turbo',
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(requestBody),
  });

  const data = await response.json();
  console.log(data);
  //const message = data.choices[0].text.trim();
  //return message;
}*/


function Chat() {
  const [previewImage, setPreviewImage] = useState(null);
  //const [uploadedImage, setUploadedImage] = useState(null);
  const [file, setFile] = useState(null);  // stores the image file
  const [imageUrl, setImageUrl] = useState(null); // stores the link to the image
  const [imageWidth, setImageWidth] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const [imgText, setImgText] = useState(''); // stores text from img

  const [messages, setMessages] = useState([
  ]);

  const handleMessage = async (content, type) => {
    setUserInput(content); //updates userinput variable so that it can be referenced by the API

    //Call the API and get the response
    const reply = await gptHandleMessage(content);

    //Create a new message from the API response
    const apiMessage = { content: reply, type: "receive", id: messages.length + 1 };

    const newMessage = { content: content, type: type, id: messages.length }

    console.log(content);



    //updates messages and checks if the previous one is the correct one 
    if (messages.length > 0) {
      const prevMess = messages[messages.length - 1].type; // makes sure the previous message is an image upload
      console.log(prevMess);
      if (prevMess === "imgTxt") {
        // in the case when the previous message was an image
        console.log(content + messages[messages.length - 1].content);
      }

    }
    const updatedMessages = messages.concat([newMessage, apiMessage]); // Add both user message and API message at once
    // const updatedMessages = messages.concat(newMessage);
    setMessages(updatedMessages);
    console.log(updatedMessages);
    setUserInput('');

  }

  const gptHandleMessage = async (content) => {
    console.log(content);
    if (content.trim() === '') return;

    const requestBody = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are' },
        { role: 'user', content: content }
      ]
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      // Retrieve the model's response
      const reply = data.choices[0].message.content;
      console.log(reply);
      return reply;

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const convertText = () => {
    (async () => {
      const worker = await Tesseract.createWorker();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(file);
      console.log(imgText);
      if (text !== " ") {
        setImgText(text);
        console.log("text processed");
      } else {
        console.log("text unable to be processed");
      }

      await worker.terminate();
    })();
  }


  const handleSelectImage = (event) => {
    setFile(event.target.files[0]);
    const fileReader = new FileReader();
    /*fileReader.addEventListener("load", () => {
        setPreviewImage(fileReader.result);
    });*/
    fileReader.onloadend = () => {
      setPreviewImage(fileReader.result);
      /*setImageWidth(fileReader.result.width);
      console.log(fileReader.result.width);*/
    }
    fileReader.readAsDataURL(event.target.files[0]);
  }

  const handleRemoveImg = () => {
    setPreviewImage(null);
  }

  const handleUploadImage = () => {

    const link = URL.createObjectURL(file);
    setUploaded(true);
    setImageUrl(link);

    handleMessage(imgText, "imgTxt")

    /*const data = new FormData();
    data.append('files[]', previewImage);

    
    fetch(/"server url", { method: 'POST', body: data }).then(async (response) => {
        const imageResponse = await response.json();
        setUploadedImage(imageResponse);
    }).catch((err) => {

    });*/
  }

  // const [message, setMessage] = useState('');

  // const handleMessageChange = (event) => {
  //   setMessage(event.target.value);
  // };

  const navigate = useNavigate();
  const menuItems = [
    {
      text: 'Home',
      icon: <HomeIcon color="primary" />,
      path: '/home'
    },
    {
      text: "Sign Out",
      icon: <LogoutIcon color="primary" />,
      path: '/'
    }
  ]

  //section that allows the chatGPT API to process user input
  const [userInput, setUserInput] = useState('');
  //const [chatLog, setChatLog] = useState([]);


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/*<AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            ImageGPT
          </Typography>
        </Toolbar>
      </AppBar>*/}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth + 10,
            boxSizing: 'border-box',
            bgcolor: '#e1e8f5',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <AppBar
          position="relative"
          sx={{ width: drawerWidth + 9, height: 80 }}
          style={{ background: '#26487A' }}
        >
          <Toolbar>
            <Typography variant="h5" noWrap component="div">
              <Box sx={{ fontWeight: 'bold', mt: 1.5 }}>ImageGPT</Box>
            </Typography>
          </Toolbar>
        </AppBar>

        {/*output list items */}
        <List>
          {menuItems.map(item => (
            <ListItem button divider
              key={item.text}
              sx={{ height: 60, p: 3, mb: 1.5 }}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        height="100vh"
        sx={{ flexGrow: 1, bgcolor: '#99C0FB', p: 3, pl: 4.5, pr: 0 }}
      >
        <div className="content">
          {/*<Toolbar />*/}
          <Grid container spacing={2} sx={{ mt: 2 }} justifyContent="center" direction="column" alignItems="center">
            <Grid item>
              {!previewImage && <Card sx={{
                backgroundColor: "#26487A",
                height: 200,
                width: '70vw',
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, mt: 2 }}>
                  <CloudUploadIcon style={{ fontSize: 55 }} />
                </Box>
                <label className="custom-file-select">
                  {!imageUrl && <input type="file" onChange={handleSelectImage} />}
                  Choose File
                </label>
              </Card>}
            </Grid>
            {previewImage && <Grid item md={4} xs={12} sx={{
            }}>
              <Button onClick={convertText}>Convert to Text</Button>
            </Grid>}
            <Grid item>
              {previewImage && <img className='preview-image' src={previewImage} alt="uploaded" />}
            </Grid>
            <Grid item mb={5}>
              {previewImage && <Button sx={{ marginRight: '12.3vw', }} disabled={uploaded} onClick={handleRemoveImg}>Remove</Button>}
              {previewImage && !uploaded && <Button sx={{ marginLeft: '12.3vw', }} disabled={uploaded} onClick={handleUploadImage}>Upload</Button>}
              {uploaded ? <Button sx={{ marginLeft: '9vw', }} disabled>Upload Complete</Button> : ''}
            </Grid>
          </Grid>




          {messages.map((message) => (
            (message.type === "send" || message.type === "receive") && (

              <div className={message.type === "send" ? "send" : "receive"} >

                {message.content}


              </div>

            )





          ))}

          {/*<div>
          <label htmlFor="message-input">Send a message:</label>
          <input
            type="text"
            id="message-input"
            value={message}
            onChange={handleMessageChange}
          />
          <button>Send</button>
        </div>*/}
          <Input handleMessage={handleMessage} />
        </div>

        {/* <Slide>Test</Slide> */}
      </Box>
    </Box>
  );
}

export default Chat;
