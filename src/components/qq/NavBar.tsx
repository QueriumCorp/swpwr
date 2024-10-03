import * as React from 'react'

import { cn } from '@/lib/utils'
import { PiSpeakerHighFill, PiSpeakerXThin } from 'react-icons/pi'
import { useProblemStore } from '@/store/_store'

const NavBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { session, toggleChatty } = useProblemStore()

  // JSX
  return (
    <div
      ref={ref}
      className={cn('NavBar relative min-h-24 w-full border-none', className)}
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
})
NavBar.displayName = 'NavBar'

export { NavBar }
