import type { ActionName, AvatarImperativeHandle } from "./avatars/FoxyFuka";
// import FoxyFuka from "./avatars/FoxyFuka";
import Model from "./avatars/foxy/model";
import { useThree } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useRef } from "react";
import * as THREE from "three";

type StageProps = {
  emote: ActionName | string;
  closeUp?: boolean;
};

const Stage = forwardRef(function (props: StageProps, ref) {
  useImperativeHandle(
    ref,
    () => {
      return {
        emote(emote: ActionName) {
          avatarRef.current?.emote(emote);
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

  if (props.closeUp) {
    // Closeup
    target = { x: 0.5, y: 0.5, z: 0.2 };
    viewer = { x: 0.0, y: 0.1, z: 0.4 };
    zoom = 9;
  } else {
    // Full Body
    target = { x: 0, y: 4, z: 0 };
    viewer = { x: 0, y: 0.01, z: 0.5 };
    zoom = 10;
  }

  useThree((state) => {
    state.camera?.position.set(viewer.x, viewer.y, viewer.z);
    state.camera?.lookAt(new THREE.Vector3(target.x, target.y, target.z));
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

      <group position={[0, -0.03, 0]}>
        <Model emote={props.emote} ref={avatarRef} />
      </group>
    </>
  );
});

export default Stage;
