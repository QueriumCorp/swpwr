import React, { useEffect, useRef, useState, ChangeEvent } from "react";

// stores
import { SessionContext } from "../stores/sessionContext";
import { useStore } from "zustand";

// components
import { Submit } from "./Submit/Submit";
import { Hint } from "./Hint/Hint";
import { ShowMe } from "./ShowMe/ShowMe";
import Keyboard from "./Keyboard/Keyboard";

import "./MathEditor.css";

import type { MathfieldElement } from "mathlive";
import { MathViewRef } from "../types/mathlive";
import { Operator } from "../stores/solution";
/* eslint-disable */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "math-field": React.DetailedHTMLProps<
        React.HTMLAttributes<MathfieldElement>,
        MathfieldElement
      >;
    }
  }
}
/* eslint-enable */

/* ============================================================================

InputPanel

============================================================================ */

const InputPanel = () => {
  // manage MathLive's mathfield
  const mf = useRef<MathViewRef>(null);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (mf.current) {
      mf.current.mathVirtualKeyboardPolicy = "manual";
      mf.current.addEventListener("beforeinput", (evt) => {
        if (evt.inputType === "insertLineBreak" && mf.current) {
          submitStep(mf.current.value);
          evt.preventDefault();
        }
      });
    }
  }, []);

  // get session
  const session = React.useContext(SessionContext);
  if (!session) throw new Error("No SessionContext.Provider in the tree");
  const identifiers = useStore(session, (s) => s.identifiers);
  const operators = useStore(session, (s) => s.operators);
  const submitStep = useStore(session, (s) => s.submitStep);

  // setup event handlers
  const handleKeyPress = (operator: Operator) => {
    console.info("handleKeyPress", operator);
    // mf.current?.executeCommand(["insert", key]);
    setSelectedOperator(operator);
  };

  const [selectedOperator, setSelectedOperator] = useState<Operator>({
    method: "neuter",
    cursorShift: "",
    atomic: false,
    enabled: false,
    latex: "",
    mma: "",
    operator: ".",
    string: "",
    symbol_latex: "",
    symbol_style: {},
    symbol_html: "",
    symbol_icon: "",
    symbol_img: "",
    symbol_svg: "",
    symbol_utf8: ".",
    tooltip: "",
  });

  return (
    <>
      <div className="w-full flex items-center rounded-full bg-slate-300 py-2">
        <ShowMe className="ml-3"></ShowMe>
        <Hint className="ml-0"></Hint>
        <math-field
          ref={mf}
          onInput={(evt: React.FormEvent<MathfieldElement>) =>
            setValue(evt.currentTarget.value)
          }
          style={{
            flexGrow: 1,
            boxSizing: "border-box",
            background: "none",
            border: "1px white solid",
            borderRadius: "6px",
          }}
        >
          {value}
        </math-field>
        <Submit className="mr-3" value={value} />
      </div>
      <Keyboard
        identifiers={identifiers}
        operators={operators}
        onKeyPress={(key) => handleKeyPress(key)}
      />
    </>
  );
};

export default InputPanel;
