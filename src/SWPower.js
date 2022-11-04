import React, { useReducer, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { Wizard } from "react-use-wizard";

import workReducer, { blankWork } from "./reducer.js";

import "./SWPower.css";

import PowerTitle from "./components/powerTitle/powerTitle.js";
import PowerContent from "./components/powerContent/powerContent.js";
import PowerFooter from "./components/powerFooter/powerFooter.js";

function SWPower(props) {
  const onSubmit = props.onSubmit;
  const initializedWork = props.problem
    ? { ...blankWork, problem: props.problem }
    : { ...blankWork };

  const [work, workDispatch] = useReducer(workReducer, initializedWork);

  const [maximized, setMaximized] = useState(true);

  return (
    <div className={"SWPowerComponent " + (maximized ? "Maximized" : "")}>
      <Wizard
        header={
          <PowerTitle
            problem={work.problem}
            maximized={maximized}
            setMaximized={setMaximized}
          />
        }
        footer={
          <PowerFooter
            problem={work.problem}
            solution={work.solution}
            dispatcher={workDispatch}
            onSubmit={onSubmit}
          />
        }
      >
        {work.problem.steps.map((step, i) => {
          return (
            <PowerContent
              key={i}
              problem={work.problem}
              solution={work.solution}
              type={step.type}
              dispatcher={workDispatch}
            ></PowerContent>
          );
        })}
      </Wizard>
    </div>
  );
}

export default SWPower;
