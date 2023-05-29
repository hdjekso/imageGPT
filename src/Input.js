import React from 'react';
import { useState } from 'react';
import {Button, Grid, TextField} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import "./Input.css";


const Input = ({handleMessage, isDisabled}) => {
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
            disabled={isDisabled} //disabled if API is generating response
            variant="outlined" 
            label={isDisabled ? 'Generating response...' : 'Send a message...'}
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
            disabled={isDisabled} //disabled if API is generating response
            onClick={() => handleSend(text)}>
            <SendIcon sx={{ fontSize: 45 }}/>
          </IconButton>
        </div>
      </Grid>
    </Grid>
  );
}

export default Input;