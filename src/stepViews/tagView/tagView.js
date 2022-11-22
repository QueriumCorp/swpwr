import React, { useState } from "react";

import { useWizard } from "react-use-wizard";
import Toast from "react-bootstrap/Toast";

import Chipster from "../../components/chipster/chipster";

import Stimulator from "../../components/stimulator/stimulator";
import "./tagView.css";

function TagView(props) {
  const problem = props.problem;
  const step = problem.steps.find(step => step.type === "TAG");
  const solution = props.solution;
  const onChange = props.onChange;

  const { handleStep } = useWizard();
  const [showToast, setShowToast] = useState(false);

  const toggleToast = () => setShowToast(!showToast);

  handleStep(() => {
    if (!solution.tags || solution.tags.length < step.correct) {
      toggleToast();
      throw "Don't know where to catch this. If I throw an error object, the app crashes.  This causes an error in the console, but allows me to display the toast and prevent going to next page."; // eslint-disable-line no-throw-literal
    } else {
      onChange({
        type: "markTime",
        payload: { contentType: props.contentType, timeStamp: Date.now() }
      });
    }
  });

  function dispatch(action) {
    onChange(action);
  }

  return (
    <div className="Tag">
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
          <strong className="me-auto">Identify Important Facts</strong>
        </Toast.Header>
        <Toast.Body>
          You must select a minimum of {step.correct} important facts!
        </Toast.Body>
      </Toast>
      <Stimulator
        text={props.problem.stimulus}
        enabled={true}
        onChange={dispatch}
      ></Stimulator>
      <Chipster chips={props.solution.tags} onChange={dispatch}></Chipster>
    </div>
  );
}

export default TagView;
