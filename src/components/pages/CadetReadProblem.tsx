'use client'

import { useContext, useMemo, useState } from 'react'

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

const CadetReadProblem: React.FC<{
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

  const { logAction, problem, rank, session, toggleChatty } = useProblemStore()

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  const [navDisabled, setNavDisabled] = useState(true)
  const [msg, setMsg] = useState('')
  const [started, setStarted] = useState(false)

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

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  function handleStart() {
    // Are we in edX?
    const swReactJSxBlocks =
      document.getElementsByClassName('sw-reactjs-xblock')

    const qqROOT = document.getElementById('qqROOT') as HTMLElement
    const isFullscreen = Boolean(document.fullscreenElement)

    // If we're in edX, then we need to go fullscreen when student presses Start
    if (swReactJSxBlocks.length > 0 && !isFullscreen) {
      qqROOT.requestFullscreen()
    }

    setStarted(true)
    toggleChatty()
  }

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

  async function handleNext(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    if (evt.altKey) {
      //If Option+Enter just scroll to next page
      logAction({
        page: page.id,
        activity: 'clickNext',
        data: {},
        action: 'used option to skip',
      })
      api?.scrollNext()
    } else {
      logAction({ page: page.id, activity: 'clickNext', data: {} })
      api?.scrollNext()
    }
  }

  ///////////////////////////////////////////////////////////////////
  // JSX
  ///////////////////////////////////////////////////////////////////

  if (current !== index + 1) return null
  return (
    <div
      className={cn(
        'CadetReadProblem m-0 flex h-full w-full flex-col justify-stretch rounded-lg border bg-card p-0 text-card-foreground shadow-sm',
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
            'flex w-full',
            'rounded-md border border-input bg-slate-100 px-3 py-2 ring-offset-background',
            'placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className,
            'inline',
          )}
          stimulusText={problem.stimulus}
        ></StimulusSelector>

        <div className="flex grow gap-2"></div>
      </div>
      <NavBar className="relative flex items-center justify-end space-x-3 bg-slate-100 pr-0">
        <TinyTutor
          msg={msg}
          hintList={hintList}
          hintChanged={hintChanged}
          closeable={false}
        />

        <div className="flex h-20 w-20 items-center justify-center">
          <NextButton
            className="scale-[200%]"
            disabled={navDisabled}
            onClick={handleNext}
          ></NextButton>
        </div>
      </NavBar>{' '}
      {started ? null : (
        <div className="fixed flex h-full w-full items-center justify-center bg-black bg-opacity-80">
          <Button
            size="lg"
            className="bg-qqBrand text-xl hover:bg-qqAccent"
            onClick={() => handleStart()}
          >
            START
          </Button>
        </div>
      )}
    </div>
  )
}
CadetReadProblem.displayName = 'CadetReadProblem'
export default CadetReadProblem
