import React from "react";

import "./diagramMultiplyTimes.css";

export default function DiagramMultiplyTimesWidget(props) {
  return (
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
  );
}
