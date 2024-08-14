import { cn } from "@/lib/utils";
import { FaEquals } from "react-icons/fa";
import { Droppable } from "../Droppable";
import { FaPlus } from "react-icons/fa6";

export const TotalEquationGraphic = ({
  p1,
  p2,
  t,
  className,
}: {
  p1?: string;
  p2?: string;
  t?: string;
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
          id="T"
          className="relative flex flex-col justify-start items-center min-h-16"
        >
          <div
            className={cn(
              "text-slate-300 text-xl select-none",
              "flex justify-start items-center",
            )}
          >
            <div className={cn(className)}>Total</div>
          </div>
          <div className={cn(className)}>{t}</div>
        </Droppable>

        <div className="flex">
          <Droppable
            id="P1"
            className="relative flex flex-col grow justify-start items-center min-h-16"
          >
            <div
              className={cn(
                "text-slate-300 text-xl select-none",
                "flex justify-start items-center",
              )}
            >
              <div className={cn()}>Part 1</div>
            </div>
            <div className={cn()}>{p1}</div>
          </Droppable>

          <Droppable
            id="P2"
            className="relative flex flex-col grow justify-start items-center min-h-16"
          >
            <div
              className={cn(
                "text-slate-300 text-xl select-none",
                "flex justify-start items-center",
              )}
            >
              <div className={cn()}>Part 2</div>
            </div>
            <div className={cn()}>{p2}</div>
          </Droppable>
        </div>
      </div>

      {/*
        EQUATION
      */}
      <div className="flex grow max-w-[768px] min-w-[480px]">
        <Droppable
          id="PART1"
          className="relative flex flex-col justify-start items-center w-[30%] h-16"
        >
          <div
            className={cn(
              "text-slate-300 text-xl select-none",
              "flex justify-start items-center",
            )}
          >
            <div className={cn()}>Part 1</div>
          </div>
          <div>{p1}</div>
        </Droppable>

        <div className="mx-2 flex justify-center items-center">
          <FaPlus />
        </div>

        <Droppable
          id="PART2"
          className="relative flex flex-col justify-start items-center w-[30%] h-16"
        >
          <div
            className={cn(
              "text-slate-300 text-xl select-none",
              "flex justify-start items-center",
            )}
          >
            <div className={cn()}>Part 2</div>
          </div>
          <div>{p2}</div>
        </Droppable>

        <div className="mx-2 flex justify-center items-center">
          <FaEquals />
        </div>
        <Droppable
          id="TOTAL"
          className="relative flex flex-col justify-start items-center w-[30%] h-16"
        >
          <div
            className={cn(
              "text-slate-300 text-xl select-none",
              "flex justify-start items-center",
            )}
          >
            <div className={cn()}>Total</div>
          </div>
          <div>{t}</div>
        </Droppable>
      </div>
    </div>
  );
};

/*
  return (
    <div
      className={cn(
        "w-full h-full flex justify-around items-center bg-pink-400",
        className,
      )}
    >
      <div className="flex justify-center items-center border-4 border-indigo-500 w-[30%] h-full">
        Part1:{p1}
      </div>
      <div className="mx-2">
        <ImPlus />
      </div>
      <div className="flex justify-center items-center border-4 border-indigo-500 w-[30%] h-full">
        Part2:{p2}
      </div>
      <div className="mx-2">
        <FaEquals />
      </div>
      <div className="flex justify-center items-center border-4 border-indigo-500 w-[30%] h-full">
        Total:{t}
      </div>
    </div>
  );
*/
