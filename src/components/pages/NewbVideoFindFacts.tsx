'use client'

// React Imports
import { FC, ReactNode, useContext, useMemo, useState } from 'react'

// Querium Imports
import { cn } from '@/lib/utils'
import { YellowBrickRoad, type YBRpage } from '../qq/YellowBrickRoad'
import { NavContext, NavContextType } from '@/NavContext'
import { NavBar } from '../qq/NavBar'
import { useProblemStore } from '@/store/_store'
import { VideoPlayer } from '../qq/VideoPlayer'
import { HintStage, TinyTutor } from '../qq/TinyTutor'
import { NextButton } from '../qq/NextButton'

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
const NewbVideoFindFacts: FC<{
  className?: string
  children?: ReactNode
  page: YBRpage
  index: number
}> = ({ className, page, index }) => {
  const ybr = YellowBrickRoad
  // const src = null
  const src = 'https://querium.wistia.com/medias/6cq1njtrjd?wvideo=6cq1njtrjd'

  ///////////////////////////////////////////////////////////////////
  // Contexts
  ///////////////////////////////////////////////////////////////////

  const { current, api } = useContext(NavContext) as NavContextType

  ///////////////////////////////////////////////////////////////////
  // Store
  ///////////////////////////////////////////////////////////////////

  const { logAction, problem, rank } = useProblemStore()

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  const [watchedVideo, setWatchedVideo] = useState(false)
  const [msg, setMsg] = useState('')

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

  ///////////////////////////////////////////////////////////////////
  // JSX
  ///////////////////////////////////////////////////////////////////

  if (current !== index + 1) return null

  return (
    <div
      className={cn(
        'NewbVideoFindFacts m-0 mb-2 flex h-full w-full flex-col justify-stretch rounded-lg bg-card pl-2 pr-2 pt-2 text-card-foreground shadow-sm',
        className,
      )}
    >
      <div className="div relative mb-2 flex grow flex-col justify-stretch gap-2 p-2">
        <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center overflow-y-auto">
          <VideoPlayer
            videoUrl={src}
            className=""
            onStart={() => {
              console.log('onStart')
              setMsg('[HIDE]')
            }}
            onEnded={() => {
              logAction({
                page: page.id,
                activity: 'watchedVideo',
                data: { videoUrl: src },
              })
              setMsg('Click ➜ to continue!')
              setWatchedVideo(true)
            }}
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
      <NavBar
        className="relative flex items-center justify-end space-x-3 bg-slate-100 pr-0"
        page={page}
      >
        <TinyTutor msg={msg} hintList={hintList} closeable />
        <div className="flex h-20 w-20 items-center justify-center">
          <NextButton
            className="scale-[200%]"
            disabled={!watchedVideo}
          ></NextButton>
        </div>
      </NavBar>
    </div>
  )
}

NewbVideoFindFacts.displayName = 'NewbVideoFindFacts'
export default NewbVideoFindFacts
