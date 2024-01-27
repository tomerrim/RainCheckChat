import { useState, useEffect } from "react";
import Message from "../Message";
import { socket } from "../../Lib/socket";
import "./chat.css";

export default function Chat() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
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
        setMessages((prevMessages) => [
          ...prevMessages,
          { ...data, type: "join" },
        ]);
      };

      // Event handler for 'chat'
      const handleChat = (data) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { ...data, type: "chat" },
        ]);
      };

      // Subscribe to events
      socket.on("connect", handleConnect);
      socket.on("disconnect", handleDisconnect);
      socket.on("join", handleJoin);
      socket.on("chat", handleChat);

      // Clean up event listeners when the component is unmounted
      return () => {
        socket.off("connect", handleConnect);
        socket.off("disconnect", handleDisconnect);
        socket.off("join", handleJoin);
        socket.off("chat", handleChat);
      };
    }, []);

    function onTextChange(e) {
        const value = e.target.value.trim();
        setMessage(value);
    }

    function sendMessage() {
        if (message && message.length) {
            socket.emit("chat", message);
        }
        setMessage("");
        console.log(message)
        console.log("messages: ", messages);
    }

    return (
        <>
            <h2>Status: { isConnected ? "connected" : "disconnected"}</h2>
            <div className="chat">
                {messages.map((message, index) => (
                    <Message message={message} key={index}/>
                ))}
            </div>
            <input type="text" id="message" onChange={onTextChange}/>
            <button onClick={sendMessage}>Send</button>
        </>
    )
}