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
            <Key>&lt;</Key>
            <Key>&gt;</Key>
            <Key>
              <BsBackspace />
            </Key>
          </KeyRow>
          <KeyRow>
            <Key onClick={keyClick} retKey="7" style={{ background: "orange" }}>
              <i>7</i>
            </Key>
            <Key>8</Key>
            <Key>9</Key>
          </KeyRow>
          <KeyRow>
            <Key>4</Key>
            <Key>5</Key>
            <Key>6</Key>
          </KeyRow>
          <KeyRow>
            <Key>1</Key>
            <Key>2</Key>
            <Key>3</Key>
          </KeyRow>
        </Keypad>
      </div>
    </div>
  );
}
