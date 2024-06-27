import { cn } from "@/lib/utils";
import { FaEquals } from "react-icons/fa";
import { ImEqualizer, ImPlus } from "react-icons/im";

export const TotalEquationGraphic = ({
  interactive,
  className,
}: {
  interactive?: boolean;
  className?: string;
}) => {
  if (interactive) {
    console.log("interactive");
  }

  // JSX
  return (
    <div
      className={cn(
        "w-full h-full flex justify-around items-center",
        className,
      )}
    >
      <div className="flex justify-center items-center border-4 border-indigo-500 w-[30%] h-full">
        Part1
      </div>
      <div className="mx-2">
        <ImPlus />
      </div>
      <div className="flex justify-center items-center border-4 border-indigo-500 w-[30%] h-full">
        Part2
      </div>
      <div className="mx-2">
        <FaEquals />
      </div>
      <div className="flex justify-center items-center border-4 border-indigo-500 w-[30%] h-full">
        Total
      </div>
    </div>
  );
};
