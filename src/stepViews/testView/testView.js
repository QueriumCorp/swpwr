import React from "react";
import Key from "../../components/keypad/key";
import Keypad from "../../components/keypad/keypad";
import KeyRow from "../../components/keypad/keyrow";
import { BsBackspace } from "react-icons/bs";

import "./testView.css";

export default function TestView(props) {
  const problem = props.problem;
  const solution = props.solution;
  const onChange = props.onChange;

  function keyClick(val) {
    console.info(val);
  }

  return (
    <div className="testBox">
      <input />
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
