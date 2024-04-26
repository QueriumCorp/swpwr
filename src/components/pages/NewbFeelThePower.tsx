"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { AnimeTutor } from "@queriumcorp/animetutor";

const NewbFeelThePower = React.forwardRef<
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
    <h1>NewbFeelThePower</h1>
    {children}
    <AnimeTutor closeUp />
  </div>
));
NewbFeelThePower.displayName = "NewbFeelThePower";
export default NewbFeelThePower;
