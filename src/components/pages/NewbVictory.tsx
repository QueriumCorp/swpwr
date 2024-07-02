"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { type YBRpage } from "../qq/YellowBrickRoad";
import {
  AnimeTutor,
  AvatarAPIType,
  Chat,
  useAvatarAPI,
} from "@/components/AnimeTutor";
import { NavContext, NavContextType } from "@/NavContext";
import { NavBar } from "../qq/NavBar";
import { CarouselPrevious, CarouselNext } from "../ui/carousel";
import { useProblemStore } from "@/store/_store";
import { Button } from "../ui/button";

const NewbVictory: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page: YBRpage;
  index: number;
}> = ({ className, index }) => {
  // Context
  const { current, api } = React.useContext(NavContext) as NavContextType;
  const { emotes, sayMsg } = useAvatarAPI() as AvatarAPIType;

  // Store
  const { logAction, heartbeat } = useProblemStore();

  // Side Effects
  React.useEffect(() => {
    logAction("NewbVictory : Finished path");
  }, []);

  // Handlers
  function handleDance() {
    sayMsg("Dance Dance Revolution", "gratz");
  }

  // JSX
  if (current !== index + 1) return null;
  return (
    <div
      className={cn(
        "NewbVictory rounded-lg border bg-card text-card-foreground shadow-sm w-full h-full m-0 p-0 flex flex-col justify-stretch",
        className,
      )}
    >
      <div className="grow bg-qqAccent relative">
        <AnimeTutor
          emote={"celebrate:01"}
          closeUp
          style={{
            position: "absolute",
            height: "100%",
            right: "-150px",
            width: "100%",
            // border: "1px solid #000000",
          }}
        />
        <Chat
          msg={`**Congratulations!**
You are no longer a newbie!
`}
          className="font-irishGrover absolute right-[50%] bottom-[50%]"
        />
      </div>
      <NavBar className="flex justify-end pr-2 space-x-3 bg-slate-300 relative">
        <div className="flex flex-col grow m-1 gap-1">
          {emotes.map((emote) => (
            <Button key={emote.name} onClick={handleDance} className="w-full">
              {emote.name}
            </Button>
          ))}
        </div>

        <CarouselPrevious className="relative left-0">
          Previous
        </CarouselPrevious>
        <CarouselNext
          className="relative right-0"
          onClick={() => {
            logAction("NewbVictory : Clicked Next");
            api?.scrollNext();
          }}
        >
          Next
        </CarouselNext>
      </NavBar>
    </div>
  );
};
NewbVictory.displayName = "NewbVictory";
export default NewbVictory;
