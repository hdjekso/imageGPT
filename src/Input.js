import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faUpload } from '@fortawesome/free-solid-svg-icons';
import "./Input.css";


const Input = ({ handleMessage, isDisabled }) => {
  const [text, setText] = useState("");

  const handleSend = (text) => {
    if (text !== "") { // nothing if there is nothing to be written
      handleMessage(text, "send");
      setText("");
    }

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


        <div className="button-container">
          <button className="BTNuploadIMG">
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