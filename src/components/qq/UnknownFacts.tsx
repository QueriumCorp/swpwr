import { useDroppable } from "@dnd-kit/core";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scrollArea";
import { BsPlusCircleFill } from "react-icons/bs";
import { FC, ReactNode } from "react";

const UnknownFacts: FC<{ children?: ReactNode; add: () => void }> = (props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "UnknownFacts",
  });
  const style = {
    borderColor: isOver ? "green" : "transparent",
  };

  // JSX
  return (
    <Card className="grow flex flex-col justify-stretch">
      <CardHeader className="CardHeader flex-row justify-between align-middle p-2">
        <CardTitle className="CardTitle">Unknown</CardTitle>
        <BsPlusCircleFill
          onClick={props.add}
          className="text-lg  hover:text-green-500"
        />
      </CardHeader>
      <CardContent className="flex grow">
        <div className="grow border-2 " ref={setNodeRef} style={style}>
          <ScrollArea>{props.children}</ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};

UnknownFacts.displayName = "UnknownFacts";

export default UnknownFacts;
