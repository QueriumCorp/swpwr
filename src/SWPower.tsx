// General imports
import { forwardRef, useEffect, useState } from "react";
import z from "zod";
import { useHotkeys } from "react-hotkeys-hook";
import { BsBugFill } from "react-icons/bs";

// ShadCN/UI imports
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "./components/ui/carousel";
import { Drawer, DrawerTrigger, DrawerContent } from "./components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

// SWPWR-specific imports
import { AvatarAPIProvider } from "@/components/AnimeTutor";
import { YellowBrickRoad } from "./components/qq/YellowBrickRoad";
import { renderPage } from "./components/qq/RenderPage";
import { NavContext } from "./NavContext";
import { cn } from "./lib/utils";
import { OptionsSchema, ProblemSchema, StudentSchema } from "./store/_types";

import { useProblemStore } from "./store/_store";

// ShadCN/UI Components
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import VoiceTester from "./components/qq/ChatBubble/VoiceTester";

// Props
const StepWisePowerProps = z.object({
  problem: ProblemSchema,
  student: StudentSchema,
  options: OptionsSchema.optional(),
});
export type StepWisePowerProps = z.infer<typeof StepWisePowerProps> | undefined;

//
// StepWisePower COMPONENT
//
const StepWisePower = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & StepWisePowerProps
>((props, _ref) => {
  let ybr;

  if (props.options?.rank) {
    ybr = YellowBrickRoad.filter((page) => {
      return page.rank == props.options!.rank;
    });
  } else {
    ybr = YellowBrickRoad;
  }

  // State
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [closeMsg, setCloseMsg] = useState("");
  const [traceComment, setTraceComment] = useState("");
  const [traceMsg, setTraceMsg] = useState("");
  const [enableDebugger, setEnableDebugger] = useState(true);
  const [propError, setPropError] = useState("");

  // Store
  const {
    setSwapiUrl,
    setProblem,
    setStudent,
    setSession,
    studentLog,
    problem,
    student,
    session,
    closeSession,
    saveTrace,
  } = useProblemStore();

  // Manage Props and Changes to Props
  useEffect(() => {
    if (props.problem) {
      const probResult = setProblem(props.problem);
      if (probResult && !probResult.problemValid) {
        setPropError(probResult.problemStatusMsg);
      } else {
        setPropError("");
      }
    }
  }, [props.problem]);
  useEffect(() => {
    if (props.student) {
      setStudent(props.student);
    }
  }, [props.student]);
  useEffect(() => {
    if (props.options?.swapiUrl) {
      setSwapiUrl(props.options.swapiUrl);
    }
  }, [props.options?.swapiUrl]);

  // Not sure why I did this
  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    // This fires when the user selects a new page
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Event Handlers
  const handleCloseSession = async () => {
    const msg = await closeSession();
    setCloseMsg(msg);
  };
  const handleSaveTrace = async () => {
    const msg = await saveTrace(traceComment);
    setTraceMsg(msg);
  };
  useHotkeys("shift+ctrl+d", () => {
    setEnableDebugger(!!!enableDebugger);
  });

  // JSX
  return (
    <NavContext.Provider value={{ current, setCurrent, api }}>
      <AvatarAPIProvider>
        <div
          className={cn(
            "StepWisePower min-h-24 w-full border-none relative",
            props.className,
          )}
        >
          <Drawer>
            <DrawerTrigger asChild>
              {enableDebugger && (
                <button className="fixed z-10 right-[50%] bottom-0 rounded-full m-1 text-xs bg-transparent cursor-pointer">
                  <BsBugFill className="text-red-500 text-lg" />
                </button>
              )}
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full h-[400px] relative">
                <Tabs defaultValue="speech" className="w-full h-[95%]">
                  <TabsList className="w-full ">
                    <TabsTrigger value="props">Props</TabsTrigger>
                    <TabsTrigger value="log">Log</TabsTrigger>
                    <TabsTrigger value="store">Store</TabsTrigger>
                    <TabsTrigger value="ybr">YBR</TabsTrigger>
                    <TabsTrigger value="cmds">Commands</TabsTrigger>
                    <TabsTrigger value="errors">Errors</TabsTrigger>
                    <TabsTrigger value="speech">Speech</TabsTrigger>
                  </TabsList>
                  {/* Props */}
                  <TabsContent value="props" className="w-full h-[90%]">
                    <div className="p-4 pb-0 w-full h-full">
                      <div className="p-2 overflow-y-scroll overflow-x-auto w-full h-full">
                        <pre>{JSON.stringify(props, null, 2)}</pre>
                      </div>
                    </div>
                  </TabsContent>
                  {/* Log */}
                  <TabsContent value="log" className="w-full h-[90%]">
                    <div className="p-4 pb-0 w-full h-full">
                      <div className="p-2 overflow-y-scroll overflow-x-auto w-full h-full">
                        <div className="table w-full">
                          <div className="table-row w-full p-2 select-text">
                            {studentLog.map((item, index) => {
                              return (
                                <div
                                  key={index}
                                  className="table-row w-full p-2  border-b-2 border-b-slate-600"
                                >
                                  <div className="table-cell min-w-[100px] text-xs">
                                    {item.timestamp.toLocaleString("en-us", {
                                      hour: "numeric",
                                      minute: "2-digit",
                                      second: "2-digit",
                                    })}
                                  </div>
                                  <div className="table-cell">
                                    <pre className="select-text text-xs">
                                      {item.action}
                                    </pre>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="store" className="w-full h-[90%]">
                    <div className="p-4 pb-0 w-full h-full">
                      <div className="p-2 overflow-y-scroll overflow-x-auto w-full h-full">
                        <h3 className="bg-qqAccent font-sans font-black">
                          Student
                        </h3>
                        <pre className="font-mono text-xs select-text">
                          {JSON.stringify(student, null, 2)}
                        </pre>
                        <h3 className="bg-qqAccent font-sans font-black">
                          Problem
                        </h3>
                        <pre className="font-mono text-xs select-text">
                          {JSON.stringify(problem, null, 2)}
                        </pre>
                        <h3 className="bg-qqAccent font-sans font-black">
                          Session
                        </h3>
                        <pre className="font-mono text-xs select-text">
                          {JSON.stringify(session, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </TabsContent>
                  {/* YellowBrickRoad */}
                  <TabsContent value="ybr" className="w-full h-[90%]">
                    <div className="p-4 pb-0 w-full h-full">
                      <div className="p-2 overflow-y-scroll overflow-x-auto w-full h-full">
                        <pre>{JSON.stringify(ybr, null, 2)}</pre>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="cmds" className="w-full h-[90%]">
                    <div className="p-4 pb-0 w-full h-full">
                      <div className="flex items-center justify-start w-full border-b-2 border-b-slate-600">
                        <Button
                          className="w-48 mr-2"
                          onClick={() => handleCloseSession()}
                        >
                          Close Session
                        </Button>
                        <p className="text-xs select-text">{closeMsg}</p>
                      </div>
                      <div className="flex items-center justify-start w-full border-b-2 border-b-slate-600 mt-4">
                        <Button
                          className="w-48 mr-2"
                          onClick={() => handleSaveTrace()}
                        >
                          Save Trace
                        </Button>
                        <div className="flex flex-col">
                          <Input
                            type="text"
                            className="w-full"
                            value={traceComment}
                            onChange={(e) => setTraceComment(e.target.value)}
                            placeholder="Enter your Comment"
                          />
                          <p className="text-xs select-text">{traceMsg}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="errors" className="w-full h-[90%]">
                    <div className="p-4 pb-0 w-full h-full">
                      <h1>Errors</h1>
                      <div>{propError}</div>
                    </div>
                  </TabsContent>
                  <TabsContent value="speech" className="w-full h-[90%]">
                    <VoiceTester />
                  </TabsContent>
                </Tabs>
              </div>
            </DrawerContent>
          </Drawer>

          <Carousel
            setApi={setApi}
            opts={{ watchDrag: false }}
            className="Carousel flex-grow flex flex-col"
          >
            <CarouselContent
              className="CarouselContent relative flex-grow pr-0 m-0"
              style={{ paddingRight: "0px" }}
            >
              {ybr.length === 0 && (
                <div className="flex items-center justify-center w-full h-full">
                  <h1 className="text-2xl font-bold">
                    Invalid Rank therefore No Data
                  </h1>
                </div>
              )}
              {ybr.map((page, index) => (
                <CarouselItem
                  key={page.rank + ":" + page.id}
                  className="CarouselItem h-full p-0 m-0"
                >
                  {renderPage(page, index)}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </AvatarAPIProvider>
    </NavContext.Provider>
  );
});

export default StepWisePower;
