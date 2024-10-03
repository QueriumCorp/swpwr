// React Imports
import { useRef, useLayoutEffect, useState, useEffect } from 'react'

// Third Party Imports
import { renderMathInElement } from 'mathlive'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import { HiMiniSpeakerWave } from 'react-icons/hi2'
import { VscDebugRestart } from 'react-icons/vsc'
import { IoCloseSharp } from 'react-icons/io5'
import { TbPlayerTrackNext } from 'react-icons/tb'

// Querium Imports
import { cn } from '@/lib/utils'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import vocalize from '@/lib/speech'
import { useProblemStore } from '@/store/_store'

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
export const ChatBubble = ({
  msgs,
  className,
  closeable,
  closeClicked,

  hintPageChanged,
}: {
  msgs: string | string[] | null
  className?: string
  closeable?: boolean
  closeClicked?: () => void

  hintPageChanged?: (current: number, count: number) => void
}) => {
  ///////////////////////////////////////////////////////////////////
  // Refs
  ///////////////////////////////////////////////////////////////////
  const latexRef = useRef(null)

  ///////////////////////////////////////////////////////////////////
  // Prop Cleanup
  ///////////////////////////////////////////////////////////////////

  const messages = typeof msgs === 'string' ? [msgs] : msgs

  ///////////////////////////////////////////////////////////////////
  // Store
  ///////////////////////////////////////////////////////////////////

  const { session } = useProblemStore()

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [speaking, setSpeaking] = useState(false)

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  useEffect(() => {
    if (!messages) {
      return
    }
    setCount(messages.length)
    setCurrent(0)
    api?.scrollTo(0)
  }, [msgs])

  // on initial render, tell MathLive to render the latex
  useLayoutEffect(() => {
    if (latexRef.current) {
      renderMathInElement(latexRef.current, {
        TeX: {
          delimiters: {
            // Allow math formulas surrounded by $$...$$ for display or \(...\) for inline
            inline: [['\\(', '\\)']],
            display: [
              ['$$', '$$'],
              ['\\[', '\\]'],
            ],
          },
        },
      })
    }
  }, [])

  useEffect(() => {
    if (hintPageChanged) {
      hintPageChanged(current, count)
    }

    if (session.chatty && api && !speaking) {
      setSpeaking(true)
      vocalize(messages![api!.selectedScrollSnap()], () => setSpeaking(false))
    }
  }, [msgs, count, current, session.chatty, api])

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  // Chat Paging Button
  function handleShowMeMore() {
    api?.scrollNext()
  }
  function handleStartOver() {
    api?.scrollTo(0)
  }

  ///////////////////////////////////////////////////////////////////
  // Local Components
  ///////////////////////////////////////////////////////////////////

  // restart button
  function RestartMsgs() {
    if (messages && messages.length > 1) {
      return <div></div>
    }
    if (current === count && count) {
      return (
        <button
          style={{ all: 'unset', cursor: 'pointer' }}
          onClick={handleStartOver}
        >
          <VscDebugRestart />
        </button>
      )
    } else {
      return <div></div>
    }
  }

  // Navigation Button
  function NavButton() {
    if (typeof msgs === 'string') return <div></div>

    if (count === 1 && !closeable) return <div></div>

    if (current === count && closeable) {
      return (
        <div onClick={closeClicked} className="flex cursor-pointer justify-end">
          <IoCloseSharp />
        </div>
      )
    }
    if (current === count && !closeable) {
      return <div></div>
    }

    if (speaking) {
      return <DisabledNavButton />
    } else {
      return (
        <button
          style={{ all: 'unset', cursor: 'pointer' }}
          onClick={handleShowMeMore}
        >
          <TbPlayerTrackNext />
        </button>
      )
    }
  }

  function DisabledNavButton() {
    return (
      <button style={{ all: 'unset', cursor: 'disabled' }}>
        <TbPlayerTrackNext className="text-slate-400" />
      </button>
    )
  }

  // Speak Button
  function handleSpeak() {
    if (!messages) {
      return
    }
    vocalize(messages[api!.selectedScrollSnap()])
  }
  function SpeakButton() {
    if (session.chatty) return <div></div>

    return (
      <button style={{ all: 'unset', cursor: 'pointer' }} onClick={handleSpeak}>
        <HiMiniSpeakerWave />
      </button>
    )
  }

  ///////////////////////////////////////////////////////////////////
  // JSX
  ///////////////////////////////////////////////////////////////////

  if (!msgs || !messages) {
    // no messages so no chat bubble
    return null
  }

  return (
    <div
      ref={latexRef}
      className={cn(
        'ChatBubble',
        'relative ml-2 flex max-w-[450px] flex-row overflow-hidden',
        'rounded-bl-2xl rounded-br-none rounded-tl-2xl rounded-tr-2xl',
        'bg-amber-400 px-4 py-[.5rem] text-cyan-700',
        'before:start-[99.9%]',
        'before:[mask-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMycgaGVpZ2h0PSczJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxwYXRoIGZpbGw9J2JsYWNrJyBkPSdtIDAgMyBMIDEgMyBMIDMgMyBDIDIgMyAwIDEgMCAwJy8+PC9zdmc+)]',
        "before:absolute before:bottom-[0] before:h-[.75rem] before:w-[.75rem] before:content-['']",
        'before:[background-color:inherit] before:[mask-position:center] before:[mask-repeat:no-repeat]',
        'before:[mask-size:contain]',
        className,
      )}
    >
      <div className="max-w-[100%] p-2">
        <Carousel setApi={setApi}>
          <CarouselContent>
            {messages.map((m, i) => (
              <CarouselItem key={i}>
                <div
                  key={i}
                  className="ChatMsgContainer mr-[15px] flex select-none flex-col gap-1 !font-capriola text-base"
                >
                  <Markdown
                    remarkPlugins={[remarkGfm, remarkBreaks]}
                    className="Markdown !font-capriola !text-base"
                  >
                    {m}
                  </Markdown>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="absolute bottom-2 right-0 top-2 flex w-[30px] flex-col items-center justify-between bg-amber-400 text-right italic text-black">
        <SpeakButton></SpeakButton>
        <RestartMsgs></RestartMsgs>
        <NavButton></NavButton>
      </div>
    </div>
  )
}
