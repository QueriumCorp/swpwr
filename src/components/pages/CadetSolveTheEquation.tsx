"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { StepWise } from "@queriumcorp/swreact";
import { YellowBrickRoad, type YBRpage } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";
import { AnimeTutor } from "@queriumcorp/animetutor";
import { NavBar } from "../qq/NavBar";
import { CarouselPrevious, CarouselNext } from "../ui/carousel";

const CadetSolveTheEquation: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page?: YBRpage;
  index: number;
}> = ({ className, index }) => {
  // Dont render if page not active
  const { current } = React.useContext(NavContext) as NavContextType;
  if (current !== index + 1) return null;

  // JSX
  return (
    <div
      className={cn(
        "CadetSolveTheEquation",
        "rounded-lg  bg-card text-card-foreground shadow-sm w-full h-full m-0 mb-2 pl-2 pt-2 pr-2 flex flex-col justify-stretch",
        className,
      )}
    >
      <div className="div flex flex-col p-2 gap-2 justify-stretch grow relative  mb-2">
        <div className="absolute top-0 left-0 bottom-0 right-0  overflow-y-scroll">
          <h1>CadetSolveTheEquation</h1>
          <div>
            <StepWise
              // h-full and w-full will cause the component to fill its parent
              set
              className="h-full w-full"
              problem={{
                appKey: "StepWiseAPI",
                problemId: "QUES18374",
                title: "An amazing question title",
                stimulus:
                  "Four score and seven years ago our fathers brought forth, upon this continent, a new nation, conceived in liberty, and dedicated to the proposition that all men are created equal.",
                latex: "x = \\frac {-b \\pm \\sqrt{b^2 -4ac}} {2a}",
                topic: "gradeBasicAlgebra",
                definition: "SolveFor[5*z/9=-25, z]",
                hints: [],
              }}
              student={{
                studentId: "8675309",
                fullName: "Joe Sixpack",
                familiarName: "Joe",
              }}
            />
          </div>
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
CadetSolveTheEquation.displayName = "CadetSolveTheEquation";
export default CadetSolveTheEquation;
