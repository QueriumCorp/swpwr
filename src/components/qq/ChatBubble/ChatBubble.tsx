// React Imports
import { useRef, useLayoutEffect, useState, useEffect } from 'react'

// Third Party Imports
import { renderMathInElement } from 'mathlive'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { HiMiniSpeakerWave } from 'react-icons/hi2'
import { VscDebugRestart } from 'react-icons/vsc'
import { IoCloseSharp } from 'react-icons/io5'
import { TbPlayerTrackNext } from 'react-icons/tb'

// Querium Imports
import { cn, makeVocalizable } from '@/lib/utils'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
export const ChatBubble = ({
  msgs,
  className,
  closeable,
  closeClicked,
  introFinished,
  hintPageChanged,
}: {
  msgs: string | string[] | null
  className?: string
  closeable?: boolean
  closeClicked?: () => void
  introFinished?: () => void
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
  // State
  ///////////////////////////////////////////////////////////////////
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

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
  }, [count, current])

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  // Chat Paging Button
  function handleShowMeMore() {
    if (current === count - 1) introFinished?.()
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
    if (current === count && count > 1) {
      return (
        <button className="border-none text-xs" onClick={handleStartOver}>
          <VscDebugRestart />
        </button>
      )
    } else {
      return <div></div>
    }
  }

  // Navigation Button
  function NavButton() {
    if (count === 1 && !closeable) return null

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
    return (
      <button className="border-none text-xs" onClick={handleShowMeMore}>
        <TbPlayerTrackNext />
      </button>
    )
  }

  // Speak Button
  function handleSpeak() {
    if (!messages) {
      return
    }

    const msg2Vocalize = messages[api!.selectedScrollSnap()]
    const utterance = new SpeechSynthesisUtterance(
      makeVocalizable(msg2Vocalize),
    )
    utterance.lang = 'en-US'
    utterance.voice = speechSynthesis.getVoices()[159]
    utterance.rate = 1
    utterance.pitch = 1
    utterance.volume = 1
    speechSynthesis.speak(utterance)
  }
  function SpeakButton() {
    return (
      <button className="border-none text-xs" onClick={handleSpeak}>
        <HiMiniSpeakerWave className="text-cyan-900" />
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
        'relative ml-2 flex max-w-[90%] flex-row overflow-hidden',
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
                  className="mr-[15px] flex select-none flex-col gap-1"
                >
                  <Markdown remarkPlugins={[remarkGfm]}>{m}</Markdown>
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
