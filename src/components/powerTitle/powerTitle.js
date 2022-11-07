import React from "react";

import { useWizard } from "react-use-wizard";

import { FiMinimize2, FiMaximize2 } from "react-icons/fi";

import "./powerTitle.css";

function PowerTitle(props) {
  const problem = props.problem;
  const maximizable = props.maximizable;

  const { activeStep } = useWizard();

  const title = problem.stepsMnemonic;
  const subTitle = problem.steps[activeStep].label;
  const instructions = problem.steps[activeStep].instruction;
  const longInstruction = problem.steps[activeStep].longInstruction;
  const mnemonicIndex = problem.steps[activeStep].mnemonicIndex;

  const handleMaximize = () => {
    props.setMaximized(!props.maximized);
  };

  return (
    <div className="powerTitle">
      <div className="titleText">
        <div>
          {title.split("").map(function(char, index) {
            return (
              <span
                aria-hidden="true"
                key={index}
                className={
                  index === mnemonicIndex ? "powerTitleCurrentLetter" : ""
                }
              >
                {char}
              </span>
            );
          })}
        </div>
        {maximizable && (
          <div>
            {props.maximized ? (
              <div onClick={handleMaximize}>
                <FiMinimize2 />
              </div>
            ) : (
              <div onClick={handleMaximize}>
                <FiMaximize2 />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="subTitle">{subTitle}</div>
      <p className="instructions">{instructions}</p>
      <p className="longInstruction">{longInstruction}</p>
    </div>
  );
}

export default PowerTitle;
