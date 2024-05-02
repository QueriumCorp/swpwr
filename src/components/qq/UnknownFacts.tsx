import { useDroppable } from "@dnd-kit/core";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scrollArea";
import { CiSquarePlus } from "react-icons/ci";

const UnknownFacts = (props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "UnknownFacts",
  });
  const style = {
    borderColor: isOver ? "green" : "transparent",
  };

  // JSX
  return (
    <Card className="grow flex flex-col justify-stretch">
      <CardHeader className="CardHeader flex-row justify-between align-middle">
        <CardTitle className="CardTitle">Unknowns</CardTitle>
        <CiSquarePlus className="text-lg" />
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
