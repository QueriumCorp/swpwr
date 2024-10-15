'use client'

//  React Imports
import {
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

// Querium Imports
import { cn, randomClickNextMsg, randomThinkingMsg } from '@/lib/utils'
import { type YBRpage } from '../qq/YellowBrickRoad'
import { NavContext, NavContextType } from '@/NavContext'
import { NavBar } from '../qq/NavBar'
import { StimulusSelector } from '../qq/StimulusSelector'
import { HdrBar } from '../qq/HdrBar'
import { useProblemStore } from '@/store/_store'
import { Textarea } from '../ui/textarea'
import { HintStage, TinyTutor } from '../qq/TinyTutor'
import { NextButton } from '../qq/NextButton'
import MathStatic from '../qq/MathStatic'
import CheckStepButton from '../qq/CheckStepButton'

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

  const { logAction, submitMyOwnWords, getHint, problem, session, rank } =
    useProblemStore()

  ///////////////////////////////////////////////////////////////////
  // Ref
  ///////////////////////////////////////////////////////////////////

  const inputRef = useRef<HTMLTextAreaElement>(null)

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  const [msg, setMsg] = useState<string>('')
  const [busy, setBusy] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [complete, setComplete] = useState(false)
  const [ownWords, setOwnWords] = useState<string>('')

  const mathAnswer = useMemo(() => {
    return isNumber(session.mathAnswer)
      ? `${session.identifiers[0]}=${session.mathAnswer}`
      : session.mathAnswer
  }, [session.mathAnswer])

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
    ownWords.length > 3 ? setDisabled(false) : setDisabled(true)
  }, [ownWords])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  async function handleCheckOwnWords(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    if (evt.altKey) {
      api?.scrollNext()
    } else if (ownWords.length < 3) {
      setMsg('Please explain your answer in your own words')
    } else {
      setMsg("I'm thinking...")
      setBusy(true)
      logAction({ page: page.id, activity: 'ACTIVITY', data: {} })
      const result = await submitMyOwnWords(ownWords)
      logAction({
        page: page.id,
        activity: 'checkStep',
        data: { ownWords },
        action: `RangerOwnWords : Checked OwnWords : ${ownWords} : ${JSON.stringify(result)}`,
      })

      setBusy(false)

      if (result.stepStatus == 'INVALID') {
        setMsg(`${result.message}\n\n${randomClickNextMsg()}`)
      }
      if (result.stepStatus == 'COMPLETE') {
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

        <MathStatic latex={session.endPhaseWEqn || mathAnswer}></MathStatic>

        <div className="grow">
          <Textarea
            ref={inputRef}
            value={ownWords}
            onChange={e => setOwnWords(e.target.value)}
            placeholder="Type your answer here"
          />
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
              onClick={evt => handleCheckOwnWords(evt)}
            />
          ) : (
            <NextButton className="scale-[200%]" busy={busy}></NextButton>
          )}
        </div>
      </NavBar>
    </div>
  )
}

function isNumber(input: string) {
  const regex = /^[0-9 .\/-]+$/
  return regex.test(input)
}

RangerOwnWords.displayName = 'RangerOwnWords'
export default RangerOwnWords
