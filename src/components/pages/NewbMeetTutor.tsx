"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { YellowBrickRoad, type YBRpage } from "../qq/YellowBrickRoad";
import {
  AnimeTutor,
  AvatarAPIType,
  Chat,
  useAvatarAPI,
} from "@queriumcorp/animetutor";
import { NavContext, NavContextType } from "@/NavContext";
import { NavBar } from "../qq/NavBar";
import { CarouselPrevious, CarouselNext } from "../ui/carousel";

const NewbMeetTutor: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page: YBRpage;
  index: number;
}> = ({ className, children, page, index }) => {
  // Dont render if page not active
  const { current } = React.useContext(NavContext) as NavContextType;
  const ybr = YellowBrickRoad;

  const { sayMsg } = useAvatarAPI() as AvatarAPIType;

  React.useEffect(() => {
    setTimeout(() => sayMsg("Hi! I'm FoxyFuka!", "idle:01"), 1000);
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
      <h1>NewbMeetTutor</h1>
      {children}
      <div className="grow bg-qqAccent relative">
        <AnimeTutor
          closeUp
          style={{ position: "absolute", height: "100%", right: "0px" }}
        />
        <Chat />
      </div>
      <NavBar className="flex justify-end pr-2 space-x-3 bg-slate-300">
        {/* Tiny Avatar */}
        {ybr[current].phase !== "I" ? (
          <AnimeTutor
            style={{
              bottom: "0px",
              right: "0px",
              height: "100%",
              // border: "solid 1px red",
            }}
          />
        ) : null}
        <CarouselPrevious className="relative left-0">
          Previous
        </CarouselPrevious>
        <CarouselNext className="relative right-0">Next</CarouselNext>
      </NavBar>
    </div>
  );
};
NewbMeetTutor.displayName = "NewbMeetTutor";
export default NewbMeetTutor;
