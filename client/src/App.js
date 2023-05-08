import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import "./assets/css/style.css"


const socket = io("https://au-chat-bot.onrender.com");

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on("chat message", (msg) => {
      let newMessage = { who: "me", message: msg };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the user's message to the server
    socket.emit("chat message", inputValue);

    let newMessage = { who: "user", message: inputValue };

    // Add the user's message to the list of messages
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Clear the input field
    setInputValue("");
  };

  return (
    <div className="chat-bot">
      <div className="about">
        <p>
          <p> Welcome to our Student Query Resolution Chatbot! </p>
          <p>  We are here to assist you with any questions or concerns you may have as a student. Whether you need help with course registration, understanding academic policies, or simply have general inquiries, our chatbot is ready to provide you with quick and accurate responses. </p>
          <p> Our goal is to make your experience as a student more convenient and efficient. Our chatbot is equipped with a vast knowledge base and is continuously learning to better address your queries. We understand that navigating through various student-related matters can sometimes be overwhelming, but with our chatbot, you can find answers to your questions in a matter of seconds. </p>
          <p> Feel free to ask anything related to student life, academics, campus resources, or any other topic you need assistance with. Our chatbot is here 24/7 to ensure you receive prompt support and guidance.</p>
          <p> So go ahead, ask your question, and let our chatbot provide you with the information you need. We're here to help you succeed in your educational journey! </p>
        </p>
      </div>
      <div className="chat-area">
        <ul>
          {messages.map((msg, index) => (
            <div className="chats">
              <li
                key={index}
                className={msg.who}
              >
                <pre>  {msg.message}</pre>
              </li>
            </div>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            required
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;
