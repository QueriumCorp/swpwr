import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import SWPower from "./SWPower";

for (let i = 0; i < window.swpwr_problems.length; i++) {
  ReactDOM.render(
    <SWPower
      onSubmit={window.swpwr_onSubmit}
      problem={window.swpwr_problems[i]}
    />,
    document.getElementById(window.swpwr_problems[i].qId)
  );
}
