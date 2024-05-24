"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import ReactPlayer from "react-player/wistia";

// qq Packages
import { YellowBrickRoad, type YBRpage } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";
import { AnimeTutor } from "@queriumcorp/animetutor";
import { NavBar } from "../qq/NavBar";
import { CarouselPrevious, CarouselNext } from "../ui/carousel";

const NewbFeelThePower: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page: YBRpage;
  index: number;
}> = ({ className, children, page, index }) => {
  const ybr = YellowBrickRoad;
  const src = "https://querium.wistia.com/medias/oyfe3sqhwb";

  const { current } = React.useContext(NavContext) as NavContextType;

  // JSX
  if (current !== index + 1) return null;
  return (
    <div
      className={cn(
        "NewbFeelThePower rounded-lg border bg-card text-card-foreground shadow-sm w-full h-full m-0 p-0 flex flex-col justify-stretch",
        className,
      )}
    >
      <ReactPlayer url={src} height={"100%"} style={{ margin: "auto" }} />
      <NavBar className="flex justify-end pr-2 space-x-3 bg-slate-300">
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

NewbFeelThePower.displayName = "NewbFeelThePower";

export default NewbFeelThePower;
