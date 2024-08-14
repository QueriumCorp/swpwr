"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import ReactPlayer from "react-player/wistia";

// qq Packages
import { YellowBrickRoad, type YBRpage } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";
import { AnimeTutor } from "@/components/AnimeTutor";
import { NavBar } from "../qq/NavBar";
import { CarouselPrevious, CarouselNext } from "../ui/carousel";
import { useProblemStore } from "@/store/_store";
import { VideoPlayer } from "../qq/VideoPlayer";

const NewbFeelThePower: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page: YBRpage;
  index: number;
}> = ({ className, index }) => {
  const ybr = YellowBrickRoad;
  const src = "https://querium.wistia.com/medias/oyfe3sqhwb";

  // Contexts
  const { current, api } = React.useContext(NavContext) as NavContextType;

  // Store
  const { logAction } = useProblemStore();

  //
  // State
  //
  const [watchedVideo, setWatchedVideo] = React.useState(false);

  //
  // JSX
  //
  if (current !== index + 1) return null;
  return (
    <div
      className={cn(
        "NewbFeelThePower rounded-lg  bg-card text-card-foreground shadow-sm w-full h-full m-0 mb-2 pl-2 pt-2 pr-2 flex flex-col justify-stretch",
        className,
      )}
    >
      <div className="div flex flex-col p-2 gap-2 justify-stretch grow relative  mb-2">
        <div className="absolute top-0 left-0 bottom-0 right-0  overflow-y-auto flex items-center justify-center">
          <VideoPlayer
            videoUrl={src}
            className="w-full h-full"
            onEnded={() => setWatchedVideo(true)}
          />
        </div>
      </div>
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
        <CarouselNext
          className="relative right-0"
          onClick={() => {
            logAction("NewbFeelThePower : Clicked Next");
            api?.scrollNext();
          }}
          disabled={!watchedVideo}
        >
          Next
        </CarouselNext>
        <h1 className="absolute bottom-0 left-0 text-slate-500">
          NewbFeelThePower
        </h1>
      </NavBar>
    </div>
  );
};

NewbFeelThePower.displayName = "NewbFeelThePower";

export default NewbFeelThePower;
