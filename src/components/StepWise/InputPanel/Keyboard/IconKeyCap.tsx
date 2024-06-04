import React from "react";
import { Operator } from "../../stores/solution";
import { RxThickArrowLeft, RxThickArrowRight } from "react-icons/rx";
import { PiBackspaceLight } from "react-icons/pi";
import { TiDivideOutline } from "react-icons/ti";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { RiSpace } from "react-icons/ri";
import { GrSubtract } from "react-icons/gr";
import { FaEquals } from "react-icons/fa";
type IconKeyCapProps = {
  operator: Operator;
};

export const IconKeyCap = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & IconKeyCapProps
>(({ operator }, _ref) => {
  return (
    <div style={{ userSelect: "none", ...operator.symbol_style }}>
      {renderIcon(operator.symbol_icon)}
    </div>
  );
});

// Radix React Icons - https://www.radix-ui.com/icons
// The tooltip names map to the component names

// note: The icon library is prefixed so we can use others in the future
function renderIcon(icon: string) {
  switch (icon) {
    case "radix:thickArrowLeft":
      return <RxThickArrowLeft />;
    case "radix:thickArrowRight":
      return <RxThickArrowRight />;
    case "PiBackspaceLight":
      return <PiBackspaceLight />;
    case "TiDivideOutline":
      return <TiDivideOutline />;
    case "FaRegTrashCan":
      return <FaRegTrashCan />;
    case "FaPlus":
      return <FaPlus />;
    case "RiSpace":
      return <RiSpace />;
    case "GrSubtract":
      return <GrSubtract />;
    case "FaEquals":
      return <FaEquals />;
    default:
      return <span>💩</span>;
  }
}
