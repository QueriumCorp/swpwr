"use client";

import { useContext, useEffect } from "react";

import { cn } from "@/lib/utils";
import { type YBRpage } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";
import { NavBar } from "../qq/NavBar";
import { CarouselPrevious, CarouselNext } from "../ui/carousel";
import { StimulusSelector } from "../qq/StimulusSelector";
import { AnimeTutor, Chat } from "@/components/AnimeTutor";
import { HdrBar } from "../qq/HdrBar";
import { useProblemStore } from "@/store/_store";

const NewbReadProblem: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page: YBRpage;
  index: number;
}> = ({ className, index }) => {
  // NavContext
  const { api, current } = useContext(NavContext) as NavContextType;

  // Store
  const { logAction, problem } = useProblemStore();

  // JSX
  if (current !== index + 1) return null;
  return (
    <div
      className={cn(
        "NewbReadProblem rounded-lg border bg-card text-card-foreground shadow-sm w-full h-full m-0 p-0 flex flex-col justify-stretch",
        className,
      )}
    >
      <HdrBar
        highlightLetter="P"
        subTitle="Prepare"
        instructions="Read the Statement"
      ></HdrBar>
      <div className="flex flex-col p-2 gap-2 justify-stretch grow relative">
        <StimulusSelector
          className={cn(
            "flex w-full rounded-md border border-input bg-slate-200 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
            "inline",
          )}
          stimulusText={problem.stimulus}
        ></StimulusSelector>

        <div className="flex grow gap-2"></div>
      </div>
      <NavBar className="flex justify-end pr-2 space-x-3 bg-slate-300 relative">
        {/* Tiny Avatar */}
        <AnimeTutor
          style={{
            bottom: "0px",
            right: "0px",
            height: "100%",
          }}
        />
        <Chat
          msg="Read this statement carefully and then click the right arrow to continue."
          className="font-irishGrover absolute right-[200px] bottom-[50%] h-fit w-fit min-h-[64px]"
        />
        <CarouselPrevious className="relative left-0">
          Previous
        </CarouselPrevious>
        <CarouselNext
          className="relative right-0"
          onClick={() => {
            logAction("NewbReadProblem : Clicked Next");
            api?.scrollNext();
          }}
        >
          Next
        </CarouselNext>
      </NavBar>
    </div>
  );
};
NewbReadProblem.displayName = "NewbReadProblem";
export default NewbReadProblem;
