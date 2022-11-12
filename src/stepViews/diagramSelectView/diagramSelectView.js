import React, { useState } from "react";

import { useWizard } from "react-use-wizard";
import Toast from "react-bootstrap/Toast";

import DiagramList from "../../components/diagramList/diagramList";
import Stimulator from "../../components/stimulator/stimulator";

import "./diagramSelectView.css";

function DiagramSelectView(props) {
  const problem = props.problem;
  const solution = props.solution;
  const onChange = props.onChange;

  const [toastMsg, setToastMsg] = useState("No toast to see here");
  const [showToast, setShowToast] = useState(false);
  const toggleToast = () => setShowToast(!showToast);
  const { handleStep } = useWizard();

  handleStep(() => {
    if (!solution.selectedDiagram) {
      setToastMsg("You must select a diagram before proceeding!");
      toggleToast();
      throw "Don't know where to catch this. If I throw an error object, the app crashes.  This causes an error in the console, but allows me to display the toast and prevent going to next page."; // eslint-disable-line no-throw-literal
    }

    const step = problem.steps.find(s => s.type === "DIAGRAMSELECT");
    if (solution.selectedDiagram !== step.correct) {
      setToastMsg(
        "That's not the right diagram for this problem.  Try a different choice."
      );
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
    <div className="DiagramSelectView">
      <Stimulator text={problem.stimulus} enabled={false}></Stimulator>

      <div className="DiagramSelect">
        <Toast show={showToast} onClose={toggleToast} className="toasty">
          <Toast.Header
            style={{
              background: "red",
              color: "white",
              justifyContent: "space-between"
            }}
          >
            <strong className="me-auto">Select a Diagram</strong>
          </Toast.Header>
          <Toast.Body>{toastMsg}</Toast.Body>
        </Toast>
        <DiagramList
          current={solution.selectedDiagram}
          onChange={onChange}
        ></DiagramList>
      </div>
    </div>
  );
}

export default DiagramSelectView;
