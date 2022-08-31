import React from "react";

import Card from "react-bootstrap/Card";

import { useDrop } from "react-dnd";

import "./diagrammer.css";
import Tags from "./tags";

function Change(props) {
  const problem = props.problem;
  const solution = props.solution;
  const onChange = props.onChange;

  const [{ isOverStart }, startDrop] = useDrop(() => ({
    accept: ["NUM", "STR"],
    drop: (item) =>
      onChange({ type: "changeDiagramStart", payload: item.tagValue }),
    collect: (monitor) => ({
      isOverStart: !!monitor.isOver(),
    }),
  }));

  const [{ isOverChange }, changeDrop] = useDrop(() => ({
    accept: ["NUM", "STR"],
    drop: (item) =>
      onChange({ type: "changeDiagramChange", payload: item.tagValue }),
    collect: (monitor) => ({
      isOverChange: !!monitor.isOver(),
    }),
  }));

  const [{ isOverEnd }, endDrop] = useDrop(() => ({
    accept: ["NUM", "STR"],
    drop: (item) =>
      onChange({ type: "changeDiagramEnd", payload: item.tagValue }),
    collect: (monitor) => ({
      isOverEnd: !!monitor.isOver(),
    }),
  }));

  function handleChangeStart(event) {
    onChange({ type: "changeDiagramStart", payload: event.target.value });
  }
  function handleChangeChange(event) {
    onChange({ type: "changeDiagramChange", payload: event.target.value });
  }
  function handleChangeEnd(event) {
    onChange({ type: "changeDiagramEnd", payload: event.target.value });
  }
  return (
    <div className="diagramChangeContainer">
      <Card>
        <Card.Body className="diagramChange">
          <div className="diagramChangeTitle">
            <h3>CHANGE</h3>
          </div>
          <div className="diagramChangeExample">
            <div className="diagramChangeBox">
              <div
                className="diagramChangeStart"
                ref={startDrop}
                style={{ background: isOverStart ? "red" : "" }}
              >
                start
                <input
                  value={solution.diagram.change.start}
                  onChange={handleChangeStart}
                />
              </div>

              <div
                className="diagramChangeChange"
                ref={changeDrop}
                style={{ background: isOverChange ? "red" : "" }}
              >
                change
                <input
                  value={solution.diagram.change.change}
                  onChange={handleChangeChange}
                />
              </div>
              <div
                className="diagramChangeEnd"
                ref={endDrop}
                style={{ background: isOverEnd ? "red" : "" }}
              >
                end
                <input
                  value={solution.diagram.change.end}
                  onChange={handleChangeEnd}
                />
              </div>
            </div>
          </div>
          <Tags tags={props.solution.tags}></Tags>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Change;
