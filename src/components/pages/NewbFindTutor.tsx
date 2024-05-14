"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { YellowBrickRoad, type YBRpage } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";
import {
  AnimeTutor,
  AvatarAPIType,
  Chat,
  useAvatarAPI,
} from "@queriumcorp/animetutor";
import { NavBar } from "../qq/NavBar";
import { CarouselPrevious, CarouselNext } from "../ui/carousel";

const NewbFindTutor: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page: YBRpage;
  index: number;
}> = ({ className, children, page, index }) => {
  const [navDisabled, setNavDisabled] = React.useState(true);

  // Dont render if page not active
  const { current } = React.useContext(NavContext) as NavContextType;

  const { sayMsg } = useAvatarAPI() as AvatarAPIType;
  React.useEffect(() => {
    sayMsg(
      `I’m right here if you need me, just click my cute self to get my attention 😊. Try it now.`,
      "idle:01",
    );
  }, []);

  function foundMe() {
    sayMsg(
      "You found me! Click the right arrow next to me to continue.",
      "dance:01",
    );
    setNavDisabled(false);
  }

  // JSX
  if (current !== index + 1) return null;

  return (
    <div
      className={cn(
        "NewbFindTutor rounded-lg border bg-card text-card-foreground shadow-sm w-full h-full m-0 p-0 flex flex-col justify-stretch",
        className,
      )}
    >
      <h1>NewbFindTutor</h1>
      <div className="grow relative"></div>
      {children}
      <NavBar className="flex justify-end pr-2 space-x-3 bg-slate-300">
        {/* Tiny Avatar */}
        <AnimeTutor
          style={{
            bottom: "0px",
            right: "0px",
            height: "100%",
            // border: "solid 1px red",
          }}
        />
        <div
          className="h-full bottom-0 right-0 w-[100px] border-solid border-red-500 z-10 cursor-pointer"
          onClick={() => {
            foundMe();
          }}
        ></div>
        <Chat className="font-irishGrover absolute right-[200px] bottom-[50%] h-fit w-fit min-h-[64px]" />
        <CarouselPrevious disabled={navDisabled} className="relative left-0">
          Previous
        </CarouselPrevious>
        <CarouselNext disabled={navDisabled} className="relative right-0">
          Next
        </CarouselNext>
      </NavBar>
    </div>
  );
};
NewbFindTutor.displayName = "NewbFindTutor";
export default NewbFindTutor;
