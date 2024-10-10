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
import { CarouselNext } from '../ui/carousel'
import { useProblemStore } from '@/store/_store'
import { Button } from '../ui/button'
import { ChatBubble } from '../qq/ChatBubble/ChatBubble'
import { NextButton } from '../qq/NextButton'

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
      setNextDisabled(false)
    }
  }

  async function handleNext(
    _evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    //If Option+Enter just scroll to next page
    logAction({ page: page.id, activity: 'clickNext', data: {} })
    window.open('https://queriumcorp.github.io/swpwr/?rank=cadet')
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
      <NavBar className="relative flex justify-end space-x-3 bg-slate-300 pr-2">
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
NewbVictory.displayName = 'NewbVictory'
export default NewbVictory
