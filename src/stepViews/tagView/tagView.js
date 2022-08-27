import React from "react";

import Chipster from "../../components/chipster/chipster";

import Stimulator from "../../components/stimulator/stimulator";
import "./tagView.css";

function TagView(props) {
  console.info(props);

  function dispatch(action) {
    props.onChange(action);
  }

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
