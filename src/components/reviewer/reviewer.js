import React from "react";

import { TextArea } from "react-md";
import { useDrop } from "react-dnd";

import Tags from "../diagrammer/tags";

import "./reviewer.css";
import handleSoftKey from "../../utils/manipulateField";

export default function Reviewer(props) {
  const solution = props.solution;
  const onChange = props.onChange;

  const [{ isOverReview }, review] = useDrop(() => ({
    accept: ["NUM", "STR"],
    drop: item => handleDrop(item.tagValue),
    collect: monitor => ({
      isOverReview: !!monitor.isOver()
    })
  }));

  function handleDrop(str) {
    let focused = document.getElementById("review");
    const result = handleSoftKey(focused, str);

    if (result) {
      onChange({ type: "review", payload: result.newStr });

      setTimeout(() => {
        focused.setSelectionRange(result.newStart, result.newEnd);
        focused.focus();
      }, 0);
    }
  }

  function handleReview(event) {
    onChange({ type: "review", payload: event.target.value });
  }

  // JSX
  return (
    <div className="ReviewerFields">
      <div className="ReviewerExplanation">{solution.explanation}</div>
      <TextArea
        id="review"
        ref={review}
        value={solution.review}
        onChange={handleReview}
        placeholder="Discuss how your answer makes sense"
        rows="4"
        maxRows="10"
        animate="true"
        className="Review"
        style={{ background: isOverReview ? "#007AFF" : "" }}
        autoFocus
      />
      <Tags tags={props.solution.tags}></Tags>
    </div>
  );
}
