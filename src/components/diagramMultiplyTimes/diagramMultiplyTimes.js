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
    <div className="diagramSample">
      <Card onClick={clickHandler}>
        <Card.Body className={`diagramCard ${selected ? "selected" : ""}`}>
          <div className="diagramTitle">
            <h3>MULTIPLE TIMES</h3>
            <p>Are amounts/sets compared a number of times?</p>
          </div>
          <div className="diagramExample">
            <div className="diagramMultipleBox">
              <div className="diagramMultipleItem diagramMultipleStart">
                <div className="diagramMultipleIcon">
                  <svg
                    version="1.1"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <ellipse
                      cx="50"
                      cy="50"
                      rx="47.015"
                      ry="47.015"
                      fill="#d5d3d3"
                      stroke="#000"
                    />
                  </svg>
                </div>
                <div className="diagramMultipleLabel">Sets</div>{" "}
              </div>
              <div>X</div>
              <div className="diagramMultipleItem diagramMultipleMultiple">
                Multiplier
              </div>
              <div> = </div>
              <div className="diagramMultipleItem diagramMultipleEnd">
                <div className="diagramMultipleIcon">
                  <svg
                    version="1.1"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      transform="matrix(.14629 1.284 -1.284 .14629 109.51 -13.316)"
                      d="m72.025 92.359-60.673-44.835 69.165-30.127-4.2458 37.481z"
                      fill="#d5d3d3"
                      stroke="#000"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
                <div className="diagramMultipleLabel">Product</div>
              </div>
            </div>
            <div className="diagramEquation">S X M = P</div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default DiagramMultiplyTimes;
