import React, { useState } from "react";

import { useWizard } from "react-use-wizard";
import Toast from "react-bootstrap/Toast";

import Reviewer from "../../components/reviewer/reviewer";
import Stimulator from "../../components/stimulator/stimulator";

import "./reviewerView.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function ReviewerView(props) {
  const solution = props.solution;
  const onChange = props.onChange;

  const [showToast, setShowToast] = useState(false);

  const toggleToast = () => setShowToast(!showToast);
  const { handleStep } = useWizard();

  handleStep(() => {
    if (!solution.explanation.length) {
      toggleToast();
      throw "Don't know where to catch this. If I throw an error object, the app crashes.  This causes an error in the console, but allows me to display the toast and prevent going to next page."; // eslint-disable-line no-throw-literal
    } else {
      onChange({
        type: "markTime",
        payload: { contentType: props.contentType, timeStamp: Date.now() }
      });
    }
  });

  return (
    <div className="Reviewer">
      <Stimulator text={props.problem.stimulus} enabled={false}></Stimulator>
      <div className="DiagramAnalyze">
        <Toast show={showToast} onClose={toggleToast} className="toasty">
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
        <DndProvider backend={HTML5Backend}>
          <Reviewer solution={solution} onChange={onChange}></Reviewer>
        </DndProvider>
      </div>
    </div>
  );
}
