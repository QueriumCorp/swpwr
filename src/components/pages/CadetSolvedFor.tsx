"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { type YBRpage } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";

const CadetSolvedFor: React.FC<{
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
      <h1>CadetSolvedFor</h1>
      {children}
    </div>
  );
};
CadetSolvedFor.displayName = "CadetSolvedFor";
export default CadetSolvedFor;
