'use client'

// React Imports
import { FC, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

// Querium Imports
import { cn, randomClickNextMsg, randomThinkingMsg } from '@/lib/utils'
import { type YBRpage } from '../qq/YellowBrickRoad'
import { NavContext, NavContextType } from '@/NavContext'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import Chip from '../qq/Chip'
import KnownFacts from '../qq/KnownFacts'
import { StimulusSelector } from '../qq/StimulusSelector/StimulusSelector'
import UnknownFacts from '../qq/UnknownFacts'
import { NavBar } from '../qq/NavBar'
import { HdrBar } from '../qq/HdrBar'
import { useProblemStore } from '@/store/_store'
import { HintStage, TinyTutor } from '../qq/TinyTutor'
import { NextButton } from '../qq/NextButton'
import CheckStepButton from '../qq/CheckStepButton'

const FindFacts: FC<{
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

  const {
    logAction,
    updateTTable,
    submitTTable,
    getHint,
    problem,
    session,
    rank,
  } = useProblemStore()
  const setKnowns = (newKnowns: string[]) => {
    updateTTable(newKnowns, session.unknowns)
  }
  const setUnknowns = (newUnknowns: string[]) => {
    updateTTable(session.knowns, newUnknowns)
  }

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  const [currentFact, setCurrentFact] = useState<string>('')
  const [emote, setEmote] = useState<string>('gratz:02')
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
    if (session.knowns.length === 0 && session.unknowns.length === 0) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [session.knowns, session.unknowns])

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  const delKnown = (fact: string) => {
    logAction({ page: page.id, activity: 'deleteKnownFact', data: { fact } })
    setKnowns(session.knowns.filter(thisFact => thisFact !== fact))
  }

  const delUnknown = (fact: string) => {
    logAction({ page: page.id, activity: 'deleteUnknownFact', data: { fact } })
    setUnknowns(session.unknowns.filter(thisFact => thisFact !== fact))
  }

  async function HandleCheckFacts(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    setMsg('Give me a sec to review your knowns and unknowns')
    setBusy(true)
    setEmote('direct:02')

    const result = await submitTTable(session.knowns, session.unknowns)
    setBusy(false)
    if (evt.altKey) {
      //If Cmd+Enter just scroll to next page
      logAction({
        page: page.id,
        activity: 'checkStep',
        data: { result },
        action: 'skipped validation',
      })
      api?.scrollNext()
    } else {
      logAction({ page: page.id, activity: 'checkStep', data: { result } })

      if (result.stepStatus == 'INVALID') {
        setMsg(`${result.message}\n\n${randomClickNextMsg()}`)
        setDisabled(true)
      }
      if (result.stepStatus == 'VALID') {
        setMsg(result.message)
        setComplete(true)
      }
    }
  }

  async function getAiHints() {
    if (complete) {
      setMsg('You have solved this part! Continue to the next page.')
      return
    }
    setBusy(true)
    setMsg(randomThinkingMsg())
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
        'FindFacts',
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
              'flex w-full rounded-md border border-input bg-slate-200 px-3 py-2',
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
                {session.knowns.map(known => (
                  <Chip
                    id={known}
                    key={known}
                    label={known}
                    onDelete={delKnown}
                  ></Chip>
                ))}
              </KnownFacts>
              <UnknownFacts add={addUnknown}>
                {session.unknowns.map(unknown => (
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
      <NavBar
        className="relative flex items-center justify-end space-x-3 bg-slate-300 pr-0"
        page={page}
      >
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
              onClick={evt => HandleCheckFacts(evt)}
            />
          ) : (
            <NextButton className="scale-[200%]" busy={busy}></NextButton>
          )}
        </div>
      </NavBar>
    </div>
  )

  function handleDragEnd(event: DragEndEvent) {
    if (currentFact.length == 0 || currentFact.trim().length == 0) return
    if (session.knowns.includes(currentFact)) return

    if (event.over && event.over.id === 'KnownFacts') {
      setKnowns([...session.knowns, currentFact])
      logAction({
        page: page.id,
        activity: 'dndAddKnownFact',
        data: { fact: currentFact },
      })
    }
    if (event.over && event.over.id === 'UnknownFacts') {
      setUnknowns([...session.unknowns, currentFact])
      logAction({
        page: page.id,
        activity: 'dndAddUnknownFact',
        data: { fact: currentFact },
      })
    }
    setCurrentFact('')
  }

  function addKnown() {
    if (currentFact.length == 0 || currentFact.trim().length == 0) return
    if (session.knowns.includes(currentFact)) return

    logAction({
      page: page.id,
      activity: 'clickAddKnownFact',
      data: { fact: currentFact },
    })
    setKnowns([...session.knowns, currentFact])
    setCurrentFact('')
  }
  function addUnknown() {
    if (currentFact.length == 0 || currentFact.trim().length == 0) return
    if (session.unknowns.includes(currentFact)) return
    logAction({
      page: page.id,
      activity: 'clickAddUnknownFact',
      data: { fact: currentFact },
    })
    setUnknowns([...session.unknowns, currentFact])
    setCurrentFact('')
  }
}

FindFacts.displayName = 'FindFacts'
export default FindFacts
