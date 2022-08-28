import React from "react";

import "./diagrammer.css";

function Diagrammer(props) {
  const diagramType = "EQUALGROUPS";
  const onChange = props.onChange;

  return (
    <div className="Diagrammer">
      {
        {
          COMBINE: <div>COMBINE</div>,
          CHANGE: <div>CHANGE</div>,
          EQUALGROUPS: <div>EQUALGROUPS</div>,
          MULTIPLETIMES: <div>MULTIPLETIMES</div>,
        }[diagramType]
      }
    </div>
  );
}

export default Diagrammer;
