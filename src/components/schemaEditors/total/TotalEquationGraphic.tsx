import { cn } from '@/lib/utils'
import { FaEquals } from 'react-icons/fa'
import { Droppable } from '../Droppable'
import { FaPlus } from 'react-icons/fa6'
import { useEffect, useState } from 'react'

export const TotalEquationGraphic = ({
  p1,
  p2,
  t,
  className,
  showSchema = true,
}: {
  p1?: string
  p2?: string
  t?: string
  className?: string
  showSchema?: boolean
}) => {
  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////
  const [p1Value, setP1Value] = useState<boolean>(false)
  const [p2Value, setP2Value] = useState<boolean>(false)
  const [tValue, setTValue] = useState<boolean>(false)

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (p1 && p1?.length > 0) {
      setP1Value(true)
    } else {
      setP1Value(false)
    }
  }, [p1])
  useEffect(() => {
    if (p2 && p2?.length > 0) {
      setP2Value(true)
    } else {
      setP2Value(false)
    }
  }, [p2])
  useEffect(() => {
    if (t && t?.length > 0) {
      setTValue(true)
    } else {
      setTValue(false)
    }
  }, [t])

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
            id="T"
            className={cn(
              'relative flex min-h-16 flex-col items-center justify-start',
              tValue ? '!border-4 !border-qqAccent' : '',
            )}
          >
            <div
              className={cn(
                'select-none text-xl text-slate-300',
                'flex items-center justify-start',
              )}
            >
              <div className={cn(tValue ? 'text-xs' : 'text-xl')}>T</div>
            </div>
            <div className={cn(tValue ? 'text-xl' : 'text-xs', className)}>
              {t}
            </div>
          </Droppable>

          <div className="flex">
            <Droppable
              id="P1"
              className={cn(
                'relative flex min-h-16 grow flex-col items-center justify-start',
                p1Value ? '!border-4 !border-qqAccent' : '',
              )}
            >
              <div
                className={cn(
                  'select-none text-xl text-slate-300',
                  'flex items-center justify-start',
                )}
              >
                <div className={cn(p1Value ? 'text-xs' : 'text-xl')}>P1</div>
              </div>
              <div className={cn(p1Value ? 'text-xl' : 'text-xs', className)}>
                {p1}
              </div>
            </Droppable>

            <Droppable
              id="P2"
              className={cn(
                'relative flex min-h-16 grow flex-col items-center justify-start',
                p2Value ? '!border-4 !border-qqAccent' : '',
              )}
            >
              <div
                className={cn(
                  'select-none text-xl text-slate-300',
                  'flex items-center justify-start',
                )}
              >
                <div className={cn(p2Value ? 'text-xs' : 'text-xl')}>P2</div>
              </div>
              <div className={cn(p2Value ? 'text-xl' : 'text-xs', className)}>
                {p2}
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
          id="PART1"
          className={cn(
            'relative flex h-16 w-[30%] flex-col items-center justify-start',
            p1Value ? '!border-4 !border-qqAccent' : '',
          )}
        >
          <div
            className={cn(
              'select-none text-xl text-slate-300',
              'flex items-center justify-start',
            )}
          >
            <div className={cn(p1Value ? 'text-xs' : 'text-xl', className)}>
              P1
            </div>
          </div>
          <div className={cn(p1Value ? 'text-xl' : 'text-xs', className)}>
            {p1}
          </div>
        </Droppable>

        <div className="mx-2 flex items-center justify-center">
          <FaPlus />
        </div>

        <Droppable
          id="PART2"
          className={cn(
            'relative flex h-16 w-[30%] flex-col items-center justify-start',
            p2Value ? '!border-4 !border-qqAccent' : '',
          )}
        >
          <div
            className={cn(
              'select-none text-xl text-slate-300',
              'flex items-center justify-start',
            )}
          >
            <div className={cn(p2Value ? 'text-xs' : 'text-xl', className)}>
              P2
            </div>
          </div>
          <div className={cn(p2Value ? 'text-xl' : 'text-xs', className)}>
            {p2}
          </div>
        </Droppable>

        <div className="mx-2 flex items-center justify-center">
          <FaEquals />
        </div>
        <Droppable
          id="TOTAL"
          className={cn(
            'relative flex h-16 w-[30%] flex-col items-center justify-start',
            tValue ? '!border-4 !border-qqAccent' : '',
          )}
        >
          <div
            className={cn(
              'select-none text-xl text-slate-300',
              'flex items-center justify-start',
            )}
          >
            <div className={cn(tValue ? 'text-xs' : 'text-xl', className)}>
              T
            </div>
          </div>
          <div className={cn(tValue ? 'text-xl' : 'text-xs', className)}>
            {t}
          </div>
        </Droppable>
      </div>
    </div>
  )
}

/*
  return (
    <div
      className={cn(
        "w-full h-full flex justify-around items-center bg-pink-400",
        className,
      )}
    >
      <div className="flex justify-center items-center border-4 border-slate-500 w-[30%] h-full">
        Part1:{p1}
      </div>
      <div className="mx-2">
        <ImPlus />
      </div>
      <div className="flex justify-center items-center border-4 border-slate-500 w-[30%] h-full">
        Part2:{p2}
      </div>
      <div className="mx-2">
        <FaEquals />
      </div>
      <div className="flex justify-center items-center border-4 border-slate-500 w-[30%] h-full">
        Total:{t}
      </div>
    </div>
  );
*/
