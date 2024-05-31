"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { YBRpage, YellowBrickRoad } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";
import { AnimeTutor, Chat } from "@queriumcorp/animetutor";
import { NavBar } from "../qq/NavBar";
import { CarouselPrevious, CarouselNext } from "../ui/carousel";
import DiagramChange from "../qq/DiagramChange/DiagramChange";
import DiagramCombine from "../qq/DiagramCombine/DiagramCombine";
import DiagramEqualGroups from "../qq/DiagramEqualGroups/DiagramEqualGroups";
import DiagramMultiplyTimes from "../qq/DiagramMultiplyTimes/DiagramMultiplyTimes";
import { StimulusSelector } from "../qq/StimulusSelector";
import { HdrBar } from "../qq/HdrBar";

const CadetFillEquation: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page: YBRpage;
  index: number;
}> = ({ className, children, page, index }) => {
  // Dont render if page not active
  const { current } = React.useContext(NavContext) as NavContextType;

  const fakeDiagramType = "DiagramCombine";

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
            highlightLetter="O"
            subTitle="Organize"
            instructions="Fill in the Equation"
          ></HdrBar>
          <StimulusSelector
            className={cn(
              "flex min-h-[80px] w-full rounded-md border border-input px-3 py-2 mb-2 text-sm bg-slate-300",
              className,
            )}
            stimulusText="Four friends went out to lunch and the bill was $53.75.  They decided to add enough tip to make the total of $64, so that they could easily split the bill evenly among themselves.  How much did they leave for a tip?"
          ></StimulusSelector>{" "}
          <h2 className="mt-3 ml-1 mr-1">
            Drag the items to fill in the relevant fields in the equation
          </h2>
          <div className="grow grid grid-cols-2 gap-2">
            {fakeDiagramType === "DiagramCombine" ? <DiagramCombine /> : null}
            {fakeDiagramType === "DiagramChange" ? <DiagramChange /> : null}
            {fakeDiagramType === "DiagramMultiplyTimes" ? (
              <DiagramMultiplyTimes />
            ) : null}
            {fakeDiagramType === "DiagramEqualGroups" ? (
              <DiagramEqualGroups />
            ) : null}
          </div>
          <div className="flex">
            <div className="border-2">P1</div>
            <div>+</div>
            <div className="border-2">P2</div>
            <div>=</div>
            <div className="border-2">T</div>
          </div>
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
        <Chat className="font-irishGrover absolute right-[200px] bottom-[50%] h-fit w-fit min-h-[64px]" />
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
