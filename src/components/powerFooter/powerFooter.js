import "./powerFooter.css";

import React from "react";

import { useWizard } from "react-use-wizard";

import Button from "../button/button";

export const Actions = () => <div className="Actions"></div>;
export const Info = () => <div className="Info"></div>;

const PowerFooter = props => {
  const {
    nextStep,
    previousStep,
    isLoading,
    activeStep,
    stepCount,
    isLastStep,
    isFirstStep
  } = useWizard();

  return (
    <div className="powerFooter">
      <div className="Info">
        <p>Has previous step: {!isFirstStep ? "✅" : "⛔"}</p>
        <br />
        <p>Has next step: {!isLastStep ? "✅" : "⛔"} </p>
        <br />
        <p>
          Active step: {activeStep} <br />
        </p>
        <br />
        <p>
          Total steps: {stepCount} <br />
        </p>
      </div>
      <div className="Actions">
        {!isFirstStep && (
          /* !isLastStep && */ <Button
            className="WizButton"
            label="Previous"
            onClick={() => previousStep()}
            disabled={isLoading}
          >
            Previous
          </Button>
        )}

        {!isLastStep && (
          <Button
            className="WizButton"
            label="Next"
            onClick={() => {
              try {
                nextStep();
              } catch (e) {
                console.info("None Shall Pass", e);
              }
            }}
            disabled={isLoading}
          />
        )}

        {isLastStep && (
          <Button
            id="WizButtonSubmit"
            className="WizButton"
            label="Submit"
            onClick={() => {
              props.onChange({
                type: "markTime",
                payload: {
                  contentType:
                    props.problem.steps[props.problem.steps.length - 1].type,
                  timeStamp: Date.now()
                }
              });
              props.onSubmit(props.solution);
            }}
            disabled={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default PowerFooter;
