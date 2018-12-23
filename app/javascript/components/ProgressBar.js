import React from "react";

const ProgressBar = () => {
  return (
    <div className="progress" key={0} style={{ width: "100%" }}>
      <div
        className="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        aria-valuenow="75"
        aria-valuemin="0"
        aria-valuemax="100"
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default ProgressBar;
