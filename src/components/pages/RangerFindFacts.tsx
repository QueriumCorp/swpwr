"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { type YBRpage } from "../qq/YellowBrickRoad";

const RangerFindFacts: React.FC<{
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
      <h1>RangerFindFacts</h1>
      {children}
    </div>
  );
};
RangerFindFacts.displayName = "RangerFindFacts";
export default RangerFindFacts;
