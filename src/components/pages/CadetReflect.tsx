"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { YellowBrickRoad, type YBRpage } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";
import {
  useAvatarAPI,
  AvatarAPIType,
  AnimeTutor,
} from "@/components/AnimeTutor";
import { NavBar } from "../qq/NavBar";
import { StimulusSelector } from "../qq/StimulusSelector";
import { CarouselPrevious, CarouselNext } from "../ui/carousel";
import { RadioGroup, RadioGroupItem } from "../ui/radio";
import { Label } from "../ui/label";
import { useProblemStore } from "@/store/_store";

const CadetReflect: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page?: YBRpage;
  index: number;
}> = ({ className, index }) => {
  const { current } = React.useContext(NavContext) as NavContextType;

  // Store
  const { problem } = useProblemStore();

  const [answer, setAnswer] = React.useState<string>("");

  const { sayMsg } = useAvatarAPI() as AvatarAPIType;

  React.useEffect(() => {
    sayMsg("You've prepared and organized...'!", "idle:02");
  }, []);

  const fakeAnswer = "Something... something... DarkSide";

  // JSX
  if (current !== index + 1) return null; // Dont render if page not active
  return (
    <div
      className={cn(
        "CadetReflect",
        "rounded-lg  bg-card text-card-foreground shadow-sm w-full h-full m-0 mb-2 pl-2 pt-2 pr-2 flex flex-col justify-stretch ",
        className,
      )}
    >
      <div className="div flex flex-col p-2 gap-2 justify-stretch grow relative  mb-2">
        <div className="absolute top-0 left-0 bottom-0 right-0  overflow-y-scroll">
          <h1>CadetReflect</h1>
          <div>
            <h1>Why is this answer correct?</h1>
          </div>
          <StimulusSelector
            className={cn(
              "flex w-full rounded-md border border-input px-3 py-2 mb-2 text-sm bg-slate-300",
              className,
            )}
            stimulusText={problem.stimulus || ""}
          ></StimulusSelector>
          <h1>
            What is the best answer for why does "{fakeAnswer}" make sense as
            the correct solution?
          </h1>
          <RadioGroup
            defaultValue=""
            onValueChange={(v) => {
              setAnswer(v);
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="r1" />
              <Label htmlFor="r1">Default</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="comfortable" id="r2" />
              <Label htmlFor="r2">Comfortable</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="compact" id="r3" />
              <Label htmlFor="r3">Compact</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <NavBar className="flex justify-end pr-2 space-x-3 bg-slate-300">
        {/* Tiny Avatar */}
        {YellowBrickRoad[current].phase !== "I" ? (
          <AnimeTutor
            style={{
              bottom: "0px",
              right: "0px",
              height: "100%",
            }}
          />
        ) : null}
        <CarouselPrevious className="relative left-0">
          Previous
        </CarouselPrevious>
        <CarouselNext
          disabled={answer.length === 0}
          className="relative right-0"
        >
          Next
        </CarouselNext>
      </NavBar>
    </div>
  );
};
CadetReflect.displayName = "CadetReflect";
export default CadetReflect;
