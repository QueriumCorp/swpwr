"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { type YBRpage } from "../qq/YellowBrickRoad";
import { AnimeTutor, useAvatarAPI } from "@queriumcorp/animetutor";
import { NavContext, NavContextType } from "@/NavContext";

const NewbMeetTutor: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page: YBRpage;
  index: number;
}> = ({ className, children, page, index }) => {
  // Dont render if page not active
  const { current } = React.useContext(NavContext) as NavContextType;
  if (current !== index + 1) return null;

  const { sayMsg } = useAvatarAPI();

  React.useEffect(() => {
    sayMsg("Hi! I'm FoxyFuka!", "idle:01");
  }, []);

  // JSX
  return (
    <div
      className={cn(
        "NewbMeetTutor rounded-lg border bg-card text-card-foreground shadow-sm w-full h-full m-0 p-0",
        className,
      )}
    >
      <h1>NewbMeetTutor</h1>
      {children}
      <AnimeTutor
        closeUp
        style={{ position: "absolute", height: "100%", right: "0px" }}
      />
    </div>
  );
};
NewbMeetTutor.displayName = "NewbMeetTutor";
export default NewbMeetTutor;
