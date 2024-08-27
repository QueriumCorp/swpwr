'use client'

// React Imports
import { FC, ReactNode, useContext, useEffect, useState } from 'react'

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
import { CarouselPrevious, CarouselNext } from '../ui/carousel'
import { useProblemStore } from '@/store/_store'
import { Button } from '../ui/button'
import { ChatBubble } from '../qq/ChatBubble/ChatBubble'

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
const DevMeetTutor: FC<{
  className?: string
  children?: ReactNode
  page: YBRpage
  index: number
}> = ({ className, index }) => {
  ///////////////////////////////////////////////////////////////////
  // Contexts
  ///////////////////////////////////////////////////////////////////

  const { current, api } = useContext(NavContext) as NavContextType
  const { emotes, sayMsg } = useAvatarAPI() as AvatarAPIType

  ///////////////////////////////////////////////////////////////////
  // Store
  ///////////////////////////////////////////////////////////////////

  const { logAction, heartbeat, session } = useProblemStore()

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  const [navDisabled, setNavDisabled] = useState(true)

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  useEffect(() => {
    logAction('DevMeetTutor : Entered Application')
    setTimeout(() => heartbeat(), 1000)
  }, [])
  useEffect(() => {
    if (session.sessionToken.length > 0) {
      setNavDisabled(false)
    }
  }, [session])

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  function handleDance() {
    sayMsg('Dance Dance Revolution', 'gratz')
  }

  ///////////////////////////////////////////////////////////////////
  // JSX
  ///////////////////////////////////////////////////////////////////
  if (current !== index + 1) return null
  return (
    <div
      className={cn(
        'DevMeetTutor m-0 flex h-full w-full flex-col justify-stretch rounded-lg border bg-card p-0 text-card-foreground shadow-sm',
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
            // border: "1px solid #000000",
          }}
        />
        <ChatBubble
          msgs={[
            `
Paragraph1

Paragraph2

Paragraph3
      this is more copy related to Paragraph3
      `,
          ]}
          className="absolute bottom-[50%] right-[50%] font-capriola"
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
          className="relative right-0"
          disabled={navDisabled}
          onClick={() => {
            logAction('DevMeetTutor : Clicked Next')
            api?.scrollNext()
          }}
        >
          Next
        </CarouselNext>
      </NavBar>
    </div>
  )
}
DevMeetTutor.displayName = 'DevMeetTutor'
export default DevMeetTutor
