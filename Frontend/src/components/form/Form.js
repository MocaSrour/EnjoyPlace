function Form({ children, style, className, ...rest }) {
  const styleAll = {
    display: "flex",
    ...style,
  };
  return (
    <form style={styleAll} className={className} {...rest}>
      {children}
    </form>
  );
}

export default Form;
