import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DiagramChangeWidget from "./DiagramChangeWidget";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface DiagramChangeProps extends HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  onChange?: () => void;
}

const DiagramChange: React.FC<DiagramChangeProps> = ({
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
    //   payload: "CHANGE",
    // }
  }

  return (
    <div className={cn("DiagramChange p-1", className)}>
      <Card onClick={clickHandler}>
        <CardHeader>
          <CardTitle>CHANGE</CardTitle>
          <CardDescription>
            Is there a start amount that increases or decreases to a new amount?
          </CardDescription>
        </CardHeader>
        <CardContent className={`diagramCard ${selected ? "selected" : ""}`}>
          <div className="flex min-h-[100px] min-w-[400px] max-w-[400px] grow p-2 flex-col">
            <DiagramChangeWidget />
            <div className="diagramEquation text-center">S +/- C = E</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiagramChange;
