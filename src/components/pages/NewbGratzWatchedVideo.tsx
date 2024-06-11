"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { type YBRpage } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";
import { AnimeTutor, Chat } from "@/components/AnimeTutor";
import { NavBar } from "../qq/NavBar";
import { CarouselPrevious, CarouselNext } from "../ui/carousel";
import { useProblemStore } from "@/store/_store";

const NewbGratzWatchedVideo: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page?: YBRpage;
  index: number;
}> = ({ className, index }) => {
  // NavContext
  const { current, api } = React.useContext(NavContext) as NavContextType;

  // Store
  const { logAction } = useProblemStore();

  // JSX
  if (current !== index + 1) return null; // Dont render if page not active
  return (
    <div
      className={cn(
        "NewbGratzWatchedVideo rounded-lg border bg-card text-card-foreground shadow-sm w-full h-full m-0 p-0 flex flex-col justify-stretch",
        className,
      )}
    >
      <div className="grow bg-qqAccent relative">
        <AnimeTutor
          emote={"gratz:03"}
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
          msg="You are doing GREAT! Give this next exercise a try!"
          className="font-irishGrover absolute right-[50%] bottom-[50%]"
        />
      </div>
      <NavBar className="flex justify-end pr-2 space-x-3 bg-slate-300">
        <CarouselPrevious className="relative left-0">
          Previous
        </CarouselPrevious>
        <CarouselNext
          className="relative right-0"
          onClick={() => {
            logAction("NewbGratzWatchedVideo : Clicked Next");
            api?.scrollNext();
          }}
        >
          Next
        </CarouselNext>
      </NavBar>
    </div>
  );
};
NewbGratzWatchedVideo.displayName = "NewbGratzWatchedVideo";

export default NewbGratzWatchedVideo;
