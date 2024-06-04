import React, { useEffect, useRef } from "react";
import { Operator } from "../../stores/solution";
import { MathViewRef } from "../../types/mathlive";

type LatexKeyCapProps = {
  operator: Operator;
};

export const LatexKeyCap = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & LatexKeyCapProps
>(({ operator }, _ref) => {
  const mf = useRef<MathViewRef>(null);

  useEffect(() => {
    if (mf.current) {
      if (operator.symbol_latex.includes("foo")) {
        mf.current.setPromptState("foo", "correct", true);
      }
      if (operator.symbol_latex.includes("bar")) {
        mf.current.setPromptState("bar", "correct", true);
      }
      if (operator.symbol_latex.includes("baz")) {
        mf.current.setPromptState("baz", "correct", true);
      }
    }
  }, []);

  const theLatex = `\\textcolor{'indigo'}{ ${operator.symbol_latex} }`;
  return (
    <math-field
      style={{
        userSelect: "none",
        background: "none",
        ...operator.symbol_style,
      }}
      ref={mf}
      read-only
    >
      {theLatex}
    </math-field>
  );
});
