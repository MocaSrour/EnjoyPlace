import { useState } from "react";

function Button({ children, activeColor, defaultColor, style, className, ...rest }) {
  const [isActive, setIsActive] = useState(false);
  const color = isActive ? activeColor : defaultColor;
  const styleAll = {
    backgroundColor: color,
    color: "white",
    padding: "10px",
    border: "none",
    marginBlock: "10px",
    ...style,
  };
  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <button
      onMouseLeave={handleClick}
      onMouseEnter={handleClick}
      style={styleAll}
      className={className}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
