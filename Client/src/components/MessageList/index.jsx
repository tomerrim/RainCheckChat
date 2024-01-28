import { socket } from "../../Lib/socket";
import Message from "../Message";

export default function MessageList({ messages }) {
    return (
      <>
        {messages.map((message, index) => (
          <Message message={message} currentUser={socket.sid} key={index} />
        ))}
      </>
    );
}