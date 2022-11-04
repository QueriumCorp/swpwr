import React, { useState } from "react";

import { useWizard } from "react-use-wizard";
import Toast from "react-bootstrap/Toast";

import Explainer from "../../components/explainer/explainer";
import Stimulator from "../../components/stimulator/stimulator";

import "./explainerView.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function ExplainerView(props) {
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
    <div className="Explainer">
      <Stimulator text={props.problem.stimulus} enabled={false}></Stimulator>
      <div className="DiagramAnalyze">
        <Toast
          show={showToast}
          onClose={toggleToast}
          style={{ margin: "auto" }}
        >
          <Toast.Header
            style={{
              background: "red",
              color: "white",
              justifyContent: "space-between"
            }}
          >
            <strong className="me-auto">Explain your Answer</strong>
          </Toast.Header>
          <Toast.Body>
            You must answer the original question in plain language before
            proceding!
          </Toast.Body>
        </Toast>
        <DndProvider backend={HTML5Backend}>
          <Explainer solution={solution} onChange={onChange}></Explainer>
        </DndProvider>
      </div>
    </div>
  );
}
