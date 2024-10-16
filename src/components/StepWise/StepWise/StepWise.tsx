import React, { CSSProperties, useImperativeHandle, useRef } from 'react'

// Note: putting the lint recommended '?inline' in the fonts.css import will break it
// import mathliveStyle from "mathlive/fonts.css";
import 'mathlive/fonts.css'

// Imports for SessionContext
import type { SessionStore } from '../stores/sessionContext'
import { SessionContext, createSessionStore } from '../stores/sessionContext'
import { Student } from '../stores/student'
import { Problem } from '../stores/problem'
import { Session } from '../stores/session'

// Imports of Components
import { ActiveSession, type ActiveSessionAPI } from './ActiveSession'
import { Server } from '../stores/server'
import { Log, Step } from '../stores/solution'
import { Options } from '../stores/options'

// Definition of Types and Interfaces
export interface StepWiseProps {
  problem: Problem
  student: Student
  server?: Server
  options?: Options
  ready?: boolean
  go?: boolean
  assistant?: (msg: string, busy?: boolean) => void
  onComplete?: (steps: Step[], log: Log[]) => void
  onStepChange?: (step: string) => void
  className?: string
  style?: CSSProperties
  children?: React.ReactNode // best, accepts everything React can render
}
export interface StepWiseAPI {
  start?: () => void
  resume?: (session: Session) => void
  getExternalHint?: () => Promise<void>
  evaluateStep?: () => Promise<void>
}

//
// StepWise COMPONENT
//
export const StepWise = React.forwardRef<StepWiseAPI, StepWiseProps>(
  (
    {
      student,
      problem,
      assistant,
      onComplete,
      onStepChange,
      server,
      options,
      className,
      ready,
      go,
      children,
    },
    ref,
  ) => {
    // Define component's API
    useImperativeHandle(ref, () => {
      return {
        start: () => {
          ActiveSessionRef.current?.start()
        },
        resume: (session: Session) => {
          // @ts-ignore: TS seems to think the ✓ above doesnt exist
          ActiveSessionRef.current!.resume(session)
        },
        async getExternalHint() {
          await ActiveSessionRef.current!.getExternalHint!()
        },
        async evaluateStep() {
          await ActiveSessionRef.current!.evaluateStep!()
        },
      }
    })

    // ready/set/go lets the developer start swReact in icon, preview or started state
    const initialState = ready ? 'READY' : go ? 'GO' : 'GO'

    // Refs
    const ActiveSessionRef = useRef<ActiveSessionAPI>(null)

    // This forces the font import to execute in dev mode. May be unnecessary in prod
    // const fonts = mathliveStyle;

    // Setup Session Store
    const storeRef = useRef<SessionStore | null>(null)
    if (!storeRef.current) {
      storeRef.current = createSessionStore(
        initialState,
        student,
        problem,
        server,
        options,
        assistant,
        onComplete,
      )
    }

    // Active Session
    return (
      <SessionContext.Provider value={storeRef.current}>
        <ActiveSession
          ref={ActiveSessionRef}
          className={className}
          onStepChange={onStepChange}
        >
          {children}
        </ActiveSession>
      </SessionContext.Provider>
    )
  },
)

export default StepWise
