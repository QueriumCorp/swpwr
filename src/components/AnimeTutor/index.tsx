import type { CSSProperties } from 'react'
import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import Stage from './Stage'
import { Chat } from './Chat'
import {
  AvatarAPIProvider,
  AvatarAPIType,
  useAvatarAPI,
} from './contexts/AvatarAPI'
import { OrbitControls, View } from '@react-three/drei'
import type { AvatarImperativeHandle } from './avatars/FoxyFuka'
import FoxyImage from './avatars/foxyImage'

type AnimeTutorProps = {
  emote?: string
  closeUp?: boolean
  style?: CSSProperties
  className?: string
}

const AnimeTutor = ({ emote, closeUp, className, style }: AnimeTutorProps) => {
  const avatarRef = useRef<AvatarImperativeHandle>(null)

  const theStyle: CSSProperties = {
    position: 'absolute',
    height: '300px',
    width: '300px',
    ...style,
  }

  return (
    <div className={className}>
      {/* <Canvas shadows>
        <OrbitControls
          enableRotate={false}
          enablePan={false}
          enableZoom={false}
        />
        <ambientLight intensity={0.4} />
        <Stage closeUp={closeUp} emote={emote || 'idle:01'} />
      </Canvas> */}
      <FoxyImage />
    </div>
  )
}

export { AvatarAPIProvider, useAvatarAPI, type AvatarAPIType, AnimeTutor, Chat }
