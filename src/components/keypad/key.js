import React from "react";

import "./keypad.css";

export default function Key({
  className,
  style,
  size,
  children,
  retKey,
  onClick,
}) {
  const keySize = size ? parseInt(size, 10) : 1;

  function handleSoftKey() {
    if (onClick && retKey) {
      onClick(retKey);
    }
  }
  return (
    <button
      className={`key ${className}`}
      style={{ flexGrow: keySize, ...style }}
      onMouseDown={(evt) => {
        evt.preventDefault();
        handleSoftKey();
      }}
    >
      {children}
    </button>
  );
}