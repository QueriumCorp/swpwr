import React, { Ref, forwardRef, useContext, useImperativeHandle } from "react";
import { SessionContext } from "../stores/sessionContext";
import { useStore } from "zustand";

import Steps from "../Steps/Steps";
import InputPanel from "../InputPanel/InputPanel";
import Stimulus from "../Stimulus/Stimulus";
import { Card, CardContent, CardFooter, CardHeader } from "../components/Card";
import TitleBar from "../TitleBar/TitleBar";
import { cn } from "../utils";
import { Slab } from "react-loading-indicators";
import { ReadyIndicator } from "./ReadyIndicator";
import { SetIndicator } from "./SetIndicator";

export type ActiveSessionProps = {
  className?: string;
  children?: React.ReactNode;
};
export type ActiveSessionAPI = {
  start: () => void;
};

export const ActiveSession = forwardRef<ActiveSessionAPI, ActiveSessionProps>(
  ({ className, children }, ref) => {
    useImperativeHandle(
      ref,
      () => {
        return {
          start() {
            console.info("start() called on ActiveSession");
          },
        };
      },
      [],
    );

    const session = useContext(SessionContext);
    if (!session) throw new Error("No SessionContext.Provider in the tree");

    const sessionInitialState = useStore(session, (s) => s.initialState);
    const problemLatex = useStore(session, (s) => s.latex);
    const sessionToken = useStore(session, (s) => s.sessionToken);

    // Solution Commands for TESTING
    const startSession = useStore(session, (s) => s.startSession);
    const handleStartSessionClick = () => {
      startSession();
    };
    const getHint = useStore(session, (s) => s.getHint);
    const handleGetHintClick = () => {
      getHint();
    };
    const showMe = useStore(session, (s) => s.showMe);
    const handleShowMeClick = () => {
      showMe();
    };
    const submitStep = useStore(session, (s) => s.submitStep);
    const handleSubmitStepClick = () => {
      submitStep("z=-\\frac{25*9}{5}");
    };
    const close = useStore(session, (s) => s.close);
    const handleCloseClick = () => {
      close();
    };
    // STARTING
    if (sessionToken === "starting") {
      return (
        <div className="min-h-full flex flex-col items-center justify-center bg-white">
          <Slab
            color="#f07a08"
            size="large"
            text="Starting StepWise..."
            textColor=""
          />
        </div>
      );
    }

    // READY
    if (sessionInitialState === "READY" && sessionToken.length === 0) {
      if (children) {
        return <div onClick={startSession}>{children}</div>;
      } else {
        return (
          <button className="h-16 w-16" onClick={startSession}>
            <ReadyIndicator />
          </button>
        );
      }
    }

    // SET
    if (sessionInitialState === "SET" && sessionToken.length === 0) {
      if (children) {
        return <div onClick={startSession}>{children}</div>;
      } else {
        return (
          <button className="h-16" onClick={startSession}>
            <SetIndicator latex={problemLatex} />
          </button>
        );
      }
    }

    // START PROBLEM AND SHOW LOADING INDICATOR
    if (sessionInitialState === "GO" && sessionToken.length === 0) {
      startSession();
      return (
        <div className="flex justify-center items-center h-full">
          <Slab color="#f07a08" size="small" text="Start me up!" textColor="" />
        </div>
      );
    }

    // STUDENT IS WORKING THE PROBLEM
    if (sessionToken.length > 0) {
      return (
        <Card
          id="ActiveSession"
          className={cn(
            "bg-white dark:bg-slate-800 rounded-lg p-1 ring-1 ring-slate-900/5 shadow-xl flex flex-col",
            className,
          )}
        >
          <CardHeader className="px-2 pt-4 pb-2">
            <TitleBar />
            <Stimulus />
          </CardHeader>
          <CardContent className="grow px-2 py-1 overflow-y-auto">
            <Steps />
          </CardContent>
          <CardFooter className="px-2 pb-4 flex flex-col">
            <InputPanel />
            {/* <div>
            <button onClick={handleStartSessionClick}>🇿🇲</button>
            <button onClick={handleGetHintClick}>😉</button>
            <button onClick={handleShowMeClick}>👉</button>
            <button onClick={handleSubmitStepClick}>🦶🏽</button>
            <button onClick={handleCloseClick}>🏁</button>
          </div> */}
          </CardFooter>
          {/* <pre style={{ textAlign: "left" }}>
        {JSON.stringify(sessionStatus, null, 2)}
      </pre> */}
        </Card>
      );
    }

    return null;
  },
);
