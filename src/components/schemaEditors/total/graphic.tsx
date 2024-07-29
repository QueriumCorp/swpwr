import { cn } from "@/lib/utils";

export const TotalSchemaGraphic = ({
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
        "w-full h-full flex flex-col justify-stretch bg-pink-400",
        className,
      )}
    >
      <div className="grow flex justify-center items-center border-4 border-indigo-500 border-b-0">
        Total
      </div>
      <div className="flex flex-row grow justify-evenly">
        <div className="w-[50%] flex justify-center items-center border-4 border-indigo-500 border-r-0">
          Part
        </div>
        <div className="w-[50%] flex justify-center items-center border-4 border-indigo-500">
          Part
        </div>
      </div>
    </div>
  );
};
