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
  newStage,
  className,
}: {
  msg?: string
  busy?: boolean
  intro?: string | string[]
  psHints?: string[]
  wpHints?: string[]
  aiHints?: string[]
  getAiHints?: () => void
  newStage?: (newStage: HintStage) => void
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

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (aiHints && aiHints?.length > 0) {
      setHintStage('aiHints')
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

    if (newStage) newStage(nextStage)

    setHintStage(nextStage)
    setBubbleShow(nextStage === 'none' ? false : true)
  }

  function hintPageChanged(current: number, count: number) {
    console.info(`${current} of ${count}`)
  }

  ///////////////////////////////////////////////////////////////////
  // JSX Support Components
  ///////////////////////////////////////////////////////////////////

  function StagedChatBubble() {
    console.log('StagedChatBubble', hintStage)
    switch (hintStage) {
      case 'intro':
        return (
          <ChatBubble
            className="absolute bottom-[50%] right-[200px] h-fit min-h-[64px] w-fit font-irishGrover"
            msgs={bubbleShown ? introMsgs : null}
            closeable={true}
            closeClicked={closeChatBubble}
            hintPageChanged={hintPageChanged}
          />
        )
      case 'psHints':
        return (
          <ChatBubble
            className="absolute bottom-[50%] right-[200px] h-fit min-h-[64px] w-fit font-irishGrover"
            msgs={bubbleShown ? psHintsMsgs : null}
            closeable={true}
            closeClicked={closeChatBubble}
            hintPageChanged={hintPageChanged}
          />
        )
      case 'aiHints':
        return (
          <ChatBubble
            className="absolute bottom-[50%] right-[200px] h-fit min-h-[64px] w-fit font-irishGrover"
            msgs={bubbleShown ? aiHintsMsgs : null}
            closeable={true}
            closeClicked={closeChatBubble}
            hintPageChanged={hintPageChanged}
          />
        )
      case 'none':
        return null
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
          // border: "solid 1px red",
        }}
      />
      <div
        className={cn(
          'absolute bottom-0 right-[100px] z-10 h-full w-[100px]',
          busy ? 'cursor-wait' : 'cursor-pointer',
        )}
        onClick={() => {
          console.info('Next Hint Stage')
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
        <StagedChatBubble />
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
