import * as React from "react";

import { cn } from "@/lib/utils";
import { FactChicklet } from "./FactChicklet";

export interface StimulusSelectorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  stimulusText: string;
}

const StimulusSelector = React.forwardRef<
  HTMLDivElement,
  StimulusSelectorProps
>(({ className, stimulusText, ...props }, ref) => {
  const theRef = React.useRef(null);
  const [anchorOffset, setAnchorOffset] = React.useState(0);
  const [focusOffset, setFocusOffset] = React.useState(0);
  const [preText, setPreText] = React.useState(stimulusText);
  const [theText, setTheText] = React.useState("");
  const [postText, setPostText] = React.useState("");

  function attachSelectionListener(element: HTMLElement): void {
    if (!element.contentEditable) {
      return;
    }
    element.onselectstart = () => handleSelectionChange(element);
  }

  function handleSelectionChange(element: HTMLElement): void {
    element.onmouseup = () => retrieveSelection(element);
    element.onkeyup = () => retrieveSelection(element);
  }

  function retrieveSelection(element: HTMLElement): void {
    const sel = document.getSelection();

    // Ignore empty selection
    if (!sel || !sel.toString() || sel.isCollapsed) {
      setPreText(stimulusText);
      setTheText("");
      setPostText("");
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
  }

  React.useEffect(() => {
    if (theRef && theRef.current) attachSelectionListener(theRef.current);
  }, [theRef]);

  // JSX
  return (
    <div ref={theRef} className={cn(className, "")}>
      {preText}
      {theText.length ? <FactChicklet>{theText}</FactChicklet> : null}
      {postText}
    </div>
  );
});

StimulusSelector.displayName = "StimulusSelector";

export { StimulusSelector };
