'use client'

//  React Imports
import { FC, ReactNode, useContext, useEffect, useState } from 'react'

// Querium Imports
import { cn } from '@/lib/utils'
import { type YBRpage } from '../qq/YellowBrickRoad'
import { NavContext, NavContextType } from '@/NavContext'
import { NavBar } from '../qq/NavBar'
import { StimulusSelector } from '../qq/StimulusSelector'
import { HdrBar } from '../qq/HdrBar'
import { useProblemStore } from '@/store/_store'
import { Textarea } from '../ui/textarea'
import { TinyTutor } from '../qq/TinyTutor'
import { NextButton } from '../qq/NextButton'
import { set } from 'zod'

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
const RangerOwnWords: FC<{
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

  const { logAction, submitExplanation, getHint, problem, session, rank } =
    useProblemStore()

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  const [msg, setMsg] = useState<string>('')
  const [busy, setBusy] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [ownWords, setOwnWords] = useState<string>('')
  const wpHints = problem.wpHints?.find(
    wpHint => wpHint.page === `${rank}${page.id}`,
  )
  const [aiHints, setAiHints] = useState<string[]>([])

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  useEffect(() => {
    console.log('ownWords.length', ownWords.length)
    ownWords.length > 10 ? setDisabled(false) : setDisabled(true)
  }, [ownWords])

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  async function handleCheckOwnWords(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    console.log('handleCheckOwnWords')
    if (evt.metaKey) {
      api?.scrollNext()
    } else if (ownWords.length < 10) {
      setMsg('Please explain your answer in your own words')
    } else {
      setBusy(true)
      logAction('RangerOwnWords : Checking Own Words : ' + ownWords)
      const result = await submitExplanation(ownWords)
      logAction('RangerOwnWords : Checked OwnWords : ')

      setBusy(false)
      setMsg(result.message)
      if (result.stepStatus == 'VALID') {
        api?.scrollNext()
      }
    }
  }

  async function getAiHints() {
    setBusy(true)
    setMsg('Hmmm...  let me see.')
    const hints: string[] = await getHint()
    setMsg('')
    setBusy(false)
    setAiHints(hints)
  }

  ///////////////////////////////////////////////////////////////////
  // JSX
  ///////////////////////////////////////////////////////////////////

  if (current !== index + 1) return null
  return (
    <div
      className={cn(
        'RangerOwnWords',
        'm-0 flex h-full w-full flex-col justify-stretch',
        'rounded-lg border bg-card p-0 text-card-foreground shadow-sm',
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
            'flex w-full rounded-md border border-input bg-slate-200 px-3 py-2 text-sm',
            'ring-offset-background',
            'placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className,
            'inline',
          )}
          stimulusText={problem.stimulus}
        ></StimulusSelector>

        <div className="grow">
          <Textarea
            value={ownWords}
            onChange={e => setOwnWords(e.target.value)}
            placeholder="Type your answer here"
          />
        </div>
      </div>

      <NavBar className="relative flex items-center justify-end space-x-3 bg-slate-300 pr-2">
        <TinyTutor
          msg={msg}
          intro={page?.intro}
          psHints={page?.psHints}
          wpHints={wpHints?.hints}
        />
        <NextButton
          busy={busy}
          disabled={disabled}
          onClick={evt => handleCheckOwnWords(evt)}
        ></NextButton>

        <h1 className="absolute bottom-0 left-0 text-slate-500">
          RangerOwnWords
        </h1>
      </NavBar>
    </div>
  )
}

RangerOwnWords.displayName = 'RangerOwnWords'
export default RangerOwnWords
