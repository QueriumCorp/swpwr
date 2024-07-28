"use client";

import { FC, ReactNode, useContext, useState } from "react";

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
import { HdrBar } from "../qq/HdrBar";
import { useProblemStore } from "@/store/_store";
import { TinyTutor } from "../qq/TinyTutor";

const NewbFindFacts: FC<{
  className?: string;
  children?: ReactNode;
  page?: YBRpage;
  index: number;
}> = ({ className, page, index }) => {
  //
  // Context
  //
  const { api, current } = useContext(NavContext) as NavContextType;

  //
  // Store
  //
  const { logAction, submitTTable, getHint, problem } = useProblemStore();

  //
  // State
  //
  const [knowns, setKnowns] = useState<string[]>([]);
  const [unknowns, setUnknowns] = useState<string[]>([]);
  const [currentFact, setCurrentFact] = useState<string>("");
  const [emote, setEmote] = useState<string>("gratz:02");
  const [msg, setMsg] = useState<string>("");

  //
  // Event Handlers
  //
  const delKnown = (fact: string) => {
    logAction(`NewbFindFacts : Deleted '${fact}' from KnownFacts`);
    setKnowns(knowns.filter((thisFact) => thisFact !== fact));
  };
  const delUnknown = (fact: string) => {
    logAction(`NewbFindFacts : Deleted '${fact}' from UnknownFacts`);
    setUnknowns(unknowns.filter((thisFact) => thisFact !== fact));
  };
  async function HandleCheckFacts(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    if (evt.metaKey) {
      //If Cmd+Enter just scroll to next page
      api?.scrollNext();
    } else {
      setMsg("Give me a sec to review your knowns and unknowns");
      setEmote("direct:02");
      logAction("NewbFindFacts : Clicked Next");

      logAction("NewbFindFacts : Checking Facts");
      const result = await submitTTable(knowns, unknowns);
      setMsg(result.message);
      setEmote("pout:04");
      if (result.stepStatus == "VALID") {
        api?.scrollNext();
      }
    }
  }
  async function HandleGetHint() {
    setMsg("Hmmm...  Let me see");
    setEmote("direct:03");
    logAction("NewbFindFacts : GetHint");
    const hint = await getHint();
    setMsg(hint);
  }

  // JSX
  if (current !== index + 1) return null;
  return (
    <div
      className={cn(
        "NewbFindFacts rounded-lg border bg-card text-card-foreground shadow-sm w-full h-full m-0 p-0 flex flex-col justify-stretch",
        className,
      )}
    >
      <HdrBar
        highlightLetter={page?.phase}
        subTitle={page?.phaseLabel}
        instructions={page?.title}
      ></HdrBar>
      <div className="flex flex-col p-2 gap-2 justify-stretch grow relative">
        <DndContext onDragEnd={handleDragEnd}>
          <StimulusSelector
            interactive={true}
            onChangeFact={setCurrentFact}
            className={cn(
              "flex w-full rounded-md border border-input bg-slate-200 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className,
              "inline",
            )}
            stimulusText={problem.stimulus}
          ></StimulusSelector>

          <div className=" grow ">
            <div className="grid gap-1 grid-cols-2 h-full">
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
          </div>
        </DndContext>
      </div>
      <NavBar className="flex justify-end pr-2 space-x-3 bg-slate-300 relative">
        <TinyTutor
          msg={msg}
          intro={page?.intro}
          psHints={page?.psHints || []}
          aiHints={true}
        />
        <CarouselPrevious className="relative left-0">
          Previous
        </CarouselPrevious>
        <CarouselNext
          className="relative right-0"
          onClick={(evt) => HandleCheckFacts(evt)}
        >
          Next
        </CarouselNext>
        <h1 className="absolute bottom-0 left-0 text-slate-500">
          NewbFindFacts
        </h1>
      </NavBar>
    </div>
  );

  function handleDragEnd(event: DragEndEvent) {
    if (currentFact.length == 0 || currentFact.trim().length == 0) return;
    if (knowns.includes(currentFact)) return;

    if (event.over && event.over.id === "KnownFacts") {
      setKnowns([...knowns, currentFact]);
      logAction(`NewbFindFacts : Dropped '${currentFact}' on KnownFacts`);
    }
    if (event.over && event.over.id === "UnknownFacts") {
      setUnknowns([...unknowns, currentFact]);
      logAction(`NewbFindFacts : Dropped '${currentFact}' on UnknownFacts`);
    }
    setCurrentFact("");
  }

  function addKnown() {
    if (currentFact.length == 0 || currentFact.trim().length == 0) return;
    if (knowns.includes(currentFact)) return;

    logAction(`NewbFindFacts : Added '${currentFact}' to KnownFacts`);
    setKnowns([...knowns, currentFact]);
    setCurrentFact("");
  }
  function addUnknown() {
    if (currentFact.length == 0 || currentFact.trim().length == 0) return;
    if (unknowns.includes(currentFact)) return;
    logAction(`NewbFindFacts : Added '${currentFact}' to UnknownFacts`);
    setUnknowns([...unknowns, currentFact]);
    setCurrentFact("");
  }
};

NewbFindFacts.displayName = "NewbFindFacts";
export default NewbFindFacts;
