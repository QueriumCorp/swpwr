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

import { useProblemStore } from "./store/_store";
import { ProblemSchema } from "./components/StepWise/stores/problem";
import { StudentSchema } from "./components/StepWise/stores/student";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

//
// Schemas & Types
//
export type Options = {
  swapiUrl?: string;
  gltfUrl?: string;
  rank?: string;
  disabledSchemas?: string[];
};

export const OptionsSchema = z.object({
  swapiUrl: z.string().optional(),
  gltfUrl: z.string().optional(),
  rank: z.string().optional(),
  disabledSchemas: z.array(z.string()).optional(),
}) satisfies z.ZodType<Options>;

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
  const ybr = YellowBrickRoad;

  // Store
  const {
    setSwapiUrl,
    studentLog,
    problem,
    student,
    session,
    closeSession,
    saveTrace,
  } = useProblemStore();

  // State
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [closeMsg, setCloseMsg] = useState("");
  const [traceComment, setTraceComment] = useState("");
  const [traceMsg, setTraceMsg] = useState("");
  const [enableDebugger, setEnableDebugger] = useState(false);

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

  // set the swapiUrl in the store
  useEffect(() => {
    if (props.options?.swapiUrl) {
      setSwapiUrl(props.options.swapiUrl);
    }
  }, [props.options?.swapiUrl]);

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
                <Tabs defaultValue="log" className="w-full h-full">
                  <TabsList className="w-full ">
                    <TabsTrigger value="log">Log</TabsTrigger>
                    <TabsTrigger value="store">Store</TabsTrigger>
                    <TabsTrigger value="cmds">Commands</TabsTrigger>
                  </TabsList>
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
                                  <div className="table-cell min-w-[100px]">
                                    {item.timestamp.toLocaleString("en-us", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      second: "2-digit",
                                    })}
                                  </div>
                                  <div className="table-cell">
                                    <p className="select-text">{item.action}</p>
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
