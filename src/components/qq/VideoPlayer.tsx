import ReactPlayer from 'react-player'

export const VideoPlayer = ({
  videoUrl,
  onEnded,
  onError,
  className,
}: {
  videoUrl: string
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
      onEnded={() => onEnded()}
      onError={err => onError(err)}
      className={className}
      controls={
        (document.getElementById('chigger') as HTMLButtonElement) === null
          ? false
          : true
      }
    />
  )
}
