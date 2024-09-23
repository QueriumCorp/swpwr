import ReactPlayer from 'react-player'

export const VideoPlayer = ({
  videoUrl,
  onEnded,
  className,
}: {
  videoUrl: string
  onEnded: () => void
  className?: string
}) => {
  const src = videoUrl || 'https://querium.wistia.com/medias/oyfe3sqhwb'
  return (
    <ReactPlayer
      url={src}
      onEnded={() => onEnded()}
      className={className}
      controls={
        (document.getElementById('chigger') as HTMLButtonElement) === null
          ? false
          : true
      }
    />
  )
}
