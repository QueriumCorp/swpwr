import { cn } from '@/lib/utils'
import { FaEquals } from 'react-icons/fa'
import { ImEqualizer, ImPlus } from 'react-icons/im'

export const TotalEquationGraphic = ({
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
        Part1
      </div>
      <div className="mx-2">
        <ImPlus />
      </div>
      <div className="flex h-full w-[30%] items-center justify-center border-4 border-slate-500">
        Part2
      </div>
      <div className="mx-2">
        <FaEquals />
      </div>
      <div className="flex h-full w-[30%] items-center justify-center border-4 border-slate-500">
        Total
      </div>
    </div>
  )
}
