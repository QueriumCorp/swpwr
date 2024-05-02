"use client";

import * as React from "react";

import { DndContext, DragEndEvent } from "@dnd-kit/core";

import { cn } from "@/lib/utils";

// qq Packages
import UnknownFacts from "../qq/UnknownFacts";
import KnownFacts from "../qq/KnownFacts";
import { StimulusSelector } from "../qq/StimulusSelector";
import { FactChicklet } from "../qq/FactChicklet";

const NewbMeetTutor = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const [knowns, setKnowns] = React.useState<string[]>([]);
  const [unknowns, setUnknowns] = React.useState<string[]>([]);
  const [currentFact, setCurrentFact] = React.useState<string>("");

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
          onChangeFact={setCurrentFact}
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
            "inline",
          )}
          stimulusText="Four friends went out to lunch and the bill was $53.75.  They decided to add enough tip to make the total of $64, so that they could easily split the bill evenly among themselves.  How much did they leave for a tip?"
        ></StimulusSelector>

        <div className="flex grow gap-2">
          <KnownFacts add={addKnown}>
            {knowns.map((known) => (
              <FactChicklet key={known} fact={known}></FactChicklet>
            ))}
          </KnownFacts>
          <UnknownFacts add={addUnknown}>
            {unknowns.map((unknown) => (
              <FactChicklet key={unknown} fact={unknown}></FactChicklet>
            ))}
          </UnknownFacts>
        </div>
      </DndContext>
    </div>
  );

  function handleDragEnd(event: DragEndEvent) {
    if (event.over && event.over.id === "KnownFacts") {
      setKnowns([...knowns, event.active.id.toString()]);
    }
    if (event.over && event.over.id === "UnknownFacts") {
      setUnknowns([...unknowns, event.active.id.toString()]);
    }
  }

  function addKnown() {
    if (currentFact.length == 0) return;
    setKnowns([...knowns, currentFact]);
    setCurrentFact("");
  }
  function delKnown(fact: string) {
    console.log("delKnown()", fact);
  }
  function addUnknown() {
    if (currentFact.length == 0) return;
    setUnknowns([...unknowns, currentFact]);
    setCurrentFact("");
  }
  function delUnknown(fact: string) {
    console.log("delUnknown()", fact);
  }
});

NewbMeetTutor.displayName = "NewbMeetTutor";

export default NewbMeetTutor;
