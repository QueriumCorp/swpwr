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

  const steps: StepType[] = useStore(session, s => s.steps)
  const lastAction = useStore(session, s => s.lastAction)

  const renderStepSwitch = (step: StepType, index: number) => {
    // @ts-ignore: TS seems to think arrays dont support findLastIndex
    let lastCorrectStep = steps.findLastIndex(step => step.type === 'correct')
    let lastStepCorrect =
      steps[steps.length - 1]?.type === 'correct' ||
      steps[steps.length - 1]?.type === 'mathComplete' ||
      steps[steps.length - 1]?.type === 'victory'

    console.info('lastCorrectStep', lastCorrectStep)

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
        if (lastStepCorrect || lastCorrectStep === index) {
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
        if (lastStepCorrect || lastCorrectStep === index) {
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
    <Table className="h-full">
      <TableCaption className="mt-0 caption-top text-left text-base font-medium tracking-tight text-slate-900 dark:text-white">
        Your solution
      </TableCaption>
      <TableBody className="">
        {steps.map((step, index) => renderStepSwitch(step, index))}
      </TableBody>
    </Table>
  )
}

export default Steps
