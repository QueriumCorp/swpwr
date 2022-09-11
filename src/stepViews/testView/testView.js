import React from "react";

import "./testView.css";

export default function TestView(props) {
  const problem = props.problem;
  const solution = props.solution;
  const onChange = props.onChange;

  return (
    <div className="testBox">
      <h1>Test Page</h1>
    </div>
  );
}
