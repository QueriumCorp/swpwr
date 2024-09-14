'use client'

// React Imports
import { FC, ReactNode, useContext, useEffect, useState } from 'react'

// Querium Imports
import { cn } from '@/lib/utils'
import { type YBRpage } from '../qq/YellowBrickRoad'
import { NavContext, NavContextType } from '@/NavContext'
import { useProblemStore } from '@/store/_store'
import { HdrBar } from '../qq/HdrBar'
import { NavBar } from '../qq/NavBar'
import { StimulusSelector } from '../qq/StimulusSelector'
import { TinyTutor } from '../qq/TinyTutor'
import { Card } from '../ui/card'
import { NextButton } from '../qq/NextButton'

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
  const wpHints = problem.wpHints?.find(
    wpHint => wpHint.page === `${rank}${page.id}`,
  )

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
    } else if (
      explanation?.type === 'schema' ||
      explanation?.type === 'estimation'
    ) {
      api?.scrollNext()
    } else {
      setBusy(true)
      logAction('RangerReflect : Clicked Next')
      logAction('RangerReflect : Checking Explanation')
      switch (explanation?.type) {
        case 'schema':
          setMsg(schemaMsgs[Math.floor(Math.random() * schemaMsgs.length)])
          break
        case 'estimation':
          setMsg(
            estimationMsgs[Math.floor(Math.random() * estimationMsgs.length)],
          )
          break
        case 'bad':
          setMsg(badMsgs[Math.floor(Math.random() * badMsgs.length)])
          break
      }
      submitExplanation(explanation?.type || '')
      setBusy(false)
    }
  }

  ///////////////////////////////////////////////////////////////////
  // JSX
  ///////////////////////////////////////////////////////////////////

  if (current !== index + 1) return null
  return (
    <div
      className={cn(
        'NewbFindFacts m-0 flex h-full w-full flex-col justify-stretch rounded-lg border bg-card p-0 text-card-foreground shadow-sm',
        className,
      )}
    >
      <HdrBar
        highlightLetter={page?.phase}
        subTitle={page?.phaseLabel}
        instructions={page?.title}
      ></HdrBar>

      <div className="relative flex grow flex-col items-center justify-stretch gap-2 p-2">
        <StimulusSelector
          className={cn(
            'flex w-full rounded-md border border-input bg-slate-200 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
            'inline',
          )}
          stimulusText={problem.stimulus}
        ></StimulusSelector>
        <p className="select-none">{session.myOwnWords}</p>
        <h2>Why does your answer make sense? Choose the best reason.</h2>
        <div className="relative flex grow flex-col items-center justify-center gap-2 p-2">
          {explanations.map(exp => (
            <Card
              key={exp.type}
              onClick={() => {
                setExplanation(exp)
              }}
              className={cn(
                'w-96 px-4 py-2 ring-qqBrand',
                exp.type === explanation?.type ? 'ring-4' : 'ring-0',
                'cursor-pointer hover:bg-qqAccent hover:text-white',
              )}
            >
              {exp.text}
            </Card>
          ))}
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

        <NextButton
          busy={busy}
          disabled={disabled}
          onClick={evt => HandleCheckExplanation(evt)}
        ></NextButton>
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
  "Oooh, yay! I totally agree with you, cutie pie! Your reason is as clever as my tail is fluffy! It's definitely the most paw-some explanation we've seen so far!",
  "Aww, absolutely sweetie! I think your reasoning is just as sharp as my little fox teeth! You're absolutely right on track - that's the best reason yet!",
]
const schemaMsgs = [
  "Ok! That's not the reason I like best, but it's a good one.",
  "Hmm, okay! While it's not my top pick, I do think that's a pretty cool reason! You're getting close to finding the perfect answer!",
  "Alrighty then! That's a great try, but there is an even better reason.",
]

const badMsgs = [
  "No, that reason doesn't use good math thinking to tell why the answer makes sense. Try again.",
  "Oh my whiskers! I think we can do better than that! Let's try again and use our super sharp fox brains to figure out why the answer makes sense, okay?",
  "Hmmm, sweetie, I think we need to dig deeper into the mathy goodness to make sure it really adds up! Can you try again and use your super clever fox mind to find a reason that's as smooth as my fur? Let's get those numbers working together like a pack of happy foxes!",
]
