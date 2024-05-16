import React from "react";

import "./DiagramCombine.css";

export default function DiagramCombineWidget(props) {
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
