"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import ReactPlayer from "react-player/wistia";

// qq Packages
import { YBRpage } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";

const NewbFeelThePower: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page: YBRpage;
  index: number;
}> = ({ className, children, page, index }) => {
  // Dont render if page not active
  const { current } = React.useContext(NavContext) as NavContextType;
  if (current !== index + 1) return null;
  const src = "https://querium.wistia.com/medias/oyfe3sqhwb";

  // JSX
  return (
    <div
      className={cn(
        "p-2 gap-2 rounded-lg border bg-card text-card-foreground shadow-sm h-full flex flex-col justify-stretch relative",
        className,
      )}
    >
      <h1>NewbFeelThePower</h1>
      <ReactPlayer url={src} height={"100%"} style={{ margin: "auto" }} />
    </div>
  );
};

NewbFeelThePower.displayName = "NewbFeelThePower";

export default NewbFeelThePower;
