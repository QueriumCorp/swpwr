"use client";

import { FC, ReactNode, useContext, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { StepWise } from "@/components/StepWise";
import { YellowBrickRoad, type YBRpage } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";
import { NavBar } from "../qq/NavBar";
import { CarouselPrevious, CarouselNext } from "../ui/carousel";
import { HdrBar } from "../qq/HdrBar";
import { useProblemStore } from "@/store/_store";
import { Button } from "../ui/button";
import { StepWiseAPI } from "../StepWise/StepWise/StepWise";
import { TinyTutor } from "../qq/TinyTutor";

const DevSolveTheEquation: FC<{
  className?: string;
  children?: ReactNode;
  page?: YBRpage;
  index: number;
}> = ({ className, index, page }) => {
  console.log("DevSolveTheEquation", page);

  // Dont render if page not active
  const { current } = useContext(NavContext) as NavContextType;
  const stepwiseRef = useRef<StepWiseAPI>(null);

  // Store
  const { problem, student, session, swapiUrl } = useProblemStore();

  // State
  const [working, setWorking] = useState(false);

  const pageSpecificHints = page?.psHints || [];

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
            highlightLetter={page?.phase}
            subTitle={page?.phaseLabel}
            instructions={page?.title}
          ></HdrBar>
          <div className="grow flex flex-col justify-center items-center">
            <div
              className={cn(
                "h-full w-full",
                working ? "inline-block" : "hidden",
              )}
            >
              <StepWise
                ready
                ref={stepwiseRef}
                className={"h-full w-full"}
                server={{ serverURL: swapiUrl }}
                problem={swProblem}
                student={student}
              />
            </div>
            <Button
              className={cn("w-full", working ? "hidden" : "bg-orange-500")}
              onClick={() => {
                if (stepwiseRef.current) {
                  console.info("Starting StepWise", session);
                  setWorking(true);
                  // @ts-ignore: TS seems to think the ✓ above doesnt exist
                  stepwiseRef.current.resume(session);
                }
              }}
            >
              Let's Do This!
            </Button>
            <pre>{JSON.stringify(pageSpecificHints, null, 2)}</pre>
            <pre>{JSON.stringify(page?.intro, null, 2)}</pre>
          </div>
        </div>
      </div>
      <NavBar className="flex justify-end pr-2 space-x-3 bg-slate-300">
        <TinyTutor intro={page?.intro} psHints={pageSpecificHints} />
        <CarouselPrevious className="relative left-0">
          Previous
        </CarouselPrevious>
        <CarouselNext className="relative right-0">Next</CarouselNext>
        <h1 className="absolute bottom-0 left-0 text-slate-500">
          DevSolveTheEquation
        </h1>
      </NavBar>
    </div>
  );
};
DevSolveTheEquation.displayName = "DevSolveTheEquation";
export default DevSolveTheEquation;