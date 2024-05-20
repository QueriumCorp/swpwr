import { HTMLAttributes } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import DiagramMultiplyTimesWidget from "./DiagramMultiplyTimesWidget";

interface DiagramMultiplyTimesProps extends HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  onChange?: () => void;
}
const DiagramMultiplyTimes: React.FC<DiagramMultiplyTimesProps> = ({
  selected = false,
  onChange = () => {
    alert("DiagramMultiplyTimes onChange not defined");
  },
  className,
}) => {
  function clickHandler() {
    onChange();
    //   {
    //   type: "diagramSelected",
    //   payload: "MULTIPLYTIMES",
    // }
  }
  return (
    <div className={cn("DiagramMultiplyTimes p-0 flex", className)}>
      <Card onClick={clickHandler}>
        <CardHeader>
          <CardTitle>MULTIPLE TIMES</CardTitle>
          <CardDescription>
            Are amounts/sets compared a number of times?
          </CardDescription>
        </CardHeader>

        <CardContent className={`diagramCard ${selected ? "selected" : ""}`}>
          <div className="flex min-h-[100px] min-w-[400px] max-w-[400px] grow p-2 flex-col">
            <DiagramMultiplyTimesWidget />
            <div className="diagramEquation text-center">S X M = P</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiagramMultiplyTimes;
