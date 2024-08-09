"use client";

import { FC, ReactNode, useContext, useState } from "react";

import { cn } from "@/lib/utils";
import { type YBRpage } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";
import { NavBar } from "../qq/NavBar";
import { CarouselPrevious, CarouselNext } from "../ui/carousel";
import { StimulusSelector } from "../qq/StimulusSelector";
import { AnimeTutor, Chat } from "@/components/AnimeTutor";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { HdrBar } from "../qq/HdrBar";
import { useProblemStore } from "@/store/_store";
import { TotalSchemaGraphic } from "../schemas/total/graphic";
import { TotalEquationGraphic } from "../schemas/total/equation";
import { ChangeIncreaseSchemaGraphic } from "../schemas/changeIncrease/graphic";
import { ChangeIncreaseEquationGraphic } from "../schemas/changeIncrease/equation";
import { ChangeDecreaseEquationGraphic } from "../schemas/changeDecrease/equation";
import { ChangeDecreaseSchemaGraphic } from "../schemas/changeDecrease/graphic";
import { DifferenceEquationGraphic } from "../schemas/difference/equation";
import { DifferenceSchemaGraphic } from "../schemas/difference/graphic";
import { EqualGroupsEquationGraphic } from "../schemas/equalGroups/equation";
import { CompareEquationGraphic } from "../schemas/compare/equation";
import { SchemaType } from "@/store/_types";
import { TinyTutor } from "../qq/TinyTutor";

const NewbProblemType: FC<{
  className?: string;
  children?: ReactNode;
  page?: YBRpage;
  index: number;
}> = ({ className, page, index }) => {
  // Nav Context
  const { api, current } = useContext(NavContext) as NavContextType;

  // Store
  const {
    logAction,
    submitPickSchema,
    getHint,
    problem,
    session,
    studentLog,
    disabledSchemas,
    onComplete,
  } = useProblemStore();

  // State
  const [schema, setSchema] = useState("");
  const [msg, setMsg] = useState<string>(
    "Check this out! There are different types of problems, Let’s have you select the only one you know about yet, “Total",
  );

  // Event Handlers
  async function handleSelectSchema(schema: string) {
    logAction("NewbProblemType : Selected Schema : " + schema);
    setSchema(schema);
  }

  async function handleCheckSchema(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    console.log("handleCheckSchema");
    if (evt.metaKey) {
      onComplete(session, studentLog);
      api?.scrollNext();
    } else {
      setMsg("Just a moment while I verify your choice");
      logAction("NewbProblemType : Clicked Next");

      let selectedSchema: SchemaType = "additiveChangeSchema";
      switch (schema) {
        case "TOTAL":
          selectedSchema = "additiveTotalSchema";
          break;
        case "DIFFERENCE":
          selectedSchema = "additiveDifferenceSchema";
          break;
        case "CHANGEINCREASE":
          selectedSchema = "additiveChangeSchema";
          break;
        case "CHANGEDECREASE":
          selectedSchema = "additiveChangeSchema";
          break;
        case "EQUALGROUPS":
          selectedSchema = "multiplicativeEqualGroupsSchema";
          break;
        case "COMPARE":
          selectedSchema = "multiplicativeCompareSchema";
          break;
      }

      logAction("NewbProblemType : Checking Schema : " + selectedSchema);
      const result = await submitPickSchema(selectedSchema);
      logAction("NewbProblemType : Checked Schema : " + JSON.stringify(result));
      setMsg(result.message);
      if (result.stepStatus == "VALID") {
        api?.scrollNext();
        onComplete(session, studentLog);
      }
    }
  }

  async function HandleGetHint() {
    setMsg("Hmmm...  Let me see");
    logAction("NewbProblemType : GetHint");
    const hint = await getHint();
    setMsg(hint);
  }

  //
  // JSX
  //
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
            highlightLetter={page?.phase}
            subTitle={page?.phaseLabel}
            instructions={page?.title}
          ></HdrBar>
          <div>
            <h1>Stimulus</h1>
          </div>
          <StimulusSelector
            className={cn(
              "flex w-full rounded-md border border-input px-3 py-2 mb-2 text-sm bg-slate-300",
              className,
            )}
            stimulusText={problem.stimulus}
          ></StimulusSelector>
          <div className="grow grid grid-cols-2 gap-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>
                  <CardTitle>Knowns</CardTitle>
                </CardTitle>
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
              <CardHeader className="pb-2">
                <CardTitle>
                  <CardTitle>Unknowns</CardTitle>
                </CardTitle>
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
          <div className="grow flex flex-wrap gap-2 mb-4 justify-center">
            <Card
              className={cn(
                "w-[400px] sm:w-[250px] md:w-[48%] lg:w-[500] xl:w-[520px] 2xl:w-[300px]",
                disabledSchemas?.includes("additiveTotalSchema")
                  ? "bg-slate-400 text-slate-500 cursor-not-allowed"
                  : schema === "TOTAL"
                    ? "bg-qqAccent cursor-pointer"
                    : "bg-white cursor-pointer",
              )}
              onClick={() => handleSelectSchema("TOTAL")}
            >
              <CardHeader className="pb-2">
                <CardTitle>Total</CardTitle>
              </CardHeader>
              <CardContent>
                <TotalSchemaGraphic className="mb-4" />
                <TotalEquationGraphic />
              </CardContent>
            </Card>

            <Card
              className={cn(
                "w-[400px] sm:w-[250px] md:w-[48%] lg:w-[500] xl:w-[520px] 2xl:w-[300px]",
                disabledSchemas?.includes("additiveDifferenceSchema")
                  ? "bg-slate-400 text-slate-500 cursor-not-allowed"
                  : schema === "DIFFERENCE"
                    ? "bg-qqAccent cursor-pointer"
                    : "bg-white cursor-pointer",
              )}
              onClick={() => handleSelectSchema("DIFFERENCE")}
            >
              <CardHeader className="pb-2">
                <CardTitle>Difference</CardTitle>
              </CardHeader>
              <CardContent>
                <DifferenceSchemaGraphic className="mb-4" />
                <DifferenceEquationGraphic />
              </CardContent>
            </Card>

            <Card
              className={cn(
                "w-[400px] sm:w-[250px] md:w-[48%] lg:w-[500] xl:w-[520px] 2xl:w-[300px]",
                disabledSchemas?.includes("additiveChangeSchema")
                  ? "bg-slate-400 text-slate-500 cursor-not-allowed"
                  : schema === "CHANGEINCREASE"
                    ? "bg-qqAccent cursor-pointer"
                    : "bg-white cursor-pointer",
              )}
              onClick={() => handleSelectSchema("CHANGEINCREASE")}
            >
              <CardHeader className="pb-2">
                <CardTitle>Change Increase</CardTitle>
              </CardHeader>
              <CardContent>
                <ChangeIncreaseSchemaGraphic className="mb-4" />
                <ChangeIncreaseEquationGraphic />
              </CardContent>
            </Card>
            <Card
              className={cn(
                "w-[400px] sm:w-[250px] md:w-[48%] lg:w-[500] xl:w-[520px] 2xl:w-[300px]",
                disabledSchemas?.includes("additiveChangeSchema")
                  ? "bg-slate-400 text-slate-500 cursor-not-allowed"
                  : schema === "CHANGEDECREASE"
                    ? "bg-qqAccent cursor-pointer"
                    : "bg-white cursor-pointer",
              )}
              onClick={() => handleSelectSchema("CHANGEDECREASE")}
            >
              <CardHeader className="pb-2">
                <CardTitle>Change Decrease</CardTitle>
              </CardHeader>
              <CardContent>
                <ChangeDecreaseSchemaGraphic className="mb-4" />
                <ChangeDecreaseEquationGraphic />
              </CardContent>
            </Card>
            <div className="h-0 basis-full"></div>
            <Card
              className={cn(
                "w-[400px] sm:w-[250px] md:w-[48%] lg:w-[500] xl:w-[520px] 2xl:w-[300px]",
                schema === "EQUALGROUPS" ? "bg-qqAccent" : "bg-white",
                disabledSchemas?.includes("multiplicativeEqualGroupsSchema")
                  ? "bg-slate-400 text-slate-500 cursor-not-allowed"
                  : schema === "EQUALGROUPS"
                    ? "bg-qqAccent cursor-pointer"
                    : "bg-white cursor-pointer",
              )}
              onClick={() => handleSelectSchema("EQUALGROUPS")}
            >
              <CardHeader className="pb-2">
                <CardTitle>Equal Groups</CardTitle>
              </CardHeader>
              <CardContent>
                <EqualGroupsEquationGraphic />
              </CardContent>
            </Card>
            <Card
              className={cn(
                "w-[400px] sm:w-[250px] md:w-[48%] lg:w-[500] xl:w-[520px] 2xl:w-[300px]",
                disabledSchemas?.includes("multiplicativeCompareSchema")
                  ? "bg-slate-400 text-slate-500 cursor-not-allowed"
                  : schema === "COMPARE"
                    ? "bg-qqAccent cursor-pointer"
                    : "bg-white cursor-pointer",
              )}
              onClick={() => handleSelectSchema("COMPARE")}
            >
              <CardHeader className="pb-2">
                <CardTitle>Compare</CardTitle>
              </CardHeader>
              <CardContent>
                <CompareEquationGraphic />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <NavBar className="flex justify-end pr-2 space-x-3 bg-slate-300 relative">
        <TinyTutor
          intro={page?.intro}
          psHints={page?.psHints || []}
          aiHints={true}
        />
        <div
          className="h-full bottom-0 right-0 w-[100px] border-solid border-red-500 z-10 cursor-pointer"
          onClick={() => {
            HandleGetHint();
          }}
        ></div>

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
        <h1 className="absolute bottom-0 left-0 text-slate-500">
          NewbProblemType
        </h1>
      </NavBar>
    </div>
  );
};

NewbProblemType.displayName = "NewbProblemType";
export default NewbProblemType;
