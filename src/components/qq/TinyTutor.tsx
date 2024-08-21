import { useEffect, useState } from 'react'
import { AnimeTutor } from '../AnimeTutor'
import { ChatBubble } from '../qq/ChatBubble/ChatBubble'
import { cn } from '@/lib/utils'

type HintStage = 'intro' | 'psHints' | 'aiHints' | 'none'

export const TinyTutor = ({
  msg,
  busy,
  intro,
  psHints,
  wpHints,
  aiHints,
  getAiHints,
  hintChanged,
  className,
}: {
  msg?: string
  busy?: boolean
  intro?: string | string[]
  psHints?: string[]
  wpHints?: string[]
  aiHints?: string[]
  getAiHints?: () => void
  hintChanged?: (newStage: HintStage, current: number, count: number) => void
  className?: string
}) => {
  ///////////////////////////////////////////////////////////////////
  // Prepare messages
  ///////////////////////////////////////////////////////////////////
  let introMsgs = normalizeIntro(intro)
  let psHintsMsgs = normalizePsHints(wpHints || psHints)
  let aiHintsMsgs = normalizePsHints(aiHints)
  let hintStages: HintStage[] = ['none']
  if (introMsgs.length) hintStages.push('intro')
  if (psHintsMsgs.length) hintStages.push('psHints')
  if (getAiHints) hintStages.push('aiHints')

  ///////////////////////////////////////////////////////////////////
  // Store
  ///////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  const [hintStage, setHintStage] = useState<HintStage>(
    msg
      ? 'none'
      : intro
        ? 'intro'
        : psHints || wpHints
          ? 'psHints'
          : getAiHints
            ? 'aiHints'
            : 'none',
  )
  const [bubbleShown, setBubbleShow] = useState(introMsgs.length ? true : false)
  const [currentHintMsgs, setCurrentHintMsgs] = useState<string[]>(
    msg
      ? []
      : intro
        ? introMsgs
        : psHints || wpHints
          ? psHintsMsgs
          : getAiHints
            ? aiHintsMsgs
            : [],
  )

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (aiHints && aiHints?.length > 0) {
      setHintStage('aiHints')
      setCurrentHintMsgs(aiHintsMsgs)
      setBubbleShow(true)
    }
  }, [aiHints])

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  function closeChatBubble() {
    setBubbleShow(false)
  }

  function nextHintStage() {
    if (busy) {
      return
    }
    let stageIndex = hintStages.findIndex(stage => stage === hintStage)
    stageIndex = stageIndex == hintStages.length - 1 ? 0 : stageIndex + 1
    const nextStage = hintStages[stageIndex]
    if (nextStage === 'aiHints' && getAiHints) {
      getAiHints()
    }

    let current, count
    switch (nextStage) {
      case 'intro':
        current = 1
        count = introMsgs.length
        setCurrentHintMsgs(introMsgs)
        break
      case 'psHints':
        current = 1
        count = psHintsMsgs.length
        setCurrentHintMsgs(psHintsMsgs)
        break
      case 'aiHints':
        current = 1
        count = aiHintsMsgs.length
        setCurrentHintMsgs(aiHintsMsgs)
        break
      case 'none':
        current = 0
        count = 0
        setCurrentHintMsgs([])
        break
    }

    // If parent wants to know when the hint stage or msg changed
    if (hintChanged) {
      hintChanged(nextStage, current, count)
    }

    setHintStage(nextStage)
    setBubbleShow(nextStage === 'none' ? false : true)
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
  // JSX
  ///////////////////////////////////////////////////////////////////

  return (
    <div className={className}>
      <AnimeTutor
        emote={'wave:01'}
        style={{
          bottom: '0px',
          right: '0px',
          height: '100%',
        }}
      />
      <div
        className={cn(
          'absolute bottom-0 right-[100px] z-10 h-full w-[100px]',
          busy ? 'cursor-wait' : 'cursor-pointer',
        )}
        onClick={() => {
          nextHintStage()
        }}
      ></div>
      {msg?.length ? (
        <ChatBubble
          className="absolute bottom-[50%] right-[200px] h-fit min-h-[64px] w-fit font-irishGrover"
          msgs={[msg]}
          closeable={true}
          closeClicked={closeChatBubble}
          hintPageChanged={hintPageChanged}
        />
      ) : (
        <ChatBubble
          className="absolute bottom-[50%] right-[200px] h-fit min-h-[64px] w-fit font-irishGrover"
          msgs={bubbleShown ? currentHintMsgs : null}
          closeable={true}
          closeClicked={closeChatBubble}
          hintPageChanged={hintPageChanged}
        />
      )}
    </div>
  )
}

///////////////////////////////////////////////////////////////////
// Support Functions
///////////////////////////////////////////////////////////////////

function normalizeIntro(intro: string | string[] | undefined): string[] {
  if (typeof intro === 'string') {
    return [intro]
  } else if (Array.isArray(intro)) {
    return intro
  } else {
    return []
  }
}

function normalizePsHints(psHints: string | string[] | undefined): string[] {
  if (typeof psHints === 'string') {
    return [psHints]
  } else if (Array.isArray(psHints)) {
    return psHints
  } else {
    return []
  }
}
