import React from "react";

import "./diagramCombine.css";

export default function DiagramCombineWidget(props) {
  const selected = props.selected;
  const onChange = props.onChange;

  return (
    <div className="diagramCombineBox">
      <div className="diagramCombineTop">Total</div>
      <div className="diagramCombineBottom">
        <div className="diagramCombineBottomLeft">Part</div>
        <div className="diagramCombineBottomRight">Part</div>
      </div>
    </div>
  );
}
