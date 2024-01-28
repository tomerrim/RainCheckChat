import "./message.css";

export default function Message({ message, currentUser }) {
    let content;
    let messageTypeClass = "";

    switch (message.type) {
      case "join":
        content = `${message.sid} just joined`;
        messageTypeClass = "join-message";
        break;
      case "chat":
        content = `${message.sid}: ${message.message}`;
        messageTypeClass = message.sid === currentUser ? "my-message" : "others-message";
        break;
      case "exit":
        content = `${message.sid} has left`;
        messageTypeClass = "exit-message";
        break;
      default:
        content = "";
    }

    return <p className={`message ${messageTypeClass}`}>{content}</p>;
}