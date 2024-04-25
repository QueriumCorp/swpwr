"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const RangerSolvedFor = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className,
    )}
    {...props}
  >
    <h1>RangerSolvedFor</h1>
    {children}
  </div>
));
RangerSolvedFor.displayName = "RangerSolvedFor";
export default RangerSolvedFor;
