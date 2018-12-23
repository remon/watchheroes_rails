import React from "react";

const LoadingGif = props => {
  return (
    <div className="container  prog_container">
      <img src="/assets/loading_ball.gif" />
      <div>
        <h3>{props.text}</h3>
      </div>
    </div>
  );
};

export default LoadingGif;
