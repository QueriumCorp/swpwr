import React, { useState } from "react";

import { useWizard } from "react-use-wizard";
import Toast from "react-bootstrap/Toast";

import Stimulator from "../../components/stimulator/stimulator";

import "./diagrammerView.css";
import Diagrammer from "../../components/diagrammer/diagrammer";

function DiagrammerView(props) {
  const problem = props.problem;
  const solution = props.solution;
  const onChange = props.onChange;

  const [showToast, setShowToast] = useState(false);

  const toggleToast = () => setShowToast(!showToast);
  const { handleStep } = useWizard();

  handleStep(() => {
    // if (!solution.selectedDiagram) {
    //   toggleToast();
    //   throw "Need to select a diagram";
    // }
  });

  return (
    <div>
      <Stimulator text={problem.stimulus} enabled={false}></Stimulator>

      <div className="Diagrammer">
        <Toast show={showToast} onClose={toggleToast}>
          <Toast.Header>
            <strong className="me-auto">Select a Diagram</strong>
          </Toast.Header>
          <Toast.Body>You must select a diagram before proceeding!</Toast.Body>
        </Toast>
        <Diagrammer
          problem={problem}
          solution={solution}
          onChange={onChange}
        ></Diagrammer>
      </div>
    </div>
  );
}

export default DiagrammerView;
