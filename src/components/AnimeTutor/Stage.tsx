import type { ActionName, AvatarImperativeHandle } from "./avatars/FoxyFuka";
// import FoxyFuka from "./avatars/FoxyFuka";
import { Model } from "./avatars/foxy/model";
import { useThree } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useRef } from "react";
import * as THREE from "three";

type StageProps = {
  closeUp?: boolean;
};

const Stage = forwardRef(function (props: StageProps, ref) {
  useImperativeHandle(
    ref,
    () => {
      return {
        emote(emote: string) {
          // if(avatarRef.current && avatarRef.current.emote){
          avatarRef.current?.emote(emote as ActionName);
        },
        status() {
          avatarRef.current?.status();
        },
      };
    },
    [],
  );

  let target, viewer, zoom;
  const avatarRef = useRef<AvatarImperativeHandle>(null);
  console.log(props);
  if (props.closeUp) {
    // Closeup
    target = { x: 0, y: 0, z: 0 };
    viewer = { x: 0, y: 0, z: 0.4 };
    zoom = 7;
  } else {
    // Full Body
    target = { x: 0, y: 4, z: 0 };
    viewer = { x: 0, y: 0.01, z: 0.5 };
    zoom = 1.5;
  }

  useThree((state) => {
    state.camera?.lookAt(new THREE.Vector3(target.x, target.y, target.z));
    state.camera?.position.set(viewer.x, viewer.y, viewer.z);
    state.camera.zoom = zoom;
    state.camera.up = new THREE.Vector3(0, 1, 0);
    state.camera.updateProjectionMatrix();
  });

  return (
    <>
      <directionalLight
        castShadow
        position={[2.5, 8, 5]}
        shadow-mapSize={[1024, 1024]}
      ></directionalLight>

      <group position={[0, -0.05, 0]}>
        <Model emote="pout:05" ref={avatarRef} />
      </group>
    </>
  );
});

export default Stage;
