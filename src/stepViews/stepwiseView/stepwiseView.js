import React, { useState, useEffect } from "react";

import { useWizard } from "react-use-wizard";
import Toast from "react-bootstrap/Toast";
// import ReactJson from "react-json-view";

import SWContainer from "../../components/stepWise/stepWise";

import "./stepwiseView.css";
import MultiplyTimesDisplay from "../../components/diagrammer/multiplyTimesDisplay";
import CombineDisplay from "../../components/diagrammer/combineDisplay";
import ChangeDisplay from "../../components/diagrammer/changeDisplay";
import EqualGroupsDisplay from "../../components/diagrammer/equalGroupsDisplay";

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

  useEffect(() => {
    // If MathJax is loaded, render
    if (window.MathJax) {
      window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
    } else {
      // give it a second to load
      setTimeout(() => {
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
      }, "1000");
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

      <div>
        {
          {
            COMBINE: <CombineDisplay solution={solution} />,
            MULTIPLYTIMES: <MultiplyTimesDisplay solution={solution} />,
            EQUALGROUPS: <EqualGroupsDisplay solution={solution} />,
            CHANGE: <ChangeDisplay solution={solution} />
          }[solution.selectedDiagram]
        }
      </div>

      {!completed ? (
        <SWContainer
          problem={props.problem}
          solution={props.solution}
          onChange={successHandler}
        ></SWContainer>
      ) : (
        <div className="successMsg">
          <h1>Success!</h1>
          <p>You finished with working the problem. Your final answer was:</p>
          <p style={{ textAlign: "center" }}>
            {
              solution.stepWise.stepDetails[
                solution.stepWise.stepDetails.length - 1
              ].mathML
            }
          </p>
          {/* <ReactJson src={solution.stepWise}></ReactJson> */}
        </div>
      )}
    </div>
  );
}

export default StepWiseView;
