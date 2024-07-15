"use client";

import { useContext, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { type YBRpage } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";
import { AnimeTutor, Chat } from "@/components/AnimeTutor";
import { NavBar } from "../qq/NavBar";
import { CarouselPrevious, CarouselNext } from "../ui/carousel";
import { useProblemStore } from "@/store/_store";

const NewbFindTutor: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page: YBRpage;
  index: number;
}> = ({ className, children, index }) => {
  //
  // State
  //
  const [navDisabled, setNavDisabled] = useState(true);
  const [msg, setMsg] = useState(
    "I’m right here if you need me, just click my cute self to get my attention 😊. Try it now.",
  );

  //
  // Context
  //
  const { current, api } = useContext(NavContext) as NavContextType;

  //
  // Store
  //
  const { logAction } = useProblemStore();

  //
  // Handlers
  //
  function foundMe() {
    logAction("NewbFindTutor : Found Tutor");
    setMsg("You found me! Click the right arrow next to me to continue.");
    setNavDisabled(false);
  }

  //
  // JSX
  //
  if (current !== index + 1) return null;

  return (
    <div
      className={cn(
        "NewbFindTutor rounded-lg border bg-card text-card-foreground shadow-sm w-full h-full m-0 p-0 flex flex-col justify-stretch",
        className,
      )}
    >
      <div className="grow relative"></div>
      {children}
      <NavBar className="flex justify-end pr-2 space-x-3 bg-slate-300">
        {/* Tiny Avatar */}
        <AnimeTutor
          emote={"wave:01"}
          style={{
            bottom: "0px",
            right: "0px",
            height: "100%",
            // border: "solid 1px red",
          }}
        />
        <div
          className="h-full bottom-0 right-0 w-[100px] border-solid border-red-500 z-10 cursor-pointer"
          onClick={() => {
            foundMe();
          }}
        ></div>
        <Chat
          msg={msg}
          className="font-irishGrover absolute right-[200px] bottom-[50%] h-fit w-fit min-h-[64px]"
        />
        <CarouselPrevious disabled={navDisabled} className="relative left-0">
          Previous
        </CarouselPrevious>
        <CarouselNext
          disabled={navDisabled}
          className="relative right-0"
          onClick={() => {
            logAction("NewbFindTutor : Clicked Next");
            api?.scrollNext();
          }}
        >
          Next
        </CarouselNext>
        <h1 className="absolute bottom-0 left-0 text-slate-500">
          NewbFindTutor
        </h1>
      </NavBar>
    </div>
  );
};
NewbFindTutor.displayName = "NewbFindTutor";
export default NewbFindTutor;
