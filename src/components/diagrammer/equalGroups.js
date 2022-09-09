import React from "react";

import Card from "react-bootstrap/Card";

import { useDrop } from "react-dnd";

import Tags from "./tags";

import "./diagrammer.css";
import "../diagramEqualGroups/diagramEqualGroups.css";

export default function EqualGroups(props) {
  // const problem = props.problem;
  const solution = props.solution;
  const onChange = props.onChange;

  const [{ isOverProduct }, productDrop] = useDrop(() => ({
    accept: ["NUM", "STR"],
    drop: (item) =>
      onChange({ type: "groupsDiagramProduct", payload: item.tagValue }),
    collect: (monitor) => ({
      isOverProduct: !!monitor.isOver(),
    }),
  }));

  const [{ isOverGroups }, groupsDrop] = useDrop(() => ({
    accept: ["NUM", "STR"],
    drop: (item) =>
      onChange({ type: "groupsDiagramGroups", payload: item.tagValue }),
    collect: (monitor) => ({
      isOverGroups: !!monitor.isOver(),
    }),
  }));

  const [{ isOverNumber }, numberDrop] = useDrop(() => ({
    accept: ["NUM", "STR"],
    drop: (item) =>
      onChange({ type: "groupsDiagramNumber", payload: item.tagValue }),
    collect: (monitor) => ({
      isOverNumber: !!monitor.isOver(),
    }),
  }));

  function handleGroupsProduct(event) {
    onChange({ type: "groupsDiagramProduct", payload: event.target.value });
  }
  function handleGroupsGroups(event) {
    onChange({ type: "groupsDiagramGroups", payload: event.target.value });
  }
  function handleGroupsNumber(event) {
    onChange({ type: "groupsDiagramNumber", payload: event.target.value });
  }
  return (
    <div className="diagramChangeContainer">
      <Card>
        <Card.Body className="diagramChange">
          <div className="diagramTitle">
            <h3>EQUAL GROUPS</h3>
          </div>
          <div className="diagramExample">
            <div className="diagramMultipleBox">
              <div
                className="diagramMultipleItem diagramMultipleStart"
                ref={groupsDrop}
                style={{ background: isOverGroups ? "red" : "" }}
              >
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
                  Groups
                  <input
                    value={solution.diagram.groups.groups}
                    onChange={handleGroupsGroups}
                    className="inputField"
                  />
                </div>
              </div>

              <div>X</div>

              <div
                className="squareIcon verticalIconLayout"
                ref={numberDrop}
                style={{ background: isOverNumber ? "red" : "" }}
              >
                Number
                <input
                  value={solution.diagram.groups.number}
                  onChange={handleGroupsNumber}
                  className="inputField"
                />
              </div>

              <div> = </div>

              <div
                className="diagramMultipleItem diagramMultipleEnd"
                ref={productDrop}
                style={{ background: isOverProduct ? "red" : "" }}
              >
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
                    value={solution.diagram.groups.product}
                    onChange={handleGroupsProduct}
                    className="inputField"
                  />
                </div>
              </div>
            </div>
            {/* <div className="diagramCombineBox">
              <div
                className="diagramCombineTop"
                ref={productDrop}
                style={{ background: isOverProduct ? "red" : "" }}
              >
                Product
                <input
                  value={solution.diagram.combine.product}
                  onChange={handleGroupsProduct}
                  className="inputField"
                />
              </div>
              <div className="diagramCombineBottom">
                <div
                  className="diagramCombineBottomLeft"
                  ref={groupsDrop}
                  style={{ background: isOverGroups ? "red" : "" }}
                >
                  Part
                  <input
                    value={solution.diagram.combine.groups}
                    onChange={handleGroupsGroups}
                    className="inputField"
                  />
                </div>
                <div
                  className="diagramCombineBottomRight"
                  ref={numberDrop}
                  style={{ background: isOverNumber ? "red" : "" }}
                >
                  Part{" "}
                  <input
                    value={solution.diagram.combine.number}
                    onChange={handleGroupsNumber}
                    className="inputField"
                  />
                </div>
              </div>
            </div> */}
          </div>
          <Tags tags={props.solution.tags}></Tags>
        </Card.Body>
      </Card>
    </div>
  );
}
