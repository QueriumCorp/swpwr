import React from "react";

import "./button.css";

const Button = ({ label, ...rest }) => (
  <button className="Button" {...rest}>
    {label}
  </button>
);

export default Button;
