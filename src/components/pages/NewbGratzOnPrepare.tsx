"use client";

import { useState, useContext } from "react";

import { cn } from "@/lib/utils";
import { type YBRpage } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";
import {
  AnimeTutor,
  AvatarAPIType,
  Chat,
  useAvatarAPI,
} from "@/components/AnimeTutor";
import ReactPlayer from "react-player";
import { NavBar } from "../qq/NavBar";
import { CarouselPrevious, CarouselNext } from "../ui/carousel";

const NewbGratzOnPrepare: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page?: YBRpage;
  index: number;
}> = ({ className, index }) => {
  const src = "https://querium.wistia.com/medias/oyfe3sqhwb";

  // Context
  const { current } = useContext(NavContext) as NavContextType;

  // State
  const [msg, setMsg] = useState([
    "Nice work on identifying the facts!",
    "Now, let's learn about the first group of problem types that could use information similiar to what you just saw.",
    "Press the Play ▶️ button to start the video.",
  ]);

  // JSX
  // Dont render if page not active
  if (current !== index + 1) return null;
  return (
    <div
      className={cn(
        "p-2 gap-2 rounded-lg border bg-card text-card-foreground shadow-sm h-full flex flex-col justify-stretch relative",
        className,
      )}
    >
      <ReactPlayer url={src} height={"100%"} style={{ margin: "auto" }} />
      <NavBar className="flex justify-end pr-2 space-x-3 bg-slate-300">
        {/* Tiny Avatar */}
        <AnimeTutor
          style={{
            bottom: "0px",
            right: "0px",
            height: "100%",
          }}
        />

        <Chat
          msg={msg}
          className="font-irishGrover absolute right-[200px] bottom-[50%] h-fit w-fit min-h-[64px]"
        />
        <CarouselPrevious className="relative left-0">
          Previous
        </CarouselPrevious>
        <CarouselNext className="relative right-0">Next</CarouselNext>
      </NavBar>
    </div>
  );
};
NewbGratzOnPrepare.displayName = "NewbGratzOnPrepare";
export default NewbGratzOnPrepare;
