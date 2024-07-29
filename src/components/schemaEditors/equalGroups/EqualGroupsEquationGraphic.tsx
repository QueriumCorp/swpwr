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
  // JSX
  return (
    <div
      className={cn(
        "w-full h-full flex justify-around items-center -z-10",
        className,
      )}
    >
      <Droppable
        id="G"
        className="relative flex flex-col justify-center items-center w-[30%] h-16"
      >
        <div className="text-slate-300 font-irishGrover text-5xl absolute w-full h-full select-none flex items-center">
          G
        </div>
        <div>{g}</div>
      </Droppable>
      <div className="mx-2">
        <FaTimes />
      </div>
      <Droppable
        id="N"
        className="relative flex flex-col justify-center items-center w-[30%] h-16"
      >
        <div className="text-slate-300 font-irishGrover text-5xl absolute w-full h-full select-none flex items-center">
          <span className={cn()}>N</span>
        </div>
        <div>{n}</div>
      </Droppable>
      <div className="mx-2">
        <FaEquals />
      </div>
      <Droppable
        id="P"
        className="relative flex flex-col justify-center items-center w-[30%] h-16"
      >
        <div className="text-slate-300 font-irishGrover text-5xl absolute w-full h-full select-none flex items-center">
          P
        </div>
        <div>{p}</div>
      </Droppable>
    </div>
  );
};
