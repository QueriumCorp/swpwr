import React, {
  CSSProperties,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import { useDebounce } from '@uidotdev/usehooks'

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
  onStep?: (steps: Step[]) => void
  solutionUpdated?: (steps: Step[]) => void
  logActivity?: (log: Log) => void
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
      onStep,
      solutionUpdated,
      logActivity,
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
        onStep,
      )
    }

    // Monitor changes to steps
    const [steps, setSteps] = useState<Step[]>()
    const debouncedSteps = useDebounce(steps, 300)
    useEffect(() => {
      storeRef.current!.subscribe(
        state => state.steps,
        (steps, prevSteps) => {
          if (prevSteps.length !== steps.length) {
            setSteps(steps)
          }
        },
      )
    }, [])
    useEffect(() => {
      if (solutionUpdated && debouncedSteps) {
        solutionUpdated(debouncedSteps)
      }
    }, [debouncedSteps])

    // Monitor changes to logs
    const [logs, setLogs] = useState<Log[]>()
    const debouncedLogs = useDebounce(logs, 300)
    useEffect(() => {
      storeRef.current!.subscribe(
        state => state.log,
        (logs, prevLogs) => {
          if (prevLogs.length !== logs.length) {
            setLogs(logs)
          }
        },
      )
    }, [])
    useEffect(() => {
      if (logActivity && debouncedLogs) {
        logActivity(debouncedLogs[debouncedLogs?.length - 1])
      }
    }, [debouncedLogs])

    ///////////////////////////////////////////////////////////////////
    // JSX
    ///////////////////////////////////////////////////////////////////

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
