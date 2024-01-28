import Button from "../Button";
import Input from "../Input";
import "./forms.css";

export default function NewMessageForm({ inputValue, onChange, onClick }) {
    function handleInputChange(value) {
        if (onChange) {
            onChange(value);
        }
    }

    return (
        <form className="form">
            <Input 
              placeholder="Write a new message..."
              name="message"
              value={inputValue}
              className="inputForm"
              onTextChange={handleInputChange}
            />
            <Button type="submit" onClick={onClick}>Send</Button>
        </form>
    )
}