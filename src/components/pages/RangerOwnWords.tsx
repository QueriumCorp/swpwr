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
import { Input } from '../ui/input'

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

  const [fragment0, setFragment0] = useState<string>('')
  const [fragment1, setFragment1] = useState<string>('')
  const [fragment2, setFragment2] = useState<string>('')
  const [blank0, setBlank0] = useState<string>('')
  const [blank1, setBlank1] = useState<string>('')
  const [value0, setValue0] = useState<string>('')
  const [value1, setValue1] = useState<string>('')

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
    ownWords.length >= 3 ? setDisabled(false) : setDisabled(true)
  }, [ownWords])

  useEffect(() => {
    value0.length > 0 && value1.length > 0
      ? setDisabled(false)
      : setDisabled(true)
  }, [value0, value1])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    const unitTag = '[UNIT]'
    const valueTag = '[VALUE]'
    if (session.phaseESentence) {
      const unitIndex = session.phaseESentence.indexOf(unitTag)
      const valueIndex = session.phaseESentence.indexOf(valueTag)

      setBlank0(unitIndex < valueIndex ? unitTag : valueTag)
      setBlank1(unitIndex < valueIndex ? valueTag : unitTag)

      let i0 = 0,
        i1,
        i2,
        i3,
        i4
      if (unitIndex < valueIndex) {
        // first block of text
        i0 = 0
        i1 = unitIndex

        // second block of text
        i2 = unitIndex + unitTag.length
        i3 = valueIndex

        // third block of text - Note that slice continues to the end of the string if no i5 is provided
        i4 = valueIndex + valueTag.length
      } else {
        // first block of text
        i0 = 0
        i1 = valueIndex

        // second block of text
        i2 = valueIndex + valueTag.length
        i3 = unitIndex

        // third block of text - Note that slice continues to the end of the string if no i5 is provided
        i4 = unitIndex + unitTag.length
      }

      setFragment0(session.phaseESentence.slice(i0, i1))
      setFragment1(session.phaseESentence.slice(i2, i3))
      setFragment2(session.phaseESentence.slice(i4))
    }
  }, [session.phaseESentence])

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  async function handleCheckOwnWords(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    if (evt.altKey) {
      api?.scrollNext()
    } else {
      setMsg("I'm thinking...")
      setBusy(true)

      let theSentence =
        ownWords.length > 0
          ? ownWords
          : `${fragment0}${value0}${fragment1}${value1}${fragment2}`

      logAction({ page: page.id, activity: 'ACTIVITY', data: { theSentence } })
      const result = await submitMyOwnWords(theSentence)
      logAction({
        page: page.id,
        activity: 'checkStep',
        data: { theSentence },
        action: `RangerOwnWords : Checked OwnWords : ${theSentence} : ${JSON.stringify(result)}`,
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

        <MathStatic
          style={{ fontSize: '48px', marginLeft: 'auto', marginRight: 'auto' }}
          latex={session.endPhaseWEqn || mathAnswer}
        ></MathStatic>
        {rank === 'cadet' || rank === 'scout' ? (
          <div className="mx-auto">
            <div className="flex grow items-baseline justify-start gap-1">
              <div className="select-none" style={{ width: 'fitContent' }}>
                {fragment0}
              </div>
              <Input
                className="w-24"
                placeholder={blank0 == '[VALUE]' ? 'number' : 'things'}
                value={value0}
                onChange={e => setValue0(e.target.value)}
              ></Input>
              <div className="select-none" style={{ width: 'fitContent' }}>
                {fragment1}
              </div>
              <Input
                className="w-24"
                placeholder={blank1 == '[VALUE]' ? 'number' : 'things'}
                value={value1}
                onChange={e => setValue1(e.target.value)}
              ></Input>
              <div className="select-none" style={{ width: 'fitContent' }}>
                {fragment2}
              </div>
            </div>
          </div>
        ) : (
          // ranger
          <div>
            <Textarea
              ref={inputRef}
              value={ownWords}
              onChange={e => setOwnWords(e.target.value)}
              placeholder="Type your answer here"
            />
          </div>
        )}
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
