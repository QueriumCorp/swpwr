import React from 'react'
import { cn } from '../utils'

export const StepIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'mr-2 flex max-h-8 min-h-8 min-w-8 max-w-8 items-center justify-center text-xl',
      className,
    )}
    {...props}
  />
))
