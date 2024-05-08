"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { type YBRpage } from "../qq/YellowBrickRoad";
import { AnimeTutor } from "@queriumcorp/animetutor";
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

  // JSX
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className,
      )}
    >
      <h1>NewbFeelThePower</h1>
      {children}
      <AnimeTutor closeUp />
    </div>
  );
};
NewbFeelThePower.displayName = "NewbFeelThePower";
export default NewbFeelThePower;
