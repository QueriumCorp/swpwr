import { cn } from "@/lib/utils";

export default function DiagramChangeWidget() {
  return (
    <div className="diagramChange">
      <div className="diagramChangeArrowBox relative h-5 ml-[20%] mr-[20%]">
        <svg
          className="diagramChangeArrow absolute h-[40px] w-full"
          version="1.1"
          viewBox="0 0 900.00494 261.70168"
          preserveAspectRatio="none"
          width={"50%"}
          id="svg3"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            strokeWidth="0"
            id="g2"
            transform="matrix(0.40782,1.0902,2.1895,-0.20307,-627.38889,756.20535)"
          >
            <path
              d="m -543.8,549.31 c 21.012,159.22 238.48,193.45 142.86,175.71 -102.4,-18.993 -188.57,-81.228 -188.57,-181.43 0,-100.202 86.06,-163.05 188.57,-181.43 74.041,-13.272 -166.77,5.932 -142.86,187.14 z"
              color="#000000"
              id="path1"
            />
            <path
              transform="matrix(0.95969,-0.28107,0.28107,0.95969,-196.31,-60.926)"
              d="m -380,746.65 c -5.7405,5.1467 -181.6,-52.408 -183.18,-59.952 -1.5869,-7.5448 136.19,-131.06 143.51,-128.67 7.3274,2.3981 45.413,183.47 39.672,188.62 z"
              color="#000000"
              id="path2"
            />
          </g>
        </svg>
      </div>
      <div className="diagramChangeBox flex flex-row items-center flex-grow">
        <div
          className={cn(
            "diagramChangeItem grow min-h-12 bg-[lightgray] select-none flex flex-col items-center justify-center border-[solid] border-[1px] border-[black]",
            "diagramChangeStart",
          )}
        >
          Start
        </div>
        <div
          className={cn(
            "diagramChangeItem grow min-h-12 bg-[lightgray] select-none flex flex-col items-center justify-center border-[solid] border-[1px] border-[black]",
            "diagramChangeChange",
          )}
        >
          Change
        </div>
        <div
          className={cn(
            "diagramChangeItem grow min-h-12 bg-[lightgray] select-none flex flex-col items-center justify-center border-[solid] border-[1px] border-[black]",
            "diagramChangeEnd",
          )}
        >
          End
        </div>
      </div>
    </div>
  );
}
