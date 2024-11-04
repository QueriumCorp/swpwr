'use client'

// React Imports
import { FC, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

// Third Party Imports
import { HiMiniSpeakerWave } from 'react-icons/hi2'

// Querium Imports
import { cn, makeVocalizable } from '@/lib/utils'
import { type YBRpage } from '../qq/YellowBrickRoad'
import { NavContext, NavContextType } from '@/NavContext'
import { useProblemStore } from '@/store/_store'
import { HdrBar } from '../qq/HdrBar'
import { NavBar } from '../qq/NavBar'
import { StimulusSelector } from '../qq/StimulusSelector/StimulusSelector'
import { HintStage, TinyTutor } from '../qq/TinyTutor'
import { Card, CardContent, CardHeader } from '../ui/card'
import { NextButton } from '../qq/NextButton'
import CheckStepButton from '../qq/CheckStepButton'
import vocalize from '@/lib/speech'

interface Explanation {
  type: string
  text: string
}

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
const RangerReflect: FC<{
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

  const { problem, studentLog, logAction, session, rank, submitExplanation } =
    useProblemStore()

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  const [explanations, setExplanations] = useState<Explanation[]>(
    session.explanations,
  )
  const [explanation, setExplanation] = useState<Explanation | null>(null)
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
    setExplanations(session.explanations)
  }, [session.explanations])

  useEffect(() => {
    if (explanation) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [explanation])

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  async function HandleCheckExplanation(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    if (evt.altKey) {
      //If Cmd+Enter just scroll to next page
      api?.scrollNext()
      return
    }

    logAction({ page: page.id, activity: 'ACTIVITY', data: {} })
    switch (explanation?.type) {
      case 'schema':
        setMsg(schemaMsgs[Math.floor(Math.random() * schemaMsgs.length)])
        setComplete(true)
        break
      case 'estimation':
        setMsg(
          estimationMsgs[Math.floor(Math.random() * estimationMsgs.length)],
        )
        setComplete(true)
        break
      case 'bad':
        setMsg(badMsgs[Math.floor(Math.random() * badMsgs.length)])
        setComplete(false)
        break
    }
    submitExplanation(explanation || { type: '', text: '' })
  }

  function handleSpeak(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    text: string,
  ) {
    vocalize(text, evt.altKey ? true : false)
  }
  const SpeakButton: FC<{
    msg: string
  }> = ({ msg }) => {
    return (
      <button
        className="border-none text-xs"
        onClick={evt => handleSpeak(evt, msg)}
      >
        <HiMiniSpeakerWave className="text-cyan-900" />
      </button>
    )
  }

  ///////////////////////////////////////////////////////////////////
  // JSX
  ///////////////////////////////////////////////////////////////////

  if (current !== index + 1) return null
  return (
    <div
      className={cn(
        'RangerReflect',
        'rounded-lg bg-card text-card-foreground shadow-sm',
        'm-0 mb-2 flex h-full w-full flex-col justify-stretch pl-2 pr-2 pt-2',
        className,
      )}
    >
      <div className="div relative mb-2 flex grow flex-col justify-stretch gap-2 p-2">
        <div className="absolute bottom-0 left-0 right-0 top-0 overflow-y-scroll">
          <HdrBar
            highlightLetter={page?.phase}
            subTitle={page?.phaseLabel}
            instructions={page?.title}
          ></HdrBar>

          <div className="relative flex grow flex-col items-center justify-stretch gap-2 p-2">
            <StimulusSelector
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
            <p className="select-none">{session.myOwnWords}</p>
            <h2>Why does your answer make sense? Choose the best reason.</h2>
            <div className="relative flex grow flex-col items-center justify-center gap-2 overflow-y-auto p-2">
              {explanations.map(exp => (
                <Card
                  key={exp.type}
                  className={cn(
                    'w-96 px-2 py-0 ring-qqBrand',
                    exp.type === explanation?.type ? 'ring-4' : 'ring-0',
                    'hover:bg-qqAccent hover:text-white',
                  )}
                >
                  <CardHeader className="flex flex-row items-center justify-end p-1">
                    <SpeakButton msg={exp.text}></SpeakButton>
                  </CardHeader>
                  <CardContent
                    className="cursor-pointer"
                    onClick={() => {
                      setExplanation(exp)
                    }}
                  >
                    {exp.text}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <NavBar className="relative flex items-center justify-end space-x-3 bg-slate-300 pr-0">
        <TinyTutor msg={msg} busy={busy} hintList={hintList} />

        <div className="flex h-20 w-20 items-center justify-center">
          {!complete ? (
            <CheckStepButton
              busy={busy}
              disabled={disabled}
              onClick={evt => HandleCheckExplanation(evt)}
            />
          ) : (
            <NextButton className="scale-[200%]" busy={busy}></NextButton>
          )}
        </div>
      </NavBar>
    </div>
  )
}
RangerReflect.displayName = 'RangerReflect'
export default RangerReflect

function getFeedback(type: string) {
  const index = Math.floor(Math.random() * 3)
  switch (type) {
    case 'estimation':
      return estimationMsgs[index]
    case 'schema':
      return schemaMsgs[index]
    case 'bad':
      return badMsgs[index]
    default:
      return `ERROR: Invalid type: ${type}`
  }
}

const estimationMsgs = [
  "Right on! I also think that's the best reason.",
  "Yes! I totally agree with you. I think that's the best reason, too.",
  "I'm with you! That's the reason I like best, too.",
]
const schemaMsgs = [
  "Ok. That's not the reason I like best, but it's a good one.",
  "Yeah, ok. It's not my top pick, but it's a good reason.",
  "Sure! That's not my favorite reason, but it's a good one.",
]

const badMsgs = [
  "No, that reason doesn't use good math thinking to tell why the answer makes sense. Try again.",
  "No, that's not a good reason. Let's try again. Use good math reasoning to think about why the answer makes sense.",
  'Hmmm, no. Try again to find a reason that uses good math thinking.',
]
