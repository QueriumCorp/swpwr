import { useEffect, useState } from 'react'
import { AnimeTutor } from '../AnimeTutor'
import { ChatBubble } from '../qq/ChatBubble/ChatBubble'
import { cn } from '@/lib/utils'

type HintStage = 'pre' | 'intro' | 'psHints' | 'aiHints' | 'post'

export const TinyTutor = ({
  msg,
  busy,
  intro,
  psHints,
  wpHints,
  getAiHints,
  hintChanged,
  closeable = true,
  className,
}: {
  msg?: string
  busy?: boolean
  intro?: string | string[]
  psHints?: string[]
  wpHints?: string[]
  getAiHints?: () => void
  hintChanged?: (newStage: HintStage, current: number, count: number) => void
  closeable?: boolean
  className?: string
}) => {
  ///////////////////////////////////////////////////////////////////
  // Store
  ///////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  const [introMsgs, setIntroMsgs] = useState(normalizeIntro(intro))
  const [psHintsMsgs, setPsHintsMsgs] = useState(
    normalizePsHints(normalizePsHints(wpHints || psHints)),
  )
  const [hintStages, setHintStages] = useState<HintStage[]>([])
  const [hintStage, setHintStage] = useState<HintStage>('pre')

  const [bubbleShown, setBubbleShow] = useState(introMsgs.length ? true : false)
  const [currentHintMsgs, setCurrentHintMsgs] = useState<string[]>(
    msg ? [] : intro ? introMsgs : psHints || wpHints ? psHintsMsgs : [],
  )

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  useEffect(() => {
    let hintStages: HintStage[] = []
    hintStages.push('pre')
    if (introMsgs.length) {
      hintStages.push('intro')
      setHintStage('intro')
    }
    if (psHintsMsgs.length) hintStages.push('psHints')
    if (getAiHints) hintStages.push('aiHints')
    hintStages.push('post')
    setHintStages(hintStages)
  }, [introMsgs, psHintsMsgs, getAiHints])

  useEffect(() => {
    console.log('hintStage:', hintStage)
  }, [hintStage])

  useEffect(() => {
    setBubbleShow(true)
  }, [msg])

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  function closeChatBubble() {
    setBubbleShow(false)
  }

  function KettuClicked() {
    // If we are querying the AI, don't do anything
    if (busy) {
      return
    }

    if (hintStage === 'post') {
      setCurrentHintMsgs([
        'Sorry, I have no more guidance for you. Please ask your teacher for help.',
      ])

      setBubbleShow(true)
      return
    }

    // Once in aiHints, we don't change the stage
    if (hintStage === 'aiHints') {
      setBubbleShow(true)
      if (typeof getAiHints === 'function') {
        getAiHints()
      }
      return
    }

    // Manage Stage
    let currentStageIndex = hintStages.findIndex(stage => stage === hintStage)
    let nextStage = hintStages[currentStageIndex + 1]

    console.log('hintStage:', hintStage, ' nextStage:', nextStage)
    setHintStage(nextStage)

    let current = 0,
      count = 0
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
        current = -1
        count = -1
        setBubbleShow(true)
        if (typeof getAiHints === 'function') {
          getAiHints()
        }
        break
      case 'post':
        current = 0
        count = 0
        setCurrentHintMsgs([])
        break
    }

    // If parent wants to know when the hint stage or msg changed
    if (hintChanged) {
      hintChanged(nextStage, current, count)
    }

    setBubbleShow(nextStage === 'post' ? false : true)
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

  function ShowChatBubble() {
    console.log(msg)
    if (msg?.length) {
      return (
        // If we have a message, show it
        <ChatBubble
          className="absolute bottom-[50%] right-[200px] h-fit min-h-[64px] w-fit font-capriola text-sm"
          msgs={bubbleShown ? [msg] : null}
          closeable={closeable && !busy}
          closeClicked={closeChatBubble}
          hintPageChanged={hintPageChanged}
        />
      )
    } else if (currentHintMsgs?.length) {
      return (
        // Otherwise show the hints
        <ChatBubble
          className="absolute bottom-[50%] right-[200px] h-fit min-h-[64px] w-fit font-capriola text-sm"
          msgs={bubbleShown ? currentHintMsgs : null}
          closeable={closeable && !busy}
          closeClicked={closeChatBubble}
          hintPageChanged={hintPageChanged}
        />
      )
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
          KettuClicked()
        }}
      ></div>
      <ShowChatBubble />
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
