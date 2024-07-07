import { z } from "zod";
import { MathMLToLaTeX } from "mathml-to-latex";
import { Session } from "./session";

export type Hint = {
  type: "advisory" | "genhint" | "writedown";
  tag: string;
  message: string;
};

export type ShowMeStep = {
  key: string;
  suggestedStep: string;
  instruction: string;
};

/**
 * Step type defines the structure of a step in the solution state.
 * It contains a timestamp, type indicating if the step was correct/incorrect/hint/showMe,
 * the math content of the step, array of hints, and a message.
 */
export type Step = {
  timestamp: number;
} & (
  | {
      type: "correct";
      status: string;
      stepStatus: "VALID";
      message: string;
      rawResponse: string;
      latex: string;
      hintObject: Hint[];
    }
  | {
      type: "incorrect";
      status: string;
      stepStatus: "INVALID";
      message: string;
      rawResponse: string;
      latex: string;
      hintObject: Hint[];
    }
  | {
      type: "hint";
      status: string;
      hintText: string;
      hintObject: Hint[];
    }
  | {
      type: "showMe";
      status: string;
      showMe: ShowMeStep[];
    }
  | {
      type: "victory";
      status: string;
      stepStatus: "COMPLETE";
      message: string;
      rawResponse: string;
      latex: string;
      hintObject: Hint[];
    }
);

export const StepSchema = z.object({
  type: z.string(),
});

export type Log = {
  timestamp: number;
  action: string;
  response: string;
};
export const LogSchema = z.object({
  timestamp: z.number(),
  action: z.string(),
  response: z.string(),
}) satisfies z.ZodType<Log>;

export type Operator = {
  method: string;
  cursorShift: string;
  atomic: boolean;
  enabled: boolean;
  latex: string;
  mma: string;
  operator: string;
  string: string;
  symbol_style?: any;
  symbol_latex: string;
  symbol_html: string;
  symbol_icon: string;
  symbol_img: string;
  symbol_svg: string;
  symbol_utf8: string;
  tooltip: string;
};
export const OperatorSchema = z.object({
  method: z.string(),
  cursorShift: z.string(),
  atomic: z.boolean(),
  enabled: z.boolean(),
  latex: z.string(),
  mma: z.string(),
  operator: z.string(),
  string: z.string(),
  symbol_style: z.custom(),
  symbol_latex: z.string(),
  symbol_html: z.string(),
  symbol_icon: z.string(),
  symbol_img: z.string(),
  symbol_svg: z.string(),
  symbol_utf8: z.string(),
  tooltip: z.string(),
}) satisfies z.ZodType<Operator>;

export type SolutionState = {
  initialState: "READY" | "SET" | "GO";
  sessionToken: string;
  identifiers: string[];
  operators: Operator[];
  steps: Step[];
  stepCount: number;
  hintCount: number;
  errorCount: number;
  log: Log[];
  lastAction: number;
};
// define the initial state
export const DEFAULT_SOLUTION: SolutionState = {
  initialState: "GO",
  sessionToken: "",
  identifiers: [],
  operators: [],
  steps: [],
  stepCount: 0,
  hintCount: 0,
  errorCount: 0,
  log: [],
  lastAction: 0,
};

export const SolutionSchema = z.object({
  initialState: z.string(),
  sessionToken: z.string(),
  identifiers: z.array(z.string()),
  operators: z.array(OperatorSchema),
  steps: z.array(StepSchema),
  stepCount: z.number(),
  hintCount: z.number(),
  errorCount: z.number(),
  log: z.array(LogSchema),
  lastAction: z.number(),
});

export type SolutionActions = {
  heartbeat: () => Promise<void>;
  startSession: () => Promise<void>;
  resumeSession: (session: Session) => Promise<void>;
  getHint: () => Promise<void>;
  showMe: () => Promise<void>;
  submitStep: (step: string) => Promise<void>;
  close: () => Promise<void>;
  getGrade: () => Promise<void>;
};

export const extractErrorMsg = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }
  return message;
};

export function LaTeXText(text: string) {
  // TODO: Add support for multiple maths in a single string
  const startIndex = text.indexOf("<math");
  const endIndex = text.indexOf("</math") + 7;

  // No MathML?
  if (startIndex === -1) return text;

  // All MathML?
  if (startIndex === 0 && endIndex === text.length - 1)
    return MathMLToLaTeX.convert(text);

  // Part MathML
  const front = text.substring(0, startIndex);
  const middle = MathMLToLaTeX.convert(text.substring(startIndex, endIndex));
  const back = text.substring(endIndex, text.length - 1);
  return front + "\\(" + middle + "\\)" + back;
}

export type RawShowMeStep = {
  suggestedStep: string;
  instruction: string;
};

export function getHintMessage(text: string): string {
  const startDelimiter = "[HINTMSG:START]";
  const endDelimiter = "[HINTMSG:END]";

  const startIndex = text.indexOf(startDelimiter);
  if (startIndex === -1) {
    return "";
  }

  const endIndex = text.indexOf(
    endDelimiter,
    startIndex + startDelimiter.length,
  );
  if (endIndex === -1) {
    return "";
  }

  return text.substring(startIndex + startDelimiter.length, endIndex);
}

export function getIncorrectStepMessage(text: string): string {
  const startDelimiter = "[FBMSG:START]";
  const endDelimiter = "[FBMSG:END]";

  const startIndex = text.indexOf(startDelimiter);
  if (startIndex === -1) {
    return "";
  }

  const endIndex = text.indexOf(
    endDelimiter,
    startIndex + startDelimiter.length,
  );
  if (endIndex === -1) {
    return "";
  }

  return text.substring(startIndex + startDelimiter.length, endIndex);
}