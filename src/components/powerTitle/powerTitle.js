import React from "react";

import { useWizard } from "react-use-wizard";

import "./powerTitle.css";

function PowerTitle(props) {
  const problem = props.problem;

  const { activeStep } = useWizard();

  const title = problem.stepsMnemonic;
  const subTitle = problem.steps[activeStep].label;
  const instructions = problem.steps[activeStep].instruction;

  return (
    <div className="powerTitle">
      {title.split("").map(function (char, index) {
        return (
          <span
            aria-hidden="true"
            key={index}
            className={index === activeStep ? "powerTitleCurrentLetter" : ""}
          >
            {char}
          </span>
        );
      })}
      <div>{subTitle}</div>
      <p>{instructions}</p>
    </div>
  );
}

export default PowerTitle;
