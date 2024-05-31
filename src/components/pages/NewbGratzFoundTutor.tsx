"use client";

import { useContext, useEffect } from "react";

import { cn } from "@/lib/utils";
import { type YBRpage } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";
import {
  useAvatarAPI,
  AnimeTutor,
  AvatarAPIType,
  Chat,
} from "@queriumcorp/animetutor";
import { NavBar } from "../qq/NavBar";
import { CarouselPrevious, CarouselNext } from "../ui/carousel";
import { useProblemStore } from "@/store/_store";

const NewbGratzFoundTutor: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page: YBRpage;
  index: number;
}> = ({ className, children, page, index }) => {
  // NavContext
  const { current, api } = useContext(NavContext) as NavContextType;

  // Store
  const { initSession, logAction } = useProblemStore();

  const { sayMsg } = useAvatarAPI() as AvatarAPIType;

  function initializeSession() {
    // Init session
    const problem = {
      appKey: "JiraTestPage",
      id: "QUES6018",
      title: "Solve compound linear inequalities in 1 variable",
      stimulus:
        "Minh spent $6.25 on 5 sticker books to give his nephews. Find the cost of each sticker book.",
      cmd: "",
      session: "",
      class: "gradeBasicAlgebra",
      question:
        'SolveWordProblemAns[{"Minh spent $6.25 on 5 sticker books to give his nephews. Find the cost of each sticker book."}]',
      policies: "$A1$",
      qs1: "",
      qs2: "",
      qs3: "",
    };

    const student = {
      studentId: "PokeyLoki",
      studentName: "Loki Van Riper",
    };
    initSession(problem, student);
  }

  useEffect(() => {
    sayMsg(
      "Great Job!  I knew you could do it!  When you click on me, I'll give you options to do things like watch videos, get a hint, or other specialized help.",
      "idle:02",
    );
  }, []);

  // JSX
  if (current !== index + 1) return null;
  return (
    <div
      className={cn(
        "NewbGratzFoundTutor rounded-lg border bg-card text-card-foreground shadow-sm w-full h-full m-0 p-0 flex flex-col justify-stretch",
        className,
      )}
    >
      <h1>NewbGratzFoundTutor</h1>
      <div className="grow bg-qqAccent relative">
        <AnimeTutor
          closeUp
          style={{ position: "absolute", height: "100%", right: "0px" }}
        />
        <Chat className="font-irishGrover absolute right-[300px] bottom-[50%] ml-3 min-h-24" />
      </div>
      <NavBar className="flex justify-end pr-2 space-x-3 bg-slate-300 relative">
        <CarouselPrevious className="relative left-0">
          Previous
        </CarouselPrevious>
        <CarouselNext
          className="relative right-0"
          onClick={() => {
            logAction("NewbGratzFoundTutor : Clicked Next");
            initializeSession();
            api?.scrollNext();
          }}
        >
          Next
        </CarouselNext>
      </NavBar>
    </div>
  );
};
NewbGratzFoundTutor.displayName = "NewbGratzFoundTutor";
export default NewbGratzFoundTutor;
