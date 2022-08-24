import React from "react";

import "./tagger.css";

function Tagger(props) {
  const current = props.current;
  const title = props.title;
  const subTitle = props.subTitle;
  const instructions = props.instructions;
  return (
    <div className="powerTitle">
      {title.split("").map(function (char, index) {
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
      <div>{subTitle}</div>
      <p>{instructions}</p>
    </div>
  );
}

export default Tagger;
