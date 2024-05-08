import ReactPlayer from "react-player";

export const IntroVideo = () => {
  const src = "https://querium.wistia.com/medias/oyfe3sqhwb";
  return <ReactPlayer url={src} />;
};
