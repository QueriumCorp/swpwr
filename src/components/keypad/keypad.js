import React from "react";

import "./keypad.css";

export default function Keypad({ className, style, children }) {
  return (
    <div className={`keypad ${className}`} style={style}>
      {children}
    </div>
  );
}
