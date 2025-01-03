'use client'

// React Imports
import * as React from 'react'

// Querium Imports
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
import { Button } from '../ui/button'
import { ChatBubble } from '../qq/ChatBubble/ChatBubble'
import { NextButton } from '../qq/NextButton'

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
const NewbMeetTutor: React.FC<{
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
  // Store
  ///////////////////////////////////////////////////////////////////

  const { logAction, toggleChatty } = useProblemStore()

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  const [nextDisabled, setNextDisabled] = React.useState(true)
  const [started, setStarted] = React.useState(false)

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  function handleStart() {
    // Are we in edX?
    const swReactJSxBlocks =
      document.getElementsByClassName('sw-reactjs-xblock')

    const qqROOT = document.getElementById('qqROOT') as HTMLElement
    const isFullscreen = Boolean(document.fullscreenElement)

    // If we're in edX, then we need to go fullscreen when student presses Start
    if (swReactJSxBlocks.length > 0 && !isFullscreen) {
      qqROOT.requestFullscreen()
    }

    setStarted(true)
    toggleChatty()
  }

  function handleDance() {
    sayMsg('Dance Dance Revolution', 'gratz')
  }
  function finishedIntro(current: number, count: number) {
    if (count > 0 && current === count) {
      setNextDisabled(false)
    }
  }

  async function handleNext(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    if (evt.altKey) {
      //If Option+Enter just scroll to next page
      logAction({ page: page.id, activity: 'clickNext', data: {} })
      api?.scrollNext()
    } else {
      logAction({ page: page.id, activity: 'clickNext', data: {} })
      api?.scrollNext()
    }
  }

  ///////////////////////////////////////////////////////////////////
  // JSX
  ///////////////////////////////////////////////////////////////////

  if (current !== index + 1) return null
  return (
    <div
      className={cn(
        'NewbMeetTutor m-0 flex h-full w-full flex-col justify-stretch rounded-lg border bg-card p-0 text-card-foreground shadow-sm',
        className,
      )}
    >
      <div
        className={cn(
          'NewbMeetTutorBODY',
          'relative grow',
          'bg-gradient-to-b from-blue-300 via-blue-900 via-70% to-green-700',
        )}
      >
        <AnimeTutor
          emote={'celebrate:01'}
          closeUp
          className={cn(
            'AnimeTutor',
            'absolute left-[40%] aspect-square h-full',
          )}
        />
        <ChatBubble
          msgs={page.intro!}
          className="absolute bottom-[50%] right-[50%] max-w-[45%] !font-capriola"
          hintPageChanged={finishedIntro}
        />
      </div>

      <NavBar
        className="relative flex items-center justify-end space-x-3 bg-slate-100 pr-0"
        page={page}
      >
        <div className="m-1 flex grow flex-col gap-1">
          {emotes.map(emote => (
            <Button key={emote.name} onClick={handleDance} className="w-full">
              {emote.name}
            </Button>
          ))}
        </div>
        <div className="flex h-20 w-20 items-center justify-center">
          <NextButton
            className="scale-[200%]"
            disabled={nextDisabled}
            onClick={handleNext}
          ></NextButton>
        </div>
      </NavBar>
    </div>
  )
}
NewbMeetTutor.displayName = 'NewbMeetTutor'
export default NewbMeetTutor
