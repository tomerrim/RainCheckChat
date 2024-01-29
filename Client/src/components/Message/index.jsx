import "./message.css";

export default function Message({ message, currentUser }) {
    // let content;
    // let messageTypeClass = "";
    const isCurrentUser = message.name === currentUser;

    return (
      <>
        {message.type === "join" && (
          <p
            className={`message ${message.type}`}
          >{`${message.name} just joined`}</p>
        )}
        {message.type === "chat" && (
          <div className={`message ${message.type}-message ${isCurrentUser ? "my-message" : "others-message"}`}>
            <div className="name">{message.name}</div>
            <div className="content">{message.message}</div>
          </div>
        )}
        {message.type === "exit" && (
          <p
            className={`message ${message.type}`}
          >{`${message.name} has left`}</p>
        )}
      </>
    );

    // switch (message.type) {
    //   case "join":
    //     content = `${message.sid} just joined`;
    //     messageTypeClass = "join-message";
    //     break;
    //   case "chat":
    //     content = `${message.sid}: ${message.message}`;
    //     messageTypeClass = message.sid === currentUser ? "my-message" : "others-message";
    //     break;
    //   case "exit":
    //     content = `${message.sid} has left`;
    //     messageTypeClass = "exit-message";
    //     break;
    //   default:
    //     content = "";
    // }

    // return <p className={`message ${messageTypeClass}`}>{content}</p>;
}