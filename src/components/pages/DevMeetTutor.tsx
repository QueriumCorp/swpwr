"use client";

import { FC, ReactNode, useContext, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { type YBRpage } from "../qq/YellowBrickRoad";
import {
  AnimeTutor,
  AvatarAPIType,
  useAvatarAPI,
} from "@/components/AnimeTutor";
import { NavContext, NavContextType } from "@/NavContext";
import { NavBar } from "../qq/NavBar";
import { CarouselPrevious, CarouselNext } from "../ui/carousel";
import { useProblemStore } from "@/store/_store";
import { Button } from "../ui/button";
import { ChatBubble } from "../qq/ChatBubble/ChatBubble";

const DevMeetTutor: FC<{
  className?: string;
  children?: ReactNode;
  page: YBRpage;
  index: number;
}> = ({ className, index }) => {
  // Context
  const { current, api } = useContext(NavContext) as NavContextType;
  const { emotes, sayMsg } = useAvatarAPI() as AvatarAPIType;

  // Store
  const { logAction, heartbeat, initSession, session } = useProblemStore();

  // State
  const [navDisabled, setNavDisabled] = useState(true);

  // Side Effects
  useEffect(() => {
    logAction("DevMeetTutor : Entered Application");
    initSession();
    setTimeout(() => heartbeat(), 1000);
  }, []);
  useEffect(() => {
    if (session.sessionToken.length > 0) {
      setNavDisabled(false);
    }
  }, [session]);

  // Handlers
  function handleDance() {
    sayMsg("Dance Dance Revolution", "gratz");
  }

  // JSX
  if (current !== index + 1) return null;
  return (
    <div
      className={cn(
        "DevMeetTutor rounded-lg border bg-card text-card-foreground shadow-sm w-full h-full m-0 p-0 flex flex-col justify-stretch",
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
          msg={[
            "Howdy Ho! I'm Klatu, and I'm here to help you solve your math problems.",
            "I'm here to help you solve your math problems.",
          ]}
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
          disabled={navDisabled}
          onClick={() => {
            logAction("DevMeetTutor : Clicked Next");
            api?.scrollNext();
          }}
        >
          Next
        </CarouselNext>
      </NavBar>
    </div>
  );
};
DevMeetTutor.displayName = "DevMeetTutor";
export default DevMeetTutor;
