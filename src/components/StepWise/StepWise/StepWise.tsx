import React, { CSSProperties, useImperativeHandle, useRef } from "react";

// Note: putting the lint recommended '?inline' in the fonts.css import will break it
// import mathliveStyle from "mathlive/fonts.css";
import "mathlive/fonts.css";

// Imports for SessionContext
import type { SessionStore } from "../stores/sessionContext";
import { SessionContext, createSessionStore } from "../stores/sessionContext";
import { Student } from "../stores/student";
import { Problem } from "../stores/problem";
import { Session } from "../stores/session";

// Imports of Components
import { ActiveSession, type ActiveSessionAPI } from "./ActiveSession";
import { Server } from "../stores/server";

// Definition of Types and Interfaces
export interface StepWiseProps {
  problem: Problem;
  student: Student;
  server?: Server;
  ready?: boolean;
  go?: boolean;
  assistant?: (msg: string) => void;
  className?: string;
  style?: CSSProperties;
}
export interface StepWiseAPI {
  start?: () => void;
  resume?: (session: Session) => void;
}

//
// StepWise COMPONENT
//
export const StepWise = React.forwardRef<StepWiseAPI, StepWiseProps>(
  ({ student, problem, assistant, server, className, ready, go }, ref) => {
    console.log("RENDERING StepWise @ ", new Date().toLocaleTimeString());

    // Define component's API
    useImperativeHandle(ref, () => {
      return {
        start: () => {
          ActiveSessionRef.current?.start();
        },
        resume: (session: Session) => {
          // @ts-ignore: TS seems to think the ✓ above doesnt exist
          ActiveSessionRef.current!.resume(session);
        },
      };
    });

    // ready/set/go lets the developer start swReact in icon, preview or started state
    const initialState = ready ? "READY" : go ? "GO" : "GO";

    // Refs
    const ActiveSessionRef = useRef<ActiveSessionAPI>(null);

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
        <ActiveSession ref={ActiveSessionRef} className={className} />
      </SessionContext.Provider>
    );
  },
);

export default StepWise;
