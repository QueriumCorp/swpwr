"use client";

import * as React from "react";

import { DndContext } from "@dnd-kit/core";

import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

// qq Packages
import { FactChicklet } from "../qq/FactChicklet";
import UnknownFacts from "../qq/UnknownFacts";
import KnownFacts from "../qq/KnownFacts";

const NewbMeetTutor = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  // textSelected event handler
  const textSelected = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const selection = evt.target.value.substring(
      evt.target.selectionStart,
      evt.target.selectionEnd,
    );
    console.log(`You selected: ${selection}`);
  };

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
        <Textarea
          className="grow"
          style={{ resize: "none" }}
          onSelect={textSelected}
        />
        <FactChicklet>
          Fact1<button>x</button>
        </FactChicklet>
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
