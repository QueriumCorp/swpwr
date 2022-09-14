import React from "react";

import Key from "../../components/keypad/key";
import Keypad from "../../components/keypad/keypad";
import KeyRow from "../../components/keypad/keyrow";
import { BsBackspace } from "react-icons/bs";

import "./testView.css";
import handleSoftKey from "../../utils/manipulateField";

export default function TestView(props) {
  function keyClick(val) {
    const target = document.querySelector("#testInput");
    const result = handleSoftKey(target, val);
    if (result) {
      target.value = result.newStr;
      target.setSelectionRange(result.newStart, result.newEnd);
    }
    if (target !== document.activeElement) {
      target.focus();
    }
  }

  return (
    <div className="testBox">
      <input id="testInput" autoFocus />
      <div
        style={{
          position: "absolute",
          width: "200px",
          height: "300px",
          background: "grey",
        }}
      >
        <Keypad className="myKeypad" style={{ fontSize: "2rem" }}>
          <KeyRow>
            <Key
              onClick={keyClick}
              retKey="&LARR;"
              style={{ background: "orange" }}
            >
              &larr;
            </Key>
            <Key
              onClick={keyClick}
              retKey="&RARR;"
              style={{ background: "orange" }}
            >
              &rarr;
            </Key>
            <Key
              onClick={keyClick}
              retKey="&BKSP;"
              style={{ background: "orange" }}
            >
              <BsBackspace />
            </Key>
          </KeyRow>
          <KeyRow>
            <Key onClick={keyClick} retKey="7">
              <i>7</i>
            </Key>
            <Key onClick={keyClick} retKey="8">
              8
            </Key>
            <Key onClick={keyClick} retKey="9">
              9
            </Key>
          </KeyRow>
          <KeyRow>
            <Key onClick={keyClick} retKey="4">
              4
            </Key>
            <Key onClick={keyClick} retKey="5">
              5
            </Key>
            <Key onClick={keyClick} retKey="6">
              6
            </Key>
          </KeyRow>
          <KeyRow>
            <Key onClick={keyClick} retKey="1">
              1
            </Key>
            <Key onClick={keyClick} retKey="2">
              2
            </Key>
            <Key onClick={keyClick} retKey="3">
              3
            </Key>
          </KeyRow>
        </Keypad>
      </div>
    </div>
  );
}
