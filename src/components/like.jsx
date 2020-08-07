import React from "react";

const LikeButton = props => {
  let classes = (props.liked ? "fas" : "far") + " fa-heart";
  return <i className={classes} onClick={props.onClick} style={{ cursor: "pointer" }}></i>;
};

export default LikeButton;
