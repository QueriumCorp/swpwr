import "./footer.css";

import React from "react";

import { useWizard } from "react-use-wizard";

import Button from "../button/button";

export const Actions = () => <div className="Actions"></div>;
export const Info = () => <div className="Info"></div>;

const Footer = () => {
  const {
    nextStep,
    previousStep,
    isLoading,
    activeStep,
    stepCount,
    isLastStep,
    isFirstStep,
  } = useWizard();

  return (
    <div style={{ background: "white" }}>
      <div className="Info">
        <p>Has previous step: {!isFirstStep ? "✅" : "⛔"}</p>
        <br />
        <p>Has next step: {!isLastStep ? "✅" : "⛔"} </p>
        <br />
        <p>
          Active step: {activeStep + 1} <br />
        </p>
        <br />
        <p>
          Total steps: {stepCount} <br />
        </p>
      </div>
      <div className="Actions">
        <Button
          label="Previous"
          onClick={() => previousStep()}
          disabled={isLoading || isFirstStep}
        >
          Previous
        </Button>
        <Button
          label="Next"
          onClick={() => nextStep()}
          disabled={isLoading || isLastStep}
        />
      </div>
    </div>
  );
};

export default Footer;
