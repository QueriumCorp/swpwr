import DiagramCombineWidget from "./DiagramCombineWidget";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface DiagramCombineProps extends HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  onChange?: () => void;
}

const DiagramCombine: React.FC<DiagramCombineProps> = ({
  selected = false,
  onChange = () => {
    alert("DiagramChange onChange not defined");
  },
  className,
}) => {
  function clickHandler() {
    onChange();
    //   {
    //   type: "diagramSelected",
    //   payload: "COMBINE",
    // }
  }
  return (
    <div className={cn("DiagramCombine p-1", className)}>
      <Card onClick={clickHandler}>
        <CardHeader>
          <CardTitle>COMBINE</CardTitle>
          <CardDescription>
            Are parts put together into a total?
          </CardDescription>
        </CardHeader>

        <CardContent className={`diagramCard ${selected ? "selected" : ""}`}>
          <div className="flex min-h-[100px] min-w-[400px] max-w-[400px] grow p-2 flex-col">
            <DiagramCombineWidget />
            <div className="diagramEquation text-center">P + Q = T</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiagramCombine;
