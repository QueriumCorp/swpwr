// React Imports
import { FaEquals, FaTimes } from "react-icons/fa";

// Third-party Imports

// Querium Imports
import { cn } from "@/lib/utils";
import { Droppable } from "../Droppable";

export const EqualGroupsEquationGraphic = ({
  className,
  g,
  n,
  p,
}: {
  className?: string;
  g?: string;
  n?: string;
  p?: string;
}) => {
  console.log("EqualGroupsEquationGraphic", g, n, p);
  // JSX
  return (
    <div className={cn("flex flex-col justify-around items-center gap-6 mt-2")}>
      <div className="flex grow max-w-[768px] min-w-[480px]">
        <Droppable
          id="G"
          className={cn(
            "relative flex flex-col justify-start items-center w-[30%] h-16",
            className,
          )}
        >
          <div
            className={cn(
              "text-slate-300 text-xl select-none",
              "flex justify-start items-center",
            )}
          >
            <div className={cn()}>G</div>
          </div>
          <div className={cn(className)}>{g}</div>
        </Droppable>

        <div className="mx-2 flex justify-center items-center">
          <FaTimes />
        </div>

        <Droppable
          id="N"
          className="relative flex flex-col justify-start items-center w-[30%] h-16"
        >
          <div
            className={cn(
              "text-slate-300 text-xl select-none",
              "flex justify-start items-center",
            )}
          >
            <div className={cn()}>N</div>
          </div>
          <div className={cn(className)}>{n}</div>
        </Droppable>
        <div className="mx-2 flex justify-center items-center">
          <FaEquals />
        </div>
        <Droppable
          id="P"
          className="relative flex flex-col justify-start items-center w-[30%] h-16"
        >
          <div
            className={cn(
              "text-slate-300 text-xl select-none",
              "flex justify-start items-center",
            )}
          >
            <div className={cn()}>P</div>
          </div>
          <div className={cn(className)}>{p}</div>
        </Droppable>
      </div>
    </div>
  );
};
