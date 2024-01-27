import { useState, useEffect } from "react";
import Message from "../Message";
import { socket } from "../../Lib/socket";
import "./chat.css";

export default function Chat() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        socket.on("connect", () => {
            setIsConnected(true);
        });

        socket.on("disconnect", () => {
            setIsConnected(false);
        });

        socket.on("join", (data) => {
            setMessages((prevMessages) => [...prevMessages, { ...data, type: 'join' }])
        });

        socket.on('chat', (data) => {
            setMessages((prevMessages) => [...prevMessages, { ...data, type: 'chat' }]);
        })
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