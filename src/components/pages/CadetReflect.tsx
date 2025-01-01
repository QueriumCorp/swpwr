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
import { Explanation } from '@/store/_types'

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
const CadetReflect: FC<{
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
    problem,
    logAction,
    session,
    rank,
    setSelectedExplanation,
    submitExplanation,
    setThinksGoodAnswer,
  } = useProblemStore()

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  const [explanation, setExplanation] = useState<Explanation>({
    type: '',
    text: '',
  })
  const [answer, setAnswer] = useState<-1 | 0 | 1>(-1) // -1 = not answered, 0 = false, 1 = true
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
    if (!session?.explanations) {
      return
    }
    const selectedExplanation = estimationOrBad(session.explanations)
    setExplanation(selectedExplanation)
    setSelectedExplanation(selectedExplanation)
  }, [session.explanations])

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  async function HandleCheckThinksGoodAnswer(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    if (evt.altKey) {
      //If Cmd+Enter just scroll to next page
      api?.scrollNext()
      return
    }

    logAction({
      page: page.id,
      activity: 'CheckThinksGoodAnswer',
      data: { explanation: explanation, answer: answer },
    })
    setThinksGoodAnswer(answer == 1 ? true : false)
    submitExplanation(explanation || { type: '', text: '' })
    api?.scrollNext()
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
        aria-label="Speak"
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
        'CadetReflect',
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
                'flex w-full rounded-md border border-input bg-slate-100 px-3 py-2',
                'ring-offset-background placeholder:text-muted-foreground',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50',
                className,
                'inline',
              )}
              stimulusText={problem.stimulus}
            ></StimulusSelector>
            <p className="select-none">{session.myOwnWords}</p>
            <h2>Why does your answer make sense? Here is a possible reason.</h2>
            <div className="relative flex grow flex-col items-center justify-center gap-2 overflow-y-auto p-2">
              {explanation ? (
                <Card key={explanation.type} className={cn('w-96 px-2 py-0')}>
                  <CardHeader className="flex flex-row items-center justify-end p-1">
                    <SpeakButton msg={explanation.text}></SpeakButton>
                  </CardHeader>
                  <CardContent>{explanation.text}</CardContent>
                </Card>
              ) : null}
            </div>
            <h2>
              What do you think? Is it a good reason why the answer makes sense?
            </h2>
            <div className="flex flex-row items-center justify-center gap-10">
              <div
                onClick={() => setAnswer(1)}
                className={cn(
                  'YES',
                  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium',
                  'ring-offset-background transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  'disabled:pointer-events-none disabled:opacity-50',
                  'border border-input bg-background hover:bg-qqAccent hover:text-white',
                  'h-11 rounded-md px-8',
                  answer === 1 ? 'ring-2 ring-qqBrand' : '',
                )}
              >
                Yes
              </div>
              <div
                onClick={() => setAnswer(0)}
                className={cn(
                  'NO',
                  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                  'border border-input bg-background hover:bg-qqAccent hover:text-white',
                  'h-11 rounded-md px-8',
                  answer === 0 ? 'ring-2 ring-qqBrand' : '',
                )}
              >
                No
              </div>
            </div>
          </div>
        </div>
      </div>

      <NavBar
        className="relative flex items-center justify-end space-x-3 bg-slate-100 pr-0"
        page={page}
      >
        <TinyTutor msg={msg} busy={busy} hintList={hintList} />

        <div className="flex h-20 w-20 items-center justify-center">
          <NextButton
            busy={busy}
            disabled={answer === -1}
            onClick={evt => HandleCheckThinksGoodAnswer(evt)}
          />
        </div>
      </NavBar>
    </div>
  )
}
CadetReflect.displayName = 'CadetReflect'
export default CadetReflect

function estimationOrBad(explanations: Explanation[]) {
  const estimation = explanations.find(exp => exp.type === 'estimation') || {
    type: '',
    text: '',
  }
  const bad = explanations.find(exp => exp.type === 'bad') || {
    type: '',
    text: '',
  }

  return Math.random() > 0.5 ? estimation : bad
}
