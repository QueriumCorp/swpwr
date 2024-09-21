import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { useDraggable } from '@dnd-kit/core'

const factchickletVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface FactChickletProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof factchickletVariants> {
  fact: string
}

const FactChicklet = React.forwardRef<HTMLDivElement, FactChickletProps>(
  ({ fact, className, variant, ...props }, _ref) => {
    // Draggable hooks
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: fact,
    })
    const dragStyle = transform
      ? {
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          zIndex: 999,
        }
      : undefined
    return (
      <div
        ref={setNodeRef}
        style={dragStyle}
        {...listeners}
        {...attributes}
        className={cn(
          factchickletVariants({ variant }),
          className,
          'min-h-5 select-none',
        )}
        {...props}
      >
        {fact}
      </div>
    )
  },
)

FactChicklet.displayName = 'FactChicklet'

export { FactChicklet, factchickletVariants }
