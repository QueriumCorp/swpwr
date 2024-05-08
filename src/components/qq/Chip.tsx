// Based on https://github.com/arvind-iyer-2001/zepto-chip

import { ReactNode, useState } from "react";
import { cn } from "../../lib/utils";

const Chip = ({
  selected,
  id,
  avatarUrl,
  label,
  onDelete,
  hoveredCardContent,
  classname,
}: {
  id: string;
  selected?: boolean;
  avatarUrl?: string;
  label: string;
  onDelete?: (id: string) => Promise<void> | void;
  hoveredCardContent?: ReactNode;
  classname?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        selected ? "bg-gray-500" : "bg-gray-300",
        "w-auto inline-flex h-8 items-center rounded-full shadow relative cursor-pointer align-middle mx-1 my-1",
        classname,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {avatarUrl && (
        <img
          src={avatarUrl}
          alt="avatar"
          className="ring-purple-500 ring-2 w-8 h-8 scale-102 translate-x-[-1px] rounded-full mr-2"
        />
      )}
      <p className="flex-grow text-sm pl-4 pr-4  text-black select-none">
        {label}
      </p>

      {onDelete && (
        <button
          onClick={() => onDelete(id)}
          className="hover:border-transparent hover:scale-90 flex align-middle rounded-full p-0 bg-transparent text-lg text-gray-400 hover:text-red-500 hover:bg-white"
        >
          <span className="px-2">×</span>
        </button>
      )}

      {isHovered && hoveredCardContent && (
        <div className="absolute bottom-10 left-0 bg-white rounded shadow-lg text-sm">
          {hoveredCardContent}
        </div>
      )}
    </div>
  );
};

export default Chip;
