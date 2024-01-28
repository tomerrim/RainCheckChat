import { useState } from "react";
import Input from "../Input";
import Button from "../Button";

export default function NameForm({ onNameSubmit }) {
    const [name, setName] = useState("");

    function handleNameChange(value) {
        setName(value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onNameSubmit(name);
    }

    return (
        <form onSubmit={handleSubmit} className="form">
            <Input value={name} onTextChange={handleNameChange} placeholder="Enter your name..."/>
            <Button type="submit">Enter Chat</Button>
        </form>
    )
}