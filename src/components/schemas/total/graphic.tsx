import { cn } from '@/lib/utils'

export const TotalSchemaGraphic = ({
  interactive,
  className,
}: {
  interactive?: boolean
  className?: string
}) => {
  if (interactive) {
    console.log('interactive')
  }

  // JSX
  return (
    <div
      className={cn('flex h-full w-full flex-col justify-stretch', className)}
    >
      <div className="flex grow items-center justify-center border-4 border-b-0 border-slate-500">
        Total
      </div>
      <div className="flex grow flex-row justify-evenly">
        <div className="flex w-[50%] items-center justify-center border-4 border-r-0 border-slate-500">
          Part
        </div>
        <div className="flex w-[50%] items-center justify-center border-4 border-slate-500">
          Part
        </div>
      </div>
    </div>
  )
}
