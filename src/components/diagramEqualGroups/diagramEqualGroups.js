import React from "react";

import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

import "./diagramEqualGroups.css";

function DiagramEqualGroups(props) {
  const selected = props.selected;
  const onChange = props.onChange;

  function clickHandler() {
    onChange({
      type: "diagramSelected",
      payload: "EQUALGROUPS",
    });
  }

  return (
    <div className="diagramEqualGroupsContainer">
      <Card onClick={clickHandler}>
        <Card.Body
          className={`diagramEqualGroups ${selected ? "selected" : ""}`}
        >
          <div className="diagramEqualGroupsTitle">
            <h3>EQUAL GROUPS</h3>
            <p>Equality of Outcomes is silly?</p>
          </div>
          <div className="diagramEqualGroupsExample">
            <div className="diagramEqualGroupsBox">
              <div className="diagramEqualGroupsStart">start</div>
              <div className="diagramEqualGroupsChange">change</div>
              <div className="diagramEqualGroupsEnd">end</div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default DiagramEqualGroups;
