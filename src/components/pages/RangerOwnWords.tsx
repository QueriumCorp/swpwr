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
import { Textarea } from "../ui/textarea";

const RangerOwnWords: FC<{
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
  const [ownWords, setOwnWords] = useState<string>("");

  // Event Handlers
  async function handleCheckOwnWords(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    console.log("handleCheckOwnWords");
    if (evt.metaKey) {
      api?.scrollNext();
    } else if (ownWords.length < 10) {
      setMsg("Please explain your answer in your own words");
    } else {
      logAction("RangerOwnWords : Checking Own Words : " + ownWords);
      // const result = await submitOwnWords(ownWords);
      logAction("RangerOwnWords : Checked OwnWords : ");

      api?.scrollNext();
    }
  }

  async function HandleGetHint() {
    setMsg("Hmmm...  Let me see");
    logAction("RangerOwnWords : GetHint");
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
        "RangerOwnWords rounded-lg border bg-card text-card-foreground shadow-sm w-full h-full m-0 p-0 flex flex-col justify-stretch",
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
            "flex w-full rounded-md border border-input bg-slate-200 px-3 py-2 text-sm",
            "ring-offset-background ",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
            "inline",
          )}
          stimulusText={problem.stimulus}
        ></StimulusSelector>

        <div className="grow">
          <Textarea
            value={ownWords}
            onChange={(e) => setOwnWords(e.target.value)}
            placeholder="Type your explanation here"
          />
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
            handleCheckOwnWords(evt);
          }}
        >
          Next
        </CarouselNext>
        <h1 className="absolute bottom-0 left-0 text-slate-500">
          RangerOwnWords
        </h1>
      </NavBar>
    </div>
  );
};

RangerOwnWords.displayName = "RangerOwnWords";
export default RangerOwnWords;
