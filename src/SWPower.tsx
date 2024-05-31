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

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "./components/ui/drawer";

import { useProblemStore } from "./store/_store";

export interface StepWisePowerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  studentName?: string;
}

const StepWisePower = forwardRef<HTMLDivElement, StepWisePowerProps>(
  ({ className }, _ref) => {
    const ybr = YellowBrickRoad;
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

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

    const { studentLog } = useProblemStore();

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
                <div className="mx-auto w-full">
                  <DrawerHeader>
                    <DrawerTitle>Log</DrawerTitle>
                    <DrawerDescription>
                      log of student activities and server communications
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4 pb-0">
                    <div className="p-2overflow-y-scroll overflow-x-auto">
                      <div className="table w-full">
                        <div className="table-row w-full p-2">
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
                                <div className="table-cell">{item.action}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
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
