import * as React from 'react';
import Input from "./Input.js";



import { Button, Card, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import "./Chat.css";
import "./Input.css";
import Tesseract from 'tesseract.js';

const drawerWidth = 240;

const apiKey = process.env.REACT_APP_GPT3_API_KEY;
const apiUrl = 'https://api.openai.com/v1/chat/completions';
let conversation = [{ role: 'system', content: 'You are a helpful assistant.', }];
//const storedData = localStorage.getItem('convo');
//console.log(localStorage.getItem("token"));


function Chat() {
  var token = localStorage.getItem("token");
  const storedData = localStorage.getItem('convo');
  const convoID = localStorage.getItem('convoID');
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


  useEffect(() => {
    if (storedData != null) {
      console.log(storedData);
      conversation = JSON.parse(storedData);
      console.log("restoration done");
      console.log(conversation);
      setUniqueKey(convoID); //update convo ID to old one
      updateMessages(conversation); //update the messages object using values in conversation
    } else { // generate new convo ID if old chat not selected
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
        console.log("convo id generated once");
        setUniqueKey(data.conversation_token);
      }).catch(function (error) {
        console.warn('Something went wrong.', error);
      });
    }
  }, [])

  useEffect(() => {
    if (conversionComplete) {
      handleMessage(imgText, 'imgTxt');
    }
  }, [conversionComplete, imgText]);

  useEffect(() => {
    console.log("uniqueKey updated: " + uniqueKey);
    console.log("imgTxt updated: " + imgText);
    if ((file != null)) {
      convertText();
    }

  }, [])

  const updateMessages = (conversation) => {
    const filteredConversation = conversation.filter(
      (message) => message.role === "user" || message.role === "assistant"
    );
    const newMessages = filteredConversation.map((message) => {
      if (message.role === "user") {
        return { content: message.content, type: "send" };
      } else {
        return { content: message.content, type: "receive" };
      }
    });
    if (newMessages.length !== 0) {
      setMessages(newMessages);
    }
  };


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
      console.log("GPT REPLY:" + reply);
      return reply;

    } catch (error) {
      console.error('Error:', error);
    }
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
      await worker.terminate();
    })();
  };


  const handleSelectImage = (event) => {
    setFile(event.target.files[0]);
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setPreviewImage(fileReader.result);
    }
    fileReader.readAsDataURL(event.target.files[0]);
  }

  //passes messages twice at a time
  const handleMessage = async (content_, type_) => {
    setGenerating(true);

    //store user input & token (to be passed into db)
    let convObj = {};
    convObj["token"] = token;
    convObj["usr_content"] = content_; //{role: 'user', content: content_};

    //to be passed into the API
    console.log("content:" + content_);
    conversation.push({ role: 'user', content: content_ });
    let reply = await gptHandleMessage(conversation);
    reply = reply.substring(0, 1500); //trim api response
    conversation.push({ role: 'assistant', content: reply });

    //update api response in convObj
    convObj["gpt_content"] = reply;
    convObj["conversation_token"] = uniqueKey;
    let convJSON = JSON.stringify(convObj);
    console.log("JSON:" + convJSON);

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
    const newUserMessage = { content: content_, type: type_ };
    const newAPIMessage = { content: reply, type: "receive" };
    setMessages([...messages, newUserMessage, newAPIMessage]);

    setGenerating(false);


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
  }

  const handleSignOut = () => {
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

  return (
    <div className="main-container">
      <div className="bg-container">
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>

      <div className="content-container">
        <div className="header-menu">
          <a class="menu-link" onClick={navigateHome} >Home</a>
          <a class="menu-link is-active" href="#">ChatBot</a>
          <a class="menu-link" onClick={handleSignOut}>Sign Out</a>
        </div>
        <div className="content">
          {/* <Grid container spacing={2} sx={{ mt: 2 }} justifyContent="center" direction="column" alignItems="center">
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
            <Grid item>
              {previewImage && <img className='preview-image' src={previewImage} alt="uploaded" />}
            </Grid>
            <Grid item mb={5}>
              {previewImage && <Button sx={{ marginRight: '12.3vw', }} onClick={handleRemoveImg}>Remove</Button>}
              {previewImage && !uploaded && <Button sx={{ marginLeft: '12.3vw', }} onClick={handleUploadImage}>Upload</Button>}
              {uploaded ? <Button sx={{ marginLeft: '9vw', }} disabled>Upload Complete</Button> : ''}
            </Grid>
          </Grid> */}


          {messages.map((message) => (
            (message.type === "send" || message.type === "receive" || message.type === "imgTxt") && (

              <div className={(message.type === "send" || message.type === "imgTxt") ? "send" : "receive"} >

                {message.content}

              </div>
            )

          ))}


        </div>

        <Input handleMessage={handleMessage} handleSelectImage={handleSelectImage} isDisabled={generating} />

      </div>

    </div>
  );
}

export default Chat;
