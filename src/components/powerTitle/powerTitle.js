import React from "react";

import "./powerTitle.css";

function PowerTitle(props) {
  const current = props.current;
  return (
    <div className="powerTitle">
      {props.title.split("").map(function (char, index) {
        return (
          <span
            aria-hidden="true"
            key={index}
            className={index === current ? "powerTitleCurrentLetter" : ""}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}

export default PowerTitle;
