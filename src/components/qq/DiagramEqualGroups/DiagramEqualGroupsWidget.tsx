import { cn } from "@/lib/utils";

export default function DiagramEqualGroupsWidget() {
  return (
    <div
      className={cn(
        "diagramEqualGroupsWidget",
        "flex flex-row flex-grow items-center justify-center",
      )}
    >
      <div
        className={cn(
          "diagramEqualItem diagramEqualStart",
          "relative min-h-[80px] w-[80px] m-[3px]  select-none",
          "flex items-center justify-center border-[none] bg-none",
        )}
      >
        <div
          className={cn(
            "diagramEqualIcon",
            "absolute min-h-[80px] w-[80px] m-[3px]",
          )}
        >
          <svg
            version="1.1"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="50"
              cy="50"
              rx="47.015"
              ry="47.015"
              fill="#d5d3d3"
              stroke="#000"
            />
          </svg>
        </div>
        <div className={cn("diagramEqualLabel", "absolute")}>Groups</div>
      </div>
      <div className="m-2">𝗫</div>
      <div
        className={cn(
          "diagramEqualItem diagramEqualEqual",
          "relative min-h-[80px] w-[80px] m-[3px] bg-[lightgray] select-none",
          "flex items-center justify-center border-[solid] border-[1px] border-[black]",
        )}
      >
        Number
      </div>
      <div className="m-2 font-bold">=</div>
      <div
        className={cn(
          "diagramEqualItem diagramEqualEnd",
          "relative min-h-[80px] w-[80px] m-[3px] select-none",
          "flex items-center justify-center border-[none] bg-none",
        )}
      >
        <div
          className={cn(
            "diagramEqualIcon",
            "absolute min-h-[80px] w-[80px] m-[3px]",
          )}
        >
          <svg
            version="1.1"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              transform="matrix(.14629 1.284 -1.284 .14629 109.51 -13.316)"
              d="m72.025 92.359-60.673-44.835 69.165-30.127-4.2458 37.481z"
              fill="#d5d3d3"
              stroke="#000"
              strokeWidth="1"
            />
          </svg>
        </div>
        <div className={cn("diagramEqualLabel", "absolute")}>Product</div>
      </div>
    </div>
  );
}
