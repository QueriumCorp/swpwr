import React from 'react'
import type { Step } from '../stores/solution'
import { TableCell, TableRow } from '../components/Table'
import { StepIcon } from './StepIcon'
import MathStatic from '../MathStatic/MathStatic'

const CorrectStep = (props: Step) => {
  if (props.type === 'correct') {
    const { latex } = props

    return (
      <div className="m-0 flex items-center text-sm text-slate-500 odd:bg-white even:bg-[#f7f7f7] dark:text-slate-400">
        <div>
          <StepIcon className="text-green-600">✓</StepIcon>
        </div>
        <div>
          <div className="">
            <MathStatic
              latex={latex}
              style={{ background: 'none' }}
            ></MathStatic>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default CorrectStep
