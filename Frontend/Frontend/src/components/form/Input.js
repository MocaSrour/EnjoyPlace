function Input({ children, style, className, ...rest }) {
  const styleAll = {
    border: "2px solid #623791",
    borderRadius: "15px",
    outline: "none",
    boxShadow: "none",
    fontSize: "20px",
    fontWeight: "bold",
    padding: "8px",
    ...style,
  };
  return (
    <input style={styleAll} className={className} {...rest}>
      {children}
    </input>
  );
}

export default Input;
