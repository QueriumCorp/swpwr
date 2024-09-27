import * as React from 'react'

import { cn } from '@/lib/utils'
import { SpeakerLoudIcon } from '@radix-ui/react-icons'

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
          'relative w-full border-none bg-slate-300 pl-2 pr-2',
          'grid grid-cols-3 gap-4',
          className,
        )}
        {...props}
      >
        <div>
          <div className="flex select-none font-inter font-black">
            <div
              className={cn(
                highlightLetter === 'P'
                  ? 'text-6xl text-qqAccent'
                  : 'text-5xl text-slate-500',
              )}
            >
              P
            </div>
            <div
              className={cn(
                highlightLetter === 'O'
                  ? 'text-6xl text-qqAccent'
                  : 'text-5xl text-slate-500',
              )}
            >
              O
            </div>
            <div
              className={cn(
                highlightLetter === 'W'
                  ? 'text-6xl text-qqAccent'
                  : 'text-5xl text-slate-500',
              )}
            >
              W
            </div>
            <div
              className={cn(
                highlightLetter === 'E'
                  ? 'text-6xl text-qqAccent'
                  : 'text-5xl text-slate-500',
              )}
            >
              E
            </div>
            <div
              className={cn(
                highlightLetter === 'R'
                  ? 'text-6xl text-qqAccent'
                  : 'text-5xl text-slate-500',
              )}
            >
              R
            </div>
          </div>
          <div className="text-1xl mt-[-10px] select-none font-inter">
            {subTitle}
          </div>
        </div>
        <div className="flex select-none items-center justify-center font-capriola text-2xl text-qqBrand">
          {instructions}
        </div>
        <div className="flex select-none items-center justify-end font-capriola text-2xl text-black">
          <SpeakerLoudIcon className="mr-2 inline-block h-6 w-6" />
        </div>
      </div>
    )
  },
)
HdrBar.displayName = 'HdrBar'

export { HdrBar }
