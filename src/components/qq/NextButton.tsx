import { ReactNode } from 'react'
import { CarouselNext } from '../ui/carousel'
import BusyIndicator from './BusyIndicator/BusyIndicator'

const NextButton = ({
  busy = false,
  onClick,
}: {
  busy?: boolean
  children?: ReactNode
  className?: string
  onClick?: (evt: any) => Promise<void>
}) => {
  // JSX
  return (
    <div className="relative flex h-10 w-10 items-center justify-center bg-none">
      <BusyIndicator busy={busy} className="BusyIndicator"></BusyIndicator>
      {onClick ? (
        <CarouselNext
          disabled={busy}
          className="relative right-0 top-0 translate-y-0"
          onClick={onClick}
        ></CarouselNext>
      ) : (
        <CarouselNext
          disabled={busy}
          className="relative right-0 top-0 translate-y-0"
        ></CarouselNext>
      )}
    </div>
  )
}

NextButton.displayName = 'NextButton'
export { NextButton }
