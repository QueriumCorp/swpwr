/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 animated-0608-withIdles-1.glb --types -s 
*/

import * as THREE from "three";
import React, { forwardRef, useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Mesh002: THREE.SkinnedMesh;
    Mesh002_1: THREE.SkinnedMesh;
    Mesh018: THREE.SkinnedMesh;
    Mesh018_1: THREE.SkinnedMesh;
    jiemao_L: THREE.SkinnedMesh;
    jiemao_R: THREE.SkinnedMesh;
    kouzi: THREE.SkinnedMesh;
    meimao_L: THREE.SkinnedMesh;
    meimao_R: THREE.SkinnedMesh;
    nurbsToPoly1: THREE.SkinnedMesh;
    nurbsToPoly10: THREE.SkinnedMesh;
    nurbsToPoly11: THREE.SkinnedMesh;
    nurbsToPoly12: THREE.SkinnedMesh;
    nurbsToPoly2: THREE.SkinnedMesh;
    nurbsToPoly3: THREE.SkinnedMesh;
    nurbsToPoly4: THREE.SkinnedMesh;
    nurbsToPoly5: THREE.SkinnedMesh;
    nurbsToPoly6: THREE.SkinnedMesh;
    nurbsToPoly7: THREE.SkinnedMesh;
    nurbsToPoly8: THREE.SkinnedMesh;
    nurbsToPoly9: THREE.SkinnedMesh;
    qunzi: THREE.SkinnedMesh;
    tongue: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
    mixamorigHips_1: THREE.Bone;
    mixamorigHips_2: THREE.Bone;
    mixamorigHips_3: THREE.Bone;
    mixamorigHips_4: THREE.Bone;
    mixamorigHips_5: THREE.Bone;
    mixamorigHips_6: THREE.Bone;
    mixamorigHips_7: THREE.Bone;
    mixamorigHips_8: THREE.Bone;
    mixamorigHips_9: THREE.Bone;
    mixamorigHips_10: THREE.Bone;
    mixamorigHips_11: THREE.Bone;
    mixamorigHips_12: THREE.Bone;
  };
  materials: {
    yifu: THREE.MeshStandardMaterial;
    yifu_bian: THREE.MeshStandardMaterial;
    face: THREE.MeshStandardMaterial;
    lambert3: THREE.MeshStandardMaterial;
    hua: THREE.MeshStandardMaterial;
    meimao1: THREE.MeshStandardMaterial;
    shetou: THREE.MeshStandardMaterial;
    blinn4: THREE.MeshStandardMaterial;
    ya: THREE.MeshStandardMaterial;
    eye_cornea1: THREE.MeshStandardMaterial;
    eye_pupil1: THREE.MeshStandardMaterial;
    blinn2: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

type ActionName =
  | "celebrate:00"
  | "celebrate:01"
  | "celebrate:02"
  | "celebrate:03"
  | "celebrate:04"
  | "celebrate:05"
  | "celebrate:06"
  | "celebrate:07"
  | "celebrate:08"
  | "celebrate:09"
  | "celebrate:10"
  | "celebrate:11"
  | "celebrate:12"
  | "celebrate:13"
  | "celebrate:14"
  | "celebrate:15"
  | "celebrate:16"
  | "celebrate:17"
  | "celebrate:18"
  | "celebrate:19"
  | "celebrate:20"
  | "celebrate:21"
  | "celebrate:22"
  | "celebrate:23"
  | "celebrate:24"
  | "celebrate:25"
  | "celebrate:26"
  | "direct:00"
  | "direct:01"
  | "direct:02"
  | "direct:03"
  | "direct:04"
  | "direct:05"
  | "direct:06"
  | "gratz:00"
  | "gratz:01"
  | "gratz:02"
  | "gratz:03"
  | "gratz:04"
  | "gratz:05"
  | "gratz:06"
  | "gratz:08"
  | "gratz:08.001"
  | "hint:00"
  | "hint:01"
  | "hint:02"
  | "idle:00"
  | "idle:01"
  | "idle:02"
  | "idle:03"
  | "idle:04"
  | "idle:05"
  | "idle:06"
  | "idle:07"
  | "idle:08"
  | "idle:09"
  | "idle:10"
  | "idle:11"
  | "pout:00"
  | "pout:01"
  | "pout:02"
  | "pout:03"
  | "pout:04"
  | "pout:05"
  | "pout:06"
  | "pout:07"
  | "pout:08"
  | "wave:00"
  | "wave:01"
  | "wave:02"
  | "idle:00"
  | "idle:01"
  | "idle:02"
  | "idle:03"
  | "idle:04"
  | "idle:05"
  | "idle:06"
  | "idle:07"
  | "idle:08"
  | "idle:09"
  | "idle:10"
  | "idle:11";
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}
type ContextType = Record<
  string,
  React.ForwardRefExoticComponent<
    JSX.IntrinsicElements["skinnedMesh"] | JSX.IntrinsicElements["bone"]
  >
>;

export type ModelProps = {
  emote: ActionName | string;
};

const Model = forwardRef(function Model({ emote = "idle:00" }: ModelProps) {
  const group = useRef<THREE.Group>(null);
  const previousAction = usePrevious(emote);
  const { nodes, materials, animations } = useGLTF(
    "/swpwr/models/foxy.glb",
  ) as GLTFResult;
  const { actions, mixer } = useAnimations(animations, group);

  console.log(emote);

  // Side Effects
  // https://www.reddit.com/r/threejs/comments/zdy9kt/how_can_i_listen_for_animation_end_in_three/
  useEffect(() => {
    console.log("finisher");
    const fn = (e: THREE.Event) => console.log(e, "finished");
    mixer.addEventListener("finished", fn);
    return () => {
      mixer.removeEventListener("finished", fn);
    };
  }, [mixer]);

  useEffect(() => {
    console.log("useEffect:", emote);

    if (!emote) return;

    // end last emote
    if (previousAction) {
      const action = actions[previousAction as keyof typeof actions];
      if (action) {
        action.fadeOut(0.2);
      }
      const currentAction = actions[emote as keyof typeof actions];
      if (currentAction) {
        currentAction.stop();
      }
    }

    // start new emote
    const newAction = actions[emote as keyof typeof actions];
    if (newAction) {
      newAction.play();
      newAction.fadeIn(0.2);
    }
  }, [actions, emote, previousAction]);

  // JSX
  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <group name="fox_all" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group name="huli_con">
            <group name="Group">
              <group name="Geometry">
                <group name="huli_G">
                  <group name="body">
                    <group name="shangshen" />
                  </group>
                  <group name="head">
                    <group name="eye">
                      <group name="eye_L" />
                      <group name="eye_R" />
                    </group>
                    <group name="jiemao" />
                    <group name="kouqiang">
                      <group name="down_teeth">
                        <group name="tooth_down" />
                      </group>
                      <group name="up_teeth">
                        <group name="tooth_up" />
                      </group>
                    </group>
                    <group name="meimao" />
                  </group>
                </group>
              </group>
            </group>
          </group>
          <group name="notRender">
            <group name="hairSystem1Follicles">
              <group
                name="pPlane1Follicle4150"
                position={[-0.023, 0.395, -2.521]}
                rotation={[2.674, -0.07, -3.099]}
              >
                <group name="curve1">
                  <group
                    name="group1"
                    position={[0.058, -1.493, -2.069]}
                    rotation={[2.671, 0.043, -3.072]}
                  >
                    <group name="kouzi_con" />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <group name="duanxiu">
            <skinnedMesh
              name="Mesh002"
              geometry={nodes.Mesh002.geometry}
              material={materials.yifu}
              skeleton={nodes.Mesh002.skeleton}
            />
            <skinnedMesh
              name="Mesh002_1"
              geometry={nodes.Mesh002_1.geometry}
              material={materials.yifu_bian}
              skeleton={nodes.Mesh002_1.skeleton}
            />
          </group>
          <group name="head1">
            <skinnedMesh
              name="Mesh018"
              geometry={nodes.Mesh018.geometry}
              material={materials.face}
              skeleton={nodes.Mesh018.skeleton}
            />
            <skinnedMesh
              name="Mesh018_1"
              geometry={nodes.Mesh018_1.geometry}
              material={materials.yifu_bian}
              skeleton={nodes.Mesh018_1.skeleton}
            />
          </group>
          <skinnedMesh
            name="jiemao_L"
            geometry={nodes.jiemao_L.geometry}
            material={materials.lambert3}
            skeleton={nodes.jiemao_L.skeleton}
          />
          <skinnedMesh
            name="jiemao_R"
            geometry={nodes.jiemao_R.geometry}
            material={materials.lambert3}
            skeleton={nodes.jiemao_R.skeleton}
          />
          <skinnedMesh
            name="kouzi"
            geometry={nodes.kouzi.geometry}
            material={materials.hua}
            skeleton={nodes.kouzi.skeleton}
          />
          <skinnedMesh
            name="meimao_L"
            geometry={nodes.meimao_L.geometry}
            material={materials.meimao1}
            skeleton={nodes.meimao_L.skeleton}
          />
          <skinnedMesh
            name="meimao_R"
            geometry={nodes.meimao_R.geometry}
            material={materials.meimao1}
            skeleton={nodes.meimao_R.skeleton}
          />
          <skinnedMesh
            name="nurbsToPoly1"
            geometry={nodes.nurbsToPoly1.geometry}
            material={materials.shetou}
            skeleton={nodes.nurbsToPoly1.skeleton}
          />
          <skinnedMesh
            name="nurbsToPoly10"
            geometry={nodes.nurbsToPoly10.geometry}
            material={materials.blinn4}
            skeleton={nodes.nurbsToPoly10.skeleton}
          />
          <skinnedMesh
            name="nurbsToPoly11"
            geometry={nodes.nurbsToPoly11.geometry}
            material={materials.ya}
            skeleton={nodes.nurbsToPoly11.skeleton}
          />
          <skinnedMesh
            name="nurbsToPoly12"
            geometry={nodes.nurbsToPoly12.geometry}
            material={materials.ya}
            skeleton={nodes.nurbsToPoly12.skeleton}
          />
          <skinnedMesh
            name="nurbsToPoly2"
            geometry={nodes.nurbsToPoly2.geometry}
            material={materials.shetou}
            skeleton={nodes.nurbsToPoly2.skeleton}
          />
          <skinnedMesh
            name="nurbsToPoly3"
            geometry={nodes.nurbsToPoly3.geometry}
            material={materials.eye_cornea1}
            skeleton={nodes.nurbsToPoly3.skeleton}
          />
          <skinnedMesh
            name="nurbsToPoly4"
            geometry={nodes.nurbsToPoly4.geometry}
            material={materials.eye_pupil1}
            skeleton={nodes.nurbsToPoly4.skeleton}
          />
          <skinnedMesh
            name="nurbsToPoly5"
            geometry={nodes.nurbsToPoly5.geometry}
            material={materials.blinn2}
            skeleton={nodes.nurbsToPoly5.skeleton}
          />
          <skinnedMesh
            name="nurbsToPoly6"
            geometry={nodes.nurbsToPoly6.geometry}
            material={materials.blinn4}
            skeleton={nodes.nurbsToPoly6.skeleton}
          />
          <skinnedMesh
            name="nurbsToPoly7"
            geometry={nodes.nurbsToPoly7.geometry}
            material={materials.eye_cornea1}
            skeleton={nodes.nurbsToPoly7.skeleton}
          />
          <skinnedMesh
            name="nurbsToPoly8"
            geometry={nodes.nurbsToPoly8.geometry}
            material={materials.eye_pupil1}
            skeleton={nodes.nurbsToPoly8.skeleton}
          />
          <skinnedMesh
            name="nurbsToPoly9"
            geometry={nodes.nurbsToPoly9.geometry}
            material={materials.blinn2}
            skeleton={nodes.nurbsToPoly9.skeleton}
          />
          <skinnedMesh
            name="qunzi"
            geometry={nodes.qunzi.geometry}
            material={materials.yifu}
            skeleton={nodes.qunzi.skeleton}
          />
          <skinnedMesh
            name="tongue"
            geometry={nodes.tongue.geometry}
            material={materials.shetou}
            skeleton={nodes.tongue.skeleton}
          />
        </group>
        <group name="Armature001" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips_1} />
        </group>
        <group name="Armature002" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips_2} />
        </group>
        <group name="Armature003" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips_3} />
        </group>
        <group name="Armature004" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips_4} />
        </group>
        <group name="Armature005" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips_5} />
        </group>
        <group name="Armature006" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips_6} />
        </group>
        <group name="Armature007" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips_7} />
        </group>
        <group name="Armature008" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips_8} />
        </group>
        <group name="Armature009" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips_9} />
        </group>
        <group
          name="Armature010"
          position={[0.148, 0.002, 0.007]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        >
          <primitive object={nodes.mixamorigHips_10} />
        </group>
        <group
          name="Armature011"
          position={[0.171, 0.002, 0.008]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        >
          <primitive object={nodes.mixamorigHips_11} />
        </group>
        <group
          name="Armature012"
          position={[0.189, 0.002, 0.009]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        >
          <primitive object={nodes.mixamorigHips_12} />
        </group>
      </group>
    </group>
  );
});

export default Model;

useGLTF.preload("/models/foxy.glb");

function usePrevious(value: string) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef("");
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
