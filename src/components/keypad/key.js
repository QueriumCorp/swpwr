import React from "react";

import "./keypad.css";

export default function KeyAlgorithm() {
  function handleSoftKey(key) {
    console.info("key", key);
  }
  return (
    <button
      onClick={(evt) => {
        handleSoftKey("42");
      }}
    >
      42
    </button>
  );
}
