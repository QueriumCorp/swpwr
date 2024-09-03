import React, { useEffect } from 'react'
import { SessionContext } from '../stores/sessionContext'
import { useStore } from 'zustand'

import type { Step as StepType } from '../stores/solution'
import CorrectStep from './CorrectStep'
import IncorrectStep from './IncorrectStep'
import VictoryStep from './VictoryStep'
import HintStep from './HintStep'
import ShowMeStep from './ShowMeStep'
import {
  Table,
  TableBody,
  TableCaption,
  TableHeader,
} from '../components/Table'

const Steps = () => {
  const session = React.useContext(SessionContext)
  if (!session) throw new Error('No SessionContext.Provider in the tree')

  const steps: StepType[] = [
    {
      timestamp: 1,
      type: 'correct',
      latex: 'x^2',
      message: 'Correct!',
      status: 'success',
      stepStatus: 'VALID',
      rawResponse: 'x^2',
      hintObject: {
        hint: 'hint',
        hintText: 'hintText',
        hintType: 'hintType',
        hintStatus: 'hintStatus',
        hintTimestamp: 1,
      },
    },
    {
      timestamp: 2,
      type: 'incorrect',
      latex: 'x^2',
      message: 'Incorrect!',
      status: 'error',
      stepStatus: 'INVALID',
      rawResponse: 'x^2',
      hintObject: {
        hintText: 'hintText',
        hintType: 'hintType',
        hintStatus: 'hintStatus',
        hintTimestamp: 1,
      },
    },
    {
      timestamp: 3,
      type: 'incorrect',
      latex: 'x^2',
      message: 'Incorrect!',
      status: 'error',
      stepStatus: 'INVALID',
      rawResponse: 'x^2',
      hintObject: {
        hintText: 'hintText',
        hintType: 'hintType',
        hintStatus: 'hintStatus',
        hintTimestamp: 1,
      },
    },
    {
      timestamp: 4,
      type: 'incorrect',
      latex: 'x^2',
      message: 'Incorrect!',
      status: 'error',
      stepStatus: 'INVALID',
      rawResponse: 'x^2',
      hintObject: {
        hintText: 'hintText',
        hintType: 'hintType',
        hintStatus: 'hintStatus',
        hintTimestamp: 1,
      },
    },
    {
      timestamp: 5,
      type: 'incorrect',
      latex: 'x^2',
      message: 'Incorrect!',
      status: 'error',
      stepStatus: 'INVALID',
      rawResponse: 'x^2',
      hintObject: {
        hintText: 'hintText',
        hintType: 'hintType',
        hintStatus: 'hintStatus',
        hintTimestamp: 1,
      },
    },
    {
      timestamp: 6,
      type: 'incorrect',
      latex: 'x^2',
      message: 'Incorrect!',
      status: 'error',
      stepStatus: 'INVALID',
      rawResponse: 'x^2',
      hintObject: {
        hintText: 'hintText',
        hintType: 'hintType',
        hintStatus: 'hintStatus',
        hintTimestamp: 1,
      },
    },
    {
      timestamp: 7,
      type: 'incorrect',
      latex: 'x^2',
      message: 'Incorrect!',
      status: 'error',
      stepStatus: 'INVALID',
      rawResponse: 'x^2',
      hintObject: {
        hintText: 'hintText',
        hintType: 'hintType',
        hintStatus: 'hintStatus',
        hintTimestamp: 1,
      },
    },
  ]
  // const steps: StepType[] = useStore(session, s => s.steps)
  const lastAction = useStore(session, s => s.lastAction)

  const renderStepSwitch = (step: StepType, index: number) => {
    // @ts-ignore: TS seems to think arrays dont support findLastIndex
    let lastCorrectStep = steps.findLastIndex(step => step.type === 'correct')
    let islastStepCorrect =
      steps[steps.length - 1]?.type === 'correct' ||
      steps[steps.length - 1]?.type === 'mathComplete' ||
      steps[steps.length - 1]?.type === 'victory'

    switch (step.type) {
      case 'correct':
        return (
          <CorrectStep
            key={step.timestamp}
            timestamp={step.timestamp}
            type={step.type}
            latex={step.latex}
            message={step.message}
            status={step.status}
            stepStatus={step.stepStatus}
            rawResponse={step.rawResponse}
            hintObject={step.hintObject}
          />
        )
      case 'incorrect':
        if (islastStepCorrect || index <= lastCorrectStep) {
          return null
        }
        return (
          <IncorrectStep
            key={step.timestamp}
            timestamp={step.timestamp}
            type={step.type}
            latex={step.latex}
            message={step.message}
            status={step.status}
            stepStatus={step.stepStatus}
            rawResponse={step.rawResponse}
            hintObject={step.hintObject}
          />
        )
      case 'hint':
        if (islastStepCorrect || index <= lastCorrectStep) {
          return null
        }
        return (
          <HintStep
            key={step.timestamp}
            timestamp={step.timestamp}
            type="hint"
            hintText={step.hintText}
            status={step.status}
            hintObject={step.hintObject}
          />
        )
      case 'showMe':
        // render only if the showMe is the last action
        if (lastAction !== step.timestamp) return null
        return (
          <ShowMeStep
            key={step.timestamp}
            timestamp={step.timestamp}
            type="showMe"
            status={step.status}
            showMe={step.showMe}
          />
        )
      case 'victory':
        return (
          <VictoryStep
            key={step.timestamp}
            timestamp={step.timestamp}
            type={step.type}
            latex={step.latex}
            message={step.message}
            status={step.status}
            stepStatus={step.stepStatus}
            rawResponse={step.rawResponse}
            hintObject={step.hintObject}
          />
        )
      case 'mathComplete':
        return (
          <VictoryStep
            key={step.timestamp}
            timestamp={step.timestamp}
            type={step.type}
            latex={step.latex}
            message={step.message}
            status={step.status}
            stepStatus={step.stepStatus}
            rawResponse={step.rawResponse}
            hintObject={step.hintObject}
          />
        )
      default:
        // TODO: Finish exhaustive union as shown here: https://www.youtube.com/watch?v=CG3_Y9T03J4
        return <div>Step type not implemented: {JSON.stringify(step)}</div>
    }
  }

  return (
    <div className="h-full w-full max-w-[640px] overflow-y-auto border-4 border-slate-900 bg-green-400">
      {steps.map((step, index) => renderStepSwitch(step, index))}
    </div>
  )
}

export default Steps
