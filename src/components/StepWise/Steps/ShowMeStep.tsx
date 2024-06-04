import React from "react";
import type { ShowMeStep, Step } from "../stores/solution";
import MathStatic from "../MathStatic/MathStatic";
import { TableCell, TableRow } from "../components/Table";
import { StepIcon } from "./StepIcon";

const ShowMeSteps = (props: Step) => {
  if (props.type === "showMe") {
    return (
      <>
        {props.showMe.map((item: ShowMeStep) => {
          return (
            <TableRow
              key={item.key}
              className="flex text-slate-500 dark:text-slate-400 m-0 text-sm even:bg-[#f7f7f7] odd:bg-white"
            >
              <TableCell>
                <StepIcon>☞</StepIcon>
              </TableCell>

              <TableCell>
                <div className="font-serif">{item.instruction}</div>
                <div className="">
                  <MathStatic
                    latex={item.suggestedStep}
                    style={{ background: "none" }}
                  ></MathStatic>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </>
    );
  }
  return null;
};

export default ShowMeSteps;
