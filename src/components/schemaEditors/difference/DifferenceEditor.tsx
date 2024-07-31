// React Imports
import { FC, ReactNode, useContext, useEffect, useState } from "react";

// Third-party Imports
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

// Querium Imports
import { cn } from "@/lib/utils";
import { NavContext, NavContextType } from "@/NavContext";
import { useProblemStore } from "@/store/_store";
import { DifferenceEquationGraphic } from "./DifferenceEquationGraphic";
import { FactChicklet } from "@/components/qq/FactChicklet";

const DifferenceEditor: FC<{
  onChange?: (latex: string) => void;
  className?: string;
  children?: ReactNode;
}> = ({ onChange, className }) => {
  //
  // Nav Context
  //
  const { api, current } = useContext(NavContext) as NavContextType;

  //
  // Store
  //
  const { session } = useProblemStore();

  //
  // State
  //
  const [l, setL] = useState<string>("");
  const [d, setD] = useState<string>("");
  const [g, setG] = useState<string>("");

  //
  // Side Effects
  //
  useEffect(() => {
    if (!onChange) return;

    // If any are blank, equation is blank and disable Next
    if (l.length === 0 || d.length === 0 || g.length === 0) onChange("");

    console.log(`${g}\\minus${l}\=${d}`);
    onChange(`${g}\\minus${l}\=${d}`);
  }, [l, d, g]);

  //
  // Event Handlers
  //
  function handleDragEnd(event: DragEndEvent) {
    if (!event.over) return;

    const rawValue = event.active.id as string;
    if (!rawValue) return;

    let values = rawValue.match(/(-?\d+(\.\d+)?)/);

    // if no value found, use the box identifier
    let value;
    if (!values) {
      value = event.over.id as string;
      value = value.charAt(0).toUpperCase();
    } else {
      value = values[0];
    }

    switch (event.over.id) {
      // Schema Editor
      case "L":
        setL(value);
        break;
      case "D":
        setD(value);
        break;
      case "G":
        setG(value);
        break;

      // Equation Editor
      case "LESS":
        setL(value);
        break;
      case "DIFF":
        setD(value);
        break;
      case "GREATER":
        setG(value);
        break;
    }
  }

  //
  // JSX
  //
  return (
    <div className={cn("TotalEditor", "z-10", className)}>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="grow grid grid-cols-2 gap-2">
          <Card className="">
            <CardHeader className="pb-2">
              <CardTitle>
                <CardTitle>Knowns</CardTitle>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {session.knowns ? (
                <ul>
                  {session.knowns.map((known) => (
                    <FactChicklet key={known} fact={known}></FactChicklet>
                  ))}
                </ul>
              ) : null}
            </CardContent>
          </Card>
          <Card className="">
            <CardHeader className="pb-2">
              <CardTitle>
                <CardTitle>Unknowns</CardTitle>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {session.unknowns ? (
                <ul>
                  {session.unknowns.map((unknown) => (
                    <FactChicklet key={unknown} fact={unknown}></FactChicklet>
                  ))}
                </ul>
              ) : null}
            </CardContent>
          </Card>
        </div>

        <div className={cn("DROPZONE", "mt-5")}>
          <DifferenceEquationGraphic l={l} d={d} g={g} />
        </div>
      </DndContext>
    </div>
  );
};

DifferenceEditor.displayName = "DifferenceEditor";
export default DifferenceEditor;
