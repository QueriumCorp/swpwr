import React from "react";

import { Chip } from "@react-md/chip";

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
      <Chip id="example-chip-1">I'm a chip!</Chip>
    </div>
  );
}

export default TagView;
