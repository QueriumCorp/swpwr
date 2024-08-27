'use client'

// React Imports
import { FC, ReactNode, useContext } from 'react'

// Querium Imports
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
import { useProblemStore } from '@/store/_store'
import { Button } from '../ui/button'

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
const RangerVictory: FC<{
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
  // Refs
  ///////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  // Store
  ///////////////////////////////////////////////////////////////////

  const { logAction, heartbeat, onComplete, session, studentLog } =
    useProblemStore()

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

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
    onComplete(session, studentLog)
  }

  ///////////////////////////////////////////////////////////////////
  // JSX
  ///////////////////////////////////////////////////////////////////
  if (current !== index + 1) return null

  return (
    <div
      className={cn(
        'RangerVictory',
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        'm-0 flex h-full w-full flex-col justify-stretch p-0',
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
You did a great job!
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
      </NavBar>
    </div>
  )
}
RangerVictory.displayName = 'RangerVictory'
export default RangerVictory
