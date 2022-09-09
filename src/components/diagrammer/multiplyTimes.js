import React from "react";

import Card from "react-bootstrap/Card";

import { useDrop } from "react-dnd";

import Tags from "./tags";

import "./diagrammer.css";
import "../diagramMultiplyTimes/diagramMultiplyTimes.css";

export default function MultiplyTimes(props) {
  // const problem = props.problem;
  const solution = props.solution;
  const onChange = props.onChange;

  const [{ isOverProduct }, productDrop] = useDrop(() => ({
    accept: ["NUM", "STR"],
    drop: (item) =>
      onChange({ type: "timesDiagramProduct", payload: item.tagValue }),
    collect: (monitor) => ({
      isOverProduct: !!monitor.isOver(),
    }),
  }));

  const [{ isOverSets }, setsDrop] = useDrop(() => ({
    accept: ["NUM", "STR"],
    drop: (item) =>
      onChange({ type: "timesDiagramSets", payload: item.tagValue }),
    collect: (monitor) => ({
      isOverSets: !!monitor.isOver(),
    }),
  }));

  const [{ isOverMultiplier }, multiplierDrop] = useDrop(() => ({
    accept: ["NUM", "STR"],
    drop: (item) =>
      onChange({ type: "timesDiagramMultiplier", payload: item.tagValue }),
    collect: (monitor) => ({
      isOverMultiplier: !!monitor.isOver(),
    }),
  }));

  function handleTimesProduct(event) {
    onChange({ type: "timesDiagramProduct", payload: event.target.value });
  }
  function handleTimesSets(event) {
    onChange({ type: "timesDiagramSets", payload: event.target.value });
  }
  function handleTimesMultiplier(event) {
    onChange({ type: "timesDiagramMultiplier", payload: event.target.value });
  }
  return (
    <div className="diagramChangeContainer">
      <Card>
        <Card.Body className="diagramChange">
          <div className="diagramTitle">
            <h3>MULTIPLE TIMES</h3>
          </div>
          <div className="diagramExample">
            <div className="diagramMultipleBox">
              <div
                className="diagramMultipleItem diagramMultipleStart"
                ref={setsDrop}
                style={{ background: isOverSets ? "red" : "" }}
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
                  Sets
                  <input
                    value={solution.diagram.times.sets}
                    onChange={handleTimesSets}
                    className="inputField"
                  />
                </div>
              </div>

              <div>X</div>

              <div
                className="squareIcon verticalIconLayout"
                ref={multiplierDrop}
                style={{ background: isOverMultiplier ? "red" : "" }}
              >
                Multiplier
                <input
                  value={solution.diagram.times.multiplier}
                  onChange={handleTimesMultiplier}
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
                    value={solution.diagram.times.product}
                    onChange={handleTimesProduct}
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
                  onChange={handleTimesProduct}
                  className="inputField"
                />
              </div>
              <div className="diagramCombineBottom">
                <div
                  className="diagramCombineBottomLeft"
                  ref={setsDrop}
                  style={{ background: isOverSets ? "red" : "" }}
                >
                  Part
                  <input
                    value={solution.diagram.combine.sets}
                    onChange={handleTimesSets}
                    className="inputField"
                  />
                </div>
                <div
                  className="diagramCombineBottomRight"
                  ref={multiplierDrop}
                  style={{ background: isOverMultiplier ? "red" : "" }}
                >
                  Part{" "}
                  <input
                    value={solution.diagram.combine.multiplier}
                    onChange={handleTimesMultiplier}
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
