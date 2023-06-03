import * as React from 'react';
import Input from "./Input.js";
import { Button, Card, CardHeader, Grid, TextField, Typography } from "@mui/material";
import { useNavigate} from "react-router-dom";
import { useState, useEffect } from 'react';
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
import { v4 as uuid } from 'uuid';

const drawerWidth = 240;

const apiKey = process.env.REACT_APP_GPT3_API_KEY;
const apiUrl = 'https://api.openai.com/v1/chat/completions';
let conversation = [{ role: 'system', content: 'You are a helpful assistant.' }];
const storedData = localStorage.getItem('convo');
//console.log(localStorage.getItem("token"));


function Chat() {
  var token = localStorage.getItem("token");
  const [previewImage, setPreviewImage] = useState(null);
  //const [uploadedImage, setUploadedImage] = useState(null);
  const [file, setFile] = useState(null);  // stores the image file
  const [imageUrl, setImageUrl] = useState(null); // stores the link to the image
  const [uploaded, setUploaded] = useState(false);
  const [conversionComplete, setConversionComplete] = useState(false);

  const [imgText, setImgText] = useState(''); // stores text from img

  const [messages, setMessages] = useState([]);

  const [generating, setGenerating] = useState(false); // set the state of the API: whether it is generating a response or not
  const [uniqueKey, setUniqueKey] = useState('');

  useEffect( () => {
    if (storedData){
      console.log(storedData);
      conversation = [...conversation, ...storedData];
      console.log("concatenation done");
      console.log(conversation);
    }
  })
  
  useEffect(() => {
    if (conversionComplete) {
      handleMessage(imgText, 'imgTxt');
    }
  }, [conversionComplete]);

  useEffect(() => {
    console.log("uniqueKey updated: " + uniqueKey);
    console.log("imgTxt updated: " + imgText);
    if( (file != null) ){
      convertText();
    }
    let tokenObj = {};
    tokenObj["token"] = token;
    let tokenJSON = JSON.stringify(tokenObj);
    console.log(tokenJSON);
    fetch('http://127.0.0.1:5000/conversations/create', {
      method: 'POST',
      body: tokenJSON,
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
      setUniqueKey(data.conversation_token);
    }).catch(function (error) {
      console.warn('Something went wrong.', error);
    });
  }, [])

  //passes messages twice at a time
  const handleMessage = async (content_, type_) => {
    setGenerating(true);
    
    //store user input & token (to be passed into db)
    let convObj = {};
    convObj["token"] = token;
    convObj["usr_content"] = content_; //{role: 'user', content: content_};

    //to be passed into the API
    console.log(content_);
    conversation.push({role: 'user', content: content_});
    //setGenerating('true');
    let reply = await gptHandleMessage(conversation);
    reply = reply.substring(0, 1500); //trim api response
    //setGenerating('false');
    //console.log('Assistant:', reply);
    conversation.push({role: 'assistant', content: reply});

    //update api response in convObj
    convObj["gpt_content"] = reply;//{role: 'assistant', content: reply};
    convObj["conversation_token"] = uniqueKey;
    let convJSON = JSON.stringify(convObj);
    console.log(convJSON);

    fetch('http://127.0.0.1:5000/dialogues/create', {
      method: 'POST',
      body: convJSON,
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

    //used to map out user/ API messages later
    const newUserMessage = { content: content_, type: type_};
    const newAPIMessage = { content: reply, type: "receive"};
    setMessages([...messages, newUserMessage, newAPIMessage]);

    setGenerating(false);


  }

  //passes messages one by one
  /*const handleMessage = async (content_, type_) => {
    setGenerating(true);
    
    //pass user input & token in json format to db (single line of dialogue)
    let userObj = {};
    userObj["token"] = token;
    userObj["key"] = uniqueKey;
    userObj["role"] = "user";
    userObj["content"] = content_;
    let userJSON = JSON.stringify(userObj);
    console.log(userJSON);

    fetch('http://127.0.0.1:5000/messages/create', {
      method: 'POST',
      body: userJSON,
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

    //to be passed into the API
    console.log(content_);
    conversation.push({role: 'user', content: content_});
    //setGenerating('true');
    const reply = await gptHandleMessage(conversation);
    //setGenerating('false');
    //console.log('Assistant:', reply);
    conversation.push({role: 'assistant', content: reply});

    //pass api response into db
    let apiObj = {};
    apiObj["token"] = token;
    apiObj["key"] = uniqueKey;
    apiObj["role"] = "assistant";
    apiObj["content"] = reply;
    let apiJSON = JSON.stringify(apiObj);

    fetch('http://127.0.0.1:5000/messages/create', {
      method: 'POST',
      body: apiJSON,
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

    //used to map out user/ API messages later
    const newUserMessage = { content: content_, type: type_};
    const newAPIMessage = { content: reply, type: "receive"};
    setMessages([...messages, newUserMessage, newAPIMessage]);

    setGenerating(false);


  }*/

  const gptHandleMessage = async (conversation) => {
    //setGenerating('true');
    console.log("CONVERSATION LOG:", conversation);
    //if (content.trim() === '') return;

    const requestBody = {
      model: 'gpt-3.5-turbo',
      messages: conversation,
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
    //setGenerating('false');
  };

  //Convert image to text (from convert_text branch)
  const convertText = () => {
    (async () => {
      const worker = await Tesseract.createWorker();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(file);
      console.log(text);
      setImgText(text);
      setConversionComplete(true);
      
      // if (text != " "){
      //   setImgText(text);
      //   console.log("text processed");
      // } else{
      //   console.log("text unable to be processed");
      // }
      
      await worker.terminate();
  })();
  };
  

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
    setImageUrl(null);
    setFile(null);
    setUploaded(0);
  }

  const handleUploadImage = async () => {
    setConversionComplete(false);
    await convertText();
    const link = URL.createObjectURL(file);
    setUploaded(true);
    setImageUrl(link);
    //console.log("image converted, text is: " + imgText);
    //handleMessage(imgText, "imgTxt");

    /*if (conversionComplete) {
      handleMessage(imgText, "imgTxt");
    } else {
      console.log("Image conversion is not yet complete.");
    }*/
  }
  
  const handleSignOut = ()=>{
    console.log("handleSignOut called");
    let signObj = {}
    signObj["token"] = token;
    let outJSON = JSON.stringify(signObj);
    
    //make a post request to disable the session ID/ token
    fetch('http://127.0.0.1:5000/sessions/remove', {
      method: 'POST',
      body: outJSON,
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
  const navigateHome = () => {
    setMessages([]); // reset messages  
    navigate('/Home');
  }

  const navigate = useNavigate();
  const menuItems = [
    {
      text: 'Home',
      icon: <HomeIcon color="primary" />,
      onClick: () => navigateHome(),
    },
    {
      text: "Sign Out",
      icon: <LogoutIcon color="primary" />,
      onClick: () => handleSignOut(),
    }
  ]

  //section that allows the chatGPT API to process user input
  const [userInput, setUserInput] = useState('');
  //const [chatLog, setChatLog] = useState([]);


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
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
              onClick={item.onClick}
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
            {/*{previewImage && <Grid item md={4} xs={12} sx={{
            }}>
              <Button onClick={convertText}>Convert to Text</Button>
            </Grid>}*/}
            <Grid item>
              {previewImage && <img className='preview-image' src={previewImage} alt="uploaded" />}
            </Grid>
            <Grid item mb={5}>
              {previewImage && <Button sx={{ marginRight: '12.3vw', }}  onClick={handleRemoveImg}>Remove</Button>}
              {previewImage && !uploaded && <Button sx={{ marginLeft: '12.3vw', }}  onClick={handleUploadImage}>Upload</Button>}
              {uploaded ? <Button sx={{ marginLeft: '9vw', }} disabled>Upload Complete</Button> : ''}
            </Grid>
          </Grid>




          {messages.map((message) => (
            (message.type === "send" || message.type === "receive" || message.type === "imgTxt") && (

              <div className={(message.type === "send" || message.type === "imgTxt")? "send" : "receive"} >

                {message.content}


              </div>

            )





          ))}
        </div>
        <Input handleMessage={handleMessage} isDisabled={generating}/>
      </Box>
    </Box>
  );
}

export default Chat;
