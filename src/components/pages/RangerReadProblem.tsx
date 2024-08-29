'use client'

// React Imports
import { useContext, useEffect, useState } from 'react'

// Querium Imports
import { cn } from '@/lib/utils'
import { type YBRpage } from '../qq/YellowBrickRoad'
import { NavContext, NavContextType } from '@/NavContext'
import { NavBar } from '../qq/NavBar'
import { StimulusSelector } from '../qq/StimulusSelector'
import { HdrBar } from '../qq/HdrBar'
import { useProblemStore } from '@/store/_store'
import { TinyTutor } from '../qq/TinyTutor'
import { NextButton } from '../qq/NextButton'
import { BabyFox } from '../StepWise/Steps/BabyFox'

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
    'Please read the problem while I get things ready to go.',
  )
  const wpHints = problem.wpHints?.find(
    wpHint => wpHint.page === `${rank}${page.id}`,
  )
  const [aiHints, setAiHints] = useState<string[]>([])

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (session.sessionToken.length > 0) {
      setBusy(false)
      setMsg('')
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

        <div className="flex grow gap-2">
          <BabyFox className="h-[72px] w-[72px] bg-red-500" />
        </div>
      </div>
      <NavBar className="relative flex items-center justify-end space-x-3 bg-slate-300 pr-2">
        <TinyTutor
          msg={msg}
          busy={busy}
          intro={page?.intro}
          psHints={page?.psHints}
          wpHints={wpHints?.hints}
        />
        <NextButton busy={busy}></NextButton>

        <h1 className="absolute bottom-0 left-0 text-slate-500">
          RangerReadProblem
        </h1>
      </NavBar>
    </div>
  )
}
RangerReadProblem.displayName = 'RangerReadProblem'
export default RangerReadProblem

///////////////////////////////////////////////////////////////////
// Support Functions
///////////////////////////////////////////////////////////////////
