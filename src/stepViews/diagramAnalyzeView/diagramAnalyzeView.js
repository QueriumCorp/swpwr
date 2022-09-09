import React, { useState } from "react";

import { useWizard } from "react-use-wizard";
import Toast from "react-bootstrap/Toast";

import Stimulator from "../../components/stimulator/stimulator";
import "./diagramAnalyzeView.css";
import DiagramAnalysis from "../../components/diagramAnalysis/diagramAnalysis";

function DiagramAnalyzeView(props) {
  const problem = props.problem;
  const solution = props.solution;
  const onChange = props.onChange;

  const [showToast, setShowToast] = useState(false);

  const toggleToast = () => setShowToast(!showToast);
  const { handleStep } = useWizard();

  handleStep(() => {
    if (!solution.diagramAnalysis || solution.diagramAnalysis.length < 10) {
      toggleToast();
      throw "Don't know where to catch this. If I throw an error object, the app crashes.  This causes an error in the console, but allows me to display the toast and prevent going to next page."; // eslint-disable-line no-throw-literal
    }
  });

  return (
    <div>
      <Stimulator text={problem.stimulus} enabled={false}></Stimulator>

      <div className="DiagramAnalyze">
        <Toast show={showToast} onClose={toggleToast}>
          <Toast.Header>
            <strong className="me-auto">Analyze Which Diagram</strong>
          </Toast.Header>
          <Toast.Body>
            You must provide your analysis of which type of problem this is!
          </Toast.Body>
        </Toast>
        <DiagramAnalysis
          current={solution.diagramAnalysis}
          onChange={onChange}
        ></DiagramAnalysis>
      </div>
    </div>
  );
}

export default DiagramAnalyzeView;
