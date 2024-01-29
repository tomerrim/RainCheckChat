import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [messages,setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    const addMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    }

    const addUser = (user) => {
        setUsers((prevUsers) => [...prevUsers, user]);
    }

    const contextValue = {
        messages,
        users,
        addMessage,
        addUser,
    };

    return (
        <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
    )
}

export const useChat = () => {
    return useContext(ChatContext);
}