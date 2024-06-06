"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { type YBRpage } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Chip from "../qq/Chip";
import KnownFacts from "../qq/KnownFacts";
import { StimulusSelector } from "../qq/StimulusSelector";
import UnknownFacts from "../qq/UnknownFacts";
import { NavBar } from "../qq/NavBar";
import { CarouselPrevious, CarouselNext } from "../ui/carousel";
import {
  AnimeTutor,
  AvatarAPIType,
  Chat,
  useAvatarAPI,
} from "@/components/AnimeTutor";
import { HdrBar } from "../qq/HdrBar";
import { useProblemStore } from "@/store/_store";

const CadetFindFacts: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page?: YBRpage;
  index: number;
}> = ({ className, index }) => {
  // Dont render if page not active
  const { current } = React.useContext(NavContext) as NavContextType;

  // Store
  const { problem } = useProblemStore();

  const [knowns, setKnowns] = React.useState<string[]>([]);
  const [unknowns, setUnknowns] = React.useState<string[]>([]);
  const [currentFact, setCurrentFact] = React.useState<string>("");

  const delKnown = (fact: string) => {
    setKnowns(knowns.filter((thisFact) => thisFact !== fact));
  };

  const delUnknown = (fact: string) => {
    setUnknowns(unknowns.filter((thisFact) => thisFact !== fact));
  };

  const { sayMsg } = useAvatarAPI() as AvatarAPIType;
  React.useEffect(() => {
    sayMsg(
      "I know a few things about you, but I’m sure you’ll find more!",
      "idle:01",
    );
  }, []);

  // JSX
  if (current !== index + 1) return null;
  return (
    <div
      className={cn(
        "CadetFindFacts rounded-lg border bg-card text-card-foreground shadow-sm w-full h-full m-0 p-0 flex flex-col justify-stretch",
        className,
      )}
    >
      <HdrBar
        highlightLetter="P"
        subTitle="Prepare"
        instructions="Pull Apart the Problem"
      ></HdrBar>
      <div className="flex flex-col p-2 gap-2 justify-stretch grow relative">
        <DndContext onDragEnd={handleDragEnd}>
          <StimulusSelector
            onChangeFact={setCurrentFact}
            className={cn(
              "flex w-full rounded-md border border-input bg-slate-200 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className,
              "inline",
            )}
            stimulusText={problem.stimulus}
          ></StimulusSelector>

          <div className="flex grow gap-2">
            <KnownFacts add={addKnown}>
              {knowns.map((known) => (
                <Chip
                  id={known}
                  key={known}
                  label={known}
                  onDelete={delKnown}
                ></Chip>
              ))}
            </KnownFacts>
            <UnknownFacts add={addUnknown}>
              {unknowns.map((unknown) => (
                <Chip
                  id={unknown}
                  key={unknown}
                  label={unknown}
                  onDelete={delUnknown}
                ></Chip>
              ))}
            </UnknownFacts>
          </div>
        </DndContext>
      </div>
      <NavBar className="flex justify-end pr-2 space-x-3 bg-slate-300 relative">
        {/* Tiny Avatar */}
        <AnimeTutor
          style={{
            bottom: "0px",
            right: "0px",
            height: "100%",
          }}
        />
        <Chat
          msg="RATATATA"
          className="font-irishGrover absolute right-[200px] bottom-[50%] h-fit w-fit min-h-[64px]"
        />
        <CarouselPrevious className="relative left-0">
          Previous
        </CarouselPrevious>
        <CarouselNext className="relative right-0">Next</CarouselNext>
      </NavBar>
    </div>
  );

  function handleDragEnd(event: DragEndEvent) {
    if (currentFact.length == 0 || currentFact.trim().length == 0) return;
    if (knowns.includes(currentFact)) return;

    if (event.over && event.over.id === "KnownFacts") {
      setKnowns([...knowns, currentFact]);
    }
    if (event.over && event.over.id === "UnknownFacts") {
      setUnknowns([...unknowns, currentFact]);
    }
    setCurrentFact("");
  }

  function addKnown() {
    if (currentFact.length == 0 || currentFact.trim().length == 0) return;
    if (knowns.includes(currentFact)) return;

    setKnowns([...knowns, currentFact]);
    setCurrentFact("");
  }
  function addUnknown() {
    if (currentFact.length == 0 || currentFact.trim().length == 0) return;
    if (unknowns.includes(currentFact)) return;
    setUnknowns([...unknowns, currentFact]);
    setCurrentFact("");
  }
};

CadetFindFacts.displayName = "CadetFindFacts";
export default CadetFindFacts;
