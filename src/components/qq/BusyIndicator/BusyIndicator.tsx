import { ReactNode, useState } from 'react'
import { cn } from '../../../lib/utils'
import styles from './BusyIndicator.module.css'

const BusyIndicator = ({
  busy = false,
  children,
  className,
  size = 50, // Default size
  strokeWidth = 5,
}: {
  busy?: boolean
  children?: ReactNode
  className?: string
  size?: number
  strokeWidth?: number
}) => {
  if (busy) {
    return (
      <div className={className}>
        <div className={styles.loader} style={{ width: size, height: size }}>
          <svg className={styles.circular} viewBox="0 0 100 100">
            <circle
              className={styles.path}
              cx="50"
              cy="50"
              r="20"
              fill="none"
              strokeWidth={strokeWidth}
              strokeMiterlimit="10"
            ></circle>
          </svg>
          {children}
        </div>
      </div>
    )
  }

  return null
}

BusyIndicator.displayName = 'BusyIndicator'
export default BusyIndicator
