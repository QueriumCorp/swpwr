'use client'

// React Imports
import { useContext, useEffect, useMemo, useState } from 'react'

// Querium Imports
import { cn } from '@/lib/utils'
import { type YBRpage } from '../qq/YellowBrickRoad'
import { NavContext, NavContextType } from '@/NavContext'
import { NavBar } from '../qq/NavBar'
import { StimulusSelector } from '../qq/StimulusSelector'
import { HdrBar } from '../qq/HdrBar'
import { useProblemStore } from '@/store/_store'
import { HintStage, TinyTutor } from '../qq/TinyTutor'
import { NextButton } from '../qq/NextButton'

const RangerReadProblem: React.FC<{
  className?: string
  children?: React.ReactNode
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

  const { problem, rank, session, getHint } = useProblemStore()

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  const [busy, setBusy] = useState(true)
  const [msg, setMsg] = useState<string>(
    rank === 'ranger'
      ? "Here's your next problem. I'll give you some time to read it."
      : page.intro![0],
  )

  const hintList = useMemo(() => {
    // get page hints
    let pageHints: string[] = []

    // define hint stages
    let hintStages: HintStage[] = []

    hintStages.push('pre')

    return {
      stages: hintStages,
      intro: [],
      psHints: pageHints,
    }
  }, [])

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (session.sessionToken.length > 0) {
      setBusy(false)
      setMsg(rank === 'ranger' ? '' : page.intro![1])
    }
  }, [session])

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  // JSX
  ///////////////////////////////////////////////////////////////////
  if (current !== index + 1) return null
  return (
    <div
      className={cn(
        'RangerReadProblem',
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
        <StimulusSelector
          className={cn(
            'flex',
            'w-full rounded-md border border-input bg-slate-200 px-3 py-2',
            'text-sm ring-offset-background placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2',
            'focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className,
            'inline',
          )}
          stimulusText={problem.stimulus}
        ></StimulusSelector>
      </div>
      <NavBar className="relative flex items-center justify-end space-x-3 bg-slate-300 pr-0">
        <TinyTutor msg={msg} busy={busy} hintList={hintList}></TinyTutor>
        <div className="flex h-20 w-20 items-center justify-center">
          <NextButton
            className={cn(busy ? 'scale-[100%]' : 'scale-[200%]')}
            busy={busy}
          ></NextButton>
        </div>
      </NavBar>
    </div>
  )
}
RangerReadProblem.displayName = 'RangerReadProblem'
export default RangerReadProblem

///////////////////////////////////////////////////////////////////
// Support Functions
///////////////////////////////////////////////////////////////////
