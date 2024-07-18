import ReactPlayer from "react-player";

// export const TinyTutor = ({
//   msg,
//   intro,
//   psHints,
//   aiHints,
//   className,
// }: {
//   msg?: string;
//   intro?: string | string[];
//   psHints?: string[];
//   aiHints?: boolean;
//   className?: string;
// }) => {

export const VideoPlayer = ({
  videoUrl,
  onEnded,
  className,
}: {
  videoUrl: string;
  onEnded: () => void;
  className?: string;
}) => {
  console.log("VideoPlayer");
  const src = videoUrl || "https://querium.wistia.com/medias/oyfe3sqhwb";
  return (
    <ReactPlayer
      url={src}
      onEnded={() => onEnded()}
      className={className}
      controls={true}
    />
  );
};
