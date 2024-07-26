import { z } from "zod";

// STATE
export interface State {
  swapiUrl: string;
  gltfUrl?: string;
  rank?: string;
  disabledSchemas?: string[];
  problem: Problem;
  student: Student;
  session: Session;
  studentLog: LogItem[];
  onComplete: (session: Session, studentLog: LogItem[]) => void;

  setSwapiUrl: (url: string) => void;
  setGltfUrl: (url: string) => void;
  setRank: (rank: string) => void;
  setDisabledSchemas: (disabledSchemas: string[]) => void;

  setProblem: (problem: Problem) => any;
  setStudent: (student: Student) => void;
  setSession: (session: Session) => void;
  heartbeat: () => Promise<void>;
  initSession: () => void;
  submitTTable: (knowns: string[], unknowns: string[]) => Promise<any>;
  submitPickSchema: (schema: string) => Promise<any>;
  submitExplanation: (type: string) => Promise<any>;
  getHint: () => Promise<string>;
  closeSession: () => Promise<string>;
  saveTrace: (comment: string) => Promise<string>;
  logAction: (action: string) => void;

  setOnComplete: (onComplete: () => void) => void;
}

// PROBLEM
export type Problem = {
  appKey: string;
  problemId?: string;
  title?: string;
  stimulus?: string;
  cmd?: string;
  session?: string;
  class: string;
  question: string;
  policies?: string;
  qs1?: string;
  qs2?: string;
  qs3?: string;
};
export const ProblemSchema = z.object({
  appKey: z.string(),
  id: z.string().optional(),
  title: z.string().optional(),
  stimulus: z.string().optional(),
  cmd: z.string().optional(),
  session: z.string().optional(),
  class: z.string(),
  question: z.string(),
  policies: z.string().optional(),
  qs1: z.string().optional(),
  qs2: z.string().optional(),
  qs3: z.string().optional(),
}) satisfies z.ZodType<Problem>;

// STUDENT
export type Student = {
  studentId: string;
  studentName: string;
};
export const StudentSchema = z.object({
  studentId: z.string(),
  studentName: z.string(),
}) satisfies z.ZodType<Student>;

// SESSION
export type Session = {
  sessionToken: string;
  identifiers: string[];
  operators: string[];
  knowns: string[];
  unknowns: string[];
  schema: string;
  explanations: { type: string; text: string }[];
  selectedExplanation: string;
  finalAnswer: string;
};

// OPTIONS
export type Options = {
  swapiUrl?: string;
  gltfUrl?: string;
  rank?: string;
  disabledSchemas?: string[];
};
export const OptionsSchema = z.object({
  swapiUrl: z.string().optional(),
  gltfUrl: z.string().optional(),
  rank: z.string().optional(),
  disabledSchemas: z.array(z.string()).optional(),
}) satisfies z.ZodType<Options>;

// LOGS
export type LogItem = {
  timestamp: Date;
  action: string;
};

export type SchemaType =
  | "additiveChangeSchema"
  | "additiveDifferenceSchema"
  | "additiveTotalSchema"
  | "multiplicativeCompareSchema"
  | "multiplicativeEqualGroupsSchema";

export type SetFn = (
  partial: State | Partial<State> | ((state: State) => State | Partial<State>),
  replace?: boolean | undefined,
) => void;

export type GetFn = () => State;
