"use client";

import { FC, ReactNode, useContext, useEffect, useState } from "react";

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
} from "@queriumcorp/animetutor";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import DiagramCombine from "../qq/DiagramCombine/DiagramCombine";
import DiagramChange from "../qq/DiagramChange/DiagramChange";
import DiagramMultiplyTimes from "../qq/DiagramMultiplyTimes/DiagramMultiplyTimes";
import DiagramEqualGroups from "../qq/DiagramEqualGroups/DiagramEqualGroups";
import { HdrBar } from "../qq/HdrBar";
import { useProblemStore } from "@/store/_store";
import { SchemaType } from "@/store/_types";

const NewbProblemType: FC<{
  className?: string;
  children?: ReactNode;
  page: YBRpage;
  index: number;
}> = ({ className, children, page, index }) => {
  // Nav Context
  const { api, current } = useContext(NavContext) as NavContextType;

  // Store
  const { logAction, submitPickSchema, getHint, problem, session } =
    useProblemStore();

  // State
  const [schema, setSchema] = useState<SchemaType>("");

  // Side Effects
  const { sayMsg } = useAvatarAPI() as AvatarAPIType;
  useEffect(() => {
    sayMsg(
      "Check this out! There are different types of problems, Let’s have you select the only one you know about yet, “TotaL",
      "idle:03",
    );
  }, []);

  // Event Handlers
  async function handleSelectSchema(schema: SchemaType) {
    logAction("NewbProblemType : Selected Schema : " + schema);
    setSchema(schema);
  }
  async function handleCheckSchema(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    console.log("handleCheckSchema");
    if (evt.metaKey) {
      api?.scrollNext();
    } else {
      sayMsg("Just a moment while I verify your choice", "idle:02");
      logAction("NewbProblemType : Clicked Next");

      logAction("NewbProblemType : Checking Schema : " + schema);
      const result = await submitPickSchema(schema);
      logAction("NewbProblemType : Checked Schema : " + JSON.stringify(result));
      sayMsg(result.message, "idle:01");
      if (result.stepStatus == "VALID") {
        api?.scrollNext();
      }
    }
  }
  async function HandleGetHint() {
    sayMsg("Hmmm...  Let me see", "idle:02");
    logAction("NewbProblemType : GetHint");
    const hint = await getHint();
    sayMsg(hint, "idle:03");
  }

  // JSX
  if (current !== index + 1) return null;
  return (
    <div
      className={cn(
        "NewbProblemType rounded-lg  bg-card text-card-foreground shadow-sm w-full h-full m-0 mb-2 pl-2 pt-2 pr-2 flex flex-col justify-stretch ",
        className,
      )}
    >
      <div className="div flex flex-col p-2 gap-2 justify-stretch grow relative  mb-2">
        <div className="absolute top-0 left-0 bottom-0 right-0  overflow-y-scroll">
          <HdrBar
            highlightLetter="P"
            subTitle="Prepare"
            instructions="Read the Statement"
          ></HdrBar>
          <div>
            <h1>Stimulus</h1>
          </div>
          <StimulusSelector
            className={cn(
              "flex min-h-[80px] w-full rounded-md border border-input px-3 py-2 mb-2 text-sm bg-slate-300",
              className,
            )}
            stimulusText={problem.stimulus}
          ></StimulusSelector>
          <div className="grow grid grid-cols-2 gap-2">
            <Card>
              <CardHeader>
                <CardTitle>Knowns</CardTitle>
              </CardHeader>
              <CardContent>
                {session.knowns ? (
                  <ul>
                    {session.knowns.map((known) => (
                      <li key={known}>{known}</li>
                    ))}
                  </ul>
                ) : null}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Unknowns</CardTitle>
              </CardHeader>
              <CardContent>
                {session.unknowns ? (
                  <ul>
                    {session.unknowns.map((unknown) => (
                      <li key={unknown}>{unknown}</li>
                    ))}
                  </ul>
                ) : null}
              </CardContent>
            </Card>
          </div>
          <h2 className="mt-3 ml-1 mr-1">
            Click on the type of problem you think this is
          </h2>
          <div className="grow grid grid-cols-2 gap-2">
            <Card
              className={cn("DiagramCombine", "p-1", {
                "border-2 border-qqBrand": schema === "combineAdditiveSchema",
              })}
              onClick={() => {
                handleSelectSchema("combineAdditiveSchema");
                logAction("Schema selected - combineAdditiveSchema");
              }}
            >
              <DiagramCombine />
            </Card>

            <Card
              className={cn("DiagramChange", "p-1", {
                "border-2 border-qqBrand": schema === "changeAdditiveSchema",
              })}
              onClick={() => {
                handleSelectSchema("changeAdditiveSchema");
                logAction("Schema selected - changeAdditiveSchema");
              }}
            >
              <DiagramChange />
            </Card>

            <Card
              className={cn("DiagramMultiplyTimes", "p-1", {
                "border-2 border-qqBrand": schema === "fakeThreeSchema",
              })}
              onClick={() => {
                handleSelectSchema("fakeThreeSchema");
                logAction("Schema selected - fakeThreeSchema");
              }}
            >
              <DiagramMultiplyTimes />
            </Card>

            <Card
              className={cn("DiagramEqualGroups", "p-1", {
                "border-2 border-qqBrand":
                  schema === "multiplicativeEqualGroupsSchema",
              })}
              onClick={() => {
                handleSelectSchema("multiplicativeEqualGroupsSchema");
                logAction("Schema selected - multiplicativeEqualGroupsSchema");
              }}
            >
              <DiagramEqualGroups />
            </Card>
          </div>
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
        <div
          className="h-full bottom-0 right-0 w-[100px] border-solid border-red-500 z-10 cursor-pointer"
          onClick={() => {
            HandleGetHint();
          }}
        ></div>
        <Chat className="font-irishGrover absolute right-[200px] bottom-[50%] h-fit w-fit min-h-[64px]" />
        <CarouselPrevious className="relative left-0">
          Previous
        </CarouselPrevious>
        <CarouselNext
          className="relative right-0"
          onClick={(evt) => {
            handleCheckSchema(evt);
          }}
        >
          Next
        </CarouselNext>
      </NavBar>
    </div>
  );
};
NewbProblemType.displayName = "NewbProblemType";
export default NewbProblemType;
