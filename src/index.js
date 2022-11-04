import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import SWPower from "./SWPower";

ReactDOM.render(
  <SWPower onSubmit={window.swpwr_onSubmit} problem={window.swpwr_problems} />,
  document.getElementById("root")
);
