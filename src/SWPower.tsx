// General imports
import { useEffect, useState } from "react";

// ShadCN/UI imports
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./components/ui/carousel";

// SWPWR-specific imports
import { NavBar } from "./components/qq/NavBar";
import { AnimeTutor, AvatarAPIProvider } from "@queriumcorp/animetutor";
import { YellowBrickRoad } from "./components/qq/YellowBrickRoad";
import { renderPage } from "./components/qq/RenderPage";
import { NavContext } from "./NavContext";

function SWPower() {
  const ybr = YellowBrickRoad;
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <NavContext.Provider value={{ current, setCurrent }}>
      <AvatarAPIProvider>
        <div className="SWPower fixed top-[354px] left-0 right-0 bottom-0 flex flex-col ">
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

            <NavBar className="flex justify-end pr-2 space-x-3 bg-slate-300">
              {ybr[current].phase !== "I" ? (
                <AnimeTutor
                  style={{
                    bottom: "0px",
                    right: "0px",
                    height: "100%",
                    // border: "solid 1px red",
                  }}
                />
              ) : null}
              <CarouselPrevious className="relative left-0">
                Previous
              </CarouselPrevious>
              <CarouselNext className="relative right-0">Next</CarouselNext>
            </NavBar>
          </Carousel>
        </div>
      </AvatarAPIProvider>
    </NavContext.Provider>
  );
}

export default SWPower;
