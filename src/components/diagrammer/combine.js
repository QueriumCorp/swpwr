import React, { useState } from "react";

import Card from "react-bootstrap/Card";

import { useDrop } from "react-dnd";

import Tags from "./tags";

import "./diagrammer.css";
import "../diagramCombine/diagramCombine.css";

import Keypad from "../keypad/keypad";
import KeyRow from "../keypad/keyrow";
import Key from "../keypad/key";
import { BsBackspace } from "react-icons/bs";
import handleSoftKey from "../../utils/manipulateField.js";

import isMobile from "../../utils/deviceInfo";
const mobileDevice = isMobile();

export default function Combine(props) {
  // const problem = props.problem;
  const solution = props.solution;
  const onChange = props.onChange;

  const [focused, setFocused] = useState(null);

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

  function handleFocus(event) {
    setFocused(event.target || event.srcElement);
  }

  function handleSoftKeyPress(key) {
    const result = handleSoftKey(focused, key);

    if (result) {
      switch (focused.id) {
        case "total":
          onChange({ type: "combineDiagramTotal", payload: result.newStr });
          break;
        case "part1":
          onChange({ type: "combineDiagramPart1", payload: result.newStr });
          break;
        case "part2":
          onChange({ type: "combineDiagramPart2", payload: result.newStr });
          break;
        default:
          console.error("bad handleSoftKeyPress", key, result, focused);
      }
      setTimeout(() => {
        focused.setSelectionRange(result.newStart, result.newEnd);
      }, 0);
    }
  }

  // JSX
  return (
    <div className="diagramContainer">
      <Card style={{ flexGrow: "2" }}>
        <Card.Body className="diagramScroll">
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
                  id="total"
                  value={solution.diagram.combine.total}
                  onChange={handleCombineTotal}
                  onFocus={handleFocus}
                  className="inputField"
                  autoFocus={true}
                  readOnly={mobileDevice}
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
                    id="part1"
                    value={solution.diagram.combine.part1}
                    onChange={handleCombinePart1}
                    onFocus={handleFocus}
                    className="inputField"
                    readOnly={mobileDevice}
                  />
                </div>
                <div
                  className="diagramCombineBottomRight"
                  ref={part2Drop}
                  style={{ background: isOverPart2 ? "red" : "" }}
                >
                  Part
                  <input
                    id="part2"
                    value={solution.diagram.combine.part2}
                    onChange={handleCombinePart2}
                    onFocus={handleFocus}
                    className="inputField"
                    readOnly={mobileDevice}
                  />
                </div>
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
                  onClick={handleSoftKeyPress}
                  retKey="&LARR;"
                  style={{ background: "orange" }}
                >
                  &larr;
                </Key>
                <Key
                  onClick={handleSoftKeyPress}
                  retKey="&RARR;"
                  style={{ background: "orange" }}
                >
                  &rarr;
                </Key>
                <Key
                  onClick={handleSoftKeyPress}
                  retKey="&BKSP;"
                  style={{ background: "orange" }}
                >
                  <BsBackspace />
                </Key>
              </KeyRow>
              <KeyRow>
                <Key onClick={handleSoftKeyPress} retKey="7">
                  <i>7</i>
                </Key>
                <Key onClick={handleSoftKeyPress} retKey="8">
                  8
                </Key>
                <Key onClick={handleSoftKeyPress} retKey="9">
                  9
                </Key>
              </KeyRow>
              <KeyRow>
                <Key onClick={handleSoftKeyPress} retKey="4">
                  4
                </Key>
                <Key onClick={handleSoftKeyPress} retKey="5">
                  5
                </Key>
                <Key onClick={handleSoftKeyPress} retKey="6">
                  6
                </Key>
              </KeyRow>
              <KeyRow>
                <Key onClick={handleSoftKeyPress} retKey="1">
                  1
                </Key>
                <Key onClick={handleSoftKeyPress} retKey="2">
                  2
                </Key>
                <Key onClick={handleSoftKeyPress} retKey="3">
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
