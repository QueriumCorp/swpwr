import React, { useState } from "react";

import { useWizard } from "react-use-wizard";
import Toast from "react-bootstrap/Toast";

import Identifier from "../../components/identifier/identifier";
import Stimulator from "../../components/stimulator/stimulator";

import "./identifierView.css";

export default function IdentifierView(props) {
  const solution = props.solution;
  const onChange = props.onChange;

  const [showToast, setShowToast] = useState(false);

  const toggleToast = () => setShowToast(!showToast);
  const { handleStep } = useWizard();

  handleStep(() => {
    if (!solution.identify.number.length || !solution.identify.label.length) {
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
    <div className="Identifier">
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
            <strong className="me-auto">Identify Number and Label</strong>
          </Toast.Header>
          <Toast.Body>
            You must provide the <i>number</i> and <i>label</i> before moving
            forward
          </Toast.Body>
        </Toast>
        <Identifier solution={solution} onChange={onChange}></Identifier>
      </div>
    </div>
  );
}
