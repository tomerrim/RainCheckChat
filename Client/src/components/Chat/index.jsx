import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import MessageList from "../MessageList";
import { socket } from "../../Lib/socket";
import NewMessageForm from "../Forms/NewMessageForm";
import NameForm from "../Forms/NameForm";
import "./chat.css";
import ChatHeader from "../ChatHeader";
import Message from "../Message";
// import { useChat } from "./ChatContext";

export default function Chat() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  // const { messages, addMessage, addUser } = useChat();
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();
  const { name } = useParams();

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
    console.log("handle join data:", data);
    setMessages((prev) => [...prev, { sid: data.sid, name: data.name, type: "join" }]);
    // //addMessage({ ...data, type: "join" });
    setCurrentUser(data.name);
    setUserName(data.name);
    //addUser(data.name);
  };

  // Event handler for 'exit'
  const handleExit = () => {
    // Emit an 'exit' event to the server
    socket.emit("exit", { name: currentUser, type: "exit" });
    //addMessage({ name: currentUser, type: "exit" });
    setMessages((prev) => [...prev, {sid: socket.sid, name: currentUser, type: "exit" }]);

    navigate(`/exit?name=${currentUser}`);
  };

  // Event handler for 'chat'
  const handleChat = (data) => {
    // addMessage({ ...data, type: "chat" });
    setMessages((prev) => [...prev, { ...data, type: "chat" }]);
  };

  useEffect(() => {
    // Subscribe to events
    socket.on("connected", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("join", handleJoin);
    socket.on("chat", handleChat);
    socket.on("exit", handleExit);

    // Clean up event listeners when the component is unmounted
    return () => {
      socket.off("connected", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("join", handleJoin);
      socket.off("chat", handleChat);
      socket.off("exit", handleExit);
    };
  }, []);

  useEffect(() => {
    if (name) {
      handleNameSubmit(name);
    }
  }, [])

  function handleNameSubmit(name) {
    // emit a 'join' event to the server 
    handleJoin({name, type: "join"})
  }

  function onTextChange(value) {
    setMessage(value);
  }

  function sendMessage(e) {
    e.preventDefault();
    if (message && message.length) {
      socket.emit("chat", currentUser, message);
    }
    setMessage("");
    console.log("messages from send message: ", messages);
  }

  return (
    <>
      {!userName ? (
        <NameForm onNameSubmit={handleNameSubmit} />
      ) : (
        <>
          <ChatHeader isConnected={isConnected} currentUser={currentUser} onClick={handleExit} />
          <div className="chat">
            {/* <MessageList messages={messages} /> */}
            <>
              {messages.map((message, index) => (
                <Message
                  message={message}
                  currentUser={currentUser}
                  key={index}
                />
              ))}
            </>
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
