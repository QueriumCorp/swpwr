import React from "react";
import DiagramList from "../../components/diagramList/diagramList";
import Stimulator from "../../components/stimulator/stimulator";

import "./diagramSelectView.css";

function DiagramSelectView(props) {
  const problem = props.problem;
  const solution = props.solution;
  const onChange = props.onChange;

  return (
    <div>
      <Stimulator text={problem.stimulus} enabled={false}></Stimulator>

      <div className="DiagramSelect">
        <DiagramList
          current={solution.selectedDiagram}
          onChange={onChange}
        ></DiagramList>
      </div>
    </div>
  );
}

export default DiagramSelectView;
