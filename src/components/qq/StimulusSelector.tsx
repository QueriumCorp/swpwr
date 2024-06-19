import * as React from "react";

import { cn } from "@/lib/utils";
import { FactChicklet } from "./FactChicklet";

export interface StimulusSelectorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  stimulusText?: string;
  interactive?: boolean;
  onChangeFact?(fact: string): void;
}

const StimulusSelector = React.forwardRef<
  HTMLDivElement,
  StimulusSelectorProps
>(({ className, stimulusText = "", interactive, onChangeFact }, _ref) => {
  const theRef = React.useRef(null);
  const [preText, setPreText] = React.useState(stimulusText);
  const [theText, setTheText] = React.useState("");
  const [postText, setPostText] = React.useState("");

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

  React.useEffect(() => {
    if (theRef && theRef.current) attachSelectionListener(theRef.current);
  }, [theRef]);

  // JSX
  return (
    <div ref={theRef} className={cn(className, "")}>
      {preText}
      {theText.length ? <FactChicklet fact={theText}></FactChicklet> : null}
      {postText}
    </div>
  );
});

StimulusSelector.displayName = "StimulusSelector";

export { StimulusSelector };
