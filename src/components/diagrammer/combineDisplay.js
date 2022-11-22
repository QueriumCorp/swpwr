import React from "react";

import Card from "react-bootstrap/Card";

import "./diagrammer.css";
import "../diagramCombine/diagramCombine.css";

export default function CombineDisplay(props) {
  const solution = props.solution;

  // JSX
  return (
    <div className="diagramContainer">
      <Card style={{ flexGrow: "2" }}>
        <Card.Body className="diagramScroll" style={{ padding: 0 }}>
          <div
            className="diagramExample"
            style={{
              flexDirection: "row",
              justifyContent: "center",
              maxWidth: "initial"
            }}
          >
            <div className="diagramCombineBox" style={{ maxWidth: 300 }}>
              <div className="diagramCombineTop">
                Total
                <input
                  id="total"
                  value={solution.diagram.combine.total}
                  className="inputField"
                  autoFocus={true}
                  readOnly={true}
                />
              </div>
              <div className="diagramCombineBottom">
                <div className="diagramCombineBottomLeft">
                  Part
                  <input
                    id="part1"
                    value={solution.diagram.combine.part1}
                    className="inputField"
                    readOnly={true}
                  />
                </div>
                <div className="diagramCombineBottomRight">
                  Part
                  <input
                    id="part2"
                    value={solution.diagram.combine.part2}
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
