// React Imports
import { FaEquals, FaTimes } from "react-icons/fa";

// Third-party Imports

// Querium Imports
import { cn } from "@/lib/utils";
import { Droppable } from "../Droppable";

export const CompareEquationGraphic = ({
  className,
  s,
  m,
  p,
}: {
  className?: string;
  s?: string;
  m?: string;
  p?: string;
}) => {
  console.log("CompareEquationGraphic", s, m, p);
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
          id="S"
          className="relative flex flex-col justify-start items-center w-[30%] h-16"
        >
          <div
            className={cn(
              "text-slate-300 text-xl select-none",
              "flex justify-start items-center",
            )}
          >
            <div className={cn()}>Set</div>
          </div>
          <div>{s}</div>
        </Droppable>

        <div className="mx-2 flex justify-center items-center">
          <FaTimes />
        </div>

        <Droppable
          id="M"
          className="relative flex flex-col justify-start items-center w-[30%] h-16"
        >
          <div
            className={cn(
              "text-slate-300 text-xl select-none",
              "flex justify-start items-center",
            )}
          >
            <div className={cn()}>Multiplier</div>
          </div>
          <div>{m}</div>
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
            <div className={cn()}>Product</div>
          </div>
          <div>{p}</div>
        </Droppable>
      </div>
    </div>
  );
};
