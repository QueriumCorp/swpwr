import React from "react";

import "./stimulator.css";

function Stimulator(props) {
  const enabled = props.enabled || false;
  const text = props.text;

  function createTag() {
    if (window.getSelection) {
      const selectedText = window.getSelection().toString();
      if (selectedText.length) {
        props.onChange({
          type: "addTag",
          payload: selectedText,
        });
      }
    }
  }

  return (
    <div
      onMouseUp={createTag}
      className={`stimulator ${enabled ? "taggable" : ""}`}
    >
      {text}
    </div>
  );
}

export default Stimulator;
