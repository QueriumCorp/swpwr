import { cn } from '@/lib/utils'
import { FaEquals, FaTimes } from 'react-icons/fa'

export const EqualGroupsEquationGraphic = ({
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
        <FaTimes />
      </div>
      <div className="flex h-full w-[30%] items-center justify-center border-4 border-slate-500">
        N
      </div>
      <div className="mx-2">
        <FaEquals />
      </div>
      <div className="flex h-full w-[30%] items-center justify-center border-4 border-slate-500">
        P
      </div>
    </div>
  )
}
