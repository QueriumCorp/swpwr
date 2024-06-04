// ============================================================================
// PROBLEM STORE
// ============================================================================

import { z } from "zod";
import { generateErrorMessage } from "zod-error";

export type ProblemStatus = {
  problemValid: boolean;
  problemStatusMsg: string;
};
export const DEFAULT_PROBLEM_STATUS: ProblemStatus = {
  problemValid: false,
  problemStatusMsg: "No problem loaded",
};

export type Problem = {
  appKey: string;
  policyId?: string;
  problemId: string;
  title?: string;
  stimulus?: string;
  latex?: string;
  topic: string;
  definition: string;
  hints?: string[];
};
export const DEFAULT_PROBLEM: Problem = {
  appKey: "",
  policyId: "",
  problemId: "",
  title: "",
  stimulus: "",
  latex: "",
  topic: "gradeBasicAlgebra",
  definition: "",
  hints: [],
};

export const ProblemSchema = z.object({
  appKey: z.string().min(5),
  policyId: z.string().min(5).optional(),
  problemId: z.string().min(5),
  title: z.string().optional(),
  stimulus: z.string().optional(),
  latex: z.string().optional(),
  topic: z.string(),
  definition: z.string().min(5),
  hints: z.array(z.string().min(5)).max(3).optional(),
}) satisfies z.ZodType<Problem>;

// VALIDATE PROBLEM
export const validateProblem = (problem: Problem): ProblemStatus => {
  const problemValidation = ProblemSchema.safeParse(problem);
  // TODO: Do we need to add a check for the problem changing?

  if (problemValidation.success) {
    return {
      problemValid: true,
      problemStatusMsg: "Problem Loaded",
    };
  } else {
    console.error("Problem Validation Errors in: ", problem);
    return {
      problemValid: false,
      problemStatusMsg: generateErrorMessage(problemValidation.error.issues),
    };
  }
};
