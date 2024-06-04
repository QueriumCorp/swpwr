import React, { useRef } from "react";
import z from "zod";
// Note: putting the lint recommended '?inline' in the fonts.css import will break it
// import mathliveStyle from "mathlive/fonts.css";
import "mathlive/fonts.css";

// Imports for SessionContext
import type { SessionStore } from "../stores/sessionContext";
import { SessionContext, createSessionStore } from "../stores/sessionContext";
import { ProblemSchema } from "../stores/problem";
import { StudentSchema } from "../stores/student";
import { SolutionSchema /*, useSolutionStore */ } from "../stores/solution";

// Imports of Components
// import { ErrorDisplay } from "./ErrorDisplay";
import { ActiveSession } from "./ActiveSession";
import { ServerSchema } from "../stores/server";

const StepWiseProps = z.object({
  problem: ProblemSchema,
  student: StudentSchema,
  solution: SolutionSchema.optional(),
  server: ServerSchema.optional(),
  ready: z.boolean().optional(),
  set: z.boolean().optional(),
  go: z.boolean().optional(),
});

type AssistantType = { assistant?: (msg: string) => void };

export type StepWiseProps =
  | (z.infer<typeof StepWiseProps> & AssistantType)
  | undefined;

export const StepWise = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & StepWiseProps
>(
  (
    { student, problem, assistant, server, className, ready, set, go },
    _ref,
  ) => {
    console.log("RENDERING StepWise @ ", new Date().toLocaleTimeString());

    // ready/set/go lets the developer start swReact in icon, preview or started state
    const initialState = ready ? "READY" : set ? "SET" : go ? "GO" : "GO";

    // This forces the font import to execute in dev mode. May be unnecessary in prod
    // const fonts = mathliveStyle;

    // Setup Session Store
    const storeRef = useRef<SessionStore | null>(null);
    if (!storeRef.current) {
      storeRef.current = createSessionStore(
        initialState,
        student,
        problem,
        server,
        assistant,
      );
    }

    // Active Session
    return (
      <SessionContext.Provider value={storeRef.current}>
        <ActiveSession className={className} />
      </SessionContext.Provider>
    );
  },
);

export default StepWise;
