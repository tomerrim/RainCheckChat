import Button from "../Button";
import "./chatHeader.css";

export default function ChatHeader({ isConnected, onClick }) {
    return (
      <div className="row">
        <h2>Status: {isConnected ? "connected" : "disconnected"}</h2>
        <Button onClick={onClick}>Exit</Button>
      </div>
    );
}