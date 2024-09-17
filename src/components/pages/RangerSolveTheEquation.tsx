'use client'

// React Imports
import { FC, ReactNode, useContext, useEffect, useRef, useState } from 'react'

// Querium Imports
import { cn } from '@/lib/utils'
import { StepWise } from '@/components/StepWise'
import { type YBRpage } from '../qq/YellowBrickRoad'
import { NavContext, NavContextType } from '@/NavContext'
import { NavBar } from '../qq/NavBar'
import { HdrBar } from '../qq/HdrBar'
import { useProblemStore } from '@/store/_store'
import { StepWiseAPI } from '../StepWise/StepWise/StepWise'
import { TinyTutor } from '../qq/TinyTutor'
import { Log, Step } from '../StepWise/stores/solution'

import { TotalEquationGraphic } from '../schemaEditors/total/TotalEquationGraphic'
import { EqualGroupsEquationGraphic } from '../schemaEditors/equalGroups/EqualGroupsEquationGraphic'
import { DifferenceEquationGraphic } from '../schemaEditors/difference/DifferenceEquationGraphic'
import { ChangeDecreaseEquationGraphic } from '../schemaEditors/changeDecrease/ChangeDecreaseEquationGraphic'
import { ChangeIncreaseEquationGraphic } from '../schemaEditors/changeIncrease/ChangeIncreaseEquationGraphic'
import { CompareEquationGraphic } from '../schemaEditors/compare/CompareEquationGraphic'
import { NextButton } from '../qq/NextButton'
import CheckStepButton from '../qq/CheckStepButton'

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
const RangerSolveTheEquation: FC<{
  className?: string
  children?: ReactNode
  page: YBRpage
  index: number
}> = ({ className, index, page }) => {
  ///////////////////////////////////////////////////////////////////
  // Contexts
  ///////////////////////////////////////////////////////////////////

  const { api, current } = useContext(NavContext) as NavContextType

  ///////////////////////////////////////////////////////////////////
  // Refs
  ///////////////////////////////////////////////////////////////////

  const stepwiseRef = useRef<StepWiseAPI>(null)

  ///////////////////////////////////////////////////////////////////
  // Store
  ///////////////////////////////////////////////////////////////////

  const {
    problem,
    student,
    session,
    ybr,
    rank,
    swapiUrl,
    setMathAnswer,
    logAction,
  } = useProblemStore()

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  const [working, setWorking] = useState(false)
  const [msg, setMsg] = useState('')
  const [complete, setComplete] = useState(false)
  const [busy, setBusy] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const wpHints = problem.wpHints?.find(
    wpHint => wpHint.page === `${rank}${page.id}`,
  )
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

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (ybr[current - 1]?.id === page?.id) {
      setTimeout(startStepWise, 1000)
    }
  }, [current, page])

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  function startStepWise() {
    if (stepwiseRef.current) {
      setWorking(true)
      // @ts-ignore: TS seems to think the ✓ above doesnt exist
      stepwiseRef.current.resume(session)
    }
  }

  async function getExternalHint() {
    if (complete) {
      setMsg('You have solved the math portion! Continue to the next page.')
      return
    }
    if (stepwiseRef.current) {
      setWorking(true)
      setBusy(true)
      // @ts-ignore: TS seems to think the ✓ above doesnt exist
      await stepwiseRef.current.getExternalHint()
      setBusy(false)
    }
  }

  async function evaluateStep(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    if (evt.altKey) {
      api?.scrollNext()
    } else {
      if (stepwiseRef.current) {
        setWorking(true)
        setBusy(true)
        // @ts-ignore: TS seems to think the ✓ above doesnt exist
        await stepwiseRef.current.evaluateStep()
        setBusy(false)
      }
    }
  }

  async function HandleNext(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    if (evt.altKey || complete) {
      //If Cmd+Enter just scroll to next page
      api?.scrollNext()
    } else {
      setMsg('You must complete the math before proceeding.')
    }
  }

  function onComplete(steps: Step[], log: Log[]) {
    logAction(
      'RangerSolveTheEquation : ' +
        JSON.stringify({ studentSolution: steps, log: log }),
    )
    const lastStep = steps[steps.length - 1]
    if (lastStep.type === 'mathComplete' || lastStep.type === 'victory') {
      if (lastStep.latex) {
        setMathAnswer(lastStep.latex)
      } else {
        setMathAnswer('LaTeX for last step was not found')
      }
    }
    setComplete(true)
  }

  function handleStepChange(step: string) {
    step.length === 0 ? setDisabled(true) : setDisabled(false)
  }

  ///////////////////////////////////////////////////////////////////
  // JSX
  ///////////////////////////////////////////////////////////////////

  if (current !== index + 1) return null

  return (
    <div
      className={cn(
        'RangerSolveTheEquation',
        'rounded-lg bg-card text-card-foreground shadow-sm',
        'm-0 mb-2 flex h-full w-full flex-col justify-stretch pl-2 pr-2 pt-2',
        className,
      )}
    >
      <div className="PageContents relative mb-2 flex grow flex-col justify-stretch gap-2 p-2">
        <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col">
          <HdrBar
            highlightLetter={page?.phase}
            subTitle={page?.phaseLabel}
            instructions={page?.title}
          ></HdrBar>

          <div className="StepWiseGrowthContainer relative mt-1 grow">
            <div
              className={cn(
                'StepWiseContainer',
                'absolute bottom-0 left-0 right-0 top-0',
                working ? 'inline-block' : 'hidden',
              )}
            >
              <StepWise
                ready
                ref={stepwiseRef}
                className={'absolute bottom-0 left-0 right-0 top-0'}
                server={{ serverURL: swapiUrl }}
                problem={swProblem}
                student={student}
                assistant={setMsg}
                onComplete={onComplete}
                onStepChange={handleStepChange}
              >
                <div className="mt-2">
                  {session.schema === 'additiveTotalSchema' ? (
                    <TotalEquationGraphic
                      className="text-2xl text-qqBrand"
                      p1={session.schemaValues[0]}
                      p2={session.schemaValues[1]}
                      t={session.schemaValues[2]}
                      showSchema={false}
                    ></TotalEquationGraphic>
                  ) : null}
                  {session.schema === 'multiplicativeEqualGroupsSchema' ? (
                    <EqualGroupsEquationGraphic
                      className="text-2xl text-qqBrand"
                      g={session.schemaValues[0]}
                      n={session.schemaValues[1]}
                      p={session.schemaValues[2]}
                    ></EqualGroupsEquationGraphic>
                  ) : null}
                  {session.schema === 'additiveDifferenceSchema' ? (
                    <DifferenceEquationGraphic
                      className="text-2xl text-qqBrand"
                      l={session.schemaValues[0]}
                      d={session.schemaValues[1]}
                      g={session.schemaValues[2]}
                      showSchema={false}
                    ></DifferenceEquationGraphic>
                  ) : null}
                  {session.schema === 'subtractiveChangeSchema' ? (
                    <ChangeDecreaseEquationGraphic
                      className="text-2xl text-qqBrand"
                      e={session.schemaValues[2]}
                      c={session.schemaValues[1]}
                      s={session.schemaValues[0]}
                      showSchema={false}
                    ></ChangeDecreaseEquationGraphic>
                  ) : null}
                  {session.schema === 'additiveChangeSchema' ? (
                    <ChangeIncreaseEquationGraphic
                      className="text-2xl text-qqBrand"
                      e={session.schemaValues[0]}
                      c={session.schemaValues[1]}
                      s={session.schemaValues[2]}
                      showSchema={false}
                    ></ChangeIncreaseEquationGraphic>
                  ) : null}
                  {session.schema === 'multiplicativeCompareSchema' ? (
                    <CompareEquationGraphic
                      className="text-2xl text-qqBrand"
                      s={session.schemaValues[0]}
                      m={session.schemaValues[1]}
                      p={session.schemaValues[2]}
                    ></CompareEquationGraphic>
                  ) : null}
                </div>
              </StepWise>
            </div>
          </div>
        </div>
      </div>
      <NavBar className="relative flex items-center justify-end space-x-3 bg-slate-300 pr-2">
        <TinyTutor
          msg={msg}
          intro={page?.intro}
          psHints={pageSpecificHints}
          wpHints={wpHints?.hints}
          getAiHints={getExternalHint}
        />

        {!complete ? (
          <CheckStepButton
            busy={busy}
            disabled={disabled}
            onClick={evt => evaluateStep(evt)}
          />
        ) : (
          <NextButton busy={busy} onClick={evt => HandleNext(evt)}></NextButton>
        )}
      </NavBar>
    </div>
  )
}
RangerSolveTheEquation.displayName = 'RangerSolveTheEquation'
export default RangerSolveTheEquation
