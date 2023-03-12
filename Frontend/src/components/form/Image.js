function Image({ src, alt, children, style, className, ...rest }) {
  const styleAll = {
    // borderRadius: "50%",
    // boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
    // width: "90px",
    // height: "90px",
    // objectFit: "contain",
    ...style,
  };
  return (
    <img src={src} alt={alt} style={styleAll} className={className} {...rest}>
      {children}
    </img>
  );
}

export default Image;
