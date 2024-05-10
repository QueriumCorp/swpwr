"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { type YBRpage } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";
import { AnimeTutor, useAvatarAPI } from "@queriumcorp/animetutor";

const NewbGratzWatchedVideo: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page: YBRpage;
  index: number;
}> = ({ className, children, page, index }) => {
  const { current } = React.useContext(NavContext) as NavContextType;

  const { sayMsg } = useAvatarAPI();

  React.useEffect(() => {
    sayMsg("You are doing GREAT! Give this next exercise a try!", "idle:02");
  }, []);

  // JSX
  if (current !== index + 1) return null; // Dont render if page not active
  return (
    <div
      className={cn(
        "NewbGratzWatchedVideo rounded-lg border bg-card text-card-foreground shadow-sm w-full h-full m-0 p-0 relative",
        className,
      )}
    >
      <h1>NewbGratzWatchedVideo</h1>
      {children}
      <AnimeTutor
        closeUp
        style={{
          position: "absolute",
          height: "100%",
          width: "90%",
          right: "0px",
        }}
      />
    </div>
  );
};
NewbGratzWatchedVideo.displayName = "NewbGratzWatchedVideo";
export default NewbGratzWatchedVideo;
