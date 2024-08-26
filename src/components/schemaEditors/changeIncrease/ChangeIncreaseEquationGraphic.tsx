import { cn } from '@/lib/utils'
import { FaEquals } from 'react-icons/fa'
import { Droppable } from '../Droppable'
import { FaPlus } from 'react-icons/fa6'
import { useEffect, useState } from 'react'

export const ChangeIncreaseEquationGraphic = ({
  e,
  c,
  s,
  className,
}: {
  e?: string
  c?: string
  s?: string
  className?: string
}) => {
  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////
  const [eValue, setEValue] = useState<boolean>(false)
  const [cValue, setCValue] = useState<boolean>(false)
  const [sValue, setSValue] = useState<boolean>(false)

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (e && e?.length > 0) {
      setEValue(true)
    } else {
      setEValue(false)
    }
  }, [e])
  useEffect(() => {
    if (c && c?.length > 0) {
      setCValue(true)
    } else {
      setCValue(false)
    }
  }, [c])
  useEffect(() => {
    if (s && s?.length > 0) {
      setSValue(true)
    } else {
      setSValue(false)
    }
  }, [s])

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
      <div className="flex min-w-[480px] max-w-[768px] grow flex-col">
        <div className="flex">
          <Droppable
            id="S"
            className={cn(
              'relative flex min-h-16 grow flex-col items-center justify-start',
              sValue ? '!border-4 !border-qqAccent' : '',
            )}
          >
            <div
              className={cn(
                'select-none text-xl text-slate-300',
                'flex items-center justify-start',
              )}
            >
              <div className={cn(sValue ? 'text-xs' : 'text-xl')}>Start</div>
            </div>
            <div className={cn(sValue ? 'text-xl' : 'text-xs', className)}>
              {s}
            </div>
          </Droppable>
          <Droppable
            id="C"
            className={cn(
              'relative flex min-h-16 grow flex-col items-center justify-start',
              cValue ? '!border-4 !border-qqAccent' : '',
            )}
          >
            <div
              className={cn(
                'select-none text-xl text-slate-300',
                'flex items-center justify-start',
              )}
            >
              <div className={cn(cValue ? 'text-xs' : 'text-xl')}>Change</div>
            </div>
            <div className={cn(cValue ? 'text-xl' : 'text-xs', className)}>
              {c}
            </div>
          </Droppable>
        </div>
        <Droppable
          id="E"
          className={cn(
            'relative flex min-h-16 grow flex-col items-center justify-start',
            eValue ? '!border-4 !border-qqAccent' : '',
          )}
        >
          <div
            className={cn(
              'select-none text-xl text-slate-300',
              'flex items-center justify-start',
            )}
          >
            <div className={cn(eValue ? 'text-xs' : 'text-xl')}>End</div>
          </div>
          <div className={cn(eValue ? 'text-xl' : 'text-xs', className)}>
            {e}
          </div>
        </Droppable>
      </div>

      {/*
        EQUATION
      */}
      <div className="flex min-w-[480px] max-w-[768px] grow">
        <Droppable
          id="START"
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
            <div className={cn(sValue ? 'text-xs' : 'text-xl')}>Start</div>
          </div>
          <div className={cn(sValue ? 'text-xl' : 'text-xs', className)}>
            {s}
          </div>
        </Droppable>

        <div className="mx-2 flex items-center justify-center">
          <FaPlus />
        </div>
        <Droppable
          id="CHANGE"
          className={cn(
            'relative flex h-16 w-[30%] flex-col items-center justify-start',
            cValue ? '!border-4 !border-qqAccent' : '',
          )}
        >
          <div
            className={cn(
              'select-none text-xl text-slate-300',
              'flex items-center justify-start',
            )}
          >
            <div className={cn(cValue ? 'text-xs' : 'text-xl')}>Change</div>
          </div>
          <div className={cn(cValue ? 'text-xl' : 'text-xs', className)}>
            {c}
          </div>
        </Droppable>

        <div className="mx-2 flex items-center justify-center">
          <FaEquals />
        </div>

        <Droppable
          id="END"
          className={cn(
            'relative flex h-16 w-[30%] flex-col items-center justify-start',
            eValue ? '!border-4 !border-qqAccent' : '',
          )}
        >
          <div
            className={cn(
              'select-none text-xl text-slate-300',
              'flex items-center justify-start',
            )}
          >
            <div className={cn(eValue ? 'text-xs' : 'text-xl')}>End</div>
          </div>
          <div className={cn(eValue ? 'text-xl' : 'text-xs', className)}>
            {e}
          </div>
        </Droppable>
      </div>
    </div>
  )
}
