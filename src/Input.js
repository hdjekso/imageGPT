import React from 'react';
import { useState } from 'react';
import "./Input.css"

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const handleSend  = () => {

  };

  return (
    <div className="message-input">
      <input
        type="text"
        placeholder="Send a message..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send_">
        <button onClick={handleSend}></button>
      </div>
    </div>
  );
}

export default Input;