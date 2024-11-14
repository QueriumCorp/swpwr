'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { type YBRpage } from '../qq/YellowBrickRoad'
import { NavContext, NavContextType } from '@/NavContext'
import { AnimeTutor, Chat } from '@/components/AnimeTutor'
import { NavBar } from '../qq/NavBar'
import { CarouselPrevious, CarouselNext } from '../ui/carousel'
import { useProblemStore } from '@/store/_store'

const NewbGratzWatchedVideo: React.FC<{
  className?: string
  children?: React.ReactNode
  page?: YBRpage
  index: number
}> = ({ className, page, index }) => {
  // Contexts
  const { current, api } = React.useContext(NavContext) as NavContextType

  // Store
  const { logAction } = useProblemStore()

  // JSX
  if (current !== index + 1) return null // Dont render if page not active
  return (
    <div
      className={cn(
        'NewbGratzWatchedVideo m-0 flex h-full w-full flex-col justify-stretch rounded-lg border bg-card p-0 text-card-foreground shadow-sm',
        className,
      )}
    >
      <div className="relative grow bg-qqAccent">
        <AnimeTutor
          emote={'gratz:03'}
          closeUp
          style={{
            position: 'absolute',
            height: '100%',
            right: '-150px',
            width: '100%',
            // border: "1px solid #000000",
          }}
        />
        <Chat
          msg="You are doing GREAT! Give this next exercise a try!"
          className="absolute bottom-[50%] right-[50%] font-capriola"
        />
      </div>
      <NavBar className="flex justify-end space-x-3 bg-slate-100 pr-2">
        <CarouselPrevious className="relative left-0">
          Previous
        </CarouselPrevious>
        <CarouselNext
          className="relative right-0"
          onClick={() => {
            logAction({ page: page?.id, activity: 'ACTIVITY', data: {} })
            api?.scrollNext()
          }}
        >
          Next
        </CarouselNext>
      </NavBar>
    </div>
  )
}
NewbGratzWatchedVideo.displayName = 'NewbGratzWatchedVideo'

export default NewbGratzWatchedVideo
