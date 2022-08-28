import React from "react";

import Change from "./change";
import Combine from "./combine";

import "./diagrammer.css";
import EqualGroups from "./equalGroups";
import MultiplyTimes from "./multiplyTimes";

function Diagrammer(props) {
  console.info(props);
  const diagramType = props.current;
  const onChange = props.onChange;

  return (
    <div className="Diagrammer">
      {
        {
          COMBINE: <Combine></Combine>,
          CHANGE: <Change></Change>,
          EQUALGROUPS: <EqualGroups></EqualGroups>,
          MULTIPLYTIMES: <MultiplyTimes></MultiplyTimes>,
        }[diagramType]
      }
    </div>
  );
}

export default Diagrammer;
