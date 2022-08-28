import React from "react";

import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

import "./diagramMultiplyTimes.css";

function DiagramMultiplyTimes(props) {
  const selected = props.selected;
  const onChange = props.onChange;

  function clickHandler() {
    onChange({
      type: "diagramSelected",
      payload: "MULTIPLYTIMES",
    });
  }
  return (
    <div className="diagramContainer">
      <Card onClick={clickHandler}>
        <Card.Body
          className={`diagramMultiplyTimes ${selected ? "selected" : ""}`}
        >
          <div className="diagramTitle">
            <h3>MultiplyTimes</h3>
            <p>Time. Time. Time. What's to become of me?</p>
            <h2>P1 + P2 = T</h2>
          </div>
          <div className="diagramExample">
            <div className="diagramBox">
              <div className="diagramTop">Total</div>
              <div className="diagramBottom">
                <div className="diagramBottomLeft">Part</div>
                <div className="diagramBottomRight">Part2</div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default DiagramMultiplyTimes;
