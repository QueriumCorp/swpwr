import React, { useState } from "react";

import { useWizard } from "react-use-wizard";
import Toast from "react-bootstrap/Toast";

import SWContainer from "../../components/stepWise/stepWise";

import "./stepwiseView.css";

function StepWiseView(props) {
  const solution = props.solution;

  let idx = solution.timeStamps.findIndex(x => x.step === props.contentType);
  const completed = solution.timeStamps[idx].timestamp ? true : false;

  function successHandler(results) {
    console.info(results);
    props.onChange(results);
    props.onChange({
      type: "markTime",
      payload: { contentType: props.contentType, timeStamp: Date.now() }
    });
  }

  const [showToast, setShowToast] = useState(false);
  const toggleToast = () => setShowToast(!showToast);

  const { handleStep } = useWizard();
  handleStep(() => {
    if (!completed) {
      toggleToast();
      throw "Don't know where to catch this. If I throw an error object, the app crashes.  This causes an error in the console, but allows me to display the toast and prevent going to next page."; // eslint-disable-line no-throw-literal
    }
  });

  // JSX
  return (
    <div className="StepWise">
      <Toast show={showToast} onClose={toggleToast} className="toasty">
        <Toast.Header
          style={{
            background: "red",
            color: "white",
            justifyContent: "space-between"
          }}
        >
          <strong className="me-auto">Solve the Equation</strong>
        </Toast.Header>
        <Toast.Body>
          You must solve the equation before continuing! Click 'Enter Step'
          after you enter each step.
        </Toast.Body>
      </Toast>

      <SWContainer
        problem={props.problem}
        solution={props.solution}
        onChange={successHandler}
      />
    </div>
  );
}

export default StepWiseView;
