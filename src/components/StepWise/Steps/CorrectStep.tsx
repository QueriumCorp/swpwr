import React from "react";
import type { Step } from "../stores/solution";
import { TableCell, TableRow } from "../components/Table";
import { StepIcon } from "./StepIcon";
import MathStatic from "../MathStatic/MathStatic";

const CorrectStep = (props: Step) => {
  if (props.type === "correct") {
    const { latex } = props;

    return (
      <TableRow className="flex text-slate-500 dark:text-slate-400 m-0 text-sm even:bg-[#f7f7f7] odd:bg-white">
        <TableCell>
          <StepIcon>✓</StepIcon>
        </TableCell>
        <TableCell>
          <div className="">
            <MathStatic
              latex={latex}
              style={{ background: "none" }}
            ></MathStatic>
          </div>
        </TableCell>
      </TableRow>
    );
  }
  return null;
};

export default CorrectStep;
