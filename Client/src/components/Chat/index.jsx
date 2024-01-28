import { useState, useEffect } from "react";
import MessageList from "../MessageList";
import { socket } from "../../Lib/socket";
import NewMessageForm from "../Forms/NewMessageForm";
import NameForm from "../Forms/NameForm";
import "./chat.css";
import Button from "../Button";
import ChatHeader from "../ChatHeader";

export default function Chat() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  // const [currentUserSid, setCurrentUserSid] = useState("");

  // Event handler for 'connect'
  const handleConnect = () => {
    setIsConnected(socket.connected);
  };

  // Event handler for 'disconnect'
  const handleDisconnect = () => {
    setIsConnected(socket.connected);
  };

  // Event handler for 'join'
  const handleJoin = (data) => {
    // setCurrentUserSid(data.sid);
    setMessages((prevMessages) => [...prevMessages, { ...data, type: "join" }]);
  };

  // Event handler for 'exit'
  const handleExit = (data) => {
    setMessages((prevMessages) => [...prevMessages, { ...data, type: "exit" }]);
    setUserName("");
  };

  // Event handler for 'chat'
  const handleChat = (data) => {
    setMessages((prevMessages) => [...prevMessages, { ...data, type: "chat" }]);
  };

  useEffect(() => {
    // Subscribe to events
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("join", handleJoin);
    socket.on("chat", handleChat);
    socket.on("exit", handleExit);

    // Clean up event listeners when the component is unmounted
    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("join", handleJoin);
      socket.off("chat", handleChat);
      socket.off("exit", handleExit);
    };
  }, []);

  function handleNameSubmit(name) {
    setUserName(name);
    // emit a 'join' event to the server later
  }

  function onTextChange(value) {
    setMessage(value);
  }

  function sendMessage(e) {
    e.preventDefault();
    if (message && message.length) {
      socket.emit("chat", message);
    }
    setMessage("");
    console.log(message);
    console.log("messages: ", messages);
  }

  return (
    <>
      {!userName ? (
        <NameForm onNameSubmit={handleNameSubmit} />
      ) : (
        <>
          <ChatHeader isConnected={isConnected} onClick={handleExit}/>
          <div className="chat">
            <MessageList messages={messages} />
          </div>
          <NewMessageForm
            inputValue={message}
            onChange={onTextChange}
            onClick={sendMessage}
          />
        </>
      )}
    </>
  );
}
