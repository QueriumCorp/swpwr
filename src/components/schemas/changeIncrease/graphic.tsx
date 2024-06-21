import { cn } from "@/lib/utils";

export const ChangeIncreaseSchemaGraphic = ({
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
      <div className="flex flex-row grow justify-evenly">
        <div className="w-[50%] flex justify-center items-center border-4 border-indigo-500 border-r-0">
          Start
        </div>
        <div className="w-[50%] flex justify-center items-center border-4 border-indigo-500">
          Change
        </div>
      </div>
      <div className="grow flex justify-center items-center border-4 border-indigo-500 border-t-0">
        End
      </div>
    </div>
  );
};
