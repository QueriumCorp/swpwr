/*global MathJax*/

import React, { useEffect } from "react";

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
          payload: selectedText
        });
      }
    }
  }

  useEffect(() => {
    // If MathJax is loaded, render
    if (window.MathJax) {
      window.MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    } else {
      // give it a second to load
      setTimeout(() => {
        window.MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
      }, "1000");
    }
  });

  return (
    <div
      onMouseUp={createTag}
      onTouchEnd={createTag}
      className={`stimulator ${enabled ? "taggable" : ""}`}
    >
      {text}
    </div>
  );
}

export default Stimulator;
