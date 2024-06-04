import React from "react";
import { Operator } from "../../stores/solution";
import { Button } from "../../components/Button";
import { LatexKeyCap } from "./LatexKeyCap";
import { IconKeyCap } from "./IconKeyCap";
import { UTF8KeyCap } from "./UTF8KeyCap";
import { cn } from "../../utils";

export type KeyProps = {
  operator: Operator;
  keyPress: (key: Operator) => void;
};

export const Key = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & KeyProps
>(({ operator, keyPress, className, ...props }, ref) => {
  const wide =
    operator.symbol_utf8 && operator.symbol_utf8.length > 3 ? true : false;
  return (
    <Button
      className={cn(
        `tile overflow-hidden border shadow px-1 py-0.5 flex items-center justify-center min-w-6 ${
          wide ? "col-span-2" : "col-span-1"
        }`,
        className
      )}
      onClick={() => keyPress(operator)}
    >
      {renderKeyCap(operator)}
    </Button>
  );
});

function renderKeyCap(operator: Operator) {
  if (operator.symbol_latex) {
    return <LatexKeyCap operator={operator} />;
  }

  if (operator.symbol_icon) {
    return <IconKeyCap operator={operator} />;
  }

  if (operator.symbol_utf8) {
    return <UTF8KeyCap operator={operator} />;
  }

  if (operator.symbol_img) {
    return <IconKeyCap operator={operator} />;
  }

  if (operator.symbol_svg) {
    return <UTF8KeyCap operator={operator} />;
  }
}
