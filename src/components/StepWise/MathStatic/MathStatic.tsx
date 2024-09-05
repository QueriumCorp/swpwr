import React, { useEffect, useRef } from 'react'
import { MathViewRef } from '../types/mathlive'

export interface MathStaticProps {
  latex: string
  style?: object
}

const MathStatic = (props: MathStaticProps) => {
  const mf = useRef<MathViewRef>(null)

  useEffect(() => {
    if (mf.current) {
      mf.current.applyStyle({ backgroundColor: 'red' })
    }
  }, [])

  return (
    <math-field
      style={props.style}
      ref={mf}
      read-only
    >{`${props.latex}`}</math-field>
  )
}

export default MathStatic
