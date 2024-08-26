import { YBRpage } from '@/components/qq/YellowBrickRoad'
import { z } from 'zod'

// STATE
export interface State {
  swapiUrl: string
  gltfUrl?: string
  rank?: string
  disabledSchemas?: string[]
  problem: Problem
  student: Student
  session: Session
  ybr: YBRpage[]
  studentLog: LogItem[]
  onComplete: (session: Session, studentLog: LogItem[]) => void

  setSwapiUrl: (url: string) => void
  setGltfUrl: (url: string) => void
  setRank: (rank: string) => void
  setDisabledSchemas: (disabledSchemas: string[]) => void

  setProblem: (problem: Problem) => any
  setStudent: (student: Student) => void
  setSession: (session: Session) => void
  setYBR: (ybr: YBRpage[]) => void
  heartbeat: () => Promise<void>
  initSession: () => void
  submitTTable: (knowns: string[], unknowns: string[]) => Promise<any>
  submitPickSchema: (schema: string, fake?: boolean) => Promise<any>
  submitOrganize: (equation: string, values: string[]) => Promise<any>
  submitMyOwnWords: (type: string) => Promise<any>
  submitExplanation: (type: string) => Promise<any>
  getHint: () => Promise<string[]>
  closeSession: () => Promise<string>
  saveTrace: (comment: string) => Promise<string>
  logAction: (action: string) => void

  setOnComplete: (onComplete: () => void) => void
}

// WORD PROBLEM HINTS
export type WPHint = {
  page: string
  hints: string[]
}

// PROBLEM
export type Problem = {
  appKey: string
  problemId?: string
  title?: string
  stimulus?: string
  cmd?: string
  session?: string
  class: string
  question: string
  policies?: string
  qs1?: string
  qs2?: string
  qs3?: string
  wpHints?: WPHint[]
}
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
  wpHints: z
    .array(z.object({ page: z.string(), hints: z.array(z.string()) }))
    .optional(),
}) satisfies z.ZodType<Problem>

// STUDENT
export type Student = {
  studentId: string
  studentName: string
}
export const StudentSchema = z.object({
  studentId: z.string(),
  studentName: z.string(),
}) satisfies z.ZodType<Student>

// SESSION
export type Session = {
  // returned by SWAPI
  sessionToken: string
  // returned by qEval
  identifiers: string[]
  operators: string[]
  explanations: { type: string; text: string }[]
  // created by student
  knowns: string[]
  unknowns: string[]
  schema: string
  schemaValues: string[]
  mathAnswer: string
  myOwnWords: string
  selectedExplanation: string
  finalAnswer: string
}

// OPTIONS
export type Options = {
  swapiUrl?: string
  gltfUrl?: string
  rank?: string
  disabledSchemas?: string[]
}
export const OptionsSchema = z.object({
  swapiUrl: z.string().optional(),
  gltfUrl: z.string().optional(),
  rank: z.string().optional(),
  disabledSchemas: z.array(z.string()).optional(),
}) satisfies z.ZodType<Options>

// LOGS
export type LogItem = {
  timestamp: Date
  action: string
}

export type SchemaType =
  | 'additiveChangeSchema'
  | 'subtractiveChangeSchema'
  | 'additiveDifferenceSchema'
  | 'additiveTotalSchema'
  | 'multiplicativeCompareSchema'
  | 'multiplicativeEqualGroupsSchema'

export type SetFn = (
  partial: State | Partial<State> | ((state: State) => State | Partial<State>),
  replace?: boolean | undefined,
) => void

export type GetFn = () => State
