// React Imports
import { FaEquals, FaTimes } from 'react-icons/fa'

// Third-party Imports

// Querium Imports
import { cn } from '@/lib/utils'
import { Droppable } from '../Droppable'
import { useEffect, useState } from 'react'

export const CompareEquationGraphic = ({
  className,
  s,
  m,
  p,
}: {
  className?: string
  s?: string
  m?: string
  p?: string
}) => {
  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////
  const [sValue, setSValue] = useState<boolean>(false)
  const [mValue, setMValue] = useState<boolean>(false)
  const [pValue, setPValue] = useState<boolean>(false)

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (s && s?.length > 0) {
      setSValue(true)
    } else {
      setSValue(false)
    }
  }, [s])
  useEffect(() => {
    if (m && m?.length > 0) {
      setMValue(true)
    } else {
      setMValue(false)
    }
  }, [m])
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
    <div
      className={cn(
        'mt-2 flex flex-col items-center justify-around gap-6',
        className,
      )}
    >
      <div className="flex min-w-[480px] max-w-[768px] grow">
        <Droppable
          id="S"
          className={cn(
            'relative flex h-16 w-[30%] flex-col items-center justify-start',
            sValue ? '!border-4 !border-qqAccent' : '',
          )}
        >
          <div
            className={cn(
              'select-none text-xl text-slate-300',
              'flex items-center justify-start',
            )}
          >
            <div className={cn(sValue ? 'text-xs' : 'text-xl')}>Set</div>
          </div>
          <div className={cn(sValue ? 'text-xl' : 'text-xs', className)}>
            {s}
          </div>
        </Droppable>

        <div className="mx-2 flex items-center justify-center">
          <FaTimes />
        </div>

        <Droppable
          id="M"
          className={cn(
            'relative flex h-16 w-[30%] flex-col items-center justify-start',
            mValue ? '!border-4 !border-qqAccent' : '',
          )}
        >
          <div
            className={cn(
              'select-none text-xl text-slate-300',
              'flex items-center justify-start',
            )}
          >
            <div className={cn(mValue ? 'text-xs' : 'text-xl')}>Multiplier</div>
          </div>
          <div className={cn(mValue ? 'text-xl' : 'text-xs', className)}>
            {m}
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
            <div className={cn(pValue ? 'text-xs' : 'text-xl')}>Product</div>
          </div>
          <div className={cn(pValue ? 'text-xl' : 'text-xs', className)}>
            {p}
          </div>
        </Droppable>
      </div>
    </div>
  )
}
