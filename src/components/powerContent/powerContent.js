import React from "react";

import Stimulator from "../stimulator/stimulator";

import "./powerContent.css";

function PowerContent(props) {
  const contentType = props.type;
  const problem = props.problem;
  const dispatch = props.dispatcher;

  return (
    <div className="powerContent">
      <div>{contentType}</div>
      {
        {
          TAG: (
            <Stimulator
              text={problem.stimulus}
              enabled={true}
              onChange={dispatch}
            ></Stimulator>
          ),
        }[contentType]
      }
    </div>
  );
}

export default PowerContent;
