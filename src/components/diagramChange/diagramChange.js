import React from "react";

import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

import "./diagramChange.css";

function DiagramChange(props) {
  const selected = props.selected;
  const onChange = props.onChange;

  function clickHandler() {
    onChange({
      type: "diagramSelected",
      payload: "CHANGE",
    });
  }

  return (
    <div className="diagramChangeContainer">
      <Card onClick={clickHandler}>
        <Card.Body className={`diagramChange ${selected ? "selected" : ""}`}>
          <div className="diagramChangeTitle">
            <h3>CHANGE</h3>
            <p>Are amounts changed for no apparent reason?</p>
          </div>
          <div className="diagramChangeExample">
            <div className="diagramChangeBox">
              <div className="diagramChangeStart">start</div>
              <div className="diagramChangeChange">change</div>
              <div className="diagramChangeEnd">end</div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default DiagramChange;
