"use client";

//  React Imports
import { FC, ReactNode, useContext, useState } from "react";

// Third-party Imports
import { cn } from "@/lib/utils";

// Querium Imports
import { type YBRpage } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";
import { NavBar } from "../qq/NavBar";
import { CarouselPrevious, CarouselNext } from "../ui/carousel";
import { StimulusSelector } from "../qq/StimulusSelector";
import { AnimeTutor, Chat } from "@/components/AnimeTutor";
import { HdrBar } from "../qq/HdrBar";
import { useProblemStore } from "@/store/_store";
import TotalEditor from "../schemaEditors/total/TotalEditor";
import EqualGroupsEditor from "../schemaEditors/equalGroups/EqualGroupsEditor";
import DifferenceEditor from "../schemaEditors/difference/DifferenceEditor";
import ChangeDecreaseEditor from "../schemaEditors/changeDecrease/ChangeDecreaseEditor";
import ChangeIncreaseEditor from "../schemaEditors/changeIncrease/ChangeIncreaseEditor";
import CompareEditor from "../schemaEditors/compare/CompareEditor";

const RangerFillDiagram: FC<{
  className?: string;
  children?: ReactNode;
  page?: YBRpage;
  index: number;
}> = ({ className, page, index }) => {
  // Nav Context
  const { api, current } = useContext(NavContext) as NavContextType;

  // Store
  const { logAction, submitOrganize, getHint, problem, session } =
    useProblemStore();

  // State
  const [msg, setMsg] = useState<string>("");
  const [equation, setEquation] = useState<string>("");

  // Event Handlers
  async function handleCheckEquation(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    console.log("handleCheckEquation");
    if (evt.metaKey) {
      api?.scrollNext();
    } else {
      setMsg("Just a moment while I verify your equation");
      logAction("RangerFillDiagram : Clicked Next");

      logAction("RangerFillDiagram : Checking Schema : " + equation);
      const result = await submitOrganize(equation);
      logAction(
        "RangerFillDiagram : Checked Equation : " + JSON.stringify(result),
      );
      setMsg(result.message);
      if (result.stepStatus == "VALID") {
        api?.scrollNext();
      }
    }
  }

  async function HandleGetHint() {
    setMsg("Hmmm...  Let me see");
    logAction("RangerFillDiagram : GetHint");
    const hint = await getHint();
    setMsg(hint);
  }

  function HandleEquationChange(latex: string) {
    setEquation(latex);
  }

  //
  // JSX
  //
  if (current !== index + 1) return null;

  return (
    <div
      className={cn(
        "RangerFillDiagram rounded-lg border bg-card text-card-foreground shadow-sm w-full h-full m-0 p-0 flex flex-col justify-stretch",
        className,
      )}
    >
      <HdrBar
        highlightLetter={page?.phase}
        subTitle={page?.phaseLabel}
        instructions={page?.title}
      ></HdrBar>
      <div className="flex flex-col p-2 gap-2 justify-stretch grow m-2 overflow-y-auto">
        <StimulusSelector
          className={cn(
            "flex w-full rounded-md border border-input bg-slate-200 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
            "inline",
          )}
          stimulusText={problem.stimulus}
        ></StimulusSelector>

        <div className="grow">
          {session.schema === "additiveTotalSchema" ? (
            <TotalEditor
              onChange={HandleEquationChange}
              className={className}
            ></TotalEditor>
          ) : null}
          {session.schema === "multiplicativeEqualGroupsSchema" ? (
            <EqualGroupsEditor
              onChange={HandleEquationChange}
              className={className}
            ></EqualGroupsEditor>
          ) : null}
          {session.schema === "additiveDifferenceSchema" ? (
            <DifferenceEditor
              onChange={HandleEquationChange}
              className={className}
            ></DifferenceEditor>
          ) : null}
          {session.schema === "subtractiveChangeSchema" ? (
            <ChangeDecreaseEditor
              onChange={HandleEquationChange}
              className={className}
            ></ChangeDecreaseEditor>
          ) : null}
          {session.schema === "additiveChangeSchema" ? (
            <ChangeIncreaseEditor
              onChange={HandleEquationChange}
              className={className}
            ></ChangeIncreaseEditor>
          ) : null}
          {session.schema === "multiplicativeCompareSchema" ? (
            <CompareEditor
              onChange={HandleEquationChange}
              className={className}
            ></CompareEditor>
          ) : null}
        </div>
      </div>

      <NavBar className="flex justify-end pr-2 space-x-3 bg-slate-300 relative">
        {/* Tiny Avatar */}
        <AnimeTutor
          emote={"wave:01"}
          style={{
            bottom: "0px",
            right: "0px",
            height: "100%",
          }}
        />
        <div
          className="h-full bottom-0 right-0 w-[100px] border-solid border-red-500 z-10 cursor-pointer"
          onClick={() => {
            HandleGetHint();
          }}
        ></div>
        <Chat
          msg={msg}
          className="font-irishGrover absolute right-[200px] bottom-[30%] h-fit w-fit min-h-[64px]"
        />
        <CarouselPrevious className="relative left-0">
          Previous
        </CarouselPrevious>
        <CarouselNext
          className="relative right-0"
          onClick={(evt) => {
            handleCheckEquation(evt);
          }}
        >
          Next
        </CarouselNext>
        <h1 className="absolute bottom-0 left-0 text-slate-500">
          RangerFillDiagram
        </h1>
      </NavBar>
    </div>
  );
};

RangerFillDiagram.displayName = "RangerFillDiagram";
export default RangerFillDiagram;
