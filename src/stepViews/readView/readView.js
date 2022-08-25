import React from "react";

import Stimulator from "../../components/stimulator/stimulator";

import "./readView.css";

function ReadView(props) {
  return (
    <div className="Read">
      <Stimulator text={props.stimulus} enabled={false}></Stimulator>
    </div>
  );
}

export default ReadView;
