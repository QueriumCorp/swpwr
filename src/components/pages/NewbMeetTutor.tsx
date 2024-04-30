"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { MyEditor } from "../qq/MyEditor";
import { Textarea } from "../ui/textarea";

const NewbMeetTutor = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm h-full",
      className,
    )}
    {...props}
  >
    <h1>NewbMeetTutor</h1>
    {children}
    <Textarea />
  </div>
));
NewbMeetTutor.displayName = "NewbMeetTutor";
export default NewbMeetTutor;
