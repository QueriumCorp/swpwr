import React from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

import isMobile from "../../utils/deviceInfo";

import Change from "./change";
import Combine from "./combine";

import "./diagrammer.css";
import EqualGroups from "./equalGroups";
import MultiplyTimes from "./multiplyTimes";

function Diagrammer(props) {
  const problem = props.problem;
  const solution = props.solution;
  const onChange = props.onChange;

  return (
    <DndProvider backend={isMobile() ? HTML5Backend : TouchBackend}>
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
