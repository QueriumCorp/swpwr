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
    <div className="diagramCombineContainer">
      <Card onClick={clickHandler}>
        <Card.Body className={`diagramCombine ${selected ? "selected" : ""}`}>
          <div className="diagramCombineTitle">
            <h3>COMBINE</h3>
            <p>Are amounts compared for a difference?</p>
          </div>
          <div className="diagramCombineExample">
            <div className="diagramCombineBox">
              <div className="diagramCombineTop">Greater</div>
              <div className="diagramCombineBottom">
                <div className="diagramCombineBottomLeft">Less</div>
                <div className="diagramCombineBottomRight">Difference</div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default DiagramCombine;
