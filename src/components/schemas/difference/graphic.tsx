import { cn } from "@/lib/utils";

export const DifferenceSchemaGraphic = ({
  interactive,
  className,
}: {
  interactive?: boolean;
  className?: string;
}) => {
  // JSX
  return (
    <div
      className={cn("w-full h-full flex flex-col justify-stretch", className)}
    >
      <div className="grow flex justify-center items-center border-4 border-indigo-500 border-b-0">
        Greater
      </div>
      <div className="flex flex-row grow justify-evenly">
        <div className="w-[50%] flex justify-center items-center border-4 border-indigo-500 border-r-0">
          Less
        </div>
        <div className="w-[50%] flex justify-center items-center border-4 border-indigo-500">
          Difference
        </div>
      </div>
    </div>
  );
};
