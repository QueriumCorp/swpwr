import React from "react";
import type { Step } from "../stores/solution";
import MathStatic from "../MathStatic/MathStatic";
import { TableCell, TableRow } from "../components/Table";
import { StepIcon } from "./StepIcon";

const IncorrectStep = (props: Step) => {
  if (props.type === "incorrect") {
    const { latex } = props;

    return (
      <TableRow className="flex text-slate-500 dark:text-slate-400 mt-2 text-sm">
        <TableCell>
          <StepIcon>✗</StepIcon>
        </TableCell>
        <TableCell>
          <div className="">
            <MathStatic latex={latex}></MathStatic>
          </div>
        </TableCell>
      </TableRow>
    );
  }
  return null;
};

export default IncorrectStep;
