import React from "react";

import Card from "react-bootstrap/Card";

import "./diagrammer.css";
import "../diagramMultiplyTimes/diagramMultiplyTimes.css";

export default function MultiplyTimesDisplay(props) {
  const solution = props.solution;

  // JSX
  return (
    <div className="diagramContainer">
      <Card style={{ flexGrow: "2" }}>
        <Card.Body className="diagramScroll" style={{ padding: 0 }}>
          <div
            className="diagramExample"
            style={{ flexDirection: "row", justifyContent: "center" }}
          >
            <div className="diagramBox">
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
                <div className="verticalIconLayout">
                  Sets
                  <input
                    id="sets"
                    value={solution.diagram.times.sets}
                    className="inputField"
                    readOnly={true}
                  />
                </div>
              </div>

              <div>X</div>

              <div className="squareIcon verticalIconLayout">
                Multiplier
                <input
                  id="multiplier"
                  value={solution.diagram.times.multiplier}
                  className="inputField"
                  readOnly={true}
                />
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
                <div className="verticalIconLayout">
                  Product
                  <input
                    id="product"
                    value={solution.diagram.times.product}
                    className="inputField"
                    readOnly={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
