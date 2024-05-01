import * as React from "react";

import { cn } from "@/lib/utils";

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
  const [innerHTML, setInnerHTML] = React.useState(stimulusText);

  function attachSelectionListener(element: HTMLElement): void {
    if (!element.contentEditable) {
      return;
    }
    element.onselectstart = () => handleSelectionChange(element);
  }

  function handleSelectionChange(element: HTMLElement): void {
    document.onmouseup = () => retrieveSelection(element);
    document.onkeyup = () => retrieveSelection(element);
  }

  function retrieveSelection(element: HTMLElement): void {
    const sel = document.getSelection();

    // Ignore empty selection
    if (!sel || !sel.toString() || sel.isCollapsed) {
      setInnerHTML(stimulusText);
      return;
    }

    const startSel =
      sel.anchorOffset < sel.focusOffset ? sel.anchorOffset : sel.focusOffset;
    const endSel =
      sel.anchorOffset < sel.focusOffset ? sel.focusOffset : sel.anchorOffset;

    const preText = stimulusText.substring(0, startSel);
    const theText = stimulusText.substring(startSel, endSel);
    const postText = stimulusText.substring(endSel);

    console.info("preText", preText);
    console.info("theText", theText);
    console.info("postText", postText);
    // setInnerHTML()
  }

  React.useEffect(() => {
    if (theRef && theRef.current) attachSelectionListener(theRef.current);
  }, [theRef]);

  // JSX
  return (
    <div
      ref={theRef}
      className={cn(className, "")}
      dangerouslySetInnerHTML={{ __html: innerHTML }}
    ></div>
  );
});

StimulusSelector.displayName = "StimulusSelector";

export { StimulusSelector };
