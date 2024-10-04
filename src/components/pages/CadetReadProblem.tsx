'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { type YBRpage } from '../qq/YellowBrickRoad'
import { NavContext, NavContextType } from '@/NavContext'
import {
  useAvatarAPI,
  AvatarAPIType,
  AnimeTutor,
  Chat,
} from '@/components/AnimeTutor'
import { NavBar } from '../qq/NavBar'
import { StimulusSelector } from '../qq/StimulusSelector'
import { CarouselPrevious, CarouselNext } from '../ui/carousel'
import { HdrBar } from '../qq/HdrBar'
import { useProblemStore } from '@/store/_store'
import { Button } from '../ui/button'

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
const CadetReadProblem: React.FC<{
  className?: string
  children?: React.ReactNode
  page?: YBRpage
  index: number
}> = ({ className, page, index }) => {
  ///////////////////////////////////////////////////////////////////
  // Contexts
  ///////////////////////////////////////////////////////////////////

  const { current } = React.useContext(NavContext) as NavContextType

  ///////////////////////////////////////////////////////////////////
  // Store
  ///////////////////////////////////////////////////////////////////

  const { logAction, problem, toggleChatty } = useProblemStore()

  const { sayMsg } = useAvatarAPI() as AvatarAPIType
  React.useEffect(() => {
    sayMsg(
      'Read this statement carefully and then click the right arrow to continue.',
      'idle:01',
    )
  }, [])

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  const [started, setStarted] = React.useState(false)

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  function handleStart() {
    setStarted(true)
    toggleChatty()
  }

  // JSX
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
            'flex w-full rounded-md border border-input bg-slate-200 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
            'inline',
          )}
          stimulusText={problem.stimulus || ''}
        ></StimulusSelector>

        <div className="flex grow gap-2"></div>
      </div>
      <NavBar className="relative flex justify-end space-x-3 bg-slate-300 pr-2">
        {/* Tiny Avatar */}
        <AnimeTutor
          style={{
            bottom: '0px',
            right: '0px',
            height: '100%',
          }}
        />
        <Chat
          msg="RATATATA"
          className="absolute bottom-[50%] right-[200px] h-fit min-h-[64px] w-fit font-capriola"
        />
        <CarouselPrevious className="relative left-0">
          Previous
        </CarouselPrevious>
        <CarouselNext className="relative right-0">Next</CarouselNext>
      </NavBar>
      {started ? null : (
        <div className="fixed flex h-full w-full items-center justify-center bg-black bg-opacity-80">
          <Button
            size="lg"
            className="bg-qqBrand hover:bg-qqAccent"
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
