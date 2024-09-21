'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { type YBRpage } from '../qq/YellowBrickRoad'
import { NavContext, NavContextType } from '@/NavContext'
import { NavBar } from '../qq/NavBar'
import { CarouselPrevious, CarouselNext } from '../ui/carousel'
import { StimulusSelector } from '../qq/StimulusSelector'
import {
  AnimeTutor,
  AvatarAPIType,
  Chat,
  useAvatarAPI,
} from '@/components/AnimeTutor'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { HdrBar } from '../qq/HdrBar'
import { useProblemStore } from '@/store/_store'

const CadetSelectDiagram: React.FC<{
  className?: string
  children?: React.ReactNode
  page?: YBRpage
  index: number
}> = ({ className, page, index }) => {
  const { current } = React.useContext(NavContext) as NavContextType

  // Store
  const { problem } = useProblemStore()

  const fakeKnowns = ['49 miles', '100 miles', '1000 miles']
  const fakeUnknowns = ['Time to lunch', 'Time to go to the store']

  // JSX
  if (current !== index + 1) return null
  return (
    <div
      className={cn(
        'CadetSelectDiagram',
        'm-0 mb-2 flex h-full w-full flex-col justify-stretch rounded-lg bg-card pl-2 pr-2 pt-2 text-card-foreground shadow-sm',
        className,
      )}
    >
      <div className="div relative mb-2 flex grow flex-col justify-stretch gap-2 p-2">
        <div className="absolute bottom-0 left-0 right-0 top-0 overflow-y-scroll">
          <HdrBar
            highlightLetter={page?.phase}
            subTitle={page?.phaseLabel}
            instructions={page?.title}
          ></HdrBar>
          <div>
            <h1>Stimulus</h1>
          </div>
          <StimulusSelector
            className={cn(
              'mb-2 flex w-full rounded-md border border-input bg-slate-300 px-3 py-2 text-sm',
              className,
            )}
            stimulusText={problem.stimulus || ''}
          ></StimulusSelector>
          <div className="grid grow grid-cols-2 gap-2">
            <Card>
              <CardHeader>
                <CardTitle>Known</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-wrap gap-2">
                  {fakeKnowns.map(known => (
                    <li className="list-none" key={known}>
                      {known}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Unknown</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-wrap gap-2">
                  {fakeUnknowns.map(unknown => (
                    <li className="list-none" key={unknown}>
                      {unknown}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <NavBar className="relative flex justify-end space-x-3 bg-slate-300 pr-2">
        <h3 className="absolute bottom-0 text-slate-400">CadetSelectDiagram</h3>
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
}
CadetSelectDiagram.displayName = 'CadetSelectDiagram'
export default CadetSelectDiagram
