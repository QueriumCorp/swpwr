import React from "react";

import Card from "react-bootstrap/Card";
import Chipster from "../chipster/chipster";

import "./diagrammer.css";

function Change(props) {
  console.info(props);
  const problem = props.problem;
  const solution = props.solution;
  const onChange = props.onChange;

  return (
    <div className="diagramChangeContainer">
      <Card>
        <Card.Body className="diagramChange">
          <div className="diagramChangeTitle">
            <h3>CHANGE</h3>
          </div>
          <div className="diagramChangeExample">
            <div className="diagramChangeBox">
              <div className="diagramChangeStart">
                start
                <input type="number" />
              </div>
              <div className="diagramChangeChange">
                change
                <input type="number" />
              </div>
              <div className="diagramChangeEnd">
                end
                <input type="number" />
              </div>
            </div>
          </div>
          <Chipster chips={props.solution.tags}></Chipster>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Change;
