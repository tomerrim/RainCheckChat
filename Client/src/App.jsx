import "./App.css";
import Chat from "./components/Chat";
import { ChatProvider } from "./components/Chat/ChatContext";

function App() {
  return (
    <>
      <h1>Chat App</h1>
      <ChatProvider>
        <Chat />
      </ChatProvider>
    </>
  );
}

export default App;
