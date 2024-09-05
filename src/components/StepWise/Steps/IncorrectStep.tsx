import React from 'react'
import type { Step } from '../stores/solution'
import MathStatic from '../MathStatic/MathStatic'
import { TableCell, TableRow } from '../components/Table'
import { StepIcon } from './StepIcon'

const IncorrectStep = (props: Step) => {
  if (props.type === 'incorrect') {
    const { latex } = props

    return (
      <div className="mt-2 flex items-center text-sm text-slate-500 dark:text-slate-400">
        <div>
          <StepIcon className="text-red-600">✗</StepIcon>
        </div>
        <div>
          <div>
            <MathStatic style={{ color: 'red' }} latex={latex}></MathStatic>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default IncorrectStep
