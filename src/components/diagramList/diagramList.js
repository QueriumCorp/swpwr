import React from "react";
import DiagramChange from "../diagramChange/diagramChange";
import DiagramCombine from "../diagramCombine/diagramCombine";
import DiagramCompare from "../diagramCompare/diagramCompare";
import "./diagramList.css";

function DiagramList(props) {
  const current = props.current;
  const onChange = props.onChange;

  return (
    <div className="DiagramSelect">
      <DiagramCombine
        selected={current === "COMBINE"}
        onChange={onChange}
      ></DiagramCombine>
      <DiagramCompare
        selected={current === "COMPARE"}
        onChange={onChange}
      ></DiagramCompare>
      <DiagramChange
        selected={current === "CHANGE"}
        onChange={onChange}
      ></DiagramChange>
    </div>
  );
}

export default DiagramList;
