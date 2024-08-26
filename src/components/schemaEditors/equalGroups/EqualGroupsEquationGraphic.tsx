// React Imports
import { FaEquals, FaTimes } from 'react-icons/fa'

// Third-party Imports

// Querium Imports
import { cn } from '@/lib/utils'
import { Droppable } from '../Droppable'
import { useEffect, useState } from 'react'

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
  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////
  const [gValue, setGValue] = useState<boolean>(false)
  const [nValue, setNValue] = useState<boolean>(false)
  const [pValue, setPValue] = useState<boolean>(false)

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (g && g?.length > 0) {
      setGValue(true)
    } else {
      setGValue(false)
    }
  }, [g])
  useEffect(() => {
    if (n && n?.length > 0) {
      setNValue(true)
    } else {
      setNValue(false)
    }
  }, [n])
  useEffect(() => {
    if (p && p?.length > 0) {
      setPValue(true)
    } else {
      setPValue(false)
    }
  }, [p])

  ///////////////////////////////////////////////////////////////////
  // JSX
  ///////////////////////////////////////////////////////////////////
  return (
    <div className={cn('mt-2 flex flex-col items-center justify-around gap-6')}>
      <div className="flex min-w-[480px] max-w-[768px] grow">
        <Droppable
          id="G"
          className={cn(
            'relative flex h-16 w-[30%] flex-col items-center justify-start',
            className,
            gValue ? '!border-4 !border-qqAccent' : '',
          )}
        >
          <div
            className={cn(
              'select-none text-xl text-slate-300',
              'flex items-center justify-start',
            )}
          >
            <div className={cn(gValue ? 'text-xs' : 'text-xl')}>G</div>
          </div>
          <div className={cn(gValue ? 'text-xl' : 'text-xs', className)}>
            {g}
          </div>
        </Droppable>

        <div className="mx-2 flex items-center justify-center">
          <FaTimes />
        </div>

        <Droppable
          id="N"
          className={cn(
            'relative flex h-16 w-[30%] flex-col items-center justify-start',
            nValue ? '!border-4 !border-qqAccent' : '',
          )}
        >
          <div
            className={cn(
              'select-none text-xl text-slate-300',
              'flex items-center justify-start',
            )}
          >
            <div className={cn(nValue ? 'text-xs' : 'text-xl')}>N</div>
          </div>
          <div className={cn(nValue ? 'text-xl' : 'text-xs', className)}>
            {n}
          </div>
        </Droppable>

        <div className="mx-2 flex items-center justify-center">
          <FaEquals />
        </div>

        <Droppable
          id="P"
          className={cn(
            'relative flex h-16 w-[30%] flex-col items-center justify-start',
            pValue ? '!border-4 !border-qqAccent' : '',
          )}
        >
          <div
            className={cn(
              'select-none text-xl text-slate-300',
              'flex items-center justify-start',
            )}
          >
            <div className={cn(pValue ? 'text-xs' : 'text-xl')}>P</div>
          </div>
          <div className={cn(pValue ? 'text-xl' : 'text-xs', className)}>
            {p}
          </div>
        </Droppable>
      </div>
    </div>
  )
}
