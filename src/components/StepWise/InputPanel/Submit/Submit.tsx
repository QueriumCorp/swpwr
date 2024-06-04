import React from "react";
import { SessionContext } from "../../stores/sessionContext";
import { useStore } from "zustand";
import { cn } from "../../utils";

type SubmitProps = React.HTMLAttributes<HTMLDivElement> & {
  value: string;
};

export const Submit = React.forwardRef<HTMLDivElement, SubmitProps>(
  ({ className, ...props }, ref) => {
    const session = React.useContext(SessionContext);
    if (!session) throw new Error("No SessionContext.Provider in the tree");

    const submitStep = useStore(session, (s) => s.submitStep);
    return (
      <div
        className={cn(
          "flex items-center justify-center text-xl max-h-8 min-h-8 max-w-8 min-w-8  hover:cursor-pointer",
          className
        )}
        onClick={() => submitStep(props.value)}
      >
        ✓
      </div>
    );
  }
);
