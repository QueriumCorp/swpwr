"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const CadetQuestIntro = React.forwardRef<
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
    <h1>CadetQuestIntro</h1>
    {children}
  </div>
));
CadetQuestIntro.displayName = "CadetQuestIntro";
export default CadetQuestIntro;
