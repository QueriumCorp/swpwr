// React Imports
import { ReactNode } from 'react'

// Querium Imports
import { CarouselNext } from '../ui/carousel'
import BusyIndicator from './BusyIndicator/BusyIndicator'
import { cn } from '@/lib/utils'

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
const NextButton = ({
  busy = false,
  disabled = false,
  className,
  onClick,
}: {
  busy?: boolean
  disabled?: boolean
  children?: ReactNode
  className?: string
  onClick?: (evt?: any) => Promise<void>
}) => {
  ///////////////////////////////////////////////////////////////////
  // Contexts
  ///////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  // Store
  ///////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  // JSX
  ///////////////////////////////////////////////////////////////////
  return (
    <div
      className={cn(
        'relative flex h-10 w-10 items-center justify-center bg-none',
        className,
      )}
    >
      <BusyIndicator busy={busy} className="BusyIndicator"></BusyIndicator>
      {onClick ? (
        <CarouselNext
          disabled={busy || disabled}
          className="relative right-0 top-0 translate-y-0"
          onClick={onClick}
        ></CarouselNext>
      ) : (
        <CarouselNext
          disabled={busy || disabled}
          className="relative right-0 top-0 translate-y-0"
        ></CarouselNext>
      )}
    </div>
  )
}

NextButton.displayName = 'NextButton'
export { NextButton }
