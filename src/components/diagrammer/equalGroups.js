import React, { useState } from "react";

import Card from "react-bootstrap/Card";

import { useDrop } from "react-dnd";

import Tags from "./tags";

import "./diagrammer.css";
import "../diagramEqualGroups/diagramEqualGroups.css";
import Keypad from "../keypad/keypad";
import KeyRow from "../keypad/keyrow";
import Key from "../keypad/key";
import { BsBackspace } from "react-icons/bs";
import handleSoftKey from "../../utils/manipulateField.js";

export default function EqualGroups(props) {
  // const problem = props.problem;
  const solution = props.solution;
  const onChange = props.onChange;

  const [focused, setFocused] = useState(null);

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

  function handleFocus(event) {
    setFocused(event.target || event.srcElement);
  }

  function handleSoftKeyPress(key) {
    const result = handleSoftKey(focused, key);

    if (result) {
      switch (focused.id) {
        case "product":
          onChange({ type: "groupsDiagramProduct", payload: result.newStr });
          break;
        case "groups":
          onChange({ type: "groupsDiagramGroups", payload: result.newStr });
          break;
        case "number":
          onChange({ type: "groupsDiagramNumber", payload: result.newStr });
          break;
        default:
          console.error("bad handleSoftKeyPress", key, result, focused);
      }
      setTimeout(() => {
        focused.setSelectionRange(result.newStart, result.newEnd);
      }, 0);
    }
  }

  //JSX
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
                className="diagramEqualItem diagramMultipleStart"
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
                    id="groups"
                    value={solution.diagram.groups.groups}
                    onChange={handleGroupsGroups}
                    onFocus={handleFocus}
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
                  id="number"
                  value={solution.diagram.groups.number}
                  onChange={handleGroupsNumber}
                  onFocus={handleFocus}
                  className="inputField"
                />
              </div>

              <div> = </div>

              <div
                className="diagramEqualItem diagramMultipleEnd"
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
                    id="product"
                    value={solution.diagram.groups.product}
                    onChange={handleGroupsProduct}
                    onFocus={handleFocus}
                    className="inputField"
                  />
                </div>
              </div>
            </div>
          </div>
          <Tags tags={props.solution.tags}></Tags>{" "}
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
