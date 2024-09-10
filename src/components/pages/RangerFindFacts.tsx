'use client'

// React Imports
import { FC, ReactNode, useContext, useEffect, useState } from 'react'

// Querium Imports
import { cn } from '@/lib/utils'
import { type YBRpage } from '../qq/YellowBrickRoad'
import { NavContext, NavContextType } from '@/NavContext'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import Chip from '../qq/Chip'
import KnownFacts from '../qq/KnownFacts'
import { StimulusSelector } from '../qq/StimulusSelector'
import UnknownFacts from '../qq/UnknownFacts'
import { NavBar } from '../qq/NavBar'
import { HdrBar } from '../qq/HdrBar'
import { useProblemStore } from '@/store/_store'
import { TinyTutor } from '../qq/TinyTutor'
import { NextButton } from '../qq/NextButton'
import CheckStepButton from '../qq/CheckStepButton'

const RangerFindFacts: FC<{
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

  const { logAction, submitTTable, getHint, problem, rank } = useProblemStore()

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  const [knowns, setKnowns] = useState<string[]>([])
  const [unknowns, setUnknowns] = useState<string[]>([])
  const [currentFact, setCurrentFact] = useState<string>('')
  const [emote, setEmote] = useState<string>('gratz:02')
  const [msg, setMsg] = useState<string>('')
  const [busy, setBusy] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [complete, setComplete] = useState(false)
  const wpHints = problem.wpHints?.find(
    wpHint => wpHint.page === `${rank}${page.id}`,
  )

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (knowns.length === 0 && unknowns.length === 0) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [knowns, unknowns])

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  const delKnown = (fact: string) => {
    logAction(`RangerFindFacts : Deleted '${fact}' from KnownFacts`)
    setKnowns(knowns.filter(thisFact => thisFact !== fact))
  }

  const delUnknown = (fact: string) => {
    logAction(`RangerFindFacts : Deleted '${fact}' from UnknownFacts`)
    setUnknowns(unknowns.filter(thisFact => thisFact !== fact))
  }

  async function HandleCheckFacts(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    if (evt.altKey) {
      //If Cmd+Enter just scroll to next page
      api?.scrollNext()
    } else {
      setMsg('Give me a sec to review your knowns and unknowns')
      setBusy(true)
      setEmote('direct:02')
      logAction('RangerFindFacts : Clicked Next')

      logAction('RangerFindFacts : Checking Facts')
      const result = await submitTTable(knowns, unknowns)
      setBusy(false)
      setMsg(result.message)
      setEmote('pout:04')
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

  ///////////////////////////////////////////////////////////////////
  // JSX
  ///////////////////////////////////////////////////////////////////

  if (current !== index + 1) return null
  return (
    <div
      className={cn(
        'RangerFindFacts',
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        'm-0 flex h-full w-full flex-col justify-stretch p-0',
        className,
      )}
    >
      <HdrBar
        highlightLetter={page?.phase}
        subTitle={page?.phaseLabel}
        instructions={page?.title}
      ></HdrBar>
      <div className="relative flex grow flex-col justify-stretch gap-2 p-2">
        <DndContext onDragEnd={handleDragEnd}>
          <StimulusSelector
            interactive={true}
            onChangeFact={setCurrentFact}
            className={cn(
              'flex w-full rounded-md border border-input bg-slate-200 px-3 py-2 text-sm',
              'ring-offset-background placeholder:text-muted-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              className,
              'inline',
            )}
            stimulusText={problem.stimulus}
          ></StimulusSelector>

          <div className="grow">
            <div className="grid h-full grid-cols-2 gap-1">
              <KnownFacts add={addKnown}>
                {knowns.map(known => (
                  <Chip
                    id={known}
                    key={known}
                    label={known}
                    onDelete={delKnown}
                  ></Chip>
                ))}
              </KnownFacts>
              <UnknownFacts add={addUnknown}>
                {unknowns.map(unknown => (
                  <Chip
                    id={unknown}
                    key={unknown}
                    label={unknown}
                    onDelete={delUnknown}
                  ></Chip>
                ))}
              </UnknownFacts>
            </div>
          </div>
        </DndContext>
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
            disabled={disabled}
            onClick={evt => HandleCheckFacts(evt)}
          />
        ) : (
          <NextButton busy={busy}></NextButton>
        )}
      </NavBar>
    </div>
  )

  function handleDragEnd(event: DragEndEvent) {
    if (currentFact.length == 0 || currentFact.trim().length == 0) return
    if (knowns.includes(currentFact)) return

    if (event.over && event.over.id === 'KnownFacts') {
      setKnowns([...knowns, currentFact])
      logAction(`RangerFindFacts : Dropped '${currentFact}' on KnownFacts`)
    }
    if (event.over && event.over.id === 'UnknownFacts') {
      setUnknowns([...unknowns, currentFact])
      logAction(`RangerFindFacts : Dropped '${currentFact}' on UnknownFacts`)
    }
    setCurrentFact('')
  }

  function addKnown() {
    if (currentFact.length == 0 || currentFact.trim().length == 0) return
    if (knowns.includes(currentFact)) return

    logAction(`RangerFindFacts : Added '${currentFact}' to KnownFacts`)
    setKnowns([...knowns, currentFact])
    setCurrentFact('')
  }
  function addUnknown() {
    if (currentFact.length == 0 || currentFact.trim().length == 0) return
    if (unknowns.includes(currentFact)) return
    logAction(`RangerFindFacts : Added '${currentFact}' to UnknownFacts`)
    setUnknowns([...unknowns, currentFact])
    setCurrentFact('')
  }
}

RangerFindFacts.displayName = 'RangerFindFacts'
export default RangerFindFacts
