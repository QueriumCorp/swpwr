import React from "react";

import Card from "react-bootstrap/Card";

import { useDrop } from "react-dnd";

import Tags from "./tags";

import "./diagrammer.css";
import "../diagramCombine/diagramCombine.css";

export default function Combine(props) {
  // const problem = props.problem;
  const solution = props.solution;
  const onChange = props.onChange;

  const [{ isOverTotal }, totalDrop] = useDrop(() => ({
    accept: ["NUM", "STR"],
    drop: (item) =>
      onChange({ type: "combineDiagramTotal", payload: item.tagValue }),
    collect: (monitor) => ({
      isOverTotal: !!monitor.isOver(),
    }),
  }));

  const [{ isOverPart1 }, part1Drop] = useDrop(() => ({
    accept: ["NUM", "STR"],
    drop: (item) =>
      onChange({ type: "combineDiagramPart1", payload: item.tagValue }),
    collect: (monitor) => ({
      isOverPart1: !!monitor.isOver(),
    }),
  }));

  const [{ isOverPart2 }, part2Drop] = useDrop(() => ({
    accept: ["NUM", "STR"],
    drop: (item) =>
      onChange({ type: "combineDiagramPart2", payload: item.tagValue }),
    collect: (monitor) => ({
      isOverPart2: !!monitor.isOver(),
    }),
  }));

  function handleCombineTotal(event) {
    onChange({ type: "combineDiagramTotal", payload: event.target.value });
  }
  function handleCombinePart1(event) {
    onChange({ type: "combineDiagramPart1", payload: event.target.value });
  }
  function handleCombinePart2(event) {
    onChange({ type: "combineDiagramPart2", payload: event.target.value });
  }
  return (
    <div className="diagramChangeContainer">
      <Card>
        <Card.Body className="diagramChange">
          <div className="diagramTitle">
            <h3>COMBINE</h3>
          </div>
          <div className="diagramExample">
            <div className="diagramCombineBox">
              <div
                className="diagramCombineTop"
                ref={totalDrop}
                style={{ background: isOverTotal ? "red" : "" }}
              >
                Total
                <input
                  value={solution.diagram.combine.total}
                  onChange={handleCombineTotal}
                  className="inputField"
                />
              </div>
              <div className="diagramCombineBottom">
                <div
                  className="diagramCombineBottomLeft"
                  ref={part1Drop}
                  style={{ background: isOverPart1 ? "red" : "" }}
                >
                  Part
                  <input
                    value={solution.diagram.combine.part1}
                    onChange={handleCombinePart1}
                    className="inputField"
                  />
                </div>
                <div
                  className="diagramCombineBottomRight"
                  ref={part2Drop}
                  style={{ background: isOverPart2 ? "red" : "" }}
                >
                  Part{" "}
                  <input
                    value={solution.diagram.combine.part2}
                    onChange={handleCombinePart2}
                    className="inputField"
                  />
                </div>
              </div>
            </div>
          </div>
          <Tags tags={props.solution.tags}></Tags>
        </Card.Body>
      </Card>
    </div>
  );
}
