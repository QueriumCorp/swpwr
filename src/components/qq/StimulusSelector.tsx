// React Imports
import { forwardRef, useEffect, useRef, useState } from 'react'

// Third Party Imports
import { HiMiniSpeakerWave } from 'react-icons/hi2'

// Querium Imports
import { cn } from '@/lib/utils'
import { FactChicklet } from './FactChicklet'
import vocalize from '@/lib/speech'

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
    const theRef = useRef(null)

    //
    // State
    //
    const [preText, setPreText] = useState(stimulusText)
    const [theText, setTheText] = useState('')
    const [postText, setPostText] = useState('')

    //
    // Handlers
    //
    function attachSelectionListener(element: HTMLElement): void {
      if (!element.contentEditable || !interactive) {
        return
      }
      element.onselectstart = () => handleSelectionChange(element)
    }

    function handleSelectionChange(element: HTMLElement): void {
      element.onmouseup = () => retrieveSelection()
      element.onkeyup = () => retrieveSelection()
    }

    function retrieveSelection(): void {
      const sel = document.getSelection()

      // Ignore empty selection
      if (!sel || !sel.toString() || sel.isCollapsed) {
        setPreText(stimulusText)
        setTheText('')
        setPostText('')
        if (onChangeFact) onChangeFact('')
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
        console.log('curPos', curPos)
        if (stimulusText.charAt(curPos) == ' ') {
          break
        }
        curPos--
      }
      startSel = curPos + 1
      // end of selection
      curPos = endSel
      while (curPos < stimulusText.length) {
        console.log('curPos', curPos)
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
    useEffect(() => {
      if (theRef && theRef.current) attachSelectionListener(theRef.current)
    }, [theRef])

    //
    // Handlers
    //
    function handleSpeak(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      vocalize(stimulusText, evt.altKey ? true : false)
    }
    function SpeakButton() {
      return (
        <button className="border-none text-xs" onClick={e => handleSpeak(e)}>
          <HiMiniSpeakerWave className="text-cyan-900" />
        </button>
      )
    }

    //
    // JSX
    //

    return (
      <>
        <div ref={theRef} className={cn('STIMULUS', 'pr-4', className)}>
          {preText}
          {theText.length ? <FactChicklet fact={theText}></FactChicklet> : null}
          {postText}
          <div className="absolute right-3 top-1 mt-2 flex items-center justify-between text-right italic text-black">
            <SpeakButton></SpeakButton>
          </div>
        </div>
      </>
    )
  },
)

StimulusSelector.displayName = 'StimulusSelector'

export { StimulusSelector }
