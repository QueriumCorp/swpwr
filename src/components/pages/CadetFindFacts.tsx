'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { type YBRpage } from '../qq/YellowBrickRoad'
import { NavContext, NavContextType } from '@/NavContext'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import Chip from '../qq/Chip'
import KnownFacts from '../qq/KnownFacts'
import { StimulusSelector } from '../qq/StimulusSelector'
import UnknownFacts from '../qq/UnknownFacts'
import { NavBar } from '../qq/NavBar'
import { CarouselPrevious, CarouselNext } from '../ui/carousel'
import {
  AnimeTutor,
  AvatarAPIType,
  Chat,
  useAvatarAPI,
} from '@/components/AnimeTutor'
import { HdrBar } from '../qq/HdrBar'
import { useProblemStore } from '@/store/_store'

const CadetFindFacts: React.FC<{
  className?: string
  children?: React.ReactNode
  page?: YBRpage
  index: number
}> = ({ className, page, index }) => {
  // Dont render if page not active
  const { current } = React.useContext(NavContext) as NavContextType

  // Store
  const { problem } = useProblemStore()

  const [knowns, setKnowns] = React.useState<string[]>([])
  const [unknowns, setUnknowns] = React.useState<string[]>([])
  const [currentFact, setCurrentFact] = React.useState<string>('')

  const delKnown = (fact: string) => {
    setKnowns(knowns.filter(thisFact => thisFact !== fact))
  }

  const delUnknown = (fact: string) => {
    setUnknowns(unknowns.filter(thisFact => thisFact !== fact))
  }

  const { sayMsg } = useAvatarAPI() as AvatarAPIType
  React.useEffect(() => {
    sayMsg(
      'I know a few things about you, but I’m sure you’ll find more!',
      'idle:01',
    )
  }, [])

  // JSX
  if (current !== index + 1) return null
  return (
    <div
      className={cn(
        'CadetFindFacts m-0 flex h-full w-full flex-col justify-stretch rounded-lg border bg-card p-0 text-card-foreground shadow-sm',
        className,
      )}
    >
      <HdrBar
        highlightLetter={page?.phase}
        subTitle={page?.phaseLabel}
        instructions={page?.title}
      ></HdrBar>
      <div className="relative flex grow flex-col justify-stretch gap-2 p-2">
        <DndContext onDragEnd={handleDragEnd}>
          <StimulusSelector
            onChangeFact={setCurrentFact}
            className={cn(
              'flex w-full',
              'rounded-md border border-input bg-slate-200 px-3 py-2 ring-offset-background',
              'placeholder:text-muted-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              className,
              'inline',
              'text-xl',
            )}
            stimulusText={problem.stimulus || ''}
          ></StimulusSelector>

          <div className="flex grow gap-2">
            <KnownFacts add={addKnown}>
              {knowns.map(known => (
                <Chip
                  id={known}
                  key={known}
                  label={known}
                  onDelete={delKnown}
                  className="text-xl"
                ></Chip>
              ))}
            </KnownFacts>
            <UnknownFacts add={addUnknown}>
              {unknowns.map(unknown => (
                <Chip
                  id={unknown}
                  key={unknown}
                  label={unknown}
                  onDelete={delUnknown}
                  className="text-xl"
                ></Chip>
              ))}
            </UnknownFacts>
          </div>
        </DndContext>
      </div>
      <NavBar className="relative flex justify-end space-x-3 bg-slate-300 pr-2">
        {/* Tiny Avatar */}
        <AnimeTutor
          style={{
            bottom: '0px',
            right: '0px',
            height: '100%',
          }}
        />
        <Chat
          msg="RATATATA"
          className="absolute bottom-[50%] right-[200px] h-fit min-h-[64px] w-fit font-capriola"
        />
        <CarouselPrevious className="relative left-0">
          Previous
        </CarouselPrevious>
        <CarouselNext className="relative right-0">Next</CarouselNext>
      </NavBar>
    </div>
  )

  function handleDragEnd(event: DragEndEvent) {
    if (currentFact.length == 0 || currentFact.trim().length == 0) return
    if (knowns.includes(currentFact)) return

    if (event.over && event.over.id === 'KnownFacts') {
      setKnowns([...knowns, currentFact])
    }
    if (event.over && event.over.id === 'UnknownFacts') {
      setUnknowns([...unknowns, currentFact])
    }
    setCurrentFact('')
  }

  function addKnown() {
    if (currentFact.length == 0 || currentFact.trim().length == 0) return
    if (knowns.includes(currentFact)) return

    setKnowns([...knowns, currentFact])
    setCurrentFact('')
  }
  function addUnknown() {
    if (currentFact.length == 0 || currentFact.trim().length == 0) return
    if (unknowns.includes(currentFact)) return
    setUnknowns([...unknowns, currentFact])
    setCurrentFact('')
  }
}

CadetFindFacts.displayName = 'CadetFindFacts'
export default CadetFindFacts
