import "./input.css";

const Input = ({
  type,
  onTextChange = (v) => {},
  placeholder,
  name,
  value,
  className,
}) => {
  const handleChange = (e) => onTextChange(e.target.value);
  return (
    <input
      type={type || "text"}
      placeholder={placeholder}
      name={name}
      value={value}
      className={`input ${className}`}
      onChange={handleChange}
    />
  );
};

export default Input;
