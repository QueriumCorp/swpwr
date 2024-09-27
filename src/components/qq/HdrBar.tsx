import * as React from 'react'

import { cn } from '@/lib/utils'
import { PiSpeakerHighFill, PiSpeakerXThin } from 'react-icons/pi'
import { useProblemStore } from '@/store/_store'

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
    const { session, toggleChatty } = useProblemStore()

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
            'sm:text-lg md:text-xl xl:text-2xl',
          )}
        >
          <div>{instructions}</div>
        </div>
        <div className="flex select-none items-center justify-end font-capriola text-2xl text-black">
          <div className="cursor-pointer" onClick={toggleChatty}>
            {session.chatty ? (
              <PiSpeakerHighFill className="mr-2 inline-block h-6 w-6" />
            ) : (
              <PiSpeakerXThin className="mr-2 inline-block h-6 w-6" />
            )}
          </div>
        </div>
      </div>
    )
  },
)
HdrBar.displayName = 'HdrBar'

export { HdrBar }
