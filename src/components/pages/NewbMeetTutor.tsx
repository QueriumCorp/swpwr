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
import { ChatBubble } from "../qq/ChatBubble/ChatBubble";

const NewbMeetTutor: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page: YBRpage;
  index: number;
}> = ({ className, page, index }) => {
  //
  // Context
  //
  const { current, api } = React.useContext(NavContext) as NavContextType;
  const { emotes, sayMsg } = useAvatarAPI() as AvatarAPIType;

  //
  // Store
  //
  const { logAction, heartbeat, initSession } = useProblemStore();

  //
  // State
  //
  const [nextDisabled, setNextDisabled] = React.useState(true);

  //
  // Side Effects
  //
  React.useEffect(() => {
    logAction("NewbMeetTutor : Entered Application");
    setTimeout(() => heartbeat(), 1000);
  }, []);

  //
  // Handlers
  //
  function handleDance() {
    sayMsg("Dance Dance Revolution", "gratz");
  }
  function finishedIntro() {
    logAction("NewbMeetTutor : Intro Finished");
    setNextDisabled(false);
  }

  //
  // JSX
  //
  if (current !== index + 1) return null;
  return (
    <div
      className={cn(
        "NewbMeetTutor rounded-lg border bg-card text-card-foreground shadow-sm w-full h-full m-0 p-0 flex flex-col justify-stretch",
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
        <ChatBubble
          msgs={page.intro!}
          className="font-irishGrover absolute right-[50%] bottom-[50%]"
          introFinished={finishedIntro}
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
          disabled={nextDisabled}
          className="relative right-0"
          onClick={() => {
            logAction("NewbMeetTutor : Clicked Next");
            initSession();
            api?.scrollNext();
          }}
        >
          Next
        </CarouselNext>
        <h1 className="absolute bottom-0 left-0 text-slate-500">
          NewbMeetTutor
        </h1>
      </NavBar>
    </div>
  );
};
NewbMeetTutor.displayName = "NewbMeetTutor";
export default NewbMeetTutor;
