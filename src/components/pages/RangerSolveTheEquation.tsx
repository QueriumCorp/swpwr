"use client";

// React Imports
import {
  FC,
  ReactNode,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

// Querium Imports
import { cn } from "@/lib/utils";
import { StepWise } from "@/components/StepWise";
import { YellowBrickRoad, type YBRpage } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";
import { NavBar } from "../qq/NavBar";
import { CarouselNext } from "../ui/carousel";
import { HdrBar } from "../qq/HdrBar";
import { useProblemStore } from "@/store/_store";
import { Button } from "../ui/button";
import { StepWiseAPI } from "../StepWise/StepWise/StepWise";
import { TinyTutor } from "../qq/TinyTutor";
import { Log, Step } from "../StepWise/stores/solution";

import { TotalEquationGraphic } from "../schemaEditors/total/TotalEquationGraphic";
import { EqualGroupsEquationGraphic } from "../schemaEditors/equalGroups/EqualGroupsEquationGraphic";
import { DifferenceEquationGraphic } from "../schemaEditors/difference/DifferenceEquationGraphic";
import { ChangeDecreaseEquationGraphic } from "../schemaEditors/changeDecrease/ChangeDecreaseEquationGraphic";
import { ChangeIncreaseEquationGraphic } from "../schemaEditors/changeIncrease/ChangeIncreaseEquationGraphic";
import { CompareEquationGraphic } from "../schemaEditors/compare/CompareEquationGraphic";

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
const RangerSolveTheEquation: FC<{
  className?: string;
  children?: ReactNode;
  page: YBRpage;
  index: number;
}> = ({ className, index, page }) => {
  ///////////////////////////////////////////////////////////////////
  // Contexts
  ///////////////////////////////////////////////////////////////////

  const { api, current } = useContext(NavContext) as NavContextType;

  ///////////////////////////////////////////////////////////////////
  // Refs
  ///////////////////////////////////////////////////////////////////

  const stepwiseRef = useRef<StepWiseAPI>(null);

  ///////////////////////////////////////////////////////////////////
  // Store
  ///////////////////////////////////////////////////////////////////

  const { problem, student, session, ybr, rank, swapiUrl } = useProblemStore();

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  const [working, setWorking] = useState(false);
  const [msg, setMsg] = useState("");
  const [complete, setComplete] = useState(false);
  const [busy, setBusy] = useState(false);
  const wpHints = problem.wpHints?.find(
    (wpHint) => wpHint.page === `${rank}:${page.id}`,
  );
  const [aiHints, setAiHints] = useState<string[]>([]);

  const pageSpecificHints = page?.psHints || [];

  console.log(
    "///////////////////////////////////////////////////////////////////",
  );
  if (index === current) {
    console.info("🥰🥰🥰🥰🥰🥰🥰🥰🥰🥰🥰🥰");
  }
  /* 
  page
    aiHints: true
    id: "SolveTheEquation"
    phase: "W"
    phaseLabel: "Work the Problem"
    rank: "ranger"
    title: "Solve the Equation"

  index: 4
*/

  console.log(
    "///////////////////////////////////////////////////////////////////",
  );

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

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  function startStepWise() {
    if (stepwiseRef.current) {
      setWorking(true);
      // @ts-ignore: TS seems to think the ✓ above doesnt exist
      stepwiseRef.current.resume(session);
    }
  }

  async function HandleNext(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    if (evt.metaKey || complete) {
      //If Cmd+Enter just scroll to next page
      api?.scrollNext();
    } else {
      setMsg("You must complete the math before proceeding.");
    }
  }

  function onComplete(steps: Step[], log: Log[]) {
    console.table(steps);
    console.table(log);
    setComplete(true);
  }

  ///////////////////////////////////////////////////////////////////
  // JSX
  ///////////////////////////////////////////////////////////////////

  if (current !== index + 1) return null;

  return (
    <div
      className={cn(
        "RangerSolveTheEquation",
        "rounded-lg bg-card text-card-foreground shadow-sm",
        "w-full h-full m-0 mb-2 pl-2 pt-2 pr-2 flex flex-col justify-stretch",
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
                assistant={setMsg}
                onComplete={onComplete}
              >
                <div className="mt-2">
                  {session.schema === "additiveTotalSchema" ? (
                    <TotalEquationGraphic
                      className="text-qqBrand text-2xl"
                      p1={session.schemaValues[0]}
                      p2={session.schemaValues[1]}
                      t={session.schemaValues[2]}
                    ></TotalEquationGraphic>
                  ) : null}
                  {session.schema === "multiplicativeEqualGroupsSchema" ? (
                    <EqualGroupsEquationGraphic
                      className="text-qqBrand text-2xl"
                      g={session.schemaValues[0]}
                      n={session.schemaValues[1]}
                      p={session.schemaValues[2]}
                    ></EqualGroupsEquationGraphic>
                  ) : null}
                  {session.schema === "additiveDifferenceSchema" ? (
                    <DifferenceEquationGraphic
                      className="text-qqBrand text-2xl"
                      l={session.schemaValues[0]}
                      d={session.schemaValues[1]}
                      g={session.schemaValues[2]}
                    ></DifferenceEquationGraphic>
                  ) : null}
                  {session.schema === "subtractiveChangeSchema" ? (
                    <ChangeDecreaseEquationGraphic
                      className="text-qqBrand text-2xl"
                      e={session.schemaValues[0]}
                      c={session.schemaValues[1]}
                      s={session.schemaValues[2]}
                    ></ChangeDecreaseEquationGraphic>
                  ) : null}
                  {session.schema === "additiveChangeSchema" ? (
                    <ChangeIncreaseEquationGraphic
                      className="text-qqBrand text-2xl"
                      e={session.schemaValues[0]}
                      c={session.schemaValues[1]}
                      s={session.schemaValues[2]}
                    ></ChangeIncreaseEquationGraphic>
                  ) : null}
                  {session.schema === "multiplicativeCompareSchema" ? (
                    <CompareEquationGraphic className="text-qqBrand text-2xl"></CompareEquationGraphic>
                  ) : null}
                </div>
              </StepWise>
            </div>
            <Button
              className={cn("w-full", working ? "hidden" : "bg-orange-500")}
              onClick={() => {
                startStepWise();
              }}
            >
              Let's Do This!
            </Button>
          </div>
        </div>
      </div>
      <NavBar className="flex justify-end pr-2 space-x-3 bg-slate-300">
        <TinyTutor
          msg={msg}
          intro={page?.intro}
          psHints={pageSpecificHints}
          wpHints={wpHints?.hints}
        />

        <CarouselNext
          className="relative right-0"
          onClick={(evt) => HandleNext(evt)}
        >
          Next
        </CarouselNext>
        <h1 className="absolute bottom-0 left-0 text-slate-500">
          RangerSolveTheEquation
        </h1>
      </NavBar>
    </div>
  );
};
RangerSolveTheEquation.displayName = "RangerSolveTheEquation";
export default RangerSolveTheEquation;
