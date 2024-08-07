// React Imports
import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

// Third Party Imports
import { HiMiniSpeakerWave } from "react-icons/hi2";

// Querium Imports
import { cn, makeVocalizable } from "@/lib/utils";
import { FactChicklet } from "./FactChicklet";
import { renderMathInElement } from "mathlive";

// Type Definitions
export interface StimulusSelectorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  stimulusText?: string;
  interactive?: boolean;
  onChangeFact?(fact: string): void;
}

// Component
const StimulusSelector = forwardRef<HTMLDivElement, StimulusSelectorProps>(
  ({ className, stimulusText = "", interactive, onChangeFact }, _ref) => {
    //
    // Refs
    //
    const theRef = useRef(null);

    //
    // State
    //
    const [preText, setPreText] = useState(stimulusText);
    const [theText, setTheText] = useState("");
    const [postText, setPostText] = useState("");

    //
    // Handlers
    //
    function attachSelectionListener(element: HTMLElement): void {
      if (!element.contentEditable || !interactive) {
        return;
      }
      element.onselectstart = () => handleSelectionChange(element);
    }

    function handleSelectionChange(element: HTMLElement): void {
      element.onmouseup = () => retrieveSelection();
      element.onkeyup = () => retrieveSelection();
    }

    function retrieveSelection(): void {
      const sel = document.getSelection();

      // Ignore empty selection
      if (!sel || !sel.toString() || sel.isCollapsed) {
        setPreText(stimulusText);
        setTheText("");
        setPostText("");
        if (onChangeFact) onChangeFact("");
        return;
      }

      // Find & Fix indexes
      // The getSelection() Offsets include the underlying HTML, not just the
      // text. So we use indexOf the select string (which is correct) to get
      // the correct offsets

      let startSel, endSel, actualOffset;
      if (sel.anchorOffset < sel.focusOffset) {
        startSel = sel.anchorOffset;
        endSel = sel.focusOffset;
      } else {
        startSel = sel.focusOffset;
        endSel = sel.anchorOffset;
      }

      actualOffset = stimulusText.indexOf(sel.toString(), startSel);
      if (startSel !== actualOffset) {
        const htmlOffset = actualOffset - startSel;
        startSel = actualOffset;
        endSel = endSel + htmlOffset;
      }

      setPreText(stimulusText.substring(0, startSel));
      setTheText(stimulusText.substring(startSel, endSel));
      setPostText(stimulusText.substring(endSel));

      if (onChangeFact) onChangeFact(sel.toString());
    }

    //
    // Side Effects
    //
    useEffect(() => {
      if (theRef && theRef.current) attachSelectionListener(theRef.current);
    }, [theRef]);

    // on initial render, tell MathLive to render the latex
    useLayoutEffect(() => {
      if (theRef.current) {
        renderMathInElement(theRef.current, {
          TeX: {
            delimiters: {
              // Allow math formulas surrounded by $$...$$ for display or \(...\) for inline
              inline: [["\\(", "\\)"]],
              display: [["\\[", "\\]"]],
            },
          },
        });
      }
    }, []);

    // Speak Button
    function handleSpeak() {
      if (!stimulusText) {
        return;
      }

      const msg2Vocalize = stimulusText;
      const utterance = new SpeechSynthesisUtterance(
        makeVocalizable(msg2Vocalize),
      );
      utterance.lang = "en-US";
      utterance.voice = speechSynthesis.getVoices()[159];
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      speechSynthesis.speak(utterance);
    }
    function SpeakButton() {
      return (
        <button className="border-none text-xs" onClick={handleSpeak}>
          <HiMiniSpeakerWave className="text-cyan-900" />
        </button>
      );
    }

    //
    // JSX
    //

    function LatexText({ fragment }: { fragment: string }) {
      let start = fragment.indexOf("\\(");
      let end = fragment.indexOf("\\)", start);
      console.info(fragment, start, end);

      if (start === -1) return <span>{fragment}</span>;
      return (
        <span>
          <span>{fragment.substring(0, start)}</span>
          <math-field read-only className="text-red-500 inline">
            {fragment.substring(start + 2, end)}
          </math-field>
          <span>{fragment.substring(end + 2)}</span>
        </span>
      );
    }

    return (
      <>
        <div ref={theRef} className={cn("STIMULUS", className, "")}>
          <LatexText fragment={preText}></LatexText>
          {theText.length ? <FactChicklet fact={theText}></FactChicklet> : null}
          {postText}
          <div className="text-right text-black italic mt-2 flex justify-between items-center">
            <SpeakButton></SpeakButton>
          </div>
        </div>
      </>
    );
  },
);

StimulusSelector.displayName = "StimulusSelector";

export { StimulusSelector };
