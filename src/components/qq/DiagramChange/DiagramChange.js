import React from "react";

import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

import "./DiagramChange.css";
import DiagramChangeWidget from "./DiagramChangeWidget";

function DiagramChange(props) {
  const selected = props.selected;
  const onChange = props.onChange;

  function clickHandler() {
    onChange({
      type: "diagramSelected",
      payload: "CHANGE",
    });
  }

  return (
    <div className="diagramSample">
      <Card onClick={clickHandler}>
        <Card.Body className={`diagramCard ${selected ? "selected" : ""}`}>
          <div className="diagramTitle">
            <h3>CHANGE</h3>
            <p>
              Is there a start amount that increases or decreases to a new
              amount?
            </p>
          </div>
          <div className="diagramExample">
            <DiagramChangeWidget />
            <div className="diagramEquation">S +/- C = E</div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default DiagramChange;
