import { cn } from "@/lib/utils";
import { FaEquals } from "react-icons/fa";
import { Droppable } from "../Droppable";
import { FaMinus } from "react-icons/fa6";

export const ChangeDecreaseEquationGraphic = ({
  e,
  c,
  s,
  className,
}: {
  e?: string;
  c?: string;
  s?: string;
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
          id="S"
          className="relative flex flex-col justify-start items-center min-h-16"
        >
          <div
            className={cn(
              "text-slate-300 text-xl select-none",
              "flex justify-start items-center",
            )}
          >
            <div className={cn()}>Start</div>
          </div>
          <div className={cn()}>{s}</div>
        </Droppable>

        <div className="flex">
          <Droppable
            id="C"
            className="relative flex flex-col grow justify-start items-center min-h-16"
          >
            <div
              className={cn(
                "text-slate-300 text-xl select-none",
                "flex justify-start items-center",
              )}
            >
              <div className={cn()}>Change</div>
            </div>
            <div className={cn()}>{c}</div>
          </Droppable>

          <Droppable
            id="E"
            className="relative flex flex-col grow justify-start items-center min-h-16"
          >
            <div
              className={cn(
                "text-slate-300 text-xl select-none",
                "flex justify-start items-center",
              )}
            >
              <div className={cn()}>End</div>
            </div>
            <div className={cn()}>{e}</div>
          </Droppable>
        </div>
      </div>

      {/*
        EQUATION
      */}
      <div className="flex grow max-w-[768px] min-w-[480px]">
        <Droppable
          id="START"
          className="relative flex flex-col justify-start items-center w-[30%] h-16"
        >
          <div
            className={cn(
              "text-slate-300 text-xl select-none",
              "flex justify-start items-center",
            )}
          >
            <div className={cn()}>Start</div>
          </div>
          <div>{s}</div>
        </Droppable>

        <div className="mx-2 flex justify-center items-center">
          <FaMinus />
        </div>
        <Droppable
          id="CHANGE"
          className="relative flex flex-col justify-start items-center w-[30%] h-16"
        >
          <div
            className={cn(
              "text-slate-300 text-xl select-none",
              "flex justify-start items-center",
            )}
          >
            <div className={cn()}>Change</div>
          </div>
          <div>{c}</div>
        </Droppable>

        <div className="mx-2 flex justify-center items-center">
          <FaEquals />
        </div>
        <Droppable
          id="END"
          className="relative flex flex-col justify-start items-center w-[30%] h-16"
        >
          <div
            className={cn(
              "text-slate-300 text-xl select-none",
              "flex justify-start items-center",
            )}
          >
            <div className={cn()}>End</div>
          </div>
          <div>{e}</div>
        </Droppable>
      </div>
    </div>
  );
};
