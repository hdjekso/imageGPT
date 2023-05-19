import React from 'react';
import { useState } from 'react';
import "./Input.css"


const Input = ({handleMessage}) => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const handleSend  = (text) => {
    if (text !== "" ){ // nothing if there is nothing to be written
      handleMessage(text, "send");
      setText("");
    }
   
  };

  return (
    <div className="message-input">
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
    </div>
  );
}

export default Input;