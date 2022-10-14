import React, { useReducer } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { Wizard } from "react-use-wizard";

import workReducer, { blankWork } from "./reducer.js";

import "./SWPower.css";

import PowerTitle from "./components/powerTitle/powerTitle.js";
import PowerContent from "./components/powerContent/powerContent.js";
import PowerFooter from "./components/powerFooter/powerFooter.js";

function SWPower(props) {
  const onSubmit = props.onSubmit;

  const [work, workDispatch] = useReducer(workReducer, blankWork);

  return (
    <div className="SWPowerComponent">
      <Wizard
        header={<PowerTitle problem={work.problem} />}
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
