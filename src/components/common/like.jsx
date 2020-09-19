import React from "react";

const LikeButton = ({ liked, onClick }) => {
  const classes = (liked ? "fas" : "far") + " fa-heart";
  return (
    <i className={classes} onClick={onClick} style={{ cursor: "pointer" }}></i>
  );
};

export default LikeButton;
