import Button from "../Button";
import "./chatHeader.css";

export default function ChatHeader({ isConnected, currentUser, onClick }) {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  }

  return (
    <div className="row">
      <h2>Status: {isConnected ? "connected" : "disconnected"}</h2>
      <h2>{currentUser}</h2>
      <Button onClick={handleClick}>Exit</Button>
    </div>
  );
}