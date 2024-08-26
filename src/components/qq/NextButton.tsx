import { ReactNode } from 'react'
import { CarouselNext } from '../ui/carousel'
import BusyIndicator from './BusyIndicator/BusyIndicator'

const NextButton = ({
  busy = false,
  disabled = false,
  onClick,
}: {
  busy?: boolean
  disabled?: boolean
  children?: ReactNode
  className?: string
  onClick?: (evt: any) => Promise<void>
}) => {
  // JSX
  console.log('busy', busy, 'disabled', disabled)
  return (
    <div className="relative flex h-10 w-10 items-center justify-center bg-none">
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
