// React Imports
import { FaEquals, FaTimes } from 'react-icons/fa'

// Third-party Imports

// Querium Imports
import { cn } from '@/lib/utils'
import { Droppable } from '../Droppable'

export const EqualGroupsEquationGraphic = ({
  className,
  g,
  n,
  p,
}: {
  className?: string
  g?: string
  n?: string
  p?: string
}) => {
  // JSX
  return (
    <div className={cn('mt-2 flex flex-col items-center justify-around gap-6')}>
      <div className="flex min-w-[480px] max-w-[768px] grow">
        <Droppable
          id="G"
          className={cn(
            'relative flex h-16 w-[30%] flex-col items-center justify-start',
            className,
          )}
        >
          <div
            className={cn(
              'select-none text-xl text-slate-300',
              'flex items-center justify-start',
            )}
          >
            <div className={cn()}>G</div>
          </div>
          <div className={cn(className)}>{g}</div>
        </Droppable>

        <div className="mx-2 flex items-center justify-center">
          <FaTimes />
        </div>

        <Droppable
          id="N"
          className="relative flex h-16 w-[30%] flex-col items-center justify-start"
        >
          <div
            className={cn(
              'select-none text-xl text-slate-300',
              'flex items-center justify-start',
            )}
          >
            <div className={cn()}>N</div>
          </div>
          <div className={cn(className)}>{n}</div>
        </Droppable>
        <div className="mx-2 flex items-center justify-center">
          <FaEquals />
        </div>
        <Droppable
          id="P"
          className="relative flex h-16 w-[30%] flex-col items-center justify-start"
        >
          <div
            className={cn(
              'select-none text-xl text-slate-300',
              'flex items-center justify-start',
            )}
          >
            <div className={cn()}>P</div>
          </div>
          <div className={cn(className)}>{p}</div>
        </Droppable>
      </div>
    </div>
  )
}
