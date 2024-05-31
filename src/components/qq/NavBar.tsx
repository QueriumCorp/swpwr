import * as React from "react";

import { cn } from "@/lib/utils";

const NavBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  // JSX
  return (
    <div
      ref={ref}
      className={cn("NavBar min-h-24 w-full border-none relative", className)}
      {...props}
    >
      {props.children}
    </div>
  );
});
NavBar.displayName = "NavBar";

export { NavBar };
