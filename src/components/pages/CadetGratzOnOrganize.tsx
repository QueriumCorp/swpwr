"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { type YBRpage } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";
import {
  AnimeTutor,
  AvatarAPIType,
  Chat,
  useAvatarAPI,
} from "@/components/AnimeTutor";
import { NavBar } from "../qq/NavBar";
import { CarouselPrevious, CarouselNext } from "../ui/carousel";

const CadetGratzOnOrganize: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page?: YBRpage;
  index: number;
}> = ({ className, children, index }) => {
  const { current } = React.useContext(NavContext) as NavContextType;

  const { sayMsg } = useAvatarAPI() as AvatarAPIType;

  React.useEffect(() => {
    sayMsg("You've prepared and organized...'!", "idle:02");
  }, []);

  // JSX
  if (current !== index + 1) return null; // Dont render if page not active
  return (
    <div
      className={cn(
        "CadetGratzOnOrganize rounded-lg border bg-card text-card-foreground shadow-sm w-full h-full m-0 p-0 flex flex-col justify-stretch",
        className,
      )}
    >
      <h1>CadetGratzOnOrganize</h1>
      {children}
      <div className="grow bg-qqAccent relative">
        <AnimeTutor
          closeUp
          style={{ position: "absolute", height: "100%", right: "0px" }}
        />
        <Chat
          msg="RATATATA"
          className="font-irishGrover absolute right-[300px] bottom-[50%]"
        />
      </div>
      <NavBar className="flex justify-end pr-2 space-x-3 bg-slate-300">
        <CarouselPrevious className="relative left-0">
          Previous
        </CarouselPrevious>
        <CarouselNext className="relative right-0">Next</CarouselNext>
      </NavBar>
    </div>
  );
};
CadetGratzOnOrganize.displayName = "CadetGratzOnOrganize";
export default CadetGratzOnOrganize;
