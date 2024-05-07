"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { type YBRpage } from "../qq/YellowBrickRoad";
import { AnimeTutor } from "@queriumcorp/animetutor";

const NewbFeelThePower: React.FC<{
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
      <h1>NewbFeelThePower</h1>
      {children} <AnimeTutor closeUp />
    </div>
  );
};
NewbFeelThePower.displayName = "NewbFeelThePower";
export default NewbFeelThePower;
