import React, { useState } from "react";
import axios from "axios";
import "./Wallet.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post(
        "https://stocksage-backend.onrender.com/gemini/chat",
        {
          message: input,
        }
      );

      const botReply = { sender: "bot", text: response.data.reply };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error("Error communicating with chatbot:", error);
      const errorMsg = {
        sender: "bot",
        text: "Sorry, I couldn't process your request.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    }

    setInput(""); // Clear input field after sending message
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>AI Chatbot</h2>
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
