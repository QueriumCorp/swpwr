"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { YBRpage } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";
import { AnimeTutor, Chat } from "@/components/AnimeTutor";
import { NavBar } from "../qq/NavBar";
import { CarouselPrevious, CarouselNext } from "../ui/carousel";
import { StimulusSelector } from "../qq/StimulusSelector";
import { HdrBar } from "../qq/HdrBar";
import { useProblemStore } from "@/store/_store";

const CadetFillEquation: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page?: YBRpage;
  index: number;
}> = ({ className, page, index }) => {
  // Dont render if page not active
  const { current } = React.useContext(NavContext) as NavContextType;

  // Store
  const { problem } = useProblemStore();

  let fakeDiagramType = "DiagramCombine";

  // JSX
  if (current !== index + 1) return null;
  return (
    <div
      className={cn(
        "CadetFillDiagram",
        "rounded-lg  bg-card text-card-foreground shadow-sm w-full h-full m-0 mb-2 pl-2 pt-2 pr-2 flex flex-col justify-stretch ",
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
          <StimulusSelector
            className={cn(
              "flex w-full rounded-md border border-input px-3 py-2 mb-2 text-sm bg-slate-300",
              className,
            )}
            stimulusText={problem.stimulus || ""}
          ></StimulusSelector>
          <h2 className="mt-3 ml-1 mr-1">
            Drag the items to fill in the relevant fields in the equation
          </h2>
        </div>
      </div>

      <NavBar className="flex justify-end pr-2 space-x-3 bg-slate-300">
        <h3 className="absolute bottom-0 text-slate-400">CadetFillDiagram</h3>
        {/* Tiny Avatar */}
        <AnimeTutor
          style={{
            bottom: "0px",
            right: "0px",
            height: "100%",
          }}
        />
        <Chat
          msg="RATATATA"
          className="font-irishGrover absolute right-[200px] bottom-[50%] h-fit w-fit min-h-[64px]"
        />
        <CarouselPrevious className="relative left-0">
          Previous
        </CarouselPrevious>
        <CarouselNext className="relative right-0">Next</CarouselNext>
      </NavBar>
    </div>
  );
};
CadetFillEquation.displayName = "CadetFillEquation";
export default CadetFillEquation;
