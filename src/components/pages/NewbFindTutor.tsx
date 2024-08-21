'use client'

// React Imports
import { useContext, useState } from 'react'

// Querium Imports
import { cn } from '@/lib/utils'
import { type YBRpage } from '../qq/YellowBrickRoad'
import { NavContext, NavContextType } from '@/NavContext'
import { NavBar } from '../qq/NavBar'
import { CarouselNext } from '../ui/carousel'
import { useProblemStore } from '@/store/_store'
import { TinyTutor } from '../qq/TinyTutor'

const introMsg = `I’m right here if you need me, just click my cute self to get my attention 😊.


Try it now.`
const gratzMsg = `
Perfect! You found me!

If you ever get stuck, click on me just like that. I'll do my best to give you a hand.
      
Now click →.`

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
const NewbFindTutor: React.FC<{
  className?: string
  children?: React.ReactNode
  page: YBRpage
  index: number
}> = ({ className, children, page, index }) => {
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

  const [navDisabled, setNavDisabled] = useState(true)
  const [msg, setMsg] = useState('')
  const [hintStage, setHintStage] = useState('')
  const wpHints = problem.wpHints?.find(
    wpHint => wpHint.page === `${rank}:${page.id}`,
  )

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  function newStage(newStage: string) {
    setHintStage(newStage)
  }

  function hintChanged(hintStage: string, current: number, count: number) {
    console.info(hintStage, current, count)
    if (hintStage === 'psHints' && current === count) {
      setNavDisabled(false)
    }
  }

  ///////////////////////////////////////////////////////////////////
  // JSX
  ///////////////////////////////////////////////////////////////////

  if (current !== index + 1) return null

  return (
    <div
      className={cn(
        'NewbFindTutor',
        'm-0 flex h-full w-full flex-col justify-stretch',
        'rounded-lg border bg-card p-0 text-card-foreground shadow-sm',
        className,
      )}
    >
      <div className="relative grow"></div>
      {children}
      <NavBar className="flex justify-end space-x-3 bg-slate-300 pr-2">
        <TinyTutor
          msg={msg}
          intro={page?.intro}
          psHints={page?.psHints}
          wpHints={wpHints?.hints}
          hintChanged={hintChanged}
        />
        <CarouselNext
          disabled={navDisabled}
          className="relative right-0"
          onClick={() => {
            logAction('NewbFindTutor : Clicked Next')
            api?.scrollNext()
          }}
        >
          Next
        </CarouselNext>
        <h1 className="absolute bottom-0 left-0 text-slate-500">
          NewbFindTutor
        </h1>
      </NavBar>
    </div>
  )
}
NewbFindTutor.displayName = 'NewbFindTutor'
export default NewbFindTutor
