import { cn } from "@/lib/utils";
import { FaEquals } from "react-icons/fa";
import { ImMinus } from "react-icons/im";

export const DifferenceEquationGraphic = ({
  interactive,
  className,
}: {
  interactive?: boolean;
  className?: string;
}) => {
  console.info(interactive);

  // JSX
  return (
    <div
      className={cn(
        "w-full h-full flex justify-around items-center",
        className,
      )}
    >
      <div className="flex justify-center items-center border-4 border-indigo-500 w-[30%] h-full">
        G
      </div>
      <div className="mx-2">
        <ImMinus />
      </div>
      <div className="flex justify-center items-center border-4 border-indigo-500 w-[30%] h-full">
        L
      </div>
      <div className="mx-2">
        <FaEquals />
      </div>
      <div className="flex justify-center items-center border-4 border-indigo-500 w-[30%] h-full">
        D
      </div>
    </div>
  );
};
