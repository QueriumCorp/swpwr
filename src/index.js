import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import SWPower from "./SWPower";

ReactDOM.render(
  <div
    style={{
      position: "relative",
      backgroundColor: "#282c34",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <SWPower />
  </div>,
  document.getElementById("root")
);
