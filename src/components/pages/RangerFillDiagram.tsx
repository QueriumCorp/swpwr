'use client'

//  React Imports
import { FC, ReactNode, useContext, useState } from 'react'

// Third-party Imports
import { cn } from '@/lib/utils'

// Querium Imports
import { type YBRpage } from '../qq/YellowBrickRoad'
import { NavContext, NavContextType } from '@/NavContext'
import { NavBar } from '../qq/NavBar'
import { StimulusSelector } from '../qq/StimulusSelector'
import { HdrBar } from '../qq/HdrBar'
import { useProblemStore } from '@/store/_store'
import TotalEditor from '../schemaEditors/total/TotalEditor'
import EqualGroupsEditor from '../schemaEditors/equalGroups/EqualGroupsEditor'
import DifferenceEditor from '../schemaEditors/difference/DifferenceEditor'
import ChangeDecreaseEditor from '../schemaEditors/changeDecrease/ChangeDecreaseEditor'
import ChangeIncreaseEditor from '../schemaEditors/changeIncrease/ChangeIncreaseEditor'
import CompareEditor from '../schemaEditors/compare/CompareEditor'
import { TinyTutor } from '../qq/TinyTutor'
import { NextButton } from '../qq/NextButton'
import CheckStepButton from '../qq/CheckStepButton'

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
const RangerFillDiagram: FC<{
  className?: string
  children?: ReactNode
  page: YBRpage
  index: number
}> = ({ className, page, index }) => {
  ///////////////////////////////////////////////////////////////////
  // Contexts
  ///////////////////////////////////////////////////////////////////

  const { api, current } = useContext(NavContext) as NavContextType

  ///////////////////////////////////////////////////////////////////
  // Store
  ///////////////////////////////////////////////////////////////////

  const { logAction, submitOrganize, getHint, problem, session, rank } =
    useProblemStore()

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  const [equation, setEquation] = useState<string>('')
  const [values, setValues] = useState<string[]>([])
  const [msg, setMsg] = useState<string>('')
  const [busy, setBusy] = useState(false)
  const [complete, setComplete] = useState(false)
  const wpHints = problem.wpHints?.find(
    wpHint => wpHint.page === `${rank}${page.id}`,
  )

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  async function handleCheckEquation(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    if (evt.altKey) {
      api?.scrollNext()
    } else {
      setBusy(true)
      setMsg('Just a moment while I verify your equation')
      logAction('RangerFillDiagram : Clicked Next')

      logAction('RangerFillDiagram : Checking Schema : ' + equation)
      const result = await submitOrganize(equation, values)
      logAction(
        'RangerFillDiagram : Checked Equation : ' + JSON.stringify(result),
      )
      setBusy(false)
      setMsg(result.message)
      if (result.stepStatus == 'VALID') {
        setComplete(true)
      }
    }
  }

  async function getAiHints() {
    setBusy(true)
    setMsg('Hmmm...  let me see.')
    setMsg(await getHint())
    setBusy(false)
  }

  function HandleEquationChange(latex: string, values: string[]) {
    setEquation(latex)
    setValues(values)
  }

  ///////////////////////////////////////////////////////////////////
  // JSX
  ///////////////////////////////////////////////////////////////////

  if (current !== index + 1) return null

  return (
    <div
      className={cn(
        'RangerFillDiagram m-0 flex h-full w-full flex-col justify-stretch rounded-lg border bg-card p-0 text-card-foreground shadow-sm',
        className,
      )}
    >
      <HdrBar
        highlightLetter={page?.phase}
        subTitle={page?.phaseLabel}
        instructions={page?.title}
      ></HdrBar>
      <div className="m-2 flex grow flex-col justify-stretch gap-2 overflow-y-auto p-2">
        <StimulusSelector
          className={cn(
            'flex w-full rounded-md border border-input bg-slate-200 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
            'inline',
          )}
          stimulusText={problem.stimulus}
        ></StimulusSelector>

        <div className="grow">
          {session.schema === 'additiveTotalSchema' ? (
            <TotalEditor
              onChange={HandleEquationChange}
              className={className}
            ></TotalEditor>
          ) : null}
          {session.schema === 'multiplicativeEqualGroupsSchema' ? (
            <EqualGroupsEditor
              onChange={HandleEquationChange}
              className={className}
            ></EqualGroupsEditor>
          ) : null}
          {session.schema === 'additiveDifferenceSchema' ? (
            <DifferenceEditor
              onChange={HandleEquationChange}
              className={className}
            ></DifferenceEditor>
          ) : null}
          {session.schema === 'subtractiveChangeSchema' ? (
            <ChangeDecreaseEditor
              onChange={HandleEquationChange}
              className={className}
            ></ChangeDecreaseEditor>
          ) : null}
          {session.schema === 'additiveChangeSchema' ? (
            <ChangeIncreaseEditor
              onChange={HandleEquationChange}
              className={className}
            ></ChangeIncreaseEditor>
          ) : null}
          {session.schema === 'multiplicativeCompareSchema' ? (
            <CompareEditor
              onChange={HandleEquationChange}
              className={className}
            ></CompareEditor>
          ) : null}
        </div>
      </div>

      <NavBar className="relative flex items-center justify-end space-x-3 bg-slate-300 pr-2">
        <TinyTutor
          msg={msg}
          busy={busy}
          intro={page?.intro}
          psHints={page?.psHints}
          wpHints={wpHints?.hints}
          getAiHints={getAiHints}
        />
        {!complete ? (
          <CheckStepButton
            busy={busy}
            disabled={busy}
            onClick={evt => handleCheckEquation(evt)}
          />
        ) : (
          <NextButton busy={busy}></NextButton>
        )}
        <h1 className="absolute bottom-0 left-0 text-slate-500">
          RangerFillDiagram
        </h1>
      </NavBar>
    </div>
  )
}

RangerFillDiagram.displayName = 'RangerFillDiagram'
export default RangerFillDiagram
