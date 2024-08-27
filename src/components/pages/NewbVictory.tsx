'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { type YBRpage } from '../qq/YellowBrickRoad'
import {
  AnimeTutor,
  AvatarAPIType,
  Chat,
  useAvatarAPI,
} from '@/components/AnimeTutor'
import { NavContext, NavContextType } from '@/NavContext'
import { NavBar } from '../qq/NavBar'
import { CarouselPrevious, CarouselNext } from '../ui/carousel'
import { useProblemStore } from '@/store/_store'
import { Button } from '../ui/button'

const NewbVictory: React.FC<{
  className?: string
  children?: React.ReactNode
  page: YBRpage
  index: number
}> = ({ className, index }) => {
  // Context
  const { current, api } = React.useContext(NavContext) as NavContextType
  const { emotes, sayMsg } = useAvatarAPI() as AvatarAPIType

  // Store
  const { logAction, heartbeat } = useProblemStore()

  // Side Effects
  React.useEffect(() => {
    logAction('NewbVictory : Finished path')
  }, [])

  // Handlers
  function handleDance() {
    sayMsg('Dance Dance Revolution', 'gratz')
  }

  // JSX
  if (current !== index + 1) return null
  return (
    <div
      className={cn(
        'NewbVictory m-0 flex h-full w-full flex-col justify-stretch rounded-lg border bg-card p-0 text-card-foreground shadow-sm',
        className,
      )}
    >
      <div
        className="relative grow"
        style={{
          background:
            'linear-gradient(0deg, rgba(30,106,8,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
        }}
      >
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
        <Chat
          msg={`**Congratulations!**
You are no longer a newbie!
`}
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
          onClick={() => {
            logAction('NewbVictory : Clicked Next')
            api?.scrollNext()
          }}
        >
          Next
        </CarouselNext>
      </NavBar>
    </div>
  )
}
NewbVictory.displayName = 'NewbVictory'
export default NewbVictory
