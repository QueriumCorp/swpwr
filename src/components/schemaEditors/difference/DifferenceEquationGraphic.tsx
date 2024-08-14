import { cn } from "@/lib/utils";
import { FaEquals } from "react-icons/fa";
import { Droppable } from "../Droppable";
import { FaMinus, FaPlus } from "react-icons/fa6";

export const DifferenceEquationGraphic = ({
  l,
  d,
  g,
  className,
}: {
  l?: string;
  d?: string;
  g?: string;
  className?: string;
}) => {
  //
  // JSX
  //
  return (
    <div
      className={cn(
        "flex flex-col justify-around items-center gap-6 mt-2",
        className,
      )}
    >
      {/*
        SCHEMA
      */}
      <div className="flex flex-col grow max-w-[768px] min-w-[480px]">
        <Droppable
          id="G"
          className="relative flex flex-col justify-start items-center min-h-16"
        >
          <div
            className={cn(
              "text-slate-300 text-xl select-none",
              "flex justify-start items-center",
            )}
          >
            <div className={cn()}>Greater</div>
          </div>
          <div className={cn(className)}>{g}</div>
        </Droppable>

        <div className="flex">
          <Droppable
            id="L"
            className="relative flex flex-col grow justify-start items-center min-h-16"
          >
            <div
              className={cn(
                "text-slate-300 text-xl select-none",
                "flex justify-start items-center",
              )}
            >
              <div className={cn()}>Less</div>
            </div>
            <div className={cn(className)}>{l}</div>
          </Droppable>

          <Droppable
            id="D"
            className="relative flex flex-col grow justify-start items-center min-h-16"
          >
            <div
              className={cn(
                "text-slate-300 text-xl select-none",
                "flex justify-start items-center",
              )}
            >
              <div className={cn()}>Difference</div>
            </div>
            <div className={cn(className)}>{d}</div>
          </Droppable>
        </div>
      </div>

      {/*
        EQUATION
      */}
      <div className="flex grow max-w-[768px] min-w-[480px]">
        <Droppable
          id="GREATER"
          className="relative flex flex-col justify-start items-center w-[30%] h-16"
        >
          <div
            className={cn(
              "text-slate-300 text-xl select-none",
              "flex justify-start items-center",
            )}
          >
            <div className={cn()}>Greater</div>
          </div>
          <div className={cn(className)}>{g}</div>
        </Droppable>

        <div className="mx-2 flex justify-center items-center">
          <FaMinus />
        </div>
        <Droppable
          id="LESS"
          className="relative flex flex-col justify-start items-center w-[30%] h-16"
        >
          <div
            className={cn(
              "text-slate-300 text-xl select-none",
              "flex justify-start items-center",
            )}
          >
            <div className={cn()}>Less</div>
          </div>
          <div className={cn(className)}>{l}</div>
        </Droppable>

        <div className="mx-2 flex justify-center items-center">
          <FaEquals />
        </div>
        <Droppable
          id="DIFF"
          className="relative flex flex-col justify-start items-center w-[30%] h-16"
        >
          <div
            className={cn(
              "text-slate-300 text-xl select-none",
              "flex justify-start items-center",
            )}
          >
            <div className={cn()}>Difference</div>
          </div>
          <div className={cn(className)}>{d}</div>
        </Droppable>
      </div>
    </div>
  );
};
