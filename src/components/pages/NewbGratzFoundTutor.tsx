"use client";

import { useContext } from "react";

import { cn } from "@/lib/utils";
import { type YBRpage } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";
import { AnimeTutor, Chat } from "@/components/AnimeTutor";
import { NavBar } from "../qq/NavBar";
import { CarouselPrevious, CarouselNext } from "../ui/carousel";
import { useProblemStore } from "@/store/_store";

const NewbGratzFoundTutor: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page?: YBRpage;
  index: number;
}> = ({ className, index }) => {
  //
  // NavContext
  //
  const { current, api } = useContext(NavContext) as NavContextType;

  //
  // Store
  //
  const { initSession, logAction } = useProblemStore();

  //
  // JSX
  //
  if (current !== index + 1) return null;
  return (
    <div
      className={cn(
        "NewbGratzFoundTutor rounded-lg border bg-card text-card-foreground shadow-sm w-full h-full m-0 p-0 flex flex-col justify-stretch",
        className,
      )}
    >
      <div className="grow bg-qqAccent relative">
        <AnimeTutor
          emote={"celebrate:03"}
          closeUp
          style={{
            position: "absolute",
            height: "100%",
            right: "-150px",
            width: "100%",
            // border: "1px solid #000000",
          }}
        />
        <Chat
          msg={[
            "Great Job!",
            "I knew you could do it!  When you click on me, I'll do my best to give you a hand.",
            "Click Next → to continue.",
          ]}
          className="font-irishGrover absolute right-[50%] bottom-[50%] ml-3 min-h-24"
        />
      </div>
      <NavBar className="flex justify-end pr-2 space-x-3 bg-slate-300 relative">
        <CarouselPrevious className="relative left-0">
          Previous
        </CarouselPrevious>
        <CarouselNext
          className="relative right-0"
          onClick={() => {
            logAction("NewbGratzFoundTutor : Clicked Next");
            initSession();
            api?.scrollNext();
          }}
        >
          Next
        </CarouselNext>
        <h1 className="absolute bottom-0 left-0 text-slate-500">
          NewbGratzFoundTutor
        </h1>
      </NavBar>
    </div>
  );
};
NewbGratzFoundTutor.displayName = "NewbGratzFoundTutor";
export default NewbGratzFoundTutor;
