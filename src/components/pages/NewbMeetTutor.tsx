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
import { CarouselNext } from '../ui/carousel'
import { useProblemStore } from '@/store/_store'
import { Button } from '../ui/button'
import { ChatBubble } from '../qq/ChatBubble/ChatBubble'

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

  const { logAction, heartbeat } = useProblemStore()

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  const [nextDisabled, setNextDisabled] = React.useState(true)

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  React.useEffect(() => {
    logAction('NewbMeetTutor : Entered Application')
    setTimeout(() => heartbeat(), 1000)
  }, [])

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  function handleDance() {
    sayMsg('Dance Dance Revolution', 'gratz')
  }
  function finishedIntro() {
    logAction('NewbMeetTutor : Intro Finished')
    setNextDisabled(false)
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
      <div className="relative grow bg-qqAccent">
        <AnimeTutor
          emote={'celebrate:01'}
          closeUp
          style={{
            position: 'absolute',
            height: '100%',
            right: '-150px',
            width: '100%',
          }}
        />
        <ChatBubble
          msgs={page.intro!}
          className="absolute bottom-[50%] right-[50%] max-w-[45%] font-irishGrover"
          introFinished={finishedIntro}
        />
      </div>
      <NavBar className="relative flex justify-end space-x-3 bg-slate-300 pr-2">
        <div className="m-1 flex grow flex-col gap-1">
          {emotes.map(emote => (
            <Button key={emote.name} onClick={handleDance} className="w-full">
              {emote.name}
            </Button>
          ))}
        </div>
        <CarouselNext
          disabled={nextDisabled}
          className="relative right-0"
          onClick={() => {
            logAction('NewbMeetTutor : Clicked Next')
            api?.scrollNext()
          }}
        >
          Next
        </CarouselNext>
        <h1 className="absolute bottom-0 left-0 text-slate-500">
          NewbMeetTutor
        </h1>
      </NavBar>
    </div>
  )
}
NewbMeetTutor.displayName = 'NewbMeetTutor'
export default NewbMeetTutor
