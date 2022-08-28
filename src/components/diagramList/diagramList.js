import React from "react";

import DiagramChange from "../diagramChange/diagramChange";
import DiagramEqualGroups from "../diagramEqualGroups/diagramEqualGroups";
import DiagramCombine from "../diagramCombine/diagramCombine";
import DiagramMultiplyTimes from "../diagramMultiplyTimes/diagramMultiplyTimes";

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
      <DiagramMultiplyTimes
        selected={current === "MULTIPLYTIMES"}
        onChange={onChange}
      ></DiagramMultiplyTimes>
      <DiagramChange
        selected={current === "CHANGE"}
        onChange={onChange}
      ></DiagramChange>
      <DiagramEqualGroups
        selected={current === "EQUALGROUPS"}
        onChange={onChange}
      ></DiagramEqualGroups>
    </div>
  );
}

export default DiagramList;
