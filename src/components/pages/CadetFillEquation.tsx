'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { YBRpage } from '../qq/YellowBrickRoad'
import { NavContext, NavContextType } from '@/NavContext'
import { AnimeTutor, Chat } from '@/components/AnimeTutor'
import { NavBar } from '../qq/NavBar'
import { CarouselPrevious, CarouselNext } from '../ui/carousel'
import { StimulusSelector } from '../qq/StimulusSelector/StimulusSelector'
import { HdrBar } from '../qq/HdrBar'
import { useProblemStore } from '@/store/_store'

const CadetFillEquation: React.FC<{
  className?: string
  children?: React.ReactNode
  page?: YBRpage
  index: number
}> = ({ className, page, index }) => {
  // Dont render if page not active
  const { current } = React.useContext(NavContext) as NavContextType

  // Store
  const { problem } = useProblemStore()

  let fakeDiagramType = 'DiagramCombine'

  // JSX
  if (current !== index + 1) return null
  return (
    <div
      className={cn(
        'CadetFillDiagram',
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
              'mb-2 flex w-full rounded-md border border-input bg-slate-300 px-3 py-2',
              className,
            )}
            stimulusText={problem.stimulus || ''}
          ></StimulusSelector>
          <h2 className="ml-1 mr-1 mt-3">
            Drag the items to fill in the relevant fields in the equation
          </h2>
        </div>
      </div>

      <NavBar className="flex justify-end space-x-3 bg-slate-300 pr-2">
        <h3 className="absolute bottom-0 text-slate-400">CadetFillDiagram</h3>
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
    </div>
  )
}
CadetFillEquation.displayName = 'CadetFillEquation'
export default CadetFillEquation
