'use client'

// React Imports
import { useContext, useEffect, useMemo, useState } from 'react'

// Querium Imports
import { cn } from '@/lib/utils'
import { type YBRpage } from '../qq/YellowBrickRoad'
import { NavContext, NavContextType } from '@/NavContext'
import { NavBar } from '../qq/NavBar'
import { StimulusSelector } from '../qq/StimulusSelector/StimulusSelector'
import { HdrBar } from '../qq/HdrBar'
import { useProblemStore } from '@/store/_store'
import { HintStage, TinyTutor } from '../qq/TinyTutor'
import { NextButton } from '../qq/NextButton'
import { Button } from '../ui/button'

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

  const { problem, rank, session, toggleChatty } = useProblemStore()

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  const [navDisabled, setNavDisabled] = useState(true)

  const [busy, setBusy] = useState(true)
  const [msg, setMsg] = useState<string>(
    rank === 'ranger'
      ? "Here's your next problem. I'll give you some time to read it."
      : page.intro![0],
  )

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
    if (session.sessionToken.length > 0) {
      setBusy(false)
      setMsg(rank === 'ranger' ? '' : page.intro![1])
    }
  }, [session])

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  function hintChanged(hintStage: string, current: number, count: number) {
    if (count > 0 && current === count) {
      let newMsg = ''

      switch (hintStage) {
        case 'intro':
          newMsg = page?.intro![page.intro!.length - 1]
          break
        case 'psHints':
          newMsg = page?.psHints![page.psHints!.length - 1]
          break
      }

      setMsg(newMsg)
      if (session.chatty) {
        setNavDisabled(false)
      } else {
        // if not chatty, disable next for 5 seconds
        setTimeout(() => {
          setNavDisabled(false)
        }, 5000)
      }
    }
  }

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
            'w-full rounded-md border border-input bg-slate-100 px-3 py-2',
            'ring-offset-background placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className,
            'inline',
          )}
          stimulusText={problem.stimulus}
        ></StimulusSelector>
      </div>
      <NavBar className="relative flex items-center justify-end space-x-3 bg-slate-100 pr-0">
        <TinyTutor
          msg={msg}
          busy={busy}
          hintList={hintList}
          hintChanged={hintChanged}
        ></TinyTutor>
        <div className="flex h-20 w-20 items-center justify-center">
          <NextButton
            className={cn(busy ? 'scale-[100%]' : 'scale-[200%]')}
            disabled={navDisabled}
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
