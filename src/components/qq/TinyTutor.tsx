// React Imports
import { useEffect, useState } from 'react'

// Querium Imports
import { AnimeTutor } from '../AnimeTutor'
import { ChatBubble } from '../qq/ChatBubble/ChatBubble'
import { cn } from '@/lib/utils'
import { useProblemStore } from '@/store/_store'

export type HintStage = 'pre' | 'intro' | 'psHints' | 'aiHints' | 'post'

export const TinyTutor = ({
  msg,
  busy,
  hintList,
  getAiHints,
  hintChanged,
  closeable = true,
  className,
}: {
  msg?: string
  busy?: boolean
  hintList?: any
  getAiHints?: () => void
  hintChanged?: (newStage: HintStage, current: number, count: number) => void
  closeable?: boolean
  className?: string
}) => {
  ///////////////////////////////////////////////////////////////////
  // Store
  ///////////////////////////////////////////////////////////////////

  const { session } = useProblemStore()

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  const [msgs, setMsgs] = useState<string[]>([])
  const [hintStage, setHintStage] = useState<HintStage>(hintList.stages[0])
  const [bubbleShown, setBubbleShow] = useState(true)

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!msg) {
      return
    }
    if (msg === '[HIDE]') {
      setBubbleShow(false)
    } else {
      setMsgs([msg])
      setBubbleShow(true)
    }
  }, [msg])

  useEffect(() => {
    setMsgs(hintList[hintStage])
    setBubbleShow(true)
  }, [hintStage])

  // useEffect(() => {
  // }, [msg])

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  function closeChatBubble() {
    setBubbleShow(false)
  }

  function KettuClicked() {
    const currentStageIndex = hintList.stages.findIndex(
      (stage: string) => stage === hintStage,
    )

    let newStage: HintStage = hintStage
    if (currentStageIndex < hintList.stages.length - 1) {
      newStage = hintList.stages[currentStageIndex + 1]
      setHintStage(newStage)
    }
    if (newStage === 'aiHints' && getAiHints) {
      getAiHints()
    }
  }

  function hintPageChanged(current: number, count: number) {
    if (count < 1) {
      return
    }
    if (hintChanged) {
      hintChanged(hintStage, current, count)
    }
  }

  ///////////////////////////////////////////////////////////////////
  // JSX Components
  ///////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  // JSX
  ///////////////////////////////////////////////////////////////////

  return (
    <div className={cn('TINYTUTOR', className)}>
      <AnimeTutor
        emote={'wave:01'}
        className={cn(
          'ANIMETUTOR',
          'absolute bottom-0 right-[100px] h-[100px] w-[100px]',
          session.aiBusy ? 'brightness-50' : '',
        )}
      />
      <div
        className={cn(
          'KETTUCLICKY',
          'absolute bottom-0 right-[100px] z-10 h-[100px] w-[100px]',
          busy ? 'cursor-wait' : 'cursor-pointer',
        )}
        onClick={() => {
          KettuClicked()
        }}
      ></div>
      {bubbleShown ? (
        <ChatBubble
          className="CHATBUBBLE absolute bottom-[50%] right-[200px] h-fit min-h-[64px] w-fit !font-capriola text-sm"
          msgs={msgs}
          closeable={closeable && !busy}
          closeClicked={closeChatBubble}
          hintPageChanged={hintPageChanged}
        />
      ) : null}
    </div>
  )
}
