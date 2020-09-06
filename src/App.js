import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.scss";

const socket = io("https://i-chat-server.herokuapp.com/");

function App() {
  const [messages, setMessages] = useState([
    {
      image: "",
      name: "อาร์ทเอง",
      message: "สวัสดี",
    },
    {
      image: "",
      name: "แทนนี่",
      message: "ดีครับ",
    },
  ]);
  const [input, setInput] = useState({
    name: "",
    message: "",
  });

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((messages) => [
        {
          image: "",
          name: data.name,
          message: data.message,
        },
        ...messages,
      ]);
    });
  }, []);

  return (
    <div id="App">
      <div className="input">
        <input
          type="text"
          placeholder="ชื่อ"
          value={input.name}
          onChange={(e) => setInput({ ...input, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="ข้อความ"
          value={input.message}
          onChange={(e) => setInput({ ...input, message: e.target.value })}
        />
        <button
          onClick={() => {
            socket.emit("message", {
              name: input.name,
              message: input.message,
            });
            setInput({ ...input, message: "" });
          }}
        >
          ส่ง
        </button>
      </div>
      <div className="message">
        {messages.map((m, i) => (
          <div key={i} className="box">
            <div className="img"></div>
            <div className="text_box">
              <div className="name">{m.name}</div>
              <div className="text">{m.message}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
