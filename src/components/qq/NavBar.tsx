import {
  forwardRef,
  HTMLAttributes,
  useContext,
  useEffect,
  useState,
} from 'react'

import { cn } from '@/lib/utils'
import { PiSpeakerHighFill, PiSpeakerXThin } from 'react-icons/pi'
import { useProblemStore } from '@/store/_store'
import { NavContext, NavContextType } from '@/NavContext'
import { type CarouselApi } from '@/components/ui/carousel'
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
const NavBar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    ///////////////////////////////////////////////////////////////////
    // Context
    ///////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////
    // Store
    ///////////////////////////////////////////////////////////////////

    const { session, toggleChatty, setCurrentPageIndex } = useProblemStore()

    ///////////////////////////////////////////////////////////////////
    // Effects
    ///////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////
    // JSX
    ///////////////////////////////////////////////////////////////////

    return (
      <div
        ref={ref}
        className={cn(
          'NavBar relative min-h-24 w-full border-none',
          'relative flex items-center justify-end space-x-3 bg-slate-100 pr-0',
          className,
        )}
        {...props}
      >
        <div className="absolute left-3 cursor-pointer" onClick={toggleChatty}>
          {session.chatty ? (
            <PiSpeakerHighFill className="mr-2 inline-block h-6 w-6" />
          ) : (
            <PiSpeakerXThin className="mr-2 inline-block h-6 w-6" />
          )}
        </div>
        {props.children}
      </div>
    )
  },
)
NavBar.displayName = 'NavBar'

export { NavBar }
