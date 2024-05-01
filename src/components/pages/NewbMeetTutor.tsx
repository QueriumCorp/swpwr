"use client";

import * as React from "react";

import { DndContext } from "@dnd-kit/core";

import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

// qq Packages
import { FactChicklet } from "../qq/FactChicklet";
import UnknownFacts from "../qq/UnknownFacts";
import KnownFacts from "../qq/KnownFacts";
import { StimulusSelector } from "../qq/StimulusSelector";

const NewbMeetTutor = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  // JSX
  return (
    <div
      ref={ref}
      className={cn(
        "p-2 gap-2 rounded-lg border bg-card text-card-foreground shadow-sm h-full flex flex-col justify-stretch",
        className,
      )}
      {...props}
    >
      <h1>NewbMeetTutor</h1>
      {children}
      <DndContext onDragEnd={handleDragEnd}>
        <StimulusSelector
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
            "inline",
          )}
          stimulusText="Four friends went out to lunch and the bill was $53.75.  They decided to add enough tip to make the total of $64, so that they could easily split the bill evenly among themselves.  How much did they leave for a tip?"
        ></StimulusSelector>

        <div className="flex grow gap-2">
          <KnownFacts>12345</KnownFacts>
          <UnknownFacts>12345</UnknownFacts>
        </div>
      </DndContext>
    </div>
  );

  function handleDragEnd(event) {
    if (event.over && event.over.id === "UnknownFacts") {
      console.info("dropped on ", event.over.id);
    }
    if (event.over && event.over.id === "KnownFacts") {
      console.info("dropped on ", event.over.id);
    }
  }
});
NewbMeetTutor.displayName = "NewbMeetTutor";
export default NewbMeetTutor;
