"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { YBRpage } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";

const CadetFillEquation: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page: YBRpage;
  index: number;
}> = ({ className, children, page, index }) => {
  // Dont render if page not active
  const { current } = React.useContext(NavContext) as NavContextType;
  if (current !== index + 1) return null;
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
