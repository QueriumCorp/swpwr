import { YBRpage } from '@/components/qq/YellowBrickRoad'
import { z } from 'zod'

// STATE
export interface State {
  swapiUrl: string
  gltfUrl?: string
  voiceId?: string
  voiceName?: string
  rank?: string
  disabledSchemas?: string[]
  problem: Problem
  student: Student
  session: Session
  ybr: YBRpage[]
  studentLog: LogItem[]
  criticalError: boolean
  onComplete: (session: Session, studentLog: LogItem[]) => void
  onStep: (session: Session, studentLog: LogItem[]) => void

  setSwapiUrl: (url: string) => void
  setGltfUrl: (url: string) => void
  setVoiceId: (id: string) => void
  setVoiceName: (name: string) => void
  setRank: (rank: string) => void
  setDisabledSchemas: (disabledSchemas: string[]) => void

  setProblem: (problem: Problem) => any
  setStudent: (student: Student) => void
  setSession: (session: Session) => void
  setYBR: (ybr: YBRpage[]) => void
  setCriticalError: (criticalError: boolean) => void
  toggleChatty: () => boolean
  setNetworkSpeedMbps: (type: string, Mbps: number) => void
  setAiBusy: (busy: boolean) => void
  heartbeat: () => Promise<void>
  initSession: () => void
  submitTTable: (knowns: string[], unknowns: string[]) => Promise<any>
  submitPickSchema: (schema: string, fake?: boolean) => Promise<any>
  submitOrganize: (
    equation: string,
    values: { variable: string; value: string | null }[],
  ) => Promise<any>
  submitMyOwnWords: (type: string) => Promise<any>
  setSelectedExplanation: (explanation: Explanation) => void
  submitExplanation: (explanation: Explanation) => Promise<any>
  setThinksGoodAnswer: (type: boolean) => void
  getHint: () => Promise<string>
  closeSession: () => Promise<string>
  saveTrace: (comment: string) => Promise<string>
  logAction: (props: LogActionProps) => void
  setMathAnswer: (answer: string) => void

  setOnComplete: (onComplete: () => void) => void
  setOnStep: (onStep: () => void) => void
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

// EXPLANATIONS
export type Explanation = {
  type: string
  text: string
}

// HIGHLIGHTS
export type Highlight = [string, string] | string

// SESSION
export type Session = {
  // returned by SWAPI
  sessionToken: string
  // returned by qEval
  identifiers: string[]
  operators: string[]
  explanations: Explanation[]
  highlights: Highlight[]
  endPhaseWEqn: string
  phaseESentence: string
  // prepped for student
  stimulusClaims: string
  // created by student
  knowns: string[]
  unknowns: string[]
  schema: string
  schemaValues: { variable: string; value: string | null }[]
  mathAnswer: string
  myOwnWords: string
  selectedExplanation: Explanation
  thinksGoodAnswer?: boolean
  finalAnswer: string
  // ui operations
  chatty?: boolean
  networkSpeedMbps: { type: string; Mbps: number }
  aiBusy?: boolean
}

// OPTIONS
export type Options = {
  swapiUrl?: string
  gltfUrl?: string
  voiceId?: string
  voiceName?: string
  rank?: string
  disabledSchemas?: string[]
}
export const OptionsSchema = z.object({
  swapiUrl: z.string().optional(),
  gltfUrl: z.string().optional(),
  voiceId: z.string().optional(),
  voiceName: z.string().optional(),
  rank: z.string().optional(),
  disabledSchemas: z.array(z.string()).optional(),
}) satisfies z.ZodType<Options>

// LOGS
export type LogItem = {
  timestamp: Date
  action?: string
  page?: string
  activity?: string
  data?: any
}
export type LogActionProps = {
  action?: string
  page?: string
  activity?: string
  data?: any
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
