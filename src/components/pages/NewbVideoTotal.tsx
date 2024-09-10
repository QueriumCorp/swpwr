'use client'

// React Imports
import { FC, ReactNode, useContext, useState } from 'react'

// Querium Imports
import { cn } from '@/lib/utils'
import { YellowBrickRoad, type YBRpage } from '../qq/YellowBrickRoad'
import { NavContext, NavContextType } from '@/NavContext'
import { NavBar } from '../qq/NavBar'
import { CarouselNext } from '../ui/carousel'
import { useProblemStore } from '@/store/_store'
import { VideoPlayer } from '../qq/VideoPlayer'
import { TinyTutor } from '../qq/TinyTutor'

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
const NewbVideoTotal: FC<{
  className?: string
  children?: ReactNode
  page: YBRpage
  index: number
}> = ({ className, page, index }) => {
  const ybr = YellowBrickRoad
  const src = 'https://querium.wistia.com/medias/oyfe3sqhwb'

  ///////////////////////////////////////////////////////////////////
  // Contexts
  ///////////////////////////////////////////////////////////////////

  const { current, api } = useContext(NavContext) as NavContextType

  ///////////////////////////////////////////////////////////////////
  // Store
  ///////////////////////////////////////////////////////////////////

  const { logAction } = useProblemStore()

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  const [watchedVideo, setWatchedVideo] = useState(false)

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  // JSX
  ///////////////////////////////////////////////////////////////////

  if (current !== index + 1) return null

  return (
    <div
      className={cn(
        'NewbVideoTotal m-0 mb-2 flex h-full w-full flex-col justify-stretch rounded-lg bg-card pl-2 pr-2 pt-2 text-card-foreground shadow-sm',
        className,
      )}
    >
      <div className="div relative mb-2 flex grow flex-col justify-stretch gap-2 p-2">
        <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center overflow-y-auto">
          <VideoPlayer
            videoUrl={src}
            className="h-full w-full"
            onEnded={() => setWatchedVideo(true)}
          />
        </div>
      </div>
      <NavBar className="flex justify-end space-x-3 bg-slate-300 pr-2">
        <TinyTutor intro={page?.intro} psHints={page?.psHints || []} />

        <CarouselNext
          className="relative right-0"
          onClick={() => {
            logAction('NewbVideoTotal : Clicked Next')
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

NewbVideoTotal.displayName = 'NewbVideoTotal'
export default NewbVideoTotal
