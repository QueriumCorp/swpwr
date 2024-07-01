"use client";

import { FC, ReactNode, useContext, useRef } from "react";

import { cn } from "@/lib/utils";
import { StepWise } from "@/components/StepWise";
import { YellowBrickRoad, type YBRpage } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";
import { AnimeTutor } from "@/components/AnimeTutor";
import { NavBar } from "../qq/NavBar";
import { CarouselPrevious, CarouselNext } from "../ui/carousel";
import { HdrBar } from "../qq/HdrBar";
import { useProblemStore } from "@/store/_store";
import { Button } from "../ui/button";
import { StepWiseAPI } from "../StepWise/StepWise/StepWise";

const DevSolveTheEquation: FC<{
  className?: string;
  children?: ReactNode;
  page?: YBRpage;
  index: number;
}> = ({ className, index }) => {
  // Dont render if page not active
  const { current } = useContext(NavContext) as NavContextType;
  const stepwiseRef = useRef<StepWiseAPI>(null);

  // Store
  const { problem, student, session, swapiUrl } = useProblemStore();

  // Prepare problem data to work with StepWise
  type swProblemType = {
    appKey: string;
    problemId: string;
    title?: string;
    stimulus?: string;
    topic: string;
    definition: string;
    policyId?: string;
    hints: string[];
  };
  let swProblem: swProblemType = {
    appKey: problem.appKey,
    problemId: problem.problemId ? problem.problemId : "",
    title: problem.title,
    stimulus: problem.stimulus,
    topic: problem.class,
    definition: problem.question,
    policyId: problem.policies,
    hints: [],
  };
  if (problem.qs1) {
    swProblem.hints.push(problem.qs1);
  }
  if (problem.qs2) {
    swProblem.hints.push(problem.qs2);
  }
  if (problem.qs3) {
    swProblem.hints.push(problem.qs3);
  }

  if (current !== index + 1)
    // JSX
    return null;
  return (
    <div
      className={cn(
        "DevSolveTheEquation",
        "rounded-lg  bg-card text-card-foreground shadow-sm w-full h-full m-0 mb-2 pl-2 pt-2 pr-2 flex flex-col justify-stretch",
        className,
      )}
    >
      <div className="div flex flex-col p-2 gap-2 justify-stretch grow relative  mb-2">
        <div className="absolute top-0 left-0 bottom-0 right-0 flex flex-col overflow-y-scroll">
          <HdrBar
            highlightLetter="W"
            subTitle="Work"
            instructions="Test StepWise"
          ></HdrBar>
          <div className="grow">
            <StepWise
              ready
              ref={stepwiseRef}
              className="h-full w-full"
              /*
              appKey: "JiraTestPage"
              class: "gradeBasicAlgebra"
              hints: []
              policyId: "$A1$"
              problemId: "QUES6018"
              question: "SolveWordProblemAns[{\"Minh spent $6.25 on 5 sticker books to give his nephews. Find the cost of each sticker book.\"}]"
              stimulus: "Minh spent $6.25 on 5 sticker books to give his nephews. Find the cost of each sticker book."
              title: "Solve compound linear inequalities in 1 variable"
              */
              server={{ serverURL: swapiUrl }}
              problem={swProblem}
              student={student}
            />
            <Button
              onClick={() => {
                if (stepwiseRef.current) {
                  console.info("Starting StepWise");
                  stepwiseRef.current.start();
                }
              }}
            >
              Start
            </Button>
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
DevSolveTheEquation.displayName = "DevSolveTheEquation";
export default DevSolveTheEquation;
