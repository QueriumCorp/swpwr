// Based on https://github.com/arvind-iyer-2001/zepto-chip

import { ReactNode, useState } from 'react'
import { cn } from '../../lib/utils'

const Chip = ({
  selected,
  id,
  avatarUrl,
  label,
  onDelete,
  hoveredCardContent,
  className,
}: {
  id: string
  selected?: boolean
  avatarUrl?: string
  label: string
  onDelete?: (id: string) => Promise<void> | void
  hoveredCardContent?: ReactNode
  className?: string
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn(
        selected ? 'bg-gray-500' : 'bg-gray-300',
        'relative mx-1 my-1 !mb-0 inline-flex min-h-8 w-auto cursor-pointer items-center rounded-full align-middle shadow',
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {avatarUrl && (
        <img
          src={avatarUrl}
          alt="avatar"
          className="scale-102 mr-2 h-8 w-8 translate-x-[-1px] rounded-full ring-2 ring-purple-500"
        />
      )}
      <p className="mb-0 flex-grow select-none pl-4 pr-4 text-black">{label}</p>

      {onDelete && (
        <button
          onClick={() => onDelete(id)}
          className={
            'flex rounded-full !border-none bg-transparent p-0 align-middle text-lg text-gray-400 !shadow-none hover:scale-90 hover:border-transparent hover:bg-white hover:text-red-500'
          }
        >
          <span className="px-2">×</span>
        </button>
      )}

      {isHovered && hoveredCardContent && (
        <div className="absolute bottom-10 left-0 rounded bg-white text-sm shadow-lg">
          {hoveredCardContent}
        </div>
      )}
    </div>
  )
}

export default Chip
