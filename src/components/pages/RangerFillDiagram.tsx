'use client'

//  React Imports
import { FC, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

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
import { HintStage, TinyTutor } from '../qq/TinyTutor'
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
  const [values, setValues] = useState<
    { variable: string; value: string | null }[]
  >([])
  const [msg, setMsg] = useState<string>('')
  const [busy, setBusy] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [complete, setComplete] = useState(false)

  const hintList = useMemo(() => {
    // get page hints
    let pageHints: string[] = []
    let wpHints = problem.wpHints?.find(
      wpHint => wpHint.page === `${rank}${page.id}`,
    )
    if (wpHints?.hints) {
      pageHints = wpHints.hints
    } else if (page.psHints) {
      pageHints = page.psHints
    }

    // define hint stages
    let hintStages: HintStage[] = []
    if (page.intro?.length) {
      hintStages.push('intro')
    } else {
      hintStages.push('pre')
    }
    if (pageHints?.length) {
      hintStages.push('psHints')
    }
    if (page.aiHints) {
      hintStages.push('aiHints')
    }

    return {
      stages: hintStages,
      intro: page.intro,
      psHints: pageHints,
    }
  }, [])

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (valuesComplete(values)) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [values])

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

      if (valuesComplete(values)) {
        const result = await submitOrganize(equation, values)
        logAction({
          page: page.id,
          activity: 'checkStep',
          data: { result },
          action:
            'RangerFillDiagram : Checked Equation : ' + JSON.stringify(result),
        })
        setBusy(false)
        setMsg(result.message)
        if (result.stepStatus == 'VALID') {
          setComplete(true)
        }
      } else {
        setBusy(false)
        setMsg('Please enter all values')
      }
    }
  }

  async function getAiHints() {
    if (complete) {
      setMsg('You have solved this part! Continue to the next page.')
      return
    }
    setBusy(true)
    setMsg('Hmmm...  let me see.')
    setMsg(await getHint())
    setBusy(false)
  }

  function HandleEquationChange(
    latex: string,
    values: { variable: string; value: string | null }[],
  ) {
    setEquation(latex)
    setValues(values)
    logAction({
      page: page.id,
      activity: 'changedValues',
      data: { latex, values },
    })
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

      <NavBar className="relative flex items-center justify-end space-x-3 bg-slate-300 pr-0">
        <TinyTutor
          msg={msg}
          busy={busy}
          hintList={hintList}
          getAiHints={getAiHints}
        />
        <div className="flex h-20 w-20 items-center justify-center">
          {!complete ? (
            <CheckStepButton
              busy={busy}
              disabled={disabled}
              onClick={evt => handleCheckEquation(evt)}
            />
          ) : (
            <NextButton className="scale-[200%]" busy={busy}></NextButton>
          )}
        </div>
      </NavBar>
    </div>
  )
}

RangerFillDiagram.displayName = 'RangerFillDiagram'
export default RangerFillDiagram

function valuesComplete(values: { variable: string; value: string | null }[]) {
  if (!Array.isArray(values) || values.length == 0) return false
  return values.every(v => v.value !== '')
}
