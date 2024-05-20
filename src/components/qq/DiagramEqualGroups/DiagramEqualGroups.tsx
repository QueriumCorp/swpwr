import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DiagramEqualGroupsWidget from "./DiagramEqualGroupsWidget.js";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface DiagramEqualGroupsProps extends HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  onChange?: () => void;
}

const DiagramEqualGroups: React.FC<DiagramEqualGroupsProps> = ({
  selected = false,
  onChange = () => {
    alert("DiagramEqualGroups onChange not defined");
  },
  className,
}) => {
  function clickHandler() {
    onChange();
    //   {
    //   type: "diagramSelected",
    //   payload: "EQUALGROUPS",
    // }
  }

  return (
    <div className={cn("DiagramEqualGroups p-0 flex", className)}>
      <Card onClick={clickHandler}>
        <CardHeader>
          <CardTitle>EQUAL GROUPS</CardTitle>
          <CardDescription>
            Are there groups that are all the same size?
          </CardDescription>
        </CardHeader>

        <CardContent className={`diagramCard ${selected ? "selected" : ""}`}>
          <div className="flex min-h-[100px] min-w-[400px] max-w-[400px] grow p-2 flex-col">
            <DiagramEqualGroupsWidget />
            <div className="diagramEquation text-center">G 𝗫 N = P</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiagramEqualGroups;
