import React from "react";

import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

import "./diagramCombine.css";
import DiagramCombineWidget from "./diagramCombineWidget";

function DiagramCombine(props) {
  const selected = props.selected;
  const onChange = props.onChange;

  function clickHandler() {
    onChange({
      type: "diagramSelected",
      payload: "COMBINE",
    });
  }
  return (
    <div className="diagramSample">
      <Card onClick={clickHandler}>
        <Card.Body className={`diagramCard ${selected ? "selected" : ""}`}>
          <div className="diagramTitle">
            <h3>COMBINE</h3>
            <p>Are parts put together into a total? </p>
          </div>
          <div className="diagramExample">
            <DiagramCombineWidget />
            <div className="diagramEquation">P + Q = T</div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default DiagramCombine;
