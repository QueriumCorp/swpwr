import { NavBar } from "./components/qq/NavBar";
import { Card, CardContent } from "./components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./components/ui/carousel";

function SWPower() {
  return (
    <div className="SWPower fixed top-[400px] left-0 right-0 bottom-0 bg-blue-500 flex flex-col ">
      <Carousel className="Carousel flex-grow flex flex-col">
        <CarouselContent
          className="CarouselContent relative flex-grow pr-0 m-0"
          style={{ paddingRight: "0px" }}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="CarouselItem h-full p-0 m-0">
              <div className="p-1 h-full">
                <Card className="Card h-full">
                  <CardContent className="CardContent flex items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <NavBar className="flex justify-end pr-2 space-x-3">
          <CarouselPrevious className="relative left-0">
            Previous
          </CarouselPrevious>
          <CarouselNext className="relative right-0">Next</CarouselNext>
        </NavBar>
      </Carousel>
    </div>
  );
}

export default SWPower;
