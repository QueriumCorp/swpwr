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
    let fieldsFilled = false;
    const step = problem.steps.find(s => s.type === "DIAGRAMSELECT");
    switch (step.correct) {
      case "COMBINE":
        fieldsFilled =
          solution.diagram.combine.total.length &&
          solution.diagram.combine.part1.length &&
          solution.diagram.combine.part2.length;
        break;
      case "MULTIPLYTIMES":
        fieldsFilled =
          solution.diagram.times.sets.length &&
          solution.diagram.times.multiplier.length &&
          solution.diagram.times.product.length;
        break;
      case "EQUALGROUPS":
        fieldsFilled =
          solution.diagram.groups.groups.length &&
          solution.diagram.groups.number.length &&
          solution.diagram.groups.product.length;
        break;
      case "CHANGE":
        fieldsFilled =
          solution.diagram.change.start.length &&
          solution.diagram.change.change.length &&
          solution.diagram.change.end.length;
        break;
      default:
        fieldsFilled = false;
    }
    if (!fieldsFilled) {
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
    <div className="DiagrammerView">
      <Stimulator text={problem.stimulus} enabled={false}></Stimulator>

      <Diagrammer
        problem={problem}
        solution={solution}
        onChange={onChange}
      ></Diagrammer>
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
        <Toast.Body>
          You must provide a value for each field before proceeding!
        </Toast.Body>
      </Toast>
    </div>
  );
}

export default DiagrammerView;
