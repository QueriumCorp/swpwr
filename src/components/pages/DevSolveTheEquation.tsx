'use client'

import { FC, ReactNode, useContext, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import { StepWise } from '@/components/StepWise'
import { YellowBrickRoad, type YBRpage } from '../qq/YellowBrickRoad'
import { NavContext, NavContextType } from '@/NavContext'
import { NavBar } from '../qq/NavBar'
import { CarouselPrevious, CarouselNext } from '../ui/carousel'
import { HdrBar } from '../qq/HdrBar'
import { useProblemStore } from '@/store/_store'
import { Button } from '../ui/button'
import { StepWiseAPI } from '../StepWise/StepWise/StepWise'
import { TinyTutor } from '../qq/TinyTutor'

const DevSolveTheEquation: FC<{
  className?: string
  children?: ReactNode
  page?: YBRpage
  index: number
}> = ({ className, index, page }) => {
  console.log('DevSolveTheEquation', page)

  // Dont render if page not active
  const { current } = useContext(NavContext) as NavContextType
  const stepwiseRef = useRef<StepWiseAPI>(null)

  // Store
  const { problem, student, session, swapiUrl } = useProblemStore()

  // State
  const [working, setWorking] = useState(false)

  const pageSpecificHints = page?.psHints || []

  // Prepare problem data to work with StepWise
  type swProblemType = {
    appKey: string
    problemId: string
    title?: string
    stimulus?: string
    topic: string
    definition: string
    policyId?: string
    hints: string[]
  }
  let swProblem: swProblemType = {
    appKey: problem.appKey,
    problemId: problem.problemId ? problem.problemId : '',
    title: problem.title,
    stimulus: problem.stimulus,
    topic: problem.class,
    definition: problem.question,
    policyId: problem.policies,
    hints: [],
  }
  if (problem.qs1) {
    swProblem.hints.push(problem.qs1)
  }
  if (problem.qs2) {
    swProblem.hints.push(problem.qs2)
  }
  if (problem.qs3) {
    swProblem.hints.push(problem.qs3)
  }

  if (current !== index + 1)
    // JSX
    return null
  return (
    <div
      className={cn(
        'DevSolveTheEquation',
        'rounded-lg bg-card text-card-foreground shadow-sm',
        'm-0 mb-2 flex h-full w-full flex-col justify-stretch pl-2 pr-2 pt-2',
        className,
      )}
    >
      <div className="relative mb-2 grow p-2">
        <HdrBar
          highlightLetter={page?.phase}
          subTitle={page?.phaseLabel}
          instructions={page?.title}
        ></HdrBar>

        <StepWise
          ready
          ref={stepwiseRef}
          className={'h-full w-full'}
          server={{ serverURL: swapiUrl }}
          problem={swProblem}
          student={student}
        />
      </div>
      <NavBar className="flex justify-end space-x-3 bg-slate-300 pr-2">
        <TinyTutor intro={page?.intro} psHints={pageSpecificHints} />
        <CarouselPrevious className="relative left-0">
          Previous
        </CarouselPrevious>
        <CarouselNext className="relative right-0">Next</CarouselNext>
        <h1 className="absolute bottom-0 left-0 text-slate-500">
          DevSolveTheEquation
        </h1>
      </NavBar>
    </div>
  )
}
DevSolveTheEquation.displayName = 'DevSolveTheEquation'
export default DevSolveTheEquation
