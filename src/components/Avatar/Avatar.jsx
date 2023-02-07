import React from "react";

const Avatar = ({
  children,
  backgroundColor,
  fontSize,
  color,
  px,py,
  borderRadius,
  cursor
}) => {

  const style = {
    backgroundColor,
    fontSize,
    color: color || "black",
    padding: `${py} ${px}`,
    textAlign: "center",
    cursor: cursor || null,
    borderRadius
  };

  return <div style={style}>{children}</div>;
};

export default Avatar;
