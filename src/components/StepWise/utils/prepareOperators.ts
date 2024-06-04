import { Operator } from "../stores/solution";
import { operators } from "./operators";

export function prepareOperators(incomingOperators: string[]) {
  if (!incomingOperators) return [];

  const problemOperators: Operator[] = incomingOperators.map((op) => {
    let errorOp: Operator = {
      method: "error",
      cursorShift: "",
      atomic: false,
      enabled: false,
      latex: "",
      mma: "",
      operator: "error",
      string: "",
      symbol_latex: "",
      symbol_style: {},
      symbol_html: "",
      symbol_icon: "",
      symbol_img: "",
      symbol_svg: "",
      symbol_utf8: "💩",
      tooltip: "Error processing special operators from StepWise AI",
    };

    // Lookup the operator definition
    const foundOp = operators.find((operator) => operator.operator === op);

    if (foundOp) {
      foundOp.operator = foundOp.operator.trim();
      return foundOp;
    }
    return errorOp;
  });

  return problemOperators;
}
