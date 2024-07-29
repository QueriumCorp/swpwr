import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

export const Droppable = ({
  className,
  id,
  children,
}: {
  className?: string;
  id: string;
  children?: React.ReactNode; // best, accepts everything React can render
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        `Droppable:${id}`,
        className,
        "bg-transparent overflow-hidden",
        "rounded border border-gray-600  px-12 py-3",
        "text-sm font-medium text-slate-800",
        "focus:outline-none focus:ring active:bg-indigo-600 active:text-white",
        isOver ? "text-transparent border-0" : "text-slate-800",
      )}
    >
      <span
        className={cn(
          "ease-in absolute left-0 top-0 h-0 w-0 border-t-2 border-qqBrand transition-all duration-200",
          isOver ? "w-full" : "",
        )}
      ></span>
      <span
        className={cn(
          "ease-in absolute right-0 top-0 h-0 w-0 border-r-2 border-qqBrand transition-all duration-200",
          isOver ? "h-full" : "",
        )}
      ></span>
      <span
        className={cn(
          "ease-in absolute bottom-0 right-0 h-0 w-0 border-b-2 border-qqBrand transition-all duration-200",
          isOver ? "w-full" : "",
        )}
      ></span>
      <span
        className={cn(
          "ease-in absolute bottom-0 left-0 h-0 w-0 border-l-2 border-qqBrand transition-all duration-200",
          isOver ? "h-full" : "",
        )}
      ></span>
      {children}
    </div>
  );
};
