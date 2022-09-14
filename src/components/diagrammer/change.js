import React, { useState } from "react";

import Card from "react-bootstrap/Card";

import { useDrop } from "react-dnd";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { TiPlus } from "react-icons/ti";
import { FaMinus } from "react-icons/fa";

import Key from "../../components/keypad/key";
import Keypad from "../../components/keypad/keypad";
import KeyRow from "../../components/keypad/keyrow";
import { BsBackspace } from "react-icons/bs";
import Tags from "./tags";
import insertAtCaret from "../../utils/insertIntoField.js";

import "./diagrammer.css";
import "../diagramChange/diagramChange.css";
import isMobile from "../../utils/deviceInfo";

const mobileDevice = isMobile();

export default function Change(props) {
  // const problem = props.problem;
  const solution = props.solution;
  const onChange = props.onChange;

  const [positive, setPositive] = useState(props.solution.diagram.change.sign);

  const [focused, setFocused] = useState(null);

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

  function handleFocus(event) {
    setFocused(event.target || event.srcElement);
  }

  function handleSoftKey(key) {
    const result = insertAtCaret(focused, key);
    if (!result) return;

    switch (focused.id) {
      case "start":
        onChange({ type: "changeDiagramStart", payload: result.newStr });
        break;
      case "change":
        onChange({ type: "changeDiagramChange", payload: result.newStr });
        break;
      case "end":
        onChange({ type: "changeDiagramEnd", payload: result.newStr });
        break;
      default:
        console.error("bad handleSoftKey", key, result, focused);
    }
    setTimeout(() => {
      focused.setSelectionRange(result.newStart, result.newEnd);
    }, 10);
    focused.focus();
  }

  // JSX
  return (
    <div className="diagramChangeContainer">
      <Card style={{ flexGrow: "2" }}>
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
                  id="start"
                  value={solution.diagram.change.start}
                  onChange={handleChangeStart}
                  onFocus={handleFocus}
                  className="inputField"
                  readOnly={mobileDevice}
                  autoFocus
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
                  id="change"
                  value={solution.diagram.change.change}
                  onChange={handleChangeChange}
                  onFocus={handleFocus}
                  className="inputField"
                  readOnly={mobileDevice}
                />
              </div>
              <div
                className="diagramChangeItem"
                ref={endDrop}
                style={{ background: isOverEnd ? "red" : "" }}
              >
                end
                <input
                  id="end"
                  value={solution.diagram.change.end}
                  onChange={handleChangeEnd}
                  onFocus={handleFocus}
                  className="inputField"
                  readOnly={mobileDevice}
                />
              </div>
            </div>
          </div>
          <Tags tags={props.solution.tags}></Tags>
          <div className="keypadBox">
            <Keypad
              className="myKeypad"
              style={{ minHeight: "300px", minWidth: "200px" }}
            >
              <KeyRow>
                <Key
                  onClick={handleSoftKey}
                  retKey="&LARR;"
                  style={{ background: "orange" }}
                >
                  &larr;
                </Key>
                <Key
                  onClick={handleSoftKey}
                  retKey="&RARR;"
                  style={{ background: "orange" }}
                >
                  &rarr;
                </Key>
                <Key
                  onClick={handleSoftKey}
                  retKey="&BKSP;"
                  style={{ background: "orange" }}
                >
                  <BsBackspace />
                </Key>
              </KeyRow>
              <KeyRow>
                <Key onClick={handleSoftKey} retKey="7">
                  <i>7</i>
                </Key>
                <Key onClick={handleSoftKey} retKey="8">
                  8
                </Key>
                <Key onClick={handleSoftKey} retKey="9">
                  9
                </Key>
              </KeyRow>
              <KeyRow>
                <Key onClick={handleSoftKey} retKey="4">
                  4
                </Key>
                <Key onClick={handleSoftKey} retKey="5">
                  5
                </Key>
                <Key onClick={handleSoftKey} retKey="6">
                  6
                </Key>
              </KeyRow>
              <KeyRow>
                <Key onClick={handleSoftKey} retKey="1">
                  1
                </Key>
                <Key onClick={handleSoftKey} retKey="2">
                  2
                </Key>
                <Key onClick={handleSoftKey} retKey="3">
                  3
                </Key>
              </KeyRow>
            </Keypad>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
