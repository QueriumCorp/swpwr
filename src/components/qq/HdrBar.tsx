import * as React from 'react'

import { cn } from '@/lib/utils'

export interface HdrBarProps extends React.HTMLAttributes<HTMLDivElement> {
  highlightLetter?: string
  subTitle?: string
  instructions?: string
}

const HdrBar = React.forwardRef<HTMLDivElement, HdrBarProps>(
  (
    {
      highlightLetter = 'P',
      subTitle = 'The subtitle',
      instructions = 'Need to provide instructions',
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'HdrBar',
          'relative w-full border-none bg-slate-100 pl-2 pr-2',
          'grid grid-cols-3 items-center gap-4',
          className,
        )}
        {...props}
      >
        <div className="PowerContainer">
          <div className="PowerLetters flex select-none font-inter font-black">
            <div
              className={cn(
                highlightLetter === 'P'
                  ? 'text-3xl text-qqAccent sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl'
                  : 'text-3xl text-slate-500 sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl',
              )}
            >
              P
            </div>
            <div
              className={cn(
                highlightLetter === 'O'
                  ? 'text-3xl text-qqAccent sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl'
                  : 'text-3xl text-slate-500 sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl',
              )}
            >
              O
            </div>
            <div
              className={cn(
                highlightLetter === 'W'
                  ? 'text-3xl text-qqAccent sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl'
                  : 'text-3xl text-slate-500 sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl',
              )}
            >
              W
            </div>
            <div
              className={cn(
                highlightLetter === 'E'
                  ? 'text-3xl text-qqAccent sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl'
                  : 'text-3xl text-slate-500 sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl',
              )}
            >
              E
            </div>
            <div
              className={cn(
                highlightLetter === 'R'
                  ? 'text-3xl text-qqAccent sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl'
                  : 'text-3xl text-slate-500 sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl',
              )}
            >
              R
            </div>
          </div>
          <div className="text-1xl mt-[-10px] select-none font-inter">
            {subTitle}
          </div>
        </div>
        <div
          className={cn(
            'flex items-end justify-center',
            'select-none text-center font-capriola text-qqBrand',
            'sm:text-lg md:text-xl xl:text-4xl',
          )}
        >
          <div>{instructions}</div>
        </div>
        <div className="flex select-none items-center justify-end font-capriola text-2xl text-black"></div>
      </div>
    )
  },
)
HdrBar.displayName = 'HdrBar'

export { HdrBar }
