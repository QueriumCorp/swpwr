import { cn } from "@/lib/utils";
import { FaEquals, FaTimes } from "react-icons/fa";

export const CompareEquationGraphic = ({
  interactive,
  className,
}: {
  interactive?: boolean;
  className?: string;
}) => {
  // JSX
  return (
    <div
      className={cn(
        "w-full h-full flex justify-around items-center",
        className,
      )}
    >
      <div className="flex justify-center items-center border-4 border-indigo-500 w-[30%] h-full">
        S
      </div>
      <div className="mx-2">
        <FaTimes />
      </div>
      <div className="flex justify-center items-center border-4 border-indigo-500 w-[30%] h-full">
        M
      </div>
      <div className="mx-2">
        <FaEquals />
      </div>
      <div className="flex justify-center items-center border-4 border-indigo-500 w-[30%] h-full">
        P
      </div>
    </div>
  );
};
