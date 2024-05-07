"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { YBRpage } from "../qq/YellowBrickRoad";

const CadetFillEquation: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page: YBRpage;
}> = ({ className, children, page }) => {
  console.info(page);
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className,
      )}
    >
      <h1>CadetFillEquation</h1>
      {children}
    </div>
  );
};
CadetFillEquation.displayName = "CadetFillEquation";
export default CadetFillEquation;
