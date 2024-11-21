'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { type YBRpage } from '../qq/YellowBrickRoad'
import {
  AnimeTutor,
  AvatarAPIType,
  useAvatarAPI,
} from '@/components/AnimeTutor'
import { NavContext, NavContextType } from '@/NavContext'
import { NavBar } from '../qq/NavBar'
import { useProblemStore } from '@/store/_store'
import { ChatBubble } from '../qq/ChatBubble/ChatBubble'

const NewbVictory: React.FC<{
  className?: string
  children?: React.ReactNode
  page: YBRpage
  index: number
}> = ({ className, page, index }) => {
  ///////////////////////////////////////////////////////////////////
  // Contexts
  ///////////////////////////////////////////////////////////////////

  const { current, api } = React.useContext(NavContext) as NavContextType
  const { emotes, sayMsg } = useAvatarAPI() as AvatarAPIType

  ///////////////////////////////////////////////////////////////////
  // Refs
  ///////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  // Store
  ///////////////////////////////////////////////////////////////////

  const { logAction, session, studentLog, onComplete } = useProblemStore()

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  const [nextDisabled, setNextDisabled] = React.useState(true)

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  function handleDance() {
    sayMsg('Dance Dance Revolution', 'gratz')
  }

  if (current === index + 1) {
    // logAction({
    //   page: page.id,
    //   activity: 'achievedVictory',
    //   data: {},
    // })
    onComplete(session, studentLog)
  }

  function finishedIntro(current: number, count: number) {
    if (count > 0 && current === count) {
      if (document.fullscreenEnabled) {
        document
          .exitFullscreen()
          .then(() => {
            console.log('Fullscreen exited successfully')
          })
          .catch(error => {
            console.log('Error exiting fullscreen:', error)
          })
        setNextDisabled(false)
      }
    }
  }

  ///////////////////////////////////////////////////////////////////
  // JSX
  ///////////////////////////////////////////////////////////////////
  if (current !== index + 1) return null
  return (
    <div
      className={cn(
        'NewbVictory',
        'm-0 flex h-full w-full flex-col justify-stretch rounded-lg border bg-card p-0 text-card-foreground shadow-sm',
        className,
      )}
    >
      <div
        className={cn(
          'NewbVictoryBODY',
          'relative grow',
          'bg-gradient-to-b from-blue-300 via-blue-900 via-70% to-green-700',
        )}
      >
        <AnimeTutor
          emote={'celebrate:01'}
          closeUp
          className={cn(
            'AnimeTutor',
            'absolute left-[30%] aspect-square h-full',
          )}
        />
        <ChatBubble
          msgs={page.intro ? page.intro : []}
          className="absolute bottom-[50%] right-[50%] max-w-[45%] !font-capriola"
          hintPageChanged={finishedIntro}
        />
      </div>
      <NavBar className="relative flex justify-end space-x-3 bg-slate-100 pr-2"></NavBar>
    </div>
  )
}
NewbVictory.displayName = 'NewbVictory'
export default NewbVictory
