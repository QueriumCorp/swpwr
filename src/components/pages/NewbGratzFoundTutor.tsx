"use client";

import * as React from "react";

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

const NewbGratzFoundTutor: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page: YBRpage;
  index: number;
}> = ({ className, children, page, index }) => {
  // Dont render if page not active
  const { current } = React.useContext(NavContext) as NavContextType;

  const { sayMsg } = useAvatarAPI() as AvatarAPIType;

  React.useEffect(() => {
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
        <CarouselNext className="relative right-0">Next</CarouselNext>
      </NavBar>
    </div>
  );
};
NewbGratzFoundTutor.displayName = "NewbGratzFoundTutor";
export default NewbGratzFoundTutor;
