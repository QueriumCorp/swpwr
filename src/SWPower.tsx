// General imports
import { forwardRef, useEffect, useState } from "react";

// ShadCN/UI imports
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "./components/ui/carousel";

// SWPWR-specific imports
import { AvatarAPIProvider } from "@queriumcorp/animetutor";
import { YellowBrickRoad } from "./components/qq/YellowBrickRoad";
import { renderPage } from "./components/qq/RenderPage";
import { NavContext } from "./NavContext";
import { cn } from "./lib/utils";

import { Drawer, DrawerTrigger, DrawerContent } from "./components/ui/drawer";

import { useProblemStore } from "./store/_store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

export interface StepWisePowerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  swapiUrl?: string;
}

const StepWisePower = forwardRef<HTMLDivElement, StepWisePowerProps>(
  ({ className, swapiUrl }, _ref) => {
    const ybr = YellowBrickRoad;
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const { setSwapiUrl, studentLog, problem, student, session } =
      useProblemStore();

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
      if (swapiUrl) {
        setSwapiUrl(swapiUrl);
      }
    }, [swapiUrl]);

    return (
      <NavContext.Provider value={{ current, setCurrent, api }}>
        <AvatarAPIProvider>
          <div
            className={cn(
              "StepWisePower min-h-24 w-full border-none relative",
              className,
            )}
          >
            <Drawer>
              <DrawerTrigger asChild>
                <button className="fixed z-10 right-0 bottom-0 rounded-full m-1 text-xs bg-transparent cursor-pointer">
                  🧐
                </button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full h-[400px] relative">
                  <Tabs defaultValue="log" className="w-full h-full">
                    <TabsList className="w-full ">
                      <TabsTrigger value="log">Log</TabsTrigger>
                      <TabsTrigger value="store">Store</TabsTrigger>
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
                                      <p>{item.action}</p>
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
                          <pre className="font-mono text-xs">
                            {JSON.stringify(student, null, 2)}
                          </pre>
                          <h3 className="bg-qqAccent font-sans font-black">
                            Problem
                          </h3>
                          <pre className="font-mono text-xs">
                            {JSON.stringify(problem, null, 2)}
                          </pre>
                          <h3 className="bg-qqAccent font-sans font-black">
                            Session
                          </h3>
                          <pre className="font-mono text-xs">
                            {JSON.stringify(session, null, 2)}
                          </pre>
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
  },
);

export default StepWisePower;
