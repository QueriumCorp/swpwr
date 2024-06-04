import React from "react";
import { Operator } from "../../stores/solution";

type UTF8KeyCapProps = {
  operator: Operator;
};

export const UTF8KeyCap = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & UTF8KeyCapProps
>(({ operator }, _ref) => {
  return (
    <div
      className="truncate"
      style={{ userSelect: "none", ...operator.symbol_style }}
    >
      {operator.symbol_utf8}
    </div>
  );
});
