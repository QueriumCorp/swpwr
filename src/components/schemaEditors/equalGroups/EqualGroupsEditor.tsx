// React Imports
import { FC, ReactNode, useContext, useState } from "react";

// Third-party Imports
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

// Querium Imports
import { YBRpage } from "@/components/qq/YellowBrickRoad";
import { cn } from "@/lib/utils";
import { NavContext, NavContextType } from "@/NavContext";
import { useProblemStore } from "@/store/_store";
import { EqualGroupsEquationGraphic } from "./EqualGroupsEquationGraphic";
import { FactChicklet } from "@/components/qq/FactChicklet";

const EqualGroupsEditor: FC<{
  className?: string;
  children?: ReactNode;
}> = ({ className }) => {
  // Nav Context
  const { api, current } = useContext(NavContext) as NavContextType;

  // Store
  const {
    logAction,
    submitPickSchema,
    getHint,
    problem,
    session,
    disabledSchemas,
  } = useProblemStore();

  // State
  const [schema, setSchema] = useState("");
  const [msg, setMsg] = useState<string>("");
  const [g, setG] = useState<string>("g");
  const [n, setN] = useState<string>("n");
  const [p, setP] = useState<string>("p");

  // Event Handlers
  async function handleSelectSchema(schema: string) {
    logAction("RangerFillDiagram : Selected Schema : " + schema);
    setSchema(schema);
  }
  function handleDragEnd(event: DragEndEvent) {
    if (!event.over) return;

    const rawValue = event.active.id as string;
    if (!rawValue) return;

    let values = rawValue.match(/(-?\d+(\.\d+)?)/);

    // if no value found, we use the entire string
    let value;
    if (!values) {
      value = rawValue;
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

        <div className="grow flex flex-wrap gap-2 mb-4 justify-center -z-10">
          <Card className={cn("w-full")}>
            <CardHeader className="pb-2">
              <CardTitle>Equal Groups</CardTitle>
            </CardHeader>
            <CardContent>
              <EqualGroupsEquationGraphic g={g} n={n} p={p} />
            </CardContent>
          </Card>
        </div>
      </DndContext>
    </div>
  );
};

EqualGroupsEditor.displayName = "EqualGroupsEditor";
export default EqualGroupsEditor;
