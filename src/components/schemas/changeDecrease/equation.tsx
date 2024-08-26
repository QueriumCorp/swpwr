import { cn } from '@/lib/utils'
import { FaEquals, FaMinus, FaTimes } from 'react-icons/fa'

export const ChangeDecreaseEquationGraphic = ({
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
        S
      </div>
      <div className="mx-2">
        <FaMinus />
      </div>
      <div className="flex h-full w-[30%] items-center justify-center border-4 border-slate-500">
        C
      </div>
      <div className="mx-2">
        <FaEquals />
      </div>
      <div className="flex h-full w-[30%] items-center justify-center border-4 border-slate-500">
        E
      </div>
    </div>
  )
}
