"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { type YBRpage } from "../qq/YellowBrickRoad";
import {
  AnimeTutor,
  AvatarAPIType,
  Chat,
  useAvatarAPI,
} from "@queriumcorp/animetutor";
import { NavContext, NavContextType } from "@/NavContext";
import { NavBar } from "../qq/NavBar";
import { CarouselPrevious, CarouselNext } from "../ui/carousel";
import { useProblemStore } from "@/store/_store";

const NewbMeetTutor: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page: YBRpage;
  index: number;
}> = ({ className, index }) => {
  // NavContext
  const { current, api } = React.useContext(NavContext) as NavContextType;

  // Store
  const { logAction, heartbeat } = useProblemStore();

  const { sayMsg } = useAvatarAPI() as AvatarAPIType;

  React.useEffect(() => {
    console.log("NewbMeetTutor: ", current, index);
    sayMsg("Hi! I'm FoxyFuka!", "idle:01");

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
    // initSession(problem, student);
    heartbeat();
  }, []);

  // JSX
  if (current !== index + 1) return null;
  return (
    <div
      className={cn(
        "NewbMeetTutor rounded-lg border bg-card text-card-foreground shadow-sm w-full h-full m-0 p-0 flex flex-col justify-stretch",
        className,
      )}
    >
      <div className="grow bg-qqAccent relative">
        <AnimeTutor
          closeUp
          style={{
            position: "absolute",
            height: "100%",
            right: "-500px",
            width: "200%",
          }}
        />
        <Chat className="font-irishGrover absolute right-[300px] bottom-[50%]" />
      </div>
      <NavBar className="flex justify-end pr-2 space-x-3 bg-slate-300 relative">
        <CarouselPrevious className="relative left-0">
          Previous
        </CarouselPrevious>
        <CarouselNext
          className="relative right-0"
          onClick={() => {
            logAction("Start Problem");
            api?.scrollNext();
          }}
        >
          Next
        </CarouselNext>
      </NavBar>
    </div>
  );
};
NewbMeetTutor.displayName = "NewbMeetTutor";
export default NewbMeetTutor;
