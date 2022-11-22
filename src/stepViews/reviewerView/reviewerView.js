import React, { useState, useEffect } from "react";

import { useWizard } from "react-use-wizard";
import Toast from "react-bootstrap/Toast";

import Reviewer from "../../components/reviewer/reviewer";
import Stimulator from "../../components/stimulator/stimulator";

import "./reviewerView.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import isMobile from "../../utils/deviceInfo";

export default function ReviewerView(props) {
  const problem = props.problem;
  const solution = props.solution;
  const step = problem.steps.find(step => step.type === "REVIEWER");
  const onChange = props.onChange;

  const [showToast, setShowToast] = useState(false);

  const toggleToast = () => setShowToast(!showToast);
  const { handleStep } = useWizard();

  handleStep(() => {
    console.info("reviewer handleStep");
    if (!solution.review.length) {
      toggleToast();
      throw "Don't know where to catch this. If I throw an error object, the app crashes.  This causes an error in the console, but allows me to display the toast and prevent going to next page."; // eslint-disable-line no-throw-literal
    } else {
      onChange({
        type: "markTime",
        payload: { contentType: props.contentType, timeStamp: Date.now() }
      });
    }
  });

  const handleChange = details => {
    onChange(details);
  };

  useEffect(() => {
    document.getElementById("WizButtonSubmit").disabled =
      solution.review.length < step.correct ? true : false;
  });

  return (
    <div className="Reviewer">
      <Stimulator text={props.problem.stimulus} enabled={false}></Stimulator>
      <div className="DiagramAnalyze">
        <Toast
          show={showToast}
          onClose={toggleToast}
          className="toasty"
          delay={3000}
          autohide
        >
          <Toast.Header
            style={{
              background: "red",
              color: "white",
              justifyContent: "space-between"
            }}
          >
            <strong className="me-auto">Does your Answer Make Sense?</strong>
          </Toast.Header>
          <Toast.Body>You must explain how your answer makes sense!</Toast.Body>
        </Toast>
        <DndProvider backend={isMobile() ? TouchBackend : HTML5Backend}>
          <Reviewer solution={solution} onChange={handleChange}></Reviewer>
        </DndProvider>
      </div>
    </div>
  );
}
