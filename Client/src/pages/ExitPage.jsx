import { useLocation } from "react-router-dom";
import Button from "../components/Button";

export default function ExitPage() {
    const location = useLocation();
    const username = new URLSearchParams(location.search).get('name');

    return (
        <div>
            <h1>Hello {username}</h1>
            <Button onClick={() => window.location.href = `/?name=${username}`}>Join the Chat</Button>
        </div>
    )
}