"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const RangerFillDiagram = React.forwardRef<
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
    <h1>RangerFillDiagram</h1>
    {children}
  </div>
));
RangerFillDiagram.displayName = "RangerFillDiagram";
export default RangerFillDiagram;
