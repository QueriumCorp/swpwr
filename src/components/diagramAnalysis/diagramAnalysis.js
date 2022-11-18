import React from "react";

import { TextArea } from "@react-md/form";

import "./diagramAnalysis.css";

function DiagramAnalysis(props) {
  const current = props.current;
  const onChange = props.onChange;

  function updateAnalysis(event) {
    const analysis = event.target.value;
    onChange({
      type: "updateAnalysis",
      payload: analysis
    });
  }
  return (
    <div className="DiagramAnalysis">
      <TextArea
        rows="4"
        maxRows="10"
        resize="false"
        animate="true"
        placeholder="Enter your answer here"
        defaultValue={current}
        theme="filled"
        onChange={updateAnalysis}
      />
    </div>
  );
}

export default DiagramAnalysis;
