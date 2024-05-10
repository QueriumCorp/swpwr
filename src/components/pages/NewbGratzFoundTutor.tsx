"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { type YBRpage } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";
import {
  useAvatarAPI,
  AnimeTutor,
  AvatarAPIType,
} from "@queriumcorp/animetutor";

const NewbGratzFoundTutor: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page: YBRpage;
  index: number;
}> = ({ className, children, page, index }) => {
  // Dont render if page not active
  const { current } = React.useContext(NavContext) as NavContextType;
  if (current !== index + 1) return null;

  const { sayMsg } = useAvatarAPI() as AvatarAPIType;

  React.useEffect(() => {
    sayMsg("You are doing GREAT! Give this next exercise a try!", "idle:02");
  }, []);

  // JSX
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm w-full h-full m-0 p-0 relative",
        className,
      )}
    >
      <h1>NewbGratzFoundTutor</h1>
      {children}
      <AnimeTutor
        closeUp
        style={{ position: "absolute", height: "100%", right: "0px" }}
      />
    </div>
  );
};
NewbGratzFoundTutor.displayName = "NewbGratzFoundTutor";
export default NewbGratzFoundTutor;
