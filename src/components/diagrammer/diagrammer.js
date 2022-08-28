import React from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
    <DndProvider backend={HTML5Backend}>
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
    </DndProvider>
  );
}

export default Diagrammer;
