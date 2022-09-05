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

  const [showToast, setShowToast] = useState(false);

  const toggleToast = () => setShowToast(!showToast);
  const { handleStep } = useWizard();

  handleStep(() => {
    if (!solution.selectedDiagram) {
      toggleToast();
      throw "Don't know where to catch this. If I throw an error object, the app crashes.  This causes an error in the console, but allows me to display the toast and prevent going to next page.";
    }
  });

  return (
    <div>
      <Stimulator text={problem.stimulus} enabled={false}></Stimulator>

      <div className="DiagramSelect">
        <Toast show={showToast} onClose={toggleToast}>
          <Toast.Header>
            <strong className="me-auto">Select a Diagram</strong>
          </Toast.Header>
          <Toast.Body>You must select a diagram before proceeding!</Toast.Body>
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
