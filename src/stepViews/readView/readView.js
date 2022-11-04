import React from "react";

import { useWizard } from "react-use-wizard";

import Stimulator from "../../components/stimulator/stimulator";

import "./readView.css";

function ReadView(props) {
  const onChange = props.onChange;
  const { handleStep } = useWizard();

  handleStep(() => {
    onChange({
      type: "markTime",
      payload: { contentType: props.contentType, timeStamp: Date.now() }
    });
  });

  return (
    <div className="Read">
      <Stimulator text={props.stimulus} enabled={false}></Stimulator>
    </div>
  );
}

export default ReadView;
