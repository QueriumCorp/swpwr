import * as React from "react";

import { cn } from "@/lib/utils";
import { useProblemStore } from "@/store/_store";

const NavBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { studentLog } = useProblemStore();

  // JSX
  return (
    <div
      ref={ref}
      className={cn("NavBar min-h-24 w-full border-none relative", className)}
      {...props}
    >
      <div className="absolute top-0 left-0 w-[70%] h-full p-2 bg-red-500 overflow-y-scroll overflow-x-auto">
        <div className="table w-full">
          <div className="table-row w-full p-2">
            {studentLog.map((item, index) => (
              <div key={index} className="table-row w-full p-2">
                <div className="table-cell min-w-[100px]">
                  {item.timestamp.toLocaleString("en-us", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </div>
                <div className="table-cell">{item.action}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {props.children}
    </div>
  );
});
NavBar.displayName = "NavBar";

export { NavBar };
