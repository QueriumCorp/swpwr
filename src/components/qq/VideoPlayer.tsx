import { cn } from '@/lib/utils'
import ReactPlayer from 'react-player'

export const VideoPlayer = ({
  videoUrl,
  onStart,
  onEnded,
  onError,
  className,
}: {
  videoUrl: string
  onStart: () => void
  onEnded: () => void
  onError: (err: unknown) => void
  className?: string
}) => {
  const src = videoUrl || 'https://querium.wistia.com/medias/oyfe3sqhwb'
  return (
    <ReactPlayer
      url={src}
      config={{
        file: {
          attributes: {
            crossOrigin: 'true',
          },
        },
      }}
      onStart={() => onStart()}
      onEnded={() => onEnded()}
      onError={err => onError(err)}
      className={cn(className, 'VideoPlayer !h-[450px] !w-[800px] border-0')}
      controls={
        (document.getElementById('chigger') as HTMLButtonElement) === null
          ? false
          : true
      }
    />
  )
}
