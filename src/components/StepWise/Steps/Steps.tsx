// React Imports
import React, { useEffect, useRef } from 'react'

// Querium Imports
import { SessionContext } from '../stores/sessionContext'
import { useStore } from 'zustand'

import type { Step as StepType } from '../stores/solution'
import CorrectStep from './CorrectStep'
import IncorrectStep from './IncorrectStep'
import VictoryStep from './VictoryStep'
import HintStep from './HintStep'
import ShowMeStep from './ShowMeStep'

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
const Steps = () => {
  ///////////////////////////////////////////////////////////////////
  // Contexts
  ///////////////////////////////////////////////////////////////////

  const session = React.useContext(SessionContext)
  if (!session) throw new Error('No SessionContext.Provider in the tree')

  ///////////////////////////////////////////////////////////////////
  // Refs
  ///////////////////////////////////////////////////////////////////

  const stepsRef = useRef<HTMLDivElement>(null)

  ///////////////////////////////////////////////////////////////////
  // Store
  ///////////////////////////////////////////////////////////////////

  const steps: StepType[] = useStore(session, s => s.steps)
  const lastAction = useStore(session, s => s.lastAction)

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  // Local JSX Components
  ///////////////////////////////////////////////////////////////////

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

  ///////////////////////////////////////////////////////////////////
  // JSX
  ///////////////////////////////////////////////////////////////////

  return (
    <div className="h-full w-full max-w-[640px]">
      {steps.map((step, index) => renderStepSwitch(step, index))}
    </div>
  )
}

export default Steps
