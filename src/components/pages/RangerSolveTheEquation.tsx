"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { type YBRpage } from "../qq/YellowBrickRoad";

const RangerSolveTheEquation: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page: YBRpage;
}> = ({ className, children, page }) => {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className,
      )}
    >
      <h1>RangerSolveTheEquation</h1>
      {children}
    </div>
  );
};
RangerSolveTheEquation.displayName = "RangerSolveTheEquation";
export default RangerSolveTheEquation;
