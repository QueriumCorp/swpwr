import { useDroppable } from "@dnd-kit/core";

import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scrollArea";

const KnownFacts = (props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "KnownFacts",
  });
  const style = {
    borderColor: isOver ? "green" : "transparent",
  };

  // JSX
  return (
    <Card className="grow flex flex-col justify-stretch">
      <h3>Knowns</h3>
      <div className="grow border-2 " ref={setNodeRef} style={style}>
        <ScrollArea>{props.children}</ScrollArea>
      </div>
    </Card>
  );
};

KnownFacts.displayName = "KnownFacts";

export default KnownFacts;
