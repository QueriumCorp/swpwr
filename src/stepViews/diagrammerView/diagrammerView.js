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
    // TODO: Need to check values are all filled
    if (!solution.selectedDiagram) {
      toggleToast();
      throw Object.assign(new Error("in diagrammerView"), { code: 402 });
    } else {
      onChange({
        type: "markTime",
        payload: { contentType: props.contentType, timeStamp: Date.now() }
      });
    }
  });

  return (
    <div className="DiagrammerView">
      <Stimulator text={problem.stimulus} enabled={false}></Stimulator>

      <Diagrammer
        problem={problem}
        solution={solution}
        onChange={onChange}
      ></Diagrammer>
      <Toast show={showToast} onClose={toggleToast} style={{ margin: "auto" }}>
        <Toast.Header
          style={{
            background: "red",
            color: "white",
            justifyContent: "space-between"
          }}
        >
          <strong className="me-auto">Select a Diagram</strong>
        </Toast.Header>
        <Toast.Body>You must select a diagram before proceeding!</Toast.Body>
      </Toast>
    </div>
  );
}

export default DiagrammerView;
