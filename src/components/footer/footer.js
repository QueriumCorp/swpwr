import "./footer.css";

import React from "react";

import { useWizard } from "react-use-wizard";

import Button from "../button/button";

export const Actions = () => <div className="Actions"></div>;
export const Info = () => <div className="Info"></div>;

const Footer = (props) => {
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
    <div class="powerFooter">
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
        <Button
          className="WizButton"
          label="Previous"
          onClick={() => previousStep()}
          disabled={isLoading || isFirstStep}
        >
          Previous
        </Button>
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
          disabled={isLoading || isLastStep}
        />
      </div>
    </div>
  );
};

export default Footer;
