import { YBRpage } from '@/components/qq/YellowBrickRoad'
import { Step, StepSchema } from '@/components/StepWise/stores/solution'
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
  setCurrentPageIndex: (pageNumber: number) => void
  heartbeat: () => Promise<void>
  initSession: () => void
  setSessionResumable: (sessionToken: string) => void
  resumeSession: (
    oldSession: Session,
    oldStudentLog: LogItem[],
  ) => Promise<boolean>
  updateTTable: (knowns: string[], unknowns: string[]) => void
  submitTTable: (knowns: string[], unknowns: string[]) => Promise<any>
  updatePickSchema: (schema: string) => void
  submitPickSchema: (schema: string, fake?: boolean) => Promise<any>
  updateOrganize: (
    equation: string,
    values: { variable: string; value: string | null }[],
  ) => void
  submitOrganize: (
    equation: string,
    values: { variable: string; value: string | null }[],
  ) => Promise<any>
  updateMathSolution: (solution: any[]) => void

  updateMyOwnWordsParts: (parts: MyOwnWordsParts) => void
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
// WORD PROBLEM VIDEOS
export type PSVideo = {
  page: string
  videos: { title: string; url: string }[]
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
  psVideos?: PSVideo[]
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
  psVidoes: z
    .array(
      z.object({
        page: z.string(),
        videos: z.array(z.object({ title: z.string(), url: z.string() })),
      }),
    )
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
export const ExplanationSchema = z.object({
  type: z.string(),
  text: z.string(),
}) satisfies z.ZodType<Explanation>

// HIGHLIGHTS
export type Highlight =
  | {
      highlight: string
      index: string
      type: 'string'
      done: boolean
    }
  | {
      highlight: [string, string]
      index: string
      type: 'valueUnit'
      done: boolean
    }

const HighlightSchema = z.union([
  z.object({
    highlight: z.string(),
    index: z.string(),
    type: z.literal('string'),
    done: z.boolean(),
  }),
  z.object({
    highlight: z.tuple([z.string(), z.string()]),
    index: z.string(),
    type: z.literal('valueUnit'),
    done: z.boolean(),
  }),
])

const MyOwnWordsPartsSchema = z.object({
  fragment0: z.string(),
  fragment1: z.string(),
  fragment2: z.string(),
  blank0: z.string(),
  blank1: z.string(),
  value0: z.string(),
  value1: z.string(),
})
export type MyOwnWordsParts = z.infer<typeof MyOwnWordsPartsSchema>

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
  equation: string
  schemaValues: { variable: string; value: string | null }[]
  mathSolution: Step[]
  mathAnswer: string
  myOwnWords: string
  myOwnWordsParts: MyOwnWordsParts
  selectedExplanation: Explanation
  thinksGoodAnswer?: boolean
  finalAnswer: string
  // ui operations
  chatty?: boolean
  networkSpeedMbps: { type: string; Mbps: number }
  aiBusy?: boolean
  sessionResumable?: boolean
  lastPageIndex?: number
}
export const SessionSchema = z.object({
  // returned by SWAPI
  sessionToken: z.string(),
  // returned by qEval
  identifiers: z.array(z.string()),
  operators: z.array(z.string()),
  explanations: z.array(ExplanationSchema),
  highlights: z.array(HighlightSchema),
  endPhaseWEqn: z.string(),
  phaseESentence: z.string(),
  // prepped for student
  stimulusClaims: z.string(),
  // created by student
  knowns: z.array(z.string()),
  unknowns: z.array(z.string()),
  schema: z.string(),
  equation: z.string(),
  schemaValues: z.array(
    z.object({ variable: z.string(), value: z.string().nullable() }),
  ), // { variable: string; value: string | null }[]
  mathSolution: z.array(StepSchema),
  mathAnswer: z.string(),
  myOwnWords: z.string(),
  myOwnWordsParts: MyOwnWordsPartsSchema,
  selectedExplanation: ExplanationSchema,
  thinksGoodAnswer: z.boolean().optional(),
  finalAnswer: z.string(),
  chatty: z.boolean().optional(),
  networkSpeedMbps: z.object({ type: z.string(), Mbps: z.number() }),
  lastPageIndex: z.number().optional(),
}) satisfies z.ZodType<Session>

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
export const LogItemSchema = z.object({
  timestamp: z.date(),
  action: z.string().optional(),
  page: z.string().optional(),
  activity: z.string().optional(),
  data: z.any().optional(),
}) satisfies z.ZodType<LogItem>
export const LogItemArraySchema = z.array(LogItemSchema)
type LogItemArray = z.infer<typeof LogItemArraySchema>

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
