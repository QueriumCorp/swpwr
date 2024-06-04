import React from "react";
import type { Step } from "../stores/solution";

const VictoryStep = (props: Step) => {
  if (props.type === "victory") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            minWidth: 32,
            minHeight: 32,
            maxWidth: 32,
            maxHeight: 32,
            fontSize: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          🏁
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexGrow: 2,
          }}
        >
          {props.latex}
        </div>
      </div>
    );
  }
  return null;
};

export default VictoryStep;
