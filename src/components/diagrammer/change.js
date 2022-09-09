import React, { useState } from "react";

import Card from "react-bootstrap/Card";

import { useDrop } from "react-dnd";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { TiPlus } from "react-icons/ti";
import { FaMinus } from "react-icons/fa";

import Tags from "./tags";

import "./diagrammer.css";
import "../diagramChange/diagramChange.css";

export default function Change(props) {
  // const problem = props.problem;
  const solution = props.solution;
  const onChange = props.onChange;

  const [positive, setPositive] = useState(props.solution.diagram.change.sign);

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
  function handleSignToggle(event) {
    setPositive(!positive);
    onChange({ type: "changeDiagramSign", payload: !positive });
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
          <div className="diagramTitle">
            <h3>CHANGE</h3>
          </div>
          <div className="diagramExample">
            <div className="diagramChangeArrowBox">
              <svg
                className="diagramChangeArrow"
                version="1.1"
                viewBox="0 0 920 281.7"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g transform="translate(-45.141 -322.39)">
                  <g
                    transform="matrix(.40782 1.0902 2.1895 -.20307 -572.25 1088.6)"
                    strokeWidth="0"
                  >
                    <path
                      d="m-543.8 549.31c21.012 159.22 238.48 193.45 142.86 175.71-102.4-18.993-188.57-81.228-188.57-181.43s86.06-163.05 188.57-181.43c74.041-13.272-166.77 5.932-142.86 187.14z"
                      color="#000000"
                    />
                    <path
                      transform="matrix(.95969 -.28107 .28107 .95969 -196.31 -60.926)"
                      d="m-380 746.65c-5.7405 5.1467-181.6-52.408-183.18-59.952-1.5869-7.5448 136.19-131.06 143.51-128.67 7.3274 2.3981 45.413 183.47 39.672 188.62z"
                      color="#000000"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <div className="diagramChangeBox">
              <div
                className="diagramChangeItem"
                ref={startDrop}
                style={{ background: isOverStart ? "red" : "" }}
              >
                start
                <input
                  value={solution.diagram.change.start}
                  onChange={handleChangeStart}
                  className="inputField"
                />
              </div>
              <Toggle
                defaultChecked={positive}
                className="signToggle"
                icons={{
                  checked: <TiPlus size={28} />,
                  unchecked: <FaMinus size={42} />,
                }}
                onChange={handleSignToggle}
              />
              <div
                className="diagramChangeItem"
                ref={changeDrop}
                style={{ background: isOverChange ? "red" : "" }}
              >
                change
                <input
                  value={solution.diagram.change.change}
                  onChange={handleChangeChange}
                  className="inputField"
                />
              </div>
              <div
                className="diagramChangeItem"
                ref={endDrop}
                style={{ background: isOverEnd ? "red" : "" }}
              >
                end
                <input
                  value={solution.diagram.change.end}
                  onChange={handleChangeEnd}
                  className="inputField"
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
