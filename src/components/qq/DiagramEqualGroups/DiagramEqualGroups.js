import React from "react";

import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

import DiagramEqualGroupsWidget from "./DiagramEqualGroupsWidget.js";

import "./DiagramEqualGroups.css";

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
    <div className="diagramSample">
      <Card onClick={clickHandler}>
        <Card.Body className={`diagramCard ${selected ? "selected" : ""}`}>
          <div className="diagramTitle">
            <h3>EQUAL GROUPS</h3>
            <p>Are there groups that are all the same size?</p>
          </div>
          <div className="diagramExample">
            <DiagramEqualGroupsWidget />
            <div className="diagramEquation">G X N = P</div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default DiagramEqualGroups;
