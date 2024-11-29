import { Step } from './solution'

// SESSION
export type Session = {
  sessionToken: string
  identifiers: string[]
  operators: string[]
  mathSolution: Step[]
}
