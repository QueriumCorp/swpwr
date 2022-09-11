import React from "react";

import "./keypad.css";

export default function KeyRow({ children, className, style }) {
  return (
    <div className={`keyrow ${className}`} style={style}>
      {children}
    </div>
  );
}
