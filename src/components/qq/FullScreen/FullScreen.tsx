import { useEffect, useState } from 'react'
import { cn } from '../../../lib/utils'
import styles from './FullScreen.module.css'
import { BsFullscreen, BsFullscreenExit } from 'react-icons/bs'

const FullScreen = ({ className }: { className?: string }) => {
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Watch for fullscreenchange
  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }

    document.addEventListener('fullscreenchange', onFullscreenChange)

    return () =>
      document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  //
  // JSX
  //
  return (
    <div
      className={cn(
        'fixed right-2 top-2 cursor-pointer text-2xl hover:text-qqBrand',
        className,
      )}
      onClick={() => {
        if (document.fullscreenElement) {
          document.exitFullscreen()
        } else {
          document.documentElement.requestFullscreen()
        }
      }}
    >
      {isFullscreen ? <BsFullscreenExit /> : <BsFullscreen />}
    </div>
  )
}

FullScreen.displayName = 'FullScreen'
export default FullScreen
