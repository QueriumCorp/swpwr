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

export interface StepWisePowerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  studentName?: string;
}

const StepWisePower = forwardRef<HTMLDivElement, StepWisePowerProps>(
  ({ className, ...props }, ref) => {
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

    return (
      <NavContext.Provider value={{ current, setCurrent, api }}>
        <AvatarAPIProvider>
          <div
            className={cn(
              "StepWisePower min-h-24 w-full border-none relative",
              className,
            )}
          >
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
