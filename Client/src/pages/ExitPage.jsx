import Button from "../components/Button";

export default function ExitPage() {
    return (
        <div>
            <h1>Hello</h1>
            <Button onClick={() => window.location.href = `/`}>Join the Chat</Button>
        </div>
    )
}