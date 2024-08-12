// React Imports
import { FC, ReactNode, useContext, useEffect, useState } from "react";

// Third-party Imports
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

// Querium Imports
import { cn } from "@/lib/utils";
import { NavContext, NavContextType } from "@/NavContext";
import { useProblemStore } from "@/store/_store";
import { EqualGroupsEquationGraphic } from "./EqualGroupsEquationGraphic";
import { FactChicklet } from "@/components/qq/FactChicklet";

const EqualGroupsEditor: FC<{
  onChange?: (latex: string, values: string[]) => void;
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
  const [g, setG] = useState<string>("");
  const [n, setN] = useState<string>("");
  const [p, setP] = useState<string>("");
  console.log("EqualGroupsEditor", g, n, p);
  //
  // Side Effects
  //
  useEffect(() => {
    if (!onChange) return;

    // If any are blank, equation is blank and disable Next
    if (g.length === 0 || n.length === 0 || p.length === 0) onChange("", []);

    onChange(`${g}\\times${n}=${p}`, [g, n, p]);
  }, [g, n, p]);

  //
  // Event Handlers
  //
  function handleDragEnd(event: DragEndEvent) {
    console.log("handleDragEnd", event);
    if (!event.over) return;

    const rawValue = event.active.id as string;
    if (!rawValue) return;

    let values = rawValue.match(/(-?\d+(\.\d+)?)/);

    // if no value found, use the box identifier
    let value;
    if (!values) {
      value = event.over.id as string;
    } else {
      value = values[0];
    }

    switch (event.over.id) {
      case "G":
        setG(value);
        break;
      case "N":
        setN(value);
        break;
      case "P":
        setP(value);
        break;
    }
  }

  //
  // JSX
  //
  return (
    <div className={cn("EqualGroupsEditor", "z-10", className)}>
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
          <EqualGroupsEquationGraphic g={g} n={n} p={p} />
        </div>
      </DndContext>
    </div>
  );
};

EqualGroupsEditor.displayName = "EqualGroupsEditor";
export default EqualGroupsEditor;
