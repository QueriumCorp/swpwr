
import ReactPlayer from 'react-player'


export const IntroVideo = () => {
  const src="https://querium.wistia.com/medias/oyfe3sqhwb"
  return (
    <ReactPlayer url={src} />
  );
};



// import "https://fast.wistia.com/embed/medias/oyfe3sqhwb.jsonp";
// import "https://fast.wistia.com/assets/external/E-v1.js";

// export const IntroVideo = () => {
//   // const src="https://querium.wistia.com/medias/oyfe3sqhwb"
//   return (
//     <div
//       className="wistia_responsive_padding"
//       style={{ padding: "56.25% 0 0 0", position: "relative" }}
//     >
//       <div
//         className="wistia_responsive_wrapper"
//         style={{
//           height: "100%",
//           left: 0,
//           position: "absolute",
//           top: 0,
//           width: "100%",
//         }}
//       >
//         <div
//           className="wistia_embed wistia_async_oyfe3sqhwb seo=false videoFoam=true"
//           style={{ height: "100%", position: "relative", width: "100%" }}
//         >
//           <div
//             className="wistia_swatch"
//             style={{
//               height: "100%",
//               left: 0,
//               opacity: 0,
//               overflow: "hidden",
//               position: "absolute",
//               top: 0,
//               transition: "opacity 200ms",
//               width: "100%",
//             }}
//           >
//             <img
//               src="https://querium.wistia.com/medias/oyfe3sqhwb/swatch"
//               style={{
//                 filter: "blur(5px)",
//                 height: "100%",
//                 objectFit: "contain",
//                 width: "100%",
//               }}
//               alt=""
//               aria-hidden="true"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// import {WistiaProvider, WistiaPlayer} from "@wistia/react-embeds"

// export const IntroVideo = () =>  {
//     const src="https://querium.wistia.com/medias/oyfe3sqhwb"
// return (
// <WistiaProvider>
//   <WistiaPlayer hashedId="oyfe3sqhwb" />
// </WistiaProvider>
// )}
