import React from "react";

import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

import "./diagramCompare.css";

function DiagramCompare(props) {
  const selected = props.selected;
  const onChange = props.onChange;

  function clickHandler() {
    onChange({
      type: "diagramSelected",
      payload: "COMPARE",
    });
  }
  return (
    <div className="diagramCompareContainer">
      <Card onClick={clickHandler}>
        <Card.Body className={`diagramCompare ${selected ? "selected" : ""}`}>
          <div className="diagramCompareTitle">
            <h3>COMPARE</h3>
            <p>Are amounts compared for a difference?</p>
          </div>
          <div className="diagramCompareExample">
            <div className="diagramCompareBox">
              <div className="diagramCompareTop">Greater</div>
              <div className="diagramCompareBottom">
                <div className="diagramCompareBottomLeft">Less</div>
                <div className="diagramCompareBottomRight">Difference</div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default DiagramCompare;
