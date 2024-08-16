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
          'relative min-h-24 w-full border-none bg-slate-300 pl-2 pr-2',
          className,
        )}
        {...props}
      >
        <div className="select-none font-inter text-5xl font-black">
          <span
            className={cn(
              highlightLetter === 'P' ? 'text-qqAccent' : 'text-slate-500',
            )}
          >
            P
          </span>
          <span
            className={cn(
              highlightLetter === 'O' ? 'text-qqAccent' : 'text-slate-500',
            )}
          >
            O
          </span>
          <span
            className={cn(
              highlightLetter === 'W' ? 'text-qqAccent' : 'text-slate-500',
            )}
          >
            W
          </span>
          <span
            className={cn(
              highlightLetter === 'E' ? 'text-qqAccent' : 'text-slate-500',
            )}
          >
            E
          </span>
          <span
            className={cn(
              highlightLetter === 'R' ? 'text-qqAccent' : 'text-slate-500',
            )}
          >
            R
          </span>
        </div>
        <div className="text-1xl select-none font-inter">{subTitle}</div>
        <div className="select-none font-sura text-2xl">{instructions}</div>
      </div>
    )
  },
)
HdrBar.displayName = 'HdrBar'

export { HdrBar }
