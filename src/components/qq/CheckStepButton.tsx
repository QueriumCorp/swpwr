import { ComponentProps, forwardRef } from 'react'

import { Check } from 'lucide-react'

import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

const CheckStepButton = forwardRef<
  HTMLButtonElement,
  ComponentProps<typeof Button>
>(
  (
    {
      className,
      disabled,
      onClick,
      variant = 'outline',
      size = 'icon',
      ...props
    },
    ref,
  ) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          'absolute h-8 w-8 rounded-full border-white bg-green-500 text-white hover:bg-qqBrand hover:text-white disabled:border-slate-400 disabled:bg-slate-200 disabled:text-slate-400',
          className,
        )}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        <Check className="h-4 w-4" />
        <span className="sr-only">Check Step</span>
      </Button>
    )
  },
)

export default CheckStepButton
CheckStepButton.displayName = 'CheckStepButton'
