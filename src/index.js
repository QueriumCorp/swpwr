import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import SWPower from "./SWPower";

function onSubmitCallback(solution) {
  console.info(solution);
}
ReactDOM.render(
  <SWPower onSubmit={onSubmitCallback} />,
  document.getElementById("root")
);
