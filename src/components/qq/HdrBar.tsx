import * as React from "react";

import { cn } from "@/lib/utils";

const HdrBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "HdrBar bg-yellow-300 min-h-24 w-full border-none relative",
        className,
      )}
      {...props}
    ></div>
  );
});
HdrBar.displayName = "HdrBar";

export { HdrBar };
