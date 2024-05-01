import { useDroppable } from "@dnd-kit/core";

import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scrollArea";

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
      <h3>Unknowns</h3>
      <div className="grow border-2 " ref={setNodeRef} style={style}>
        <ScrollArea>{props.children}</ScrollArea>
      </div>
    </Card>
  );
};

UnknownFacts.displayName = "UnknownFacts";

export default UnknownFacts;
