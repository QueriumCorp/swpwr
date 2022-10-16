import React from "react";
import SWContainer from "../../components/stepWise/stepWise";

import "./stepwiseView.css";

function StepWiseView(props) {
  return (
    <div className="StepWise">
      <SWContainer
        problem={props.problem}
        solution={props.solution}
        onChange={props.onChange}
      />
    </div>
  );
}

export default StepWiseView;
