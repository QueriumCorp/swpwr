"use client";

import { FC, ReactNode, useContext, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { type YBRpage } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";
import { useProblemStore } from "@/store/_store";
import { HdrBar } from "../qq/HdrBar";
import { NavBar } from "../qq/NavBar";
import { StimulusSelector } from "../qq/StimulusSelector";
import { TinyTutor } from "../qq/TinyTutor";
import { CarouselPrevious, CarouselNext } from "../ui/carousel";
import { Card } from "../ui/card";

interface Explanation {
  type: string;
  text: string;
}

//
//
//
const RangerReflect: FC<{
  className?: string;
  children?: ReactNode;
  page?: YBRpage;
  index: number;
}> = ({ className, page, index }) => {
  //
  // Context
  //
  const { api, current } = useContext(NavContext) as NavContextType;

  //
  // Store
  //
  const {
    problem,
    studentLog,
    logAction,
    session,
    submitExplanation,
    onComplete,
  } = useProblemStore();

  //
  // State
  //
  const [explanations, setExplanations] = useState<Explanation[]>(
    session.explanations,
  );
  const [explanation, setExplanation] = useState<Explanation | null>(null);
  const [msg, setMsg] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);

  //
  // Side Effects
  //
  useEffect(() => {
    setExplanations(session.explanations);
  }, [session.explanations]);

  //
  // Event Handlers
  //
  async function HandleCheckExplanation(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    if (disabled) {
      onComplete(session, studentLog);
      return;
    }
    if (evt.metaKey) {
      //If Cmd+Enter just scroll to next page
      api?.scrollNext();
    } else {
      logAction("RangerReflect : Clicked Next");
      logAction("RangerReflect : Checking Explanation");
      switch (explanation?.type) {
        case "schema":
          setMsg(schemaMsgs[Math.floor(Math.random() * schemaMsgs.length)]);
          break;
        case "estimation":
          setMsg(
            estimationMsgs[Math.floor(Math.random() * estimationMsgs.length)],
          );
          break;
        case "bad":
          setMsg(badMsgs[Math.floor(Math.random() * badMsgs.length)]);
          break;
      }
      submitExplanation(explanation?.type || "");
      setDisabled(true);
      onComplete(session, studentLog);
      // const result = await submitTTable(knowns, unknowns);
      // setMsg(result.message);
      // if (result.stepStatus == "VALID") {
      //   api?.scrollNext();
      // }
    }
  }

  //
  // JSX
  //
  if (current !== index + 1) return null;
  return (
    <div
      className={cn(
        "NewbFindFacts rounded-lg border bg-card text-card-foreground shadow-sm w-full h-full m-0 p-0 flex flex-col justify-stretch",
        className,
      )}
    >
      <HdrBar
        highlightLetter={page?.phase}
        subTitle={page?.phaseLabel}
        instructions={page?.title}
      ></HdrBar>

      <div className="flex flex-col p-2 gap-2 justify-stretch items-center grow relative">
        <StimulusSelector
          className={cn(
            "flex w-full rounded-md border border-input bg-slate-200 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
            "inline",
          )}
          stimulusText={problem.stimulus}
        ></StimulusSelector>
        <div className="flex flex-col p-2 gap-2 justify-center items-center grow relative">
          {explanations.map((exp) => (
            <Card
              key={exp.type}
              onClick={() => {
                if (!disabled) setExplanation(exp);
              }}
              className={cn(
                "w-96 min-h-28 px-4 py-2 ring-qqBrand",
                exp.type === explanation?.type ? "ring-4" : "ring-0",
                disabled
                  ? "bg-slate-300 cursor-not-allowed"
                  : "hover:bg-qqAccent hover:text-white cursor-pointer",
              )}
            >
              {exp.text}
            </Card>
          ))}
        </div>
      </div>

      <NavBar className="flex justify-end pr-2 space-x-3 bg-slate-300 relative">
        <TinyTutor
          msg={msg}
          intro={page?.intro}
          psHints={page?.psHints || []}
          aiHints={false}
        />
        <CarouselPrevious className="relative left-0">
          Previous
        </CarouselPrevious>
        <CarouselNext
          className="relative right-0"
          onClick={(evt) => HandleCheckExplanation(evt)}
        >
          Next
        </CarouselNext>
        <h1 className="absolute bottom-0 left-0 text-slate-500">
          RangerReflect
        </h1>
      </NavBar>
    </div>
  );
};
RangerReflect.displayName = "RangerReflect";
export default RangerReflect;

function getFeedback(type: string) {
  const index = Math.floor(Math.random() * 3);
  switch (type) {
    case "estimation":
      return estimationMsgs[index];
    case "schema":
      return schemaMsgs[index];
    case "bad":
      return badMsgs[index];
    default:
      return `ERROR: Invalid type: ${type}`;
  }
}

const estimationMsgs = [
  "Right on! I also think that's the best reason.",
  "Oooh, yay! I totally agree with you, cutie pie! Your reason is as clever as my tail is fluffy! It's definitely the most paw-some explanation we've seen so far!",
  "Aww, absolutely sweetie! I think your reasoning is just as sharp as my little fox teeth! You're absolutely right on track - that's the best reason yet!",
];
const schemaMsgs = [
  "Ok! That's not the reason I like best, but it's a good one.",
  "Hmm, okay! While it's not my top pick, I do think that's a pretty cool reason! You're getting close to finding the perfect answer!",
  "Alrighty then! That's a great try, but there is an even better reason.",
];

const badMsgs = [
  "No, that reason doesn't use good math thinking to tell why the answer makes sense. Try again.",
  "Oh my whiskers! I think we can do better than that! Let's try again and use our super sharp fox brains to figure out why the answer makes sense, okay?",
  "Hmmm, sweetie, I think we need to dig deeper into the mathy goodness to make sure it really adds up! Can you try again and use your super clever fox mind to find a reason that's as smooth as my fur? Let's get those numbers working together like a pack of happy foxes!",
];
