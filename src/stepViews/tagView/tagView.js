import React from "react";

import { useWizard } from "react-use-wizard";

import Chipster from "../../components/chipster/chipster";

import Stimulator from "../../components/stimulator/stimulator";
import "./tagView.css";

function TagView(props) {
  const onChange = props.onChange;
  const { handleStep } = useWizard();

  function dispatch(action) {
    onChange(action);
  }

  handleStep(() => {
    onChange({
      type: "markTime",
      payload: { contentType: props.contentType, timeStamp: Date.now() }
    });
  });

  return (
    <div className="Tag">
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
