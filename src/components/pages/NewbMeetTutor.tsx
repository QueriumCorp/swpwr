"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scrollArea";
import { Card } from "../ui/card";
import { FactChicklet } from "../qq/FactChicklet";

const NewbMeetTutor = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const textSelected = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const selection = evt.target.value.substring(
      evt.target.selectionStart,
      evt.target.selectionEnd,
    );
    console.log(`You selected: ${selection}`);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm h-full flex flex-col justify-stretch",
        className,
      )}
      {...props}
    >
      <h1>NewbMeetTutor</h1>
      {children}
      <Textarea className="grow" onSelect={textSelected} />
      <div className="flex grow">
        <Card className="grow">
          <h3>Knowns</h3>
          <ScrollArea>
            <FactChicklet>
              Fact1<button>x</button>
            </FactChicklet>
          </ScrollArea>
        </Card>
        <Card className="grow">
          <h3>Unknowns</h3>
          <ScrollArea></ScrollArea>
        </Card>
      </div>
    </div>
  );
});
NewbMeetTutor.displayName = "NewbMeetTutor";
export default NewbMeetTutor;
