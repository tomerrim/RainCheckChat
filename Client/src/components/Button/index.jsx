import "./button.css";

const Button = ({ type, children, className, onClick }) => {
  return (
    <button
      type={type || "button"}
      className={`button ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
