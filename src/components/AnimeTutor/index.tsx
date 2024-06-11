import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Stage from "./Stage";
import { Chat } from "./Chat";
import {
  AvatarAPIProvider,
  AvatarAPIType,
  useAvatarAPI,
} from "./contexts/AvatarAPI";
import { OrbitControls, View } from "@react-three/drei";
import type { ActionName, AvatarImperativeHandle } from "./avatars/FoxyFuka";

type AnimeTutorProps = {
  style?: CSSProperties;
  closeUp?: boolean;
};

const AnimeTutor = ({ style, closeUp }: AnimeTutorProps) => {
  const avatarRef = useRef<AvatarImperativeHandle>(null);
  const { emote, setEmote } = useAvatarAPI() as AvatarAPIType;

  const theStyle: CSSProperties = {
    position: "absolute",
    height: "300px",
    width: "300px",
    ...style,
  };

  useEffect(() => {
    if (emote && avatarRef && avatarRef.current && avatarRef.current.emote)
      avatarRef.current?.emote(emote as ActionName);
  }, [emote]);

  return (
    <div style={theStyle}>
      <Canvas shadows>
        <axesHelper></axesHelper>
        <OrbitControls enableRotate={false} />
        <ambientLight intensity={0.4} />
        <Stage closeUp={closeUp} ref={avatarRef} />
      </Canvas>
    </div>
  );
};

export {
  AvatarAPIProvider,
  useAvatarAPI,
  type AvatarAPIType,
  AnimeTutor,
  Chat,
};
