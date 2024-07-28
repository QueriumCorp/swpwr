"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { type YBRpage } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";
import { NavBar } from "../qq/NavBar";
import { CarouselPrevious, CarouselNext } from "../ui/carousel";
import { StimulusSelector } from "../qq/StimulusSelector";
import {
  AnimeTutor,
  AvatarAPIType,
  Chat,
  useAvatarAPI,
} from "@/components/AnimeTutor";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useProblemStore } from "@/store/_store";

const CadetFillDiagram: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page: YBRpage;
  index: number;
}> = ({ className, index }) => {
  const { current } = React.useContext(NavContext) as NavContextType;

  // Store
  const { problem } = useProblemStore();

  const { sayMsg } = useAvatarAPI() as AvatarAPIType;
  React.useEffect(() => {
    sayMsg(
      "Check this out! There are different types of problems, Let’s have you select the only one you know about.",
      "idle:03",
    );
  }, []);

  const fakeKnowns = ["49 miles", "100 miles", "1000 miles"];
  const fakeUnknowns = ["Time to lunch", "Time to go to the store"];
  let fakeDiagramType = "DiagramCombine";

  // JSX
  if (current !== index + 1) return null;
  return (
    <div
      className={cn(
        "CadetFillDiagram",
        "rounded-lg  bg-card text-card-foreground shadow-sm w-full h-full m-0 mb-2 pl-2 pt-2 pr-2 flex flex-col justify-stretch ",
        className,
      )}
    >
      <div className="div flex flex-col p-2 gap-2 justify-stretch grow relative  mb-2">
        <div className="absolute top-0 left-0 bottom-0 right-0  overflow-y-scroll">
          <h1>CadetFillDiagram</h1>
          <div>
            <h1>Stimulus</h1>
          </div>
          <StimulusSelector
            className={cn(
              "flex w-full rounded-md border border-input px-3 py-2 mb-2 text-sm bg-slate-300",
              className,
            )}
            stimulusText={problem.stimulus || ""}
          ></StimulusSelector>

          <h2 className="mt-3 ml-1 mr-1">
            Drag the items to fill in the relevant fields in the equation
          </h2>
          <div className="grow grid grid-cols-2 gap-2">
            <Card>
              <CardHeader>
                <CardTitle>Knowns</CardTitle>
              </CardHeader>
              <CardContent>
                <ul>
                  {fakeKnowns.map((known) => (
                    <li key={known}>{known}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Unknowns</CardTitle>
              </CardHeader>
              <CardContent>
                <ul>
                  {fakeUnknowns.map((unknown) => (
                    <li key={unknown}>{unknown}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="grow grid grid-cols-2 gap-2"></div>
        </div>
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
};
CadetFillDiagram.displayName = "CadetFillDiagram";
export default CadetFillDiagram;
