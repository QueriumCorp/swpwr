import { createContext } from 'react'
import { createStore } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import type {} from '@redux-devtools/extension' // for devtools typing

// problem imports
import type { Problem, ProblemStatus } from './problem'
import {
  DEFAULT_PROBLEM,
  DEFAULT_PROBLEM_STATUS,
  validateProblem,
} from './problem'

// student imports
import type { Student, StudentStatus } from './student'
import {
  DEFAULT_STUDENT,
  DEFAULT_STUDENT_STATUS,
  validateStudent,
} from './student'
import type { Server } from './server'
import { validateServer } from './server'

// solution imports
import type {
  Log,
  Step,
  SolutionActions,
  SolutionState,
  RawShowMeStep,
  ShowMeStep,
} from './solution'
import {
  DEFAULT_SOLUTION,
  extractErrorMsg,
  getHintMessage,
  getIncorrectStepMessage,
  LaTeXText,
} from './solution'

// actions imports
import { heartbeatAction } from './solutionActions/heartbeat'
import { MathMLToLaTeX } from 'mathml-to-latex'
import { prepareOperators } from '../utils/prepareOperators'
import { Session } from './session'
import { Options } from './options'

// ============================================================================
// STORE DEFINITION
// ============================================================================

export type SessionStore = ReturnType<typeof createSessionStore>

type ScratchPadStep = Partial<Step>

export const createSessionStore = (
  initialState?: 'READY' | 'SET' | 'GO',
  student?: Student,
  problem?: Problem,
  server?: Server,
  options?: Options,
  assistant?: (msg: string, busy?: boolean) => void,
  onComplete?: (steps: Step[], log: Log[]) => void,
  onStep?: (steps: Step[], log: Log[]) => void,
) => {
  initialState = initialState || 'GO'

  // Validate incoming props
  const problemStatus: ProblemStatus = problem
    ? validateProblem(problem)
    : { problemValid: false, problemStatusMsg: 'problem is undefined' }
  const studentStatus: StudentStatus = student
    ? validateStudent(student)
    : { studentValid: false, studentStatusMsg: 'student is undefined' }
  server = validateServer(server)

  type State = Student &
    Problem &
    Server &
    Options &
    SolutionState &
    SolutionActions

  return createStore<State>()(
    devtools(
      subscribeWithSelector((set, get) => ({
        ...DEFAULT_STUDENT,
        ...DEFAULT_STUDENT_STATUS,
        ...DEFAULT_PROBLEM,
        ...DEFAULT_PROBLEM_STATUS,
        ...DEFAULT_SOLUTION,
        ...server,
        ...options,
        ...problem,
        ...problemStatus,
        ...student,
        ...studentStatus,
        initialState,

        //=====================================================
        // HEARTBEAT
        //=====================================================
        heartbeat: async () => {
          const newLogEntry = await heartbeatAction()
          set(state => ({
            log: [...(state as any)!.log, newLogEntry],
          }))
        },

        //=====================================================
        // START SESSION
        //=====================================================
        startSession: async () => {
          if (studentStatus.studentValid === false) {
            console.error('Invalid student', studentStatus.studentStatusMsg)
            return
          }
          if (problemStatus.problemValid === false) {
            console.error('Invalid problem ', problemStatus.problemStatusMsg)
            return
          }

          set(_state => ({
            sessionToken: 'starting',
          }))

          let response
          // create logEntry starting point
          const logEntry: Log = {
            timestamp: Date.now(),
            action: 'startSession',
            response: '',
          }

          // If we already have a session, log and exit
          const existingSessionToken = get().sessionToken
          if (
            existingSessionToken &&
            typeof existingSessionToken === 'string' &&
            existingSessionToken.length > 0 &&
            existingSessionToken !== 'starting'
          ) {
            logEntry.response = `Session for sessionToken already started. ${existingSessionToken}`
            set(state => ({
              log: [...state.log, logEntry],
            }))
            return
          }

          const studentId = get().studentId
          const appKey = get().appKey
          const id = get().problemId
          const policyId = get().policyId
          const title = get().title
          const stimulus = get().stimulus
          const topic = get().topic
          const definition = get().definition
          const hints = get().hints

          try {
            response = await fetch(`${server.serverURL}/start`, {
              method: 'POST',
              headers: {
                'content-type': 'application/json;charset=UTF-8',
              },
              body: JSON.stringify({
                appKey: appKey,
                studentId: studentId,
                policyId: policyId,
                id: id,
                title: title,
                stimulus: stimulus,
                topic: topic,
                definition: definition,
                hints: hints,
              }),
            })
          } catch (error) {
            logEntry.response = extractErrorMsg(error)
          }

          // If environmental error (404, CORS, etc) in logEntry.response...
          if (logEntry.response.length > 0) {
            set(state => ({
              sessionToken: '',
              log: [...state.log, logEntry],
            }))
            return
          }

          // got a valid http response
          if (response?.ok) {
            logEntry.response = response?.statusText
            const body = await response.json()
            const preppedOperators = prepareOperators(body.operators)
            set(state => ({
              sessionToken: body.sessionToken,
              identifiers: body.identifiers,
              operators: preppedOperators,
              log: [...state.log, logEntry],
              steps: [],
            }))
            return
          }

          // response was not ok
          logEntry.response = `HTTP Response Code: ${response?.status}`
          set(state => ({
            sessionToken: '',
            log: [...state.log, logEntry],
          }))
        },

        //=====================================================
        // RESUME SESSION
        //=====================================================
        resumeSession: async (session: Session) => {
          let st = get().sessionToken
          if (st.length > 20) {
            return
          }

          let logEntry: Log = {
            timestamp: Date.now(),
            action: 'resumeSession',
            response: '',
          }

          if (studentStatus.studentValid === false) {
            console.error('Invalid student', studentStatus.studentStatusMsg)
            logEntry.response = studentStatus.studentStatusMsg
            set(state => ({
              log: [...state.log, logEntry],
            }))
            return
          }
          if (problemStatus.problemValid === false) {
            console.error('Invalid problem ', problemStatus.problemStatusMsg)
            logEntry.response = problemStatus.problemStatusMsg
            set(state => ({
              log: [...state.log, logEntry],
            }))
            return
          }

          if (
            !session ||
            !session.sessionToken ||
            session.sessionToken.length < 20
          ) {
            console.error('session is invalid', session)
            logEntry.response = `Provided sessionToken is invalid ${session?.sessionToken}`
            set(state => ({
              log: [...state.log, logEntry],
            }))
            return
          }

          logEntry.response = `Session resumed for sessionToken: ${session?.sessionToken}`

          const preppedOperators = prepareOperators(session.operators)
          set(state => ({
            sessionToken: session.sessionToken,
            identifiers: session.identifiers,
            operators: preppedOperators,
            log: [...state.log, logEntry],
            steps: [...session.mathSolution],
          }))
          return
        },

        //=====================================================
        // GET HINT
        //=====================================================
        getHint: async () => {
          const appKey = get().appKey

          let response
          // create logEntry starting point
          const logEntry: Log = {
            timestamp: Date.now(),
            action: 'getHint',
            response: '',
          }

          // If we don't have a session, log and exit
          const existingSessionToken = get().sessionToken
          if (
            !existingSessionToken ||
            typeof existingSessionToken !== 'string' ||
            existingSessionToken.length == 0
          ) {
            logEntry.response = `No sessionToken. ${existingSessionToken}`
            set(state => ({
              log: [...state.log, logEntry],
            }))
            if (typeof assistant === 'function')
              assistant(
                'Oh oh! We had a failure:' + JSON.stringify(logEntry),
                false,
              )
            return "I'm sorry. We don't have a sessionToken."
          }

          if (typeof assistant === 'function')
            assistant('Hmmm...  Let me see...', true)
          try {
            response = await fetch(`${server.serverURL}/getHint`, {
              method: 'POST',
              headers: {
                'content-type': 'application/json;charset=UTF-8',
              },
              body: JSON.stringify({
                appKey: appKey,
                sessionToken: existingSessionToken,
              }),
            })
          } catch (error) {
            logEntry.response = extractErrorMsg(error)
          }

          // If environmental error (404, CORS, etc) in logEntry.response...
          if (logEntry.response.length > 0) {
            set(state => ({
              log: [...state.log, logEntry],
            }))
            if (typeof assistant === 'function') {
              assistant(
                'Oh oh! We had a failure:' + JSON.stringify(logEntry),
                false,
              )
            }
            return JSON.stringify(logEntry)
          }

          // got a valid http response
          if (response?.ok) {
            logEntry.response = response?.statusText
            const body = await response.json()

            set(state => ({
              log: [...state.log, logEntry],
              steps: [
                ...state.steps,
                {
                  timestamp: Date.now(),
                  type: 'hint',
                  hintObject: body.hintObject,
                  hintText: LaTeXText(body.hintText),
                } as Step,
              ],
              lastAction: Date.now(),
            }))
            if (typeof assistant === 'function') assistant(body.hintText, false)
            return body.hintText
          }

          // response was not ok
          logEntry.response = `HTTP Response Code: ${response?.status}`
          set(state => ({
            log: [...state.log, logEntry],
          }))
          if (typeof assistant === 'function') {
            assistant(
              'Oh oh! We had a failure:' + JSON.stringify(logEntry),
              false,
            )
          }
          return logEntry.response
        },

        //=====================================================
        // SHOW ME
        //=====================================================
        showMe: async () => {
          const now = Date.now()
          const appKey = get().appKey

          let response
          // create logEntry starting point
          const logEntry: Log = {
            timestamp: Date.now(),
            action: 'showMe',
            response: '',
          }

          // If we dont have a session, log and exit
          const existingSessionToken = get().sessionToken
          if (
            !existingSessionToken ||
            typeof existingSessionToken !== 'string' ||
            existingSessionToken.length == 0
          ) {
            logEntry.response = `No sessionToken. ${existingSessionToken}`
            set(state => ({
              log: [...state.log, logEntry],
            }))
            return
          }

          try {
            response = await fetch(`${server.serverURL}/showMe`, {
              method: 'POST',
              headers: {
                'content-type': 'application/json;charset=UTF-8',
              },
              body: JSON.stringify({
                appKey: appKey,
                sessionToken: existingSessionToken,
              }),
            })
          } catch (error) {
            logEntry.response = extractErrorMsg(error)
          }

          // If environmental error (404, CORS, etc) in logEntry.response...
          if (logEntry.response.length > 0) {
            set(state => ({
              log: [...state.log, logEntry],
            }))
            return
          }

          // got a valid http response
          if (response?.ok) {
            logEntry.response = response?.statusText
            const body = await response.json()
            const showMeSteps: ShowMeStep[] = body.showMe.map(
              (step: RawShowMeStep, idx: number) => {
                return {
                  key: now + '-' + idx,
                  suggestedStep:
                    '\\(' + MathMLToLaTeX.convert(step.suggestedStep) + '\\)',
                  instruction: getHintMessage(step.instruction),
                }
              },
            )

            set(state => ({
              log: [...state.log, logEntry],
              steps: [
                ...state.steps,

                {
                  timestamp: now,
                  type: 'showMe',
                  status: body.status,
                  showMe: showMeSteps,
                },
              ],
              lastAction: now,
            }))
            return
          }

          // response was not ok
          logEntry.response = `HTTP Response Code: ${response?.status}`
          set(state => ({
            log: [...state.log, logEntry],
          }))
        },

        //=====================================================
        // CLOSE SESSION
        //=====================================================
        close: async () => {
          console.error('closeSessionAction has not been tested')
          const appKey = get().appKey
          let response
          const logEntry: Log = {
            timestamp: Date.now(),
            action: 'closeSession',
            response: '',
          }

          // If we dont have a session, log and exit
          const existingSessionToken = get().sessionToken
          if (
            !existingSessionToken ||
            typeof existingSessionToken !== 'string' ||
            existingSessionToken.length == 0
          ) {
            logEntry.response = `No sessionToken. ${existingSessionToken}`
            set(state => ({
              log: [...state.log, logEntry],
            }))
            return
          }

          try {
            response = await fetch(`${server.serverURL}/close`, {
              method: 'POST',
              headers: {
                'content-type': 'application/json;charset=UTF-8',
              },
              body: JSON.stringify({
                appKey: appKey,
                sessionToken: existingSessionToken,
              }),
            })
          } catch (error) {
            logEntry.response = error as string
          }

          console.info(response)
          if (response?.ok) {
            logEntry.response = response?.statusText
          } else {
            logEntry.response = `HTTP Response Code: ${response?.status}`
          }

          set(state => ({
            log: [...state.log, logEntry],
          }))
        },

        //=====================================================
        // SUBMIT STEP
        //=====================================================
        submitStep: async (step?: string) => {
          step = step || get().editingStep
          const appKey = get().appKey
          const now = Date.now()

          let response
          // create logEntry starting point
          const logEntry: Log = {
            timestamp: now,
            action: 'submitStep',
            response: '',
          }

          // If we already have a session, log and exit
          const existingSessionToken = get().sessionToken
          if (
            !existingSessionToken ||
            typeof existingSessionToken !== 'string' ||
            existingSessionToken.length == 0
          ) {
            logEntry.response = `No sessionToken. ${existingSessionToken}`
            set(state => ({
              log: [...state.log, logEntry],
            }))
            if (typeof assistant === 'function') {
              assistant(
                'Oh oh! We had a failure:' + JSON.stringify(logEntry),
                false,
              )
            }
            return logEntry.response
          }

          // If we dont have a step, log and exit
          if (!step || typeof step !== 'string' || step.length == 0) {
            logEntry.response = `No step. ${step}`
            set(state => ({
              log: [...state.log, logEntry],
            }))
            if (typeof assistant === 'function') {
              assistant('Please enter a step.', false)
            }
            const resultingStep: ScratchPadStep = {
              timestamp: now,
              status: '',
              stepStatus: 'INVALID',
              type: 'incorrect',
              message: 'Please enter a step.',
              rawResponse: '',
              latex: step,
            }

            set(state => ({
              log: [...state.log, logEntry],
              steps: [...state.steps, resultingStep as Step],
              lastAction: now,
            }))
            return logEntry.response
          }

          if (typeof assistant === 'function') {
            assistant('Just a sec while I check your step...', true)
          }

          // Send the step to the server
          try {
            response = await fetch(`${server.serverURL}/submitStep`, {
              method: 'POST',
              headers: {
                'content-type': 'application/json;charset=UTF-8',
              },
              body: JSON.stringify({
                appKey: appKey,
                sessionToken: existingSessionToken,
                step: `\\begin{{equation}}${step.replace(
                  '=',
                  '&#63449;',
                )}\\end{{equation}}`,
              }),
            })
          } catch (error) {
            logEntry.response = extractErrorMsg(error)
          }

          // If environmental error (404, CORS, etc) in logEntry.response...
          if (logEntry.response.length > 0) {
            set(state => ({
              log: [...state.log, logEntry],
            }))
            if (typeof assistant === 'function') {
              assistant(
                'Oh oh! We had a failure:' + JSON.stringify(logEntry),
                false,
              )
            }
            return logEntry.response
          }

          // got a valid http response
          if (response?.ok) {
            const body = await response.json()
            logEntry.response = body.rawResponse

            const resultingStep: ScratchPadStep = {
              timestamp: now,
              status: body.status,
              stepStatus: body.stepStatus,
              message: LaTeXText(getIncorrectStepMessage(body.message)),
              rawResponse: body.rawResponse,
              latex: step,
              hintObject: body.hintObject,
            }

            switch (body.stepStatus) {
              case 'VALID':
                resultingStep.type = 'correct'
                break
              case 'INVALID':
                resultingStep.type = 'incorrect'
                break
              case 'COMPLETE':
                resultingStep.type = 'victory'
                break
              case 'MATHCOMPLETE':
                resultingStep.type = 'mathComplete'
                if (typeof onComplete === 'function') {
                  const log = get().log
                  onComplete(
                    [...get().steps, resultingStep as Step],
                    [...log, logEntry],
                  )
                }
                break
            }

            if (typeof assistant === 'function') {
              assistant(body.message, false)
            }

            set(state => ({
              log: [...state.log, logEntry],
              steps: [...state.steps, resultingStep as Step],
              lastAction: now,
            }))

            setTimeout(() => {
              if (typeof onStep === 'function') {
                const log = get().log
                onStep([...get().steps], [...get().log])
              }
            }, 100)

            return body.message
          }
        },

        //=====================================================
        // GET GRADE
        //=====================================================
        getGrade: async () => {
          let response
          const logEntry: Log = {
            timestamp: Date.now(),
            action: 'getGrade',
            response: '',
          }

          try {
            response = await fetch(`${server.serverURL}/getGrade`)
          } catch (error) {
            logEntry.response = error as string
          }

          if (response?.ok) {
            logEntry.response = response?.statusText
          } else {
            logEntry.response = `HTTP Response Code: ${response?.status}`
          }

          set(state => ({
            log: [...state.log, logEntry],
          }))
        },

        //
        precomputeHints: async () => {
          const appKey = get().appKey
          const existingSessionToken = get().sessionToken
          let response
          const logEntry: Log = {
            timestamp: Date.now(),
            action: 'heartbeat',
            response: '',
          }

          try {
            response = await fetch(`${server.serverURL}/precomputeHints`, {
              method: 'POST',
              headers: {
                'content-type': 'application/json;charset=UTF-8',
              },
              body: JSON.stringify({
                appKey: appKey,
                sessionToken: existingSessionToken,
              }),
            })
          } catch (error) {
            logEntry.response = error as string
          }

          console.info(response)
          if (response?.ok) {
            logEntry.response = response?.statusText
          } else {
            logEntry.response = `HTTP Response Code: ${response?.status}`
          }

          set(state => ({
            log: [...state.log, logEntry],
          }))
        },

        //=====================================================
        // SAVE TRACE
        //=====================================================
        saveTrace: async () => {
          // TODO: Need to add the comment payload
          console.error('saveTraceAction needs work')

          let response
          const logEntry: Log = {
            timestamp: Date.now(),
            action: 'saveTrace',
            response: '',
          }

          try {
            response = await fetch(`${server.serverURL}/saveTrace`)
          } catch (error) {
            logEntry.response = error as string
          }

          console.info(response)
          if (response?.ok) {
            logEntry.response = response?.statusText
          } else {
            logEntry.response = `HTTP Response Code: ${response?.status}`
          }

          set(state => ({
            log: [...state.log, logEntry],
          }))
        },

        //=====================================================
        // ADD COMMENT
        //=====================================================
        addComment: async (comment: string) => {
          // TODO: Fix add comment
          console.error('addCommentAction needs work')

          const appKey = get().appKey
          const existingSessionToken = get().sessionToken

          let response
          const logEntry: Log = {
            timestamp: Date.now(),
            action: 'addComment',
            response: '',
          }

          try {
            response = await fetch(`${server.serverURL}/submitComment`, {
              method: 'POST',
              headers: {
                'content-type': 'application/json;charset=UTF-8',
              },
              body: JSON.stringify({
                appKey: appKey,
                sessionToken: existingSessionToken,
                comment: comment,
              }),
            })
          } catch (error) {
            logEntry.response = error as string
          }

          console.info(response)
          if (response?.ok) {
            logEntry.response = response?.statusText
          } else {
            logEntry.response = `HTTP Response Code: ${response?.status}`
          }

          set(state => ({
            log: [...state.log, logEntry],
          }))
        },

        //=====================================================
        // ASSESS SOLUTION
        //=====================================================
        assessSolution: async () => {
          // TODO: Need to add the proposed solution payload
          console.error('assessSolutionAction needs work')
          let response
          const logEntry: Log = {
            timestamp: Date.now(),
            action: 'assessSolution',
            response: '',
          }

          try {
            response = await fetch(`${server.serverURL}/assessSolution/`)
          } catch (error) {
            logEntry.response = error as string
          }

          console.info(response)
          if (response?.ok) {
            logEntry.response = response?.statusText
          } else {
            logEntry.response = `HTTP Response Code: ${response?.status}`
          }

          set(state => ({
            log: [...state.log, logEntry],
          }))
        },

        //=====================================================
        // setEditingStep
        //=====================================================
        setEditingStep: async (stepInProgress: string) => {
          set(_state => ({
            editingStep: stepInProgress,
          }))
        },
      })), // end of state
      { name: 'session' },
    ),
  )
}

export const SessionContext = createContext<SessionStore | null>(null)
