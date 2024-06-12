import { cn } from "@/lib/utils";
import { FaEquals, FaMinus, FaPlus, FaTimes } from "react-icons/fa";

export const ChangeIncreaseEquationGraphic = ({
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
        S
      </div>
      <div className="mx-2">
        <FaPlus />
      </div>
      <div className="flex justify-center items-center border-4 border-indigo-500 w-[30%] h-full">
        C
      </div>
      <div className="mx-2">
        <FaEquals />
      </div>
      <div className="flex justify-center items-center border-4 border-indigo-500 w-[30%] h-full">
        E
      </div>
    </div>
  );
};
