'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { type YBRpage } from '../qq/YellowBrickRoad'
import { NavContext, NavContextType } from '@/NavContext'
import {
  AnimeTutor,
  AvatarAPIType,
  Chat,
  useAvatarAPI,
} from '@/components/AnimeTutor'
import { NavBar } from '../qq/NavBar'
import { CarouselPrevious, CarouselNext } from '../ui/carousel'

const CadetGratzOnOrganize: React.FC<{
  className?: string
  children?: React.ReactNode
  page?: YBRpage
  index: number
}> = ({ className, children, index }) => {
  const { current } = React.useContext(NavContext) as NavContextType

  const { sayMsg } = useAvatarAPI() as AvatarAPIType

  React.useEffect(() => {
    sayMsg("You've prepared and organized...'!", 'idle:02')
  }, [])

  // JSX
  if (current !== index + 1) return null // Dont render if page not active
  return (
    <div
      className={cn(
        'CadetGratzOnOrganize m-0 flex h-full w-full flex-col justify-stretch rounded-lg border bg-card p-0 text-card-foreground shadow-sm',
        className,
      )}
    >
      <h1>CadetGratzOnOrganize</h1>
      {children}
      <div className="relative grow bg-qqAccent">
        <AnimeTutor
          closeUp
          style={{ position: 'absolute', height: '100%', right: '0px' }}
        />
        <Chat
          msg="RATATATA"
          className="absolute bottom-[50%] right-[300px] font-capriola"
        />
      </div>
      <NavBar className="flex justify-end space-x-3 bg-slate-300 pr-2">
        <CarouselPrevious className="relative left-0">
          Previous
        </CarouselPrevious>
        <CarouselNext className="relative right-0">Next</CarouselNext>
      </NavBar>
    </div>
  )
}
CadetGratzOnOrganize.displayName = 'CadetGratzOnOrganize'
export default CadetGratzOnOrganize
