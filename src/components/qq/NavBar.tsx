import * as React from "react"

import { cn } from "@/lib/utils"

const NavBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "NavBar bg-red-500 min-h-24 w-full border-none",
      className
    )}
    {...props}
  />
))
NavBar.displayName = "NavBar"


export { NavBar }
