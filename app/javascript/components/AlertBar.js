import React from "react";

const AlertBar = props => {
  return (
    <div
      className={` alert  scroll-alert ${props.className}`}
      onClick={() => {
        if (props.onClick) {
          props.onClick();
        }
      }}
    >
      {props.text}
    </div>
  );
};

export default AlertBar;
