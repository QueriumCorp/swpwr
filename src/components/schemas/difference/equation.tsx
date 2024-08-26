import { cn } from '@/lib/utils'
import { FaEquals } from 'react-icons/fa'
import { ImMinus } from 'react-icons/im'

export const DifferenceEquationGraphic = ({
  interactive,
  className,
}: {
  interactive?: boolean
  className?: string
}) => {
  if (interactive) {
    console.log('interactive')
  }

  // JSX
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-around',
        className,
      )}
    >
      <div className="flex h-full w-[30%] items-center justify-center border-4 border-slate-500">
        G
      </div>
      <div className="mx-2">
        <ImMinus />
      </div>
      <div className="flex h-full w-[30%] items-center justify-center border-4 border-slate-500">
        L
      </div>
      <div className="mx-2">
        <FaEquals />
      </div>
      <div className="flex h-full w-[30%] items-center justify-center border-4 border-slate-500">
        D
      </div>
    </div>
  )
}
