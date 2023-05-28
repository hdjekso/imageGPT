import React from 'react';
import { useState } from 'react';
import {Button, Grid, TextField} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import "./Input.css";


const Input = ({handleMessage}) => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const handleSend  = (text) => {
    if (text !== "" ){ // nothing if there is nothing to be written
      handleMessage(text, "send");
      setText("");
    }
   
  };

  const inputStyle = {
    borderRadius: '15px', // Adjust the value as needed
    backgroundColor: '#ffffff',
  };

  return (
    <Grid 
      container
      alignItems="flex-end"
      justifyContent="center"
      direction="row">
      <Grid item md={10} 
        sx={{
          ml: 4.5
        }}>
        <div 
          style={{
            alignItems:'center',
            display:'flex',
          }}>
          <TextField 
            InputProps={{
              style: inputStyle,
            }}
            fullWidth
            variant="outlined" 
            label="Send a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) =>{
              if (e.keyCode === 13  ){              
                handleSend(text);
              }
            }}
          >
          </TextField>
          <IconButton 
            color="primary"
            aria-label="send message"
            onClick={() => handleSend(text)}>
            <SendIcon sx={{ fontSize: 45 }}/>
          </IconButton>
        </div>
      </Grid>
    </Grid>
  );
  {/*<div className="message-input">
      <input
        type="text"
        placeholder="Send a message..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={(e) =>{
          if (e.keyCode === 13  ){
            
            handleSend(text);
          }
        }

        }
      />
      <div className="send_">
        <button onClick={() => handleSend(text)}></button>
      </div>
    </div>*/}
}

export default Input;