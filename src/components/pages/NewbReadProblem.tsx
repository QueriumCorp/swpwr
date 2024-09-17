'use client'

import { useContext, useState } from 'react'

import { cn } from '@/lib/utils'
import { type YBRpage } from '../qq/YellowBrickRoad'
import { NavContext, NavContextType } from '@/NavContext'
import { NavBar } from '../qq/NavBar'
import { CarouselNext } from '../ui/carousel'
import { StimulusSelector } from '../qq/StimulusSelector'
import { HdrBar } from '../qq/HdrBar'
import { useProblemStore } from '@/store/_store'
import { TinyTutor } from '../qq/TinyTutor'

const NewbReadProblem: React.FC<{
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

  const { logAction, problem } = useProblemStore()

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  const [navDisabled, setNavDisabled] = useState(true)
  const [msg, setMsg] = useState('')

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  function hintChanged(hintStage: string, current: number, count: number) {
    if (count > 0 && current === count) {
      console.info('hintChanged', hintStage, current, count)
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
      setNavDisabled(false)
    }
  }
  ///////////////////////////////////////////////////////////////////
  // JSX
  ///////////////////////////////////////////////////////////////////

  if (current !== index + 1) return null
  return (
    <div
      className={cn(
        'NewbReadProblem m-0 flex h-full w-full flex-col justify-stretch rounded-lg border bg-card p-0 text-card-foreground shadow-sm',
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
            'flex w-full rounded-md border border-input bg-slate-200 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
            'inline',
          )}
          stimulusText={problem.stimulus}
        ></StimulusSelector>

        <div className="flex grow gap-2"></div>
      </div>
      <NavBar className="relative flex justify-end space-x-3 bg-slate-300 pr-2">
        <TinyTutor
          msg={msg}
          intro={page?.intro}
          psHints={page?.psHints}
          hintChanged={hintChanged}
          closeable={false}
        />
        <CarouselNext
          disabled={navDisabled}
          className="relative right-0"
          onClick={() => {
            logAction('NewbReadProblem : Clicked Next')
            api?.scrollNext()
          }}
        >
          Next
        </CarouselNext>
      </NavBar>
    </div>
  )
}
NewbReadProblem.displayName = 'NewbReadProblem'
export default NewbReadProblem
