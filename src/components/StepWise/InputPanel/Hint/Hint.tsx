import React from "react";
import { SessionContext } from "../../stores/sessionContext";
import { useStore } from "zustand";
import { cn } from "../../utils";

export const Hint = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className }, _ref) => {
  const session = React.useContext(SessionContext);
  if (!session) throw new Error("No SessionContext.Provider in the tree");

  const getHint = useStore(session, (s) => s.getHint);
  return (
    <div
      className={cn(
        "flex items-center justify-center text-xl max-h-8 min-h-8 max-w-8 min-w-8 hover:cursor-pointer",
        className,
      )}
      onClick={() => getHint()}
    >
      ?
    </div>
  );
});
