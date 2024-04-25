// ShadCN/UI imports
import { Card, CardContent } from "./components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./components/ui/carousel";

// SWPWR-specific imports
import { NavBar } from "./components/qq/NavBar";
import { AnimeTutor, AvatarAPIProvider } from "@queriumcorp/animetutor";
import { ControlPanel } from "./components/qq/ControlPanel";
import { IntroVideo } from "./components/qq/IntroVideo";
import { YellowBrickRoad } from "./components/qq/YellowBrickRoad";

function SWPower() {
  const ybr = YellowBrickRoad;

  return (
    <AvatarAPIProvider>
      <div className="SWPower fixed top-[354px] left-0 right-0 bottom-0 flex flex-col ">
        <Carousel className="Carousel flex-grow flex flex-col">
          <CarouselContent
            className="CarouselContent relative flex-grow pr-0 m-0"
            style={{ paddingRight: "0px" }}
          >
            {ybr.map((page, index) => (
              <CarouselItem
                key={page.rank + ":" + page.id}
                className="CarouselItem h-full p-0 m-0"
              >
                {/*                         */}
                {/* page components go here */}
                {/*                         */}
                <div className="p-1 h-full">
                  <Card className="Card h-full">
                    <CardContent className="CardContent flex flex-col items-center justify-center p-6">
                      <span className="text-4xl font-semibold">
                        {page.rank + ":" + page.id + 1}
                      </span>
                      {index == 1 ? <IntroVideo /> : null}
                      {index == 2 ? <ControlPanel /> : null}
                    </CardContent>
                  </Card>
                </div>
                {/*                         */}
                {/* page components go here */}
                {/*                         */}
              </CarouselItem>
            ))}
          </CarouselContent>

          <NavBar className="flex justify-end pr-2 space-x-3">
            <AnimeTutor
              style={{ bottom: "0px", right: "0px", height: "100px" }}
            />
            <CarouselPrevious className="relative left-0">
              Previous
            </CarouselPrevious>
            <CarouselNext className="relative right-0">Next</CarouselNext>
          </NavBar>
        </Carousel>
      </div>
    </AvatarAPIProvider>
  );
}

export default SWPower;
