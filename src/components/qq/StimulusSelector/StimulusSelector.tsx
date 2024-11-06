// React Imports
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'

// Third Party Imports
import { HiMiniSpeakerWave } from 'react-icons/hi2'

// Querium Imports
import { cn } from '@/lib/utils'
import { FactChicklet } from '../FactChicklet'
import SpeakButton from './components/SpeakButton'
import { splitIntoSentences } from './functions/Sentences'

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
    // State
    //
    const [preText, setPreText] = useState(stimulusText)
    const [theText, setTheText] = useState('')
    const [postText, setPostText] = useState('')
    // const { onMouseDown, onMouseUp } = useLongPress(evt => handleLongPress(evt))

    const sentences = useMemo(
      () => splitIntoSentences(stimulusText),
      [stimulusText],
    )

    //
    // Handlers
    //

    function handleSelectionChange(element: HTMLElement): void {
      element.onmouseup = () => retrieveSelection()
    }

    function handleLongPress(
      evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) {
      console.log('handleLongPress', evt)
      const sel = document.getSelection()?.anchorOffset
      if (sel === undefined) {
        return
      }
      const selectedSentence = sentences.find(
        sentence => sentence.startIndex <= sel && sentence.endIndex >= sel,
      )

      setPreText(stimulusText.substring(0, selectedSentence!.startIndex))
      setTheText(
        stimulusText.substring(
          selectedSentence!.startIndex,
          selectedSentence!.endIndex,
        ),
      )
      setPostText(stimulusText.substring(selectedSentence!.endIndex))

      if (onChangeFact) onChangeFact(selectedSentence!.sentence)
    }

    function retrieveSelection(): void {
      console.log('retrieveSelection')
      const sel = document.getSelection()

      // Ignore empty selection
      if (!sel || !sel.toString() || sel.isCollapsed) {
        setPreText(stimulusText)
        setTheText('')
        setPostText('')
        if (onChangeFact) {
          onChangeFact('')
        }
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

      if (onChangeFact) onChangeFact(stimulusText.substring(startSel, endSel))
    }

    //
    // Side Effects
    //

    // Add listener to capture when text is selected
    // useEffect(() => {
    //   console.log('STIMULUS element changed!')
    //   if (theRef?.current) {
    //     theRef.current.onselectstart = () =>
    //       handleSelectionChange(theRef.current!)
    //   }
    // }, [theRef])

    //
    // Handlers
    //

    //
    // JSX
    //

    return (
      <>
        <div
          ref={theRef}
          className={cn('STIMULUS', 'pr-4', 'text-xl', className)}
          // onMouseDown={onMouseDown}
          // onTouchStart={onMouseDown}
          // onMouseUp={onMouseUp}
          onTouchEnd={interactive ? retrieveSelection : undefined}
          onMouseUp={interactive ? retrieveSelection : undefined}
        >
          {preText}
          {theText.length ? (
            <FactChicklet
              fact={theText}
              className="text-xl"
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

interface UseLongPressResult {
  onMouseDown: () => void
  onMouseUp: () => void
  isLongPressing: boolean
}

const useLongPress = (
  callback: () => void,
  threshold: number = 500,
): UseLongPressResult => {
  const [isLongPressing, setIsLongPressing] = useState<boolean>(false)
  const timerRef = useRef<number | null>(null)

  const handleMouseDown = (): void => {
    timerRef.current = window.setTimeout(() => {
      setIsLongPressing(true)
      callback()
    }, threshold)
  }

  const handleMouseUp = (): void => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
    }
    setIsLongPressing(false)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [])

  return {
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    isLongPressing,
  }
}
