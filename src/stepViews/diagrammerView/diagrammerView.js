import React from "react";
import Stimulator from "../../components/stimulator/stimulator";

import "./diagrammerView.css";

function DiagrammerView(props) {
  const problem = props.problem;
  const solution = props.solution;
  const onChange = props.onChange;

  return (
    <div>
      <Stimulator text={problem.stimulus} enabled={false}></Stimulator>

      <div className="Diagrammer"></div>
    </div>
  );
}

export default DiagrammerView;
