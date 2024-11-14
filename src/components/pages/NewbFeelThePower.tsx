'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import ReactPlayer from 'react-player/wistia'

// qq Packages
import { YellowBrickRoad, type YBRpage } from '../qq/YellowBrickRoad'
import { NavContext, NavContextType } from '@/NavContext'
import { AnimeTutor } from '@/components/AnimeTutor'
import { NavBar } from '../qq/NavBar'
import { CarouselPrevious, CarouselNext } from '../ui/carousel'
import { useProblemStore } from '@/store/_store'
import { VideoPlayer } from '../qq/VideoPlayer'

const NewbFeelThePower: React.FC<{
  className?: string
  children?: React.ReactNode
  page: YBRpage
  index: number
}> = ({ className, page, index }) => {
  const ybr = YellowBrickRoad
  const src = 'https://querium.wistia.com/medias/oyfe3sqhwb'

  // Contexts
  const { current, api } = React.useContext(NavContext) as NavContextType

  // Store
  const { logAction } = useProblemStore()

  //
  // State
  //
  const [watchedVideo, setWatchedVideo] = React.useState(false)

  //
  // JSX
  //
  if (current !== index + 1) return null
  return (
    <div
      className={cn(
        'NewbFeelThePower m-0 mb-2 flex h-full w-full flex-col justify-stretch rounded-lg bg-card pl-2 pr-2 pt-2 text-card-foreground shadow-sm',
        className,
      )}
    >
      <div className="div relative mb-2 flex grow flex-col justify-stretch gap-2 p-2">
        <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center overflow-y-auto">
          <VideoPlayer
            videoUrl={src}
            className="h-full w-full"
            onStart={() => {}}
            onEnded={() => setWatchedVideo(true)}
            onError={(err: unknown) => {
              logAction({
                page: page.id,
                activity: 'watchedVideo',
                data: { videoUrl: src, err: err },
              })
              setWatchedVideo(true)
            }}
          />
        </div>
      </div>
      <NavBar className="flex justify-end space-x-3 bg-slate-100 pr-2">
        {ybr[current].phase !== 'I' ? (
          <AnimeTutor
            style={{
              bottom: '0px',
              right: '0px',
              height: '100%',
              // border: "solid 1px red",
            }}
          />
        ) : null}
        <CarouselPrevious className="relative left-0">
          Previous
        </CarouselPrevious>
        <CarouselNext
          className="relative right-0"
          onClick={() => {
            logAction({ page: page.id, activity: 'ACTIVITY', data: {} })
            api?.scrollNext()
          }}
          disabled={!watchedVideo}
        >
          Next
        </CarouselNext>
      </NavBar>
    </div>
  )
}

NewbFeelThePower.displayName = 'NewbFeelThePower'

export default NewbFeelThePower
