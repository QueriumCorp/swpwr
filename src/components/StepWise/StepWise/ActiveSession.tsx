import React, { forwardRef, useContext, useImperativeHandle } from 'react'
import { SessionContext } from '../stores/sessionContext'
import { useStore } from 'zustand'

import Steps from '../Steps/Steps'
import InputPanel from '../InputPanel/InputPanel'
import Stimulus from '../Stimulus/Stimulus'
import { Card, CardContent, CardFooter, CardHeader } from '../components/Card'
import TitleBar from '../TitleBar/TitleBar'
import { cn } from '../utils'
import { Slab } from 'react-loading-indicators'
import { ReadyIndicator } from './ReadyIndicator'
import { SetIndicator } from './SetIndicator'
import { Session } from '../stores/session'

export type ActiveSessionProps = {
  className?: string
  children?: React.ReactNode
}
export type ActiveSessionAPI = {
  start: () => void
  resume?: (session: Session) => void
  getExternalHint?: () => Promise<void>
  evaluateStep?: () => Promise<string>
}

export const ActiveSession = forwardRef<ActiveSessionAPI, ActiveSessionProps>(
  ({ className, children }, ref) => {
    const session = useContext(SessionContext)
    if (!session) throw new Error('No SessionContext.Provider in the tree')

    const sessionInitialState = useStore(session, s => s.initialState)
    const problemLatex = useStore(session, s => s.latex)
    const sessionToken = useStore(session, s => s.sessionToken)

    // State
    const resumeSession = useStore(session, s => s.resumeSession)

    // Solution Commands for TESTING
    const startSession = useStore(session, s => s.startSession)
    const handleStartSessionClick = () => {
      startSession()
    }
    const getHint = useStore(session, s => s.getHint)

    const handleGetHintClick = () => {
      getHint()
    }
    const showMe = useStore(session, s => s.showMe)
    const handleShowMeClick = () => {
      showMe()
    }
    const submitStep = useStore(session, s => s.submitStep)
    const handleSubmitStepClick = () => {
      submitStep('z=-\\frac{25*9}{5}')
    }
    const close = useStore(session, s => s.close)
    const handleCloseClick = () => {
      close()
    }

    useImperativeHandle(
      ref,
      () => {
        return {
          start() {
            // TODO: Start Session - Not needed for SWPower so not implemented.
          },
          resume(session: Session) {
            resumeSession(session)
          },
          async getExternalHint() {
            return await getHint()
          },
          async evaluateStep() {
            return await submitStep()
          },
        }
      },
      [],
    )

    //=============================================
    // JSX
    //=============================================

    // STARTING
    if (sessionToken === 'starting') {
      return (
        <div className="flex min-h-full flex-col items-center justify-center bg-white">
          <Slab
            color="#f07a08"
            size="large"
            text="Starting StepWise..."
            textColor=""
          />
        </div>
      )
    }

    // READY
    if (sessionInitialState === 'READY' && sessionToken.length === 0) {
      if (children) {
        return <div onClick={startSession}>{children}</div>
      } else {
        return (
          <button className="h-16 w-16" onClick={startSession}>
            <ReadyIndicator />
          </button>
        )
      }
    }

    // SET
    if (sessionInitialState === 'SET' && sessionToken.length === 0) {
      if (children) {
        return <div onClick={startSession}>{children}</div>
      } else {
        return (
          <button className="h-16" onClick={startSession}>
            <SetIndicator latex={problemLatex} />
          </button>
        )
      }
    }

    // START PROBLEM AND SHOW LOADING INDICATOR
    if (sessionInitialState === 'GO' && sessionToken.length === 0) {
      startSession()
      return (
        <div className="flex h-full items-center justify-center">
          <Slab color="#f07a08" size="small" text="Start me up!" textColor="" />
        </div>
      )
    }

    // STUDENT IS WORKING THE PROBLEM
    if (sessionToken.length > 0) {
      return (
        <Card
          id="ActiveSession"
          className={cn(
            'ActiveSession',
            'mx-auto flex max-w-[640px] flex-col justify-stretch rounded-lg bg-white p-1 text-slate-800 shadow-xl ring-1 ring-slate-900/5',
            className,
          )}
        >
          <div className="px-2 pb-2 pt-4">
            <TitleBar />
            <Stimulus />
            {children}
          </div>
          <div className="STEPS_CONTAINER borderg-slate-300 mx-2 mb-1 flex grow justify-center overflow-y-auto rounded-md border-2 px-2 py-1">
            <Steps />
          </div>
          <div className="flex flex-col px-2 pb-4">
            <InputPanel />
          </div>
        </Card>
      )
    }

    return null
  },
)
