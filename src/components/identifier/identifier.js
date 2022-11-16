import React from "react";

import "./identifier.css";

export default function Identifier(props) {
  const solution = props.solution;
  const onChange = props.onChange;

  function handleNumber(event) {
    onChange({ type: "identifyNumber", payload: event.target.value });
  }

  function handleLabel(event) {
    onChange({ type: "identifyLabel", payload: event.target.value });
  }
  return (
    <div>
      <p style={{ textAlign: "center", marginTop: "20px", fontSize: "24px" }}>
        {
          solution.stepWise.stepDetails[
            solution.stepWise.stepDetails.length - 1
          ].mathML
        }
      </p>
      <div className="IdentifierFields">
        <input
          id="number"
          value={solution.identify.number}
          onChange={handleNumber}
          placeholder="Number"
          className="Number"
          autoFocus
        />
        <input
          id="label"
          value={solution.identify.label}
          onChange={handleLabel}
          placeholder="Label"
          className="Label"
        />
      </div>
    </div>
  );
}
