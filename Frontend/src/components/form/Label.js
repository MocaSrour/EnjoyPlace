function Label({ children, style, className, ...rest }) {
  const styleAll = {
    // backgroundColor: "#E35335",
    // color: "white",
    borderRadius: "100px",
    padding: "5px 10px",
    fontSize: "24px",
    ...style,
  };
  return (
    <label data-testid="label" style={styleAll} className={className} {...rest}>
      {children}
    </label>
  );
}

export default Label;
