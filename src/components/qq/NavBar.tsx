import { FC, useMemo, useState } from 'react'

import { cn } from '@/lib/utils'
import { PiSpeakerHighFill, PiSpeakerXThin } from 'react-icons/pi'
import { GoVideo } from 'react-icons/go'
import { useProblemStore } from '@/store/_store'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { YellowBrickRoad, type YBRpage } from '../qq/YellowBrickRoad'
import { VideoPlayer } from './VideoPlayer'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
const NavBar: React.FC<{
  className?: string
  children?: React.ReactNode
  page?: YBRpage
  index?: number
}> = ({ className, children, page }) => {
  ///////////////////////////////////////////////////////////////////
  // Context
  ///////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  // Store
  ///////////////////////////////////////////////////////////////////

  const { session, toggleChatty, problem, logAction } = useProblemStore()

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  const pageVideos = useMemo(() => {
    if (page?.rank) {
      let psVideos =
        problem.psVideos?.find(
          theVideos => theVideos.page === `${page.rank}${page.id}`,
        ) || null
      if (psVideos) {
        return psVideos.videos
      }

      let filteredYBR = YellowBrickRoad.filter(ybrPage => {
        return ybrPage.rank == page.rank
      }).filter(filteredPage => {
        return filteredPage.id == page.id
      })

      return filteredYBR[0].videos ? filteredYBR[0].videos : null
    } else {
      return null
    }
  }, [page?.rank])

  const [currentVideo, setCurrentVideo] = useState(
    pageVideos ? pageVideos[0] : { title: '', url: '' },
  )

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  // Handlers
  ///////////////////////////////////////////////////////////////////
  const videoSelectedHandler = (newTitle: string) => {
    let found = pageVideos?.find(video => video.title == newTitle)
    setCurrentVideo(found || { title: '', url: '' })
  }

  ///////////////////////////////////////////////////////////////////
  // JSX
  ///////////////////////////////////////////////////////////////////

  return (
    <Dialog>
      <DialogContent className="min-w-fit">
        <DialogHeader className="flex flex-row items-center gap-3">
          <DialogTitle>Video Library</DialogTitle>
          <DialogDescription></DialogDescription>
          <Select
            value={currentVideo.title}
            onValueChange={videoSelectedHandler}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageVideos?.map(video => {
                return (
                  <SelectItem key={video.title} value={video.title}>
                    {video.title}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </DialogHeader>
        {pageVideos ? (
          <VideoPlayer
            videoUrl={currentVideo.url}
            className="h-full w-full"
            onStart={() => {}}
            onEnded={() => {
              logAction({
                page: page?.id,
                activity: 'watchedVideo',
                data: { video: currentVideo },
              })
            }}
            onError={(err: unknown) => {
              logAction({
                page: page?.id,
                activity: 'watchedVideo',
                data: { video: currentVideo, err: err },
              })
            }}
            controls={true}
          />
        ) : null}
      </DialogContent>

      <div
        className={cn(
          'NavBar relative min-h-24 w-full border-none',
          'relative flex items-center justify-end space-x-3 bg-slate-100 pr-0',
          className,
        )}
      >
        <div className="absolute left-3 cursor-pointer" onClick={toggleChatty}>
          {session.chatty ? (
            <PiSpeakerHighFill className="mr-2 inline-block h-6 w-6" />
          ) : (
            <PiSpeakerXThin className="mr-2 inline-block h-6 w-6" />
          )}
        </div>

        {pageVideos ? (
          <DialogTrigger className="absolute left-10">
            <GoVideo className="text-3xl text-qqBrand" />
          </DialogTrigger>
        ) : null}
        {children}
      </div>
    </Dialog>
  )
}

NavBar.displayName = 'NavBar'

export { NavBar }
