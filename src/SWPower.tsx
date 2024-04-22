import { Card, CardContent } from "./components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./components/ui/carousel";

function SWPower() {
  return (
    <div className="fixed top-[400px] left-0 right-0 bottom-0 bg-blue-500">
      <Carousel className="Carousel absolute h-full w-full">
        <CarouselContent
          className="CarouselContent absolute h-full w-full pr-0 m-0"
          style={{ paddingRight: "0px" }}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="CarouselItem h-full p-0 m-0">
              <div className="p-1 h-full">
                <Card className="Card">
                  <CardContent className="CardContent flex items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default SWPower;
