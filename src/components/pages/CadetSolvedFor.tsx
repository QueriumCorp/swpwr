'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { YellowBrickRoad, type YBRpage } from '../qq/YellowBrickRoad'
import { NavContext, NavContextType } from '@/NavContext'
import {
  useAvatarAPI,
  AvatarAPIType,
  AnimeTutor,
} from '@/components/AnimeTutor'
import { NavBar } from '../qq/NavBar'
import { CarouselPrevious, CarouselNext } from '../ui/carousel'
import { StimulusSelector } from '../qq/StimulusSelector/StimulusSelector'
import { Textarea } from '../ui/textarea'
import { useProblemStore } from '@/store/_store'
import { HdrBar } from '../qq/HdrBar'

const CadetSolvedFor: React.FC<{
  className?: string
  children?: React.ReactNode
  page?: YBRpage
  index: number
}> = ({ className, page, index }) => {
  const { current } = React.useContext(NavContext) as NavContextType

  // Store
  const { problem, session } = useProblemStore()

  const { sayMsg } = useAvatarAPI() as AvatarAPIType

  React.useEffect(() => {
    sayMsg("You've prepared and organized...'!", 'idle:02')
  }, [])

  // JSX
  if (current !== index + 1) return null // Dont render if page not active
  return (
    <div
      className={cn(
        'CadetSolvedFor',
        'm-0 mb-2 flex h-full w-full flex-col justify-stretch rounded-lg bg-card pl-2 pr-2 pt-2 text-card-foreground shadow-sm',
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
          <StimulusSelector
            className={cn(
              'mb-2 flex w-full rounded-md border border-input bg-slate-100 px-3 py-2',
              className,
            )}
            stimulusText={problem.stimulus || ''}
          ></StimulusSelector>
          <h1>The value you found was {session.finalAnswer}</h1>
          <Textarea placeholder="your answer" />
        </div>
      </div>

      <NavBar className="flex justify-end space-x-3 bg-slate-100 pr-2">
        {/* Tiny Avatar */}
        {YellowBrickRoad[current].phase !== 'I' ? (
          <AnimeTutor
            style={{
              bottom: '0px',
              right: '0px',
              height: '100%',
            }}
          />
        ) : null}
        <CarouselPrevious className="relative left-0">
          Previous
        </CarouselPrevious>
        <CarouselNext className="relative right-0">Next</CarouselNext>
      </NavBar>
    </div>
  )
}
CadetSolvedFor.displayName = 'CadetSolvedFor'
export default CadetSolvedFor
