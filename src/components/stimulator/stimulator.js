import React from "react";

import "./stimulator.css";

function Stimulator(props) {
  const text = props.text;
  return <div className="stimulator">{text}</div>;
}

export default Stimulator;
