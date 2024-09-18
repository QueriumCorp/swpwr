import * as React from 'react'

import { cn } from '@/lib/utils'

const NavBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  console.log('RENDER: NavBar')
  // JSX
  return (
    <div
      ref={ref}
      className={cn('NavBar relative min-h-24 w-full border-none', className)}
      {...props}
    >
      {props.children}
    </div>
  )
})
NavBar.displayName = 'NavBar'

export { NavBar }
