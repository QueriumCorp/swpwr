"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { YellowBrickRoad, type YBRpage } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";
import {
  useAvatarAPI,
  AvatarAPIType,
  AnimeTutor,
} from "@/components/AnimeTutor";
import { NavBar } from "../qq/NavBar";
import { CarouselPrevious, CarouselNext } from "../ui/carousel";
import { StimulusSelector } from "../qq/StimulusSelector";
import { Textarea } from "../ui/textarea";
import { useProblemStore } from "@/store/_store";
import { HdrBar } from "../qq/HdrBar";

const CadetSolvedFor: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page?: YBRpage;
  index: number;
}> = ({ className, index }) => {
  const { current } = React.useContext(NavContext) as NavContextType;

  // Store
  const { problem, session } = useProblemStore();

  const { sayMsg } = useAvatarAPI() as AvatarAPIType;

  React.useEffect(() => {
    sayMsg("You've prepared and organized...'!", "idle:02");
  }, []);

  // JSX
  if (current !== index + 1) return null; // Dont render if page not active
  return (
    <div
      className={cn(
        "CadetSolvedFor",
        "rounded-lg  bg-card text-card-foreground shadow-sm w-full h-full m-0 mb-2 pl-2 pt-2 pr-2 flex flex-col justify-stretch ",
        className,
      )}
    >
      <div className="div flex flex-col p-2 gap-2 justify-stretch grow relative  mb-2">
        <div className="absolute top-0 left-0 bottom-0 right-0  overflow-y-scroll">
          <HdrBar
            highlightLetter="E"
            subTitle="Explain Your Answer"
            instructions="Answer the question in your own words"
          ></HdrBar>
          <StimulusSelector
            className={cn(
              "flex w-full rounded-md border border-input px-3 py-2 mb-2 text-sm bg-slate-300",
              className,
            )}
            stimulusText={problem.stimulus}
          ></StimulusSelector>
          <h1>The value you found was {session.finalAnswer}</h1>
          <Textarea placeholder="your answer" />
        </div>
      </div>

      <NavBar className="flex justify-end pr-2 space-x-3 bg-slate-300">
        {/* Tiny Avatar */}
        {YellowBrickRoad[current].phase !== "I" ? (
          <AnimeTutor
            style={{
              bottom: "0px",
              right: "0px",
              height: "100%",
            }}
          />
        ) : null}
        <CarouselPrevious className="relative left-0">
          Previous
        </CarouselPrevious>
        <CarouselNext className="relative right-0">Next</CarouselNext>
      </NavBar>
    </div>
  );
};
CadetSolvedFor.displayName = "CadetSolvedFor";
export default CadetSolvedFor;
