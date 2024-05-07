"use client";

import * as React from "react";

import { DndContext, DragEndEvent } from "@dnd-kit/core";

import { cn } from "@/lib/utils";

// qq Packages
import UnknownFacts from "../qq/UnknownFacts";
import KnownFacts from "../qq/KnownFacts";
import { StimulusSelector } from "../qq/StimulusSelector";
import Chip from "../qq/Chip";
import { YBRpage } from "../qq/YellowBrickRoad";

const NewbMeetTutor: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page: YBRpage;
}> = ({ className, children, page }) => {
  const [knowns, setKnowns] = React.useState<string[]>([]);
  const [unknowns, setUnknowns] = React.useState<string[]>([]);
  const [currentFact, setCurrentFact] = React.useState<string>("");

  const delKnown = (fact: string) => {
    setKnowns(knowns.filter((thisFact) => thisFact !== fact));
  };

  const delUnknown = (fact: string) => {
    setUnknowns(unknowns.filter((thisFact) => thisFact !== fact));
  };

  // JSX
  return (
    <div
      className={cn(
        "p-2 gap-2 rounded-lg border bg-card text-card-foreground shadow-sm h-full flex flex-col justify-stretch",
        className,
      )}
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
              <Chip
                id={known}
                key={known}
                label={known}
                onDelete={delKnown}
              ></Chip>
            ))}
          </KnownFacts>
          <UnknownFacts add={addUnknown}>
            {unknowns.map((unknown) => (
              <Chip
                id={unknown}
                key={unknown}
                label={unknown}
                onDelete={delUnknown}
              ></Chip>
            ))}
          </UnknownFacts>
        </div>
      </DndContext>
    </div>
  );

  function handleDragEnd(event: DragEndEvent) {
    if (currentFact.length == 0 || currentFact.trim().length == 0) return;
    if (knowns.includes(currentFact)) return;

    if (event.over && event.over.id === "KnownFacts") {
      setKnowns([...knowns, currentFact]);
    }
    if (event.over && event.over.id === "UnknownFacts") {
      setUnknowns([...unknowns, currentFact]);
    }
    setCurrentFact("");
  }

  function addKnown() {
    if (currentFact.length == 0 || currentFact.trim().length == 0) return;
    if (knowns.includes(currentFact)) return;

    setKnowns([...knowns, currentFact]);
    setCurrentFact("");
  }
  function addUnknown() {
    if (currentFact.length == 0 || currentFact.trim().length == 0) return;
    if (unknowns.includes(currentFact)) return;
    setUnknowns([...unknowns, currentFact]);
    setCurrentFact("");
  }
};

NewbMeetTutor.displayName = "NewbMeetTutor";

export default NewbMeetTutor;
