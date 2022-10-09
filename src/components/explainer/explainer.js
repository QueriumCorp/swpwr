import React from "react";

import { TextArea } from "react-md";
import { useDrop } from "react-dnd";

import Tags from "../diagrammer/tags";

import "./explainer.css";
import handleSoftKey from "../../utils/manipulateField";

export default function Explainer(props) {
  const solution = props.solution;
  const onChange = props.onChange;

  const [{ isOverExplanation }, explanation] = useDrop(() => ({
    accept: ["NUM", "STR"],
    drop: (item) => handleDrop(item.tagValue),
    collect: (monitor) => ({
      isOverExplanation: !!monitor.isOver(),
    }),
  }));

  function handleDrop(str) {
    let focused = document.getElementById("explanation");
    const result = handleSoftKey(focused, str);

    if (result) {
      onChange({ type: "explanation", payload: result.newStr });

      setTimeout(() => {
        focused.setSelectionRange(result.newStart, result.newEnd);
        focused.focus();
      }, 0);
    }
  }

  function handleExplanation(event) {
    onChange({ type: "explanation", payload: event.target.value });
  }

  // JSX
  return (
    <div className="ExplainerFields">
      <div className="ExplanationIdentify">
        {solution.identify.number} {solution.identify.label}
      </div>
      <TextArea
        id="explanation"
        ref={explanation}
        value={solution.explanation}
        onChange={handleExplanation}
        placeholder="Explain your answer"
        rows="4"
        maxRows="10"
        animate="true"
        className="Explanation"
        style={{ background: isOverExplanation ? "red" : "" }}
        autoFocus
      />
      <Tags tags={props.solution.tags}></Tags>
    </div>
  );
}
