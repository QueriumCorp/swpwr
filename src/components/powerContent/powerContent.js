import React from "react";

import "./powerContent.css";

function PowerContent(props) {
  const contentType = props.type;

  return (
    <div className="powerContent">
      <div>{contentType}</div>
    </div>
  );
}

export default PowerContent;
