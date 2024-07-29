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
import { SchemaType } from "@/store/_types";
import EqualGroupsEditor from "../schemaEditors/equalGroups/EqualGroupsEditor";

const RangerFillDiagram: FC<{
  className?: string;
  children?: ReactNode;
  page?: YBRpage;
  index: number;
}> = ({ className, page, index }) => {
  // Nav Context
  const { api, current } = useContext(NavContext) as NavContextType;

  // Store
  const {
    logAction,
    submitPickSchema,
    getHint,
    problem,
    session,
    disabledSchemas,
  } = useProblemStore();

  // State
  const [schema, setSchema] = useState("");
  const [msg, setMsg] = useState<string>("");

  // Event Handlers
  async function handleSelectSchema(schema: string) {
    logAction("RangerFillDiagram : Selected Schema : " + schema);
    setSchema(schema);
  }

  async function handleCheckSchema(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    console.log("handleCheckSchema");
    if (evt.metaKey) {
      api?.scrollNext();
    } else {
      setMsg("Just a moment while I verify your choice");
      logAction("RangerFillDiagram : Clicked Next");

      let selectedSchema: SchemaType = "additiveChangeSchema";
      switch (schema) {
        case "TOTAL":
          selectedSchema = "additiveTotalSchema";
          break;
        case "DIFFERENCE":
          selectedSchema = "additiveDifferenceSchema";
          break;
        case "CHANGEINCREASE":
          selectedSchema = "additiveChangeSchema";
          break;
        case "CHANGEDECREASE":
          selectedSchema = "additiveChangeSchema";
          break;
        case "EQUALGROUPS":
          selectedSchema = "multiplicativeEqualGroupsSchema";
          break;
        case "COMPARE":
          selectedSchema = "multiplicativeCompareSchema";
          break;
      }

      logAction("RangerFillDiagram : Checking Schema : " + selectedSchema);
      const result = await submitPickSchema(selectedSchema);
      logAction(
        "RangerFillDiagram : Checked Schema : " + JSON.stringify(result),
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

  //
  // JSX
  //
  if (current !== index + 1) return null;

  return (
    <div
      className={cn(
        "RangerFillDiagram rounded-lg  bg-card text-card-foreground shadow-sm w-full h-full m-0 mb-2 pl-2 pt-2 pr-2 flex flex-col justify-stretch ",
        className,
      )}
    >
      <div className="div flex flex-col p-2 gap-2 justify-stretch grow relative  mb-2">
        <div className="absolute top-0 left-0 bottom-0 right-0  overflow-y-scroll">
          <HdrBar
            highlightLetter={page?.phase}
            subTitle={page?.phaseLabel}
            instructions={page?.title}
          ></HdrBar>
          <div>
            <h1>Stimulus</h1>
          </div>
          <StimulusSelector
            className={cn(
              "flex w-full rounded-md border border-input px-3 py-2 mb-2 text-sm bg-slate-300",
              className,
            )}
            stimulusText={problem.stimulus}
          ></StimulusSelector>
          <EqualGroupsEditor />
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
            handleCheckSchema(evt);
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
