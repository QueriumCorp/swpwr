import React from 'react'
import type { ShowMeStep, Step } from '../stores/solution'
import MathStatic from '../MathStatic/MathStatic'
import { TableCell, TableRow } from '../components/Table'
import { StepIcon } from './StepIcon'

const ShowMeSteps = (props: Step) => {
  if (props.type === 'showMe') {
    return (
      <>
        {props.showMe.map((item: ShowMeStep) => {
          return (
            <div
              key={item.key}
              className="m-0 flex text-sm text-slate-500 odd:bg-white even:bg-[#f7f7f7] dark:text-slate-400"
            >
              <div>
                <StepIcon>☞</StepIcon>
              </div>

              <div>
                <div className="font-serif">{item.instruction}</div>
                <div className="">
                  <MathStatic
                    latex={item.suggestedStep}
                    style={{ background: 'none' }}
                  ></MathStatic>
                </div>
              </div>
            </div>
          )
        })}
      </>
    )
  }
  return null
}

export default ShowMeSteps
