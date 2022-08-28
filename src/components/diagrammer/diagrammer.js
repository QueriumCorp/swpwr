import React from "react";

import Change from "./change";
import Combine from "./combine";

import "./diagrammer.css";
import EqualGroups from "./equalGroups";
import MultiplyTimes from "./multiplyTimes";

function Diagrammer(props) {
  const problem = props.problem;
  const solution = props.solution;
  const onChange = props.onChange;

  console.info(solution.selectedDiagram);

  return (
    <div className="Diagrammer">
      {
        {
          COMBINE: (
            <Combine
              problem={problem}
              solution={solution}
              onChange={onChange}
            ></Combine>
          ),
          CHANGE: (
            <Change
              problem={problem}
              solution={solution}
              onChange={onChange}
            ></Change>
          ),
          EQUALGROUPS: (
            <EqualGroups
              problem={problem}
              solution={solution}
              onChange={onChange}
            ></EqualGroups>
          ),
          MULTIPLYTIMES: (
            <MultiplyTimes
              problem={problem}
              solution={solution}
              onChange={onChange}
            ></MultiplyTimes>
          ),
        }[solution.selectedDiagram]
      }
    </div>
  );
}

export default Diagrammer;
