import React, { Ref, forwardRef, useImperativeHandle, useRef } from "react";
import z from "zod";
import { useStore } from "zustand";

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

type ReactTypes = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

export type StepWiseHandle = {
  start: (
    sessionToken?: string,
    identifiers?: string[],
    operators?: string[],
  ) => void;
};

export type StepWiseProps =
  | (z.infer<typeof StepWiseProps> & AssistantType & ReactTypes)
  | undefined;

//
// StepWise COMPONENT
//
export const StepWise = forwardRef(
  (props: StepWiseProps, ref: Ref<StepWiseHandle>) => {
    console.log("RENDERING StepWise @ ", new Date().toLocaleTimeString());

    const { student, problem, server, assistant } = props;

    // ready/set/go lets the developer start swReact in icon, preview or started state
    const initialState = props?.ready
      ? "GO"
      : props?.set
        ? "SET"
        : props?.go
          ? "READY"
          : "READY";

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
    const session = React.useContext(SessionContext);
    if (!session) throw new Error("No SessionContext.Provider in the tree");

    const startSession = useStore(session, (s) => s.startSession);

    useImperativeHandle(
      ref,
      () => {
        return {
          start(sessionToken, identifiers, operators) {
            startSession();
          },
        };
      },
      [],
    );

    // This forces the font import to execute in dev mode. May be unnecessary in prod
    // const fonts = mathliveStyle;

    // JSX
    return (
      <SessionContext.Provider value={storeRef.current}>
        <ActiveSession className={props?.className} />
      </SessionContext.Provider>
    );
  },
);

export default StepWise;
