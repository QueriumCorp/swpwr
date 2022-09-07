import React from "react";

import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

import "./diagramCombine.css";

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
            <div className="diagramCombineBox">
              <div className="diagramCombineTop">Total</div>
              <div className="diagramCombineBottom">
                <div className="diagramCombineBottomLeft">Part</div>
                <div className="diagramCombineBottomRight">Part</div>
              </div>
            </div>
            <div className="diagramEquation">P + Q = T</div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default DiagramCombine;
