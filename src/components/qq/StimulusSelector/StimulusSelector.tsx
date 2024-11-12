// React Imports
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'

// Querium Imports
import { cn } from '@/lib/utils'
import { FactChicklet } from '../FactChicklet'
import SpeakButton from './components/SpeakButton'
import { splitIntoSentences } from './functions/Sentences'
import { selectTextRange } from './functions/SelectTextRange'
import { Moved } from './functions/Moved'
import { useProblemStore } from '@/store/_store'
import { type Highlight } from '@/store/_types'
import { findHighlightIndeces } from './functions/FindHighlightIndeces'
import {
  findClickedCharIndex,
  highlightClickedChar,
} from './functions/FindClickedCharIndex'
import { getCaretOffset } from './functions/getCaretOffset'

// Type Definitions
export interface StimulusSelectorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  stimulusText?: string
  interactive?: boolean
  onChangeFact?(fact: string): void
}

// Component
const StimulusSelector = forwardRef<HTMLDivElement, StimulusSelectorProps>(
  ({ className, stimulusText = '', interactive, onChangeFact }, _ref) => {
    //
    // Refs
    //
    const theRef = useRef<HTMLDivElement>(null)

    //
    // Store
    //
    const { session } = useProblemStore()

    //
    // State
    //
    const [preText, setPreText] = useState(stimulusText)
    const [theText, setTheText] = useState('')
    const [postText, setPostText] = useState('')

    const sentences = useMemo(
      () => splitIntoSentences(stimulusText),
      [stimulusText],
    )

    let realStartPos = { x: 0, y: 0 }
    const [startPos, setStartPos] = useState({ x: 0, y: 0 })
    const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 })
    const [endPos, setEndPos] = useState({ x: 0, y: 0 })
    const [caretOffset, setCaretOffset] = useState<number>(0)
    const [isStationary, setIsStationary] = useState<boolean>(false)
    const [isLongPressing, setIsLongPressing] = useState<boolean>(false)
    const [ready4Preview, setReady4Preview] = useState<boolean>(false)
    const timerRef = useRef<number | null>(null)

    //
    // Handlers
    //

    /// POINTER DOWN
    function handlePointerDown(evt: React.PointerEvent<HTMLDivElement>) {
      setCaretOffset(getCaretOffset(evt))
      setIsLongPressing(false)
      setIsStationary(false)
      setReady4Preview(false)
      setStartPos({ x: evt.clientX, y: evt.clientY })
      realStartPos = { x: evt.clientX, y: evt.clientY }

      // After 750ms...
      timerRef.current = window.setTimeout(() => {
        setIsLongPressing(true)
        setReady4Preview(true)
      }, 750)
    }

    // POINTER MOVE
    function handlePointerMove(evt: React.PointerEvent<HTMLDivElement>) {
      setCurrentPos({ x: evt.clientX, y: evt.clientY })
      setIsStationary(
        Math.hypot(evt.clientX - startPos.x, evt.clientY - startPos.y) > 5
          ? false
          : true,
      )
    }

    // POINTER UP
    function handlePointerUp(evt: React.PointerEvent<HTMLDivElement>) {
      let moved = Moved(startPos, { x: evt.clientX, y: evt.clientY })
      // Check for quick tap and RESET selection
      if (!moved && !isLongPressing) {
        resetSelection()
      }

      setEndPos({ x: evt.clientX, y: evt.clientY })
      setIsStationary(!!!moved)
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current)
      }

      chickletizeSelection()
    }

    // PREVIEW SELECTION
    // uses the browser's built-in selection to preview the selection for the student
    function previewSelection() {
      // If we moved, exit
      if (Moved(startPos, currentPos)) {
        return
      }

      // See if we can find a highlight
      const highlight = findHighlightIndeces(
        caretOffset,
        session.stimulusClaims,
        session.highlights,
      )
      console.log('PREVIEW SELECTION highlight', highlight)

      // Long press so preview the selection
      const sel = document.getSelection()?.anchorOffset
      if (sel === undefined) {
        return
      }

      // Find the sentence that contains the selection
      const selectedSentence = sentences.find(
        sentence => sentence.startIndex <= sel && sentence.endIndex >= sel,
      )
      if (!selectedSentence) {
        return
      }
      // Find the index of the selected sentence in the stimulusText
      const selectedSentenceIndex = stimulusText.indexOf(
        selectedSentence.sentence,
      )

      selectTextRange(theRef.current!, highlight.start, highlight.end)
    }

    // RESET SELECTION
    function resetSelection(): void {
      setPreText(stimulusText)
      setTheText('')
      setPostText('')
      if (window.getSelection) {
        window.getSelection()!.removeAllRanges()
      }
    }

    // CHICKLETIZE SELECTION
    function chickletizeSelection(): void {
      const sel = document.getSelection()

      // Ignore empty selection
      if (!sel || !sel.toString() || sel.isCollapsed) {
        setPreText(stimulusText)
        setTheText('')
        setPostText('')
        return
      }

      // Find & Fix indexes
      // The getSelection() Offsets include the underlying HTML, not just the
      // text. So we use indexOf the select string (which is correct) to get
      // the correct offsets

      let startSel, endSel, actualOffset
      if (sel.anchorOffset < sel.focusOffset) {
        startSel = sel.anchorOffset
        endSel = sel.focusOffset
      } else {
        startSel = sel.focusOffset
        endSel = sel.anchorOffset
      }

      actualOffset = stimulusText.indexOf(sel.toString(), startSel)
      if (startSel !== actualOffset) {
        const htmlOffset = actualOffset - startSel
        startSel = actualOffset
        endSel = endSel + htmlOffset
      }

      // Get whole words
      // front of selection
      let curPos = startSel
      while (curPos >= 0) {
        if (stimulusText.charAt(curPos) == ' ') {
          break
        }
        curPos--
      }
      startSel = curPos + 1
      // end of selection
      curPos = endSel
      while (curPos < stimulusText.length) {
        if (stimulusText.charAt(curPos) == ' ') {
          break
        }
        curPos++
      }
      if (stimulusText.charAt(curPos) == ' ') {
        curPos--
      }
      endSel = ++curPos

      setPreText(stimulusText.substring(0, startSel))
      setTheText(stimulusText.substring(startSel, endSel))
      setPostText(stimulusText.substring(endSel))

      if (onChangeFact) {
        onChangeFact(stimulusText.substring(startSel, endSel))
      }
    }

    // EFFECTS
    useEffect(() => {
      if (ready4Preview) {
        previewSelection()
      }
    }, [ready4Preview])
    return (
      <>
        <div
          ref={theRef}
          className={cn(
            'STIMULUS',
            'pr-4',
            interactive ? 'touch-none !bg-white p-10 text-5xl' : 'text-xl',
            className,
          )}
          onPointerDown={interactive ? handlePointerDown : undefined}
          onPointerMove={interactive ? handlePointerMove : undefined}
          onPointerUp={interactive ? handlePointerUp : undefined}
        >
          {preText}
          {theText.length ? (
            <FactChicklet
              fact={theText}
              className="text-5xl"
              tabIndex={0}
            ></FactChicklet>
          ) : null}
          {postText}
          <div className="absolute right-3 top-1 mt-2 flex items-center justify-between text-right italic text-black">
            <SpeakButton text={stimulusText}></SpeakButton>
          </div>
        </div>
      </>
    )
  },
)

StimulusSelector.displayName = 'StimulusSelector'

export { StimulusSelector }
