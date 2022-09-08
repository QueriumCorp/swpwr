import React from "react";

import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

import "./diagramMultiplyTimes.css";
import DiagramMultiplyTimesWidget from "./diagramMultiplyTimesWidget";

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
    <div className="diagramSample">
      <Card onClick={clickHandler}>
        <Card.Body className={`diagramCard ${selected ? "selected" : ""}`}>
          <div className="diagramTitle">
            <h3>MULTIPLE TIMES</h3>
            <p>Are amounts/sets compared a number of times?</p>
          </div>
          <div className="diagramExample">
            <DiagramMultiplyTimesWidget />
            <div className="diagramEquation">S X M = P</div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default DiagramMultiplyTimes;
