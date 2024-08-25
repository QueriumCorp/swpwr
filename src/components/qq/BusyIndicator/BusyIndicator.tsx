import { ReactNode, useState } from 'react'
import { cn } from '../../../lib/utils'
import styles from './BusyIndicator.module.css'

const BusyIndicator = ({
  busy = false,
  children,
  className,
}: {
  busy?: boolean
  children?: ReactNode
  className?: string
}) => {
  if (busy) {
    return (
      <div className={className}>
        <div className={styles.loader}>
          <svg className={styles.circular}>
            <circle
              className={styles.path}
              cx="50"
              cy="50"
              r="20"
              fill="none"
              strokeWidth="5"
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
