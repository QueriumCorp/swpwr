import { cn } from '@/lib/utils'
import { FaEquals } from 'react-icons/fa'
import { Droppable } from '../Droppable'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import { useEffect, useState } from 'react'

export const DifferenceEquationGraphic = ({
  l,
  d,
  g,
  className,
  showSchema = true,
}: {
  l?: string
  d?: string
  g?: string
  className?: string
  showSchema?: boolean
}) => {
  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////
  const [lValue, setLValue] = useState<boolean>(false)
  const [dValue, setDValue] = useState<boolean>(false)
  const [gValue, setGValue] = useState<boolean>(false)

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (l && l?.length > 0) {
      setLValue(true)
    } else {
      setLValue(false)
    }
  }, [l])
  useEffect(() => {
    if (d && d?.length > 0) {
      setDValue(true)
    } else {
      setDValue(false)
    }
  }, [d])
  useEffect(() => {
    if (g && g?.length > 0) {
      setGValue(true)
    } else {
      setGValue(false)
    }
  }, [g])

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
      {/*
        SCHEMA
      */}
      {showSchema ? (
        <div className="flex min-w-[480px] max-w-[768px] grow flex-col">
          <Droppable
            id="G"
            className={cn(
              'relative flex min-h-16 flex-col items-center justify-start',
              gValue ? '!border-4 !border-qqAccent' : '',
            )}
          >
            <div
              className={cn(
                'select-none text-xl text-slate-300',
                'flex items-center justify-start',
              )}
            >
              <div className={cn(gValue ? 'text-xs' : 'text-xl')}>Greater</div>
            </div>
            <div className={cn(gValue ? 'text-xl' : 'text-xs', className)}>
              {g}
            </div>
          </Droppable>

          <div className="flex">
            <Droppable
              id="L"
              className={cn(
                'relative flex min-h-16 grow flex-col items-center justify-start',
                gValue ? '!border-4 !border-qqAccent' : '',
              )}
            >
              <div
                className={cn(
                  'select-none text-xl text-slate-300',
                  'flex items-center justify-start',
                )}
              >
                <div className={cn(gValue ? 'text-xs' : 'text-xl')}>Less</div>
              </div>
              <div className={cn(gValue ? 'text-xl' : 'text-xs', className)}>
                {l}
              </div>
            </Droppable>

            <Droppable
              id="D"
              className={cn(
                'relative flex min-h-16 grow flex-col items-center justify-start',
                gValue ? '!border-4 !border-qqAccent' : '',
              )}
            >
              <div
                className={cn(
                  'select-none text-xl text-slate-300',
                  'flex items-center justify-start',
                )}
              >
                <div className={cn(gValue ? 'text-xs' : 'text-xl')}>
                  Difference
                </div>
              </div>
              <div className={cn(gValue ? 'text-xl' : 'text-xs', className)}>
                {d}
              </div>
            </Droppable>
          </div>
        </div>
      ) : null}

      {/*
        EQUATION
      */}
      <div className="flex min-w-[480px] max-w-[768px] grow">
        <Droppable
          id="GREATER"
          className={cn(
            'relative flex h-16 w-[30%] flex-col items-center justify-start',
            gValue ? '!border-4 !border-qqAccent' : '',
          )}
        >
          <div
            className={cn(
              'select-none text-xl text-slate-300',
              'flex items-center justify-start',
            )}
          >
            <div className={cn(gValue ? 'text-xs' : 'text-xl')}>Greater</div>
          </div>
          <div className={cn(gValue ? 'text-xl' : 'text-xs', className)}>
            {g}
          </div>
        </Droppable>

        <div className="mx-2 flex items-center justify-center">
          <FaMinus />
        </div>

        <Droppable
          id="LESS"
          className={cn(
            'relative flex h-16 w-[30%] flex-col items-center justify-start',
            gValue ? '!border-4 !border-qqAccent' : '',
          )}
        >
          <div
            className={cn(
              'select-none text-xl text-slate-300',
              'flex items-center justify-start',
            )}
          >
            <div className={cn(gValue ? 'text-xs' : 'text-xl')}>Less</div>
          </div>
          <div className={cn(gValue ? 'text-xl' : 'text-xs', className)}>
            {l}
          </div>
        </Droppable>

        <div className="mx-2 flex items-center justify-center">
          <FaEquals />
        </div>

        <Droppable
          id="DIFF"
          className={cn(
            'relative flex h-16 w-[30%] flex-col items-center justify-start',
            gValue ? '!border-4 !border-qqAccent' : '',
          )}
        >
          <div
            className={cn(
              'select-none text-xl text-slate-300',
              'flex items-center justify-start',
            )}
          >
            <div className={cn(gValue ? 'text-xs' : 'text-xl')}>Difference</div>
          </div>
          <div className={cn(gValue ? 'text-xl' : 'text-xs', className)}>
            {d}
          </div>
        </Droppable>
      </div>
    </div>
  )
}
