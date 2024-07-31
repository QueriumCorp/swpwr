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
    <div
      className={cn(
        "flex flex-col justify-around items-center gap-6 mt-2",
        className,
      )}
    >
      <div className="flex grow max-w-[768px] min-w-[480px]">
        <Droppable
          id="G"
          className="relative flex flex-col justify-start items-center w-[30%] h-16"
        >
          <div
            className={cn(
              "text-slate-300 text-xl select-none",
              "flex justify-start items-center",
            )}
          >
            <div className={cn()}>G</div>
          </div>
          <div>{g}</div>
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
          <div>{n}</div>
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
          <div>{p}</div>
        </Droppable>
      </div>
      <h1>G:{g}</h1>
      <h1>N:{n}</h1>
      <h1>P:{p}</h1>
    </div>
  );
};
