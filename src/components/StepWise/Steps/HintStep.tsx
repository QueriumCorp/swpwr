import React, { useRef, useEffect } from "react";
import type { Step } from "../stores/solution";
import { renderMathInElement } from "mathlive";
import { TableCell, TableRow } from "../components/Table";
import { StepIcon } from "./StepIcon";

const HintStep = (props: Step) => {
  // create a reference to the DOM element containing the mixed LaTeX
  const latexRef = useRef(null);
  // on initial render, tell MathLive to render the latex
  useEffect(() => {
    if (latexRef.current) {
      renderMathInElement(latexRef.current);
    }
  }, []);

  if (props.type === "hint") {
    return (
      <TableRow className="flex text-slate-500 dark:text-slate-400 mt-2 text-sm">
        <TableCell>
          <StepIcon>🤷‍♀️</StepIcon>
        </TableCell>
        <TableCell>
          <div ref={latexRef}>{props.hintText}</div>
        </TableCell>
      </TableRow>
    );
  }
  return null;
};

export default HintStep;
