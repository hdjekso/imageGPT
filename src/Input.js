import React, { useRef } from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faUpload } from '@fortawesome/free-solid-svg-icons';
import "./Input.css";


const Input = ({ handleMessage, handleUploadImage, handleSelectImage, isDisabled }) => {
  const [text, setText] = useState("");
  const fileInput = useRef();

  const handleSend = (text) => {
    if (text !== "") { // nothing if there is nothing to be written
      handleMessage(text, "send");
      setText("");
    }

  };

  const  handleUploadClick =  (event) => {
    console.log("upload button clicked");
    fileInput.current.click();
    
    // const file = event.target.files[0];
    // handleUploadImage();

  };

  return (

    <div className="input-container">
      <form
        className="chatMSGWindow"
        onSubmit={event => {
          event.preventDefault();
          handleSend(text);
          setText('');
        }}
      >
        <input className="textboxChat"
          type="text"
          value={text}
          onChange={event => setText(event.target.value)}
          placeholder="Type a message..."
        />

        <input className="imageChat"
          type="file"
          id="file-input"
          ref={fileInput}
          style={{ display: "none" }}
          onChange={event => handleSelectImage(event)}
        />



        <div className="button-container">
          <button className="BTNuploadIMG" type="button" onClick={handleUploadClick}>
            <FontAwesomeIcon icon={faUpload} />
          </button>
          <button className="BTNsubmitQuest" type="submit">
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Input;