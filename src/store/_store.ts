// Zustand and Zod Imports
import { create } from 'zustand'
import { generateErrorMessage } from 'zod-error'

// Type Definitions
import {
  Problem,
  Student,
  Session,
  LogItem,
  LogActionProps,
  State,
  ProblemSchema,
  Explanation,
  MyOwnWordsParts,
} from './_types'

// Method Implementations
import heartbeat from './heartbeat'
import initSession from './initSession/initSession'
import submitTTable from './submitT-Table'
import getHint from './getHint'
import submitPickSchema from './submitPickSchema'
import closeSession from './closeSession'
import saveTrace from './saveTrace'
import submitOrganize from './submitOrganize'
import { YBRpage } from '@/components/qq/YellowBrickRoad'
import submitExplanation from './submitExplanation'
import submitMyOwnWords from './submitMyOwnWords'
import { resume, shutup } from '@/lib/speech'
import { sessionResumable } from './sessionResumable'

const useProblemStore = create<State>((set, get) => ({
  ///////////////////////////////////////////////////////////////////
  // DATA
  ///////////////////////////////////////////////////////////////////

  swapiUrl: 'https://swapi2.onrender.com',
  gltfUrl: '',
  voiceId: '',
  voiceName: '',
  rank: '',
  disabledSchemas: [],

  problem: {
    appKey: '',
    id: '',
    title: '',
    stimulus: '',
    cmd: 'unused',
    session: 'unused',
    class: '',
    question: '',
    policies: '',
    qs1: '',
    qs2: '',
    qs3: '',
  },

  student: {
    studentId: '',
    studentName: '',
  },

  session: {
    sessionToken: '',
    identifiers: [],
    operators: [],
    knowns: [],
    unknowns: [],
    schema: '',
    equation: '',
    schemaValues: [],
    explanations: [],
    highlights: [],
    stimulusClaims: '',
    endPhaseWEqn: '',
    phaseESentence: '',
    mathSolution: [],
    mathAnswer: '',
    myOwnWordsParts: {
      fragment0: '',
      fragment1: '',
      fragment2: '',
      blank0: '',
      blank1: '',
      value0: '',
      value1: '',
    },
    myOwnWords: '',
    selectedExplanation: { type: '', text: '' },
    finalAnswer: '',

    // if localhost, then chatty is true so the start functions will set it to false
    chatty: document.location.hostname.includes('localhost') ? true : false,

    networkSpeedMbps: { type: 'Undetermined', Mbps: -Infinity },
    aiBusy: false,
  },

  ybr: [],
  criticalError: false,

  studentLog: [],
  onComplete: () => {
    console.info('onComplete called but not customized.')
  },
  onStep: () => {
    console.info('onStep called but not customized.')
    console.table(get().studentLog)
  },

  ///////////////////////////////////////////////////////////////////
  // METHODS
  ///////////////////////////////////////////////////////////////////

  setSwapiUrl: (url: string) => {
    if (url.substr(-1) == '/') url = url.slice(0, url.length - 1)

    set(_state => ({
      swapiUrl: url,
    }))
  },
  setGltfUrl: (url: string) => {
    set(_state => ({
      gltfUrl: url,
    }))
  },
  setVoiceId: (id: string) => {
    set(_state => ({
      voiceId: id,
    }))
  },
  setVoiceName: (name: string) => {
    set(_state => ({
      voiceName: name,
    }))
  },
  setRank: (rank: string) => {
    set(_state => ({
      rank: rank,
    }))
  },
  setDisabledSchemas: (disabledSchemas: string[]) => {
    set(_state => ({
      disabledSchemas: disabledSchemas,
    }))
  },
  setProblem: (problem: Problem) => {
    const problemValidation = ProblemSchema.safeParse(problem)
    // TODO: Do we need to add a check for the problem changing?

    if (problemValidation.success) {
      set(_state => ({
        problem: problem,
      }))
      return {
        problemValid: true,
        problemStatusMsg: 'Problem Loaded',
      }
    }

    console.error('Problem Validation Errors in: ', problem)
    console.info(generateErrorMessage(problemValidation.error.issues))
    return {
      problemValid: false,
      problemStatusMsg: generateErrorMessage(problemValidation.error.issues),
    }
  },

  setStudent: (student: Student) => {
    set(_state => ({
      student: student,
    }))
  },

  setSession: (session: Session) => {
    set(_state => ({
      session: session,
    }))
  },

  setYBR: (ybr: YBRpage[]) => {
    set(_state => ({
      ybr: ybr,
    }))
  },

  setCriticalError: (criticalError: boolean) => {
    set(_state => ({
      criticalError: criticalError,
    }))
  },

  toggleChatty: () => {
    let chatty = !get().session.chatty

    if (!chatty) {
      shutup()
    } else {
      resume()
    }

    set(state => ({
      session: {
        ...state.session,
        chatty: chatty,
      },
    }))
    return chatty
  },

  setNetworkSpeedMbps: (type: string, Mbps: number) => {
    set(state => ({
      session: {
        ...state.session,
        networkSpeedMbps: { type, Mbps },
      },
    }))
  },

  setAiBusy: (busy: boolean) => {
    set(state => ({
      session: {
        ...state.session,
        aiBusy: busy,
      },
    }))
  },

  setCurrentPageIndex: (pageNumber: number) => {
    set(state => ({
      session: {
        ...state.session,
        lastPageIndex: pageNumber,
      },
    }))
  },

  heartbeat: async () => {
    heartbeat(set, get)
  },

  initSession: async () => {
    return await initSession(set, get)
  },

  setSessionResumable: async (sessionToken: string) => {
    if (!sessionToken) {
      set(state => ({
        session: {
          ...state.session,
          sessionResumable: false,
        },
      }))
    } else {
      const swapiUrl = get().swapiUrl
      const problem = get().problem
      const resumable = await sessionResumable(
        swapiUrl,
        problem.appKey,
        sessionToken,
      )
      if (!resumable) {
        set(state => ({
          session: {
            ...state.session,
            sessionResumable: false,
          },
        }))
      } else {
        set(state => ({
          session: {
            ...state.session,
            sessionResumable: true,
          },
        }))
      }
    }
  },

  resumeSession: async (oldSession: Session, oldStudentLog: LogItem[]) => {
    set(_state => ({
      session: {
        ...oldSession,
      },
      studentLog: [...oldStudentLog],
    }))
    return false
  },

  updateTTable: async (knowns: string[], unknowns: string[]) => {
    set(state => ({
      session: {
        ...state.session,
        knowns: knowns,
        unknowns: unknowns,
      },
    }))
  },

  submitTTable: async (knowns: string[], unknowns: string[]) => {
    set(state => ({
      session: {
        ...state.session,
        knowns: knowns,
        unknowns: unknowns,
      },
    }))
    return await submitTTable(set, get, knowns, unknowns)
  },
  updatePickSchema: async (schema: string) => {
    set(state => ({
      session: {
        ...state.session,
        schema: schema,
      },
    }))
  },

  submitPickSchema: async (schema: string, _fake?: boolean) => {
    set(state => ({
      session: {
        ...state.session,
        schema: schema,
      },
    }))
    return await submitPickSchema(set, get, schema)
  },

  updateOrganize: async (
    equation: string,
    values: { variable: string; value: string | null }[],
  ) => {
    set(state => ({
      session: {
        ...state.session,
        equation: equation,
        schemaValues: values,
      },
    }))
  },

  submitOrganize: async (
    equation: string,
    values: { variable: string; value: string | null }[],
  ) => {
    set(state => ({
      session: {
        ...state.session,
        equation: equation,
        schemaValues: values,
      },
    }))
    return await submitOrganize(set, get, equation)
  },

  setMathAnswer: async (latex: string) => {
    set(state => ({
      session: {
        ...state.session,
        mathAnswer: latex,
      },
    }))
  },

  updateMathSolution: (solution: any[]) => {
    set(state => ({
      session: {
        ...state.session,
        mathSolution: [...solution],
      },
    }))
  },

  updateMyOwnWordsParts: async (myOwnWordsParts: MyOwnWordsParts) => {
    set(state => ({
      session: {
        ...state.session,
        myOwnWordsParts: myOwnWordsParts,
      },
    }))
  },

  submitMyOwnWords: async (myOwnWords: string) => {
    set(state => ({
      session: {
        ...state.session,
        myOwnWords: myOwnWords,
      },
    }))
    return await submitMyOwnWords(set, get, myOwnWords)
  },

  setSelectedExplanation: async (explanation: Explanation) => {
    set(state => ({
      session: {
        ...state.session,
        selectedExplanation: explanation,
      },
    }))
  },

  submitExplanation: async (explanation: Explanation) => {
    set(state => ({
      session: {
        ...state.session,
        selectedExplanation: explanation,
      },
    }))
    return await submitExplanation(set, get, explanation.type)
  },

  setThinksGoodAnswer: async (choice: boolean) => {
    set(state => ({
      session: {
        ...state.session,
        thinksGoodAnswer: choice,
      },
    }))
  },

  getHint: async () => {
    if (get().session.aiBusy) return

    get().setAiBusy(true)
    const hintResult = await getHint(set, get)
    get().setAiBusy(false)

    return hintResult
  },

  closeSession: async () => {
    return await closeSession(set, get)
  },

  saveTrace: async (comment: string) => {
    return await saveTrace(set, get, comment)
  },

  logAction: (props: LogActionProps) => {
    const actionLog: LogItem = {
      timestamp: new Date(),
      page: props.page,
      activity: props.activity,
      data: props.data,
      action: props.action,
    }
    set(state => ({
      studentLog: [...state.studentLog, actionLog],
    }))
    setTimeout(() => {
      const session = get().session
      delete session.sessionResumable
      get().onStep(session, get().studentLog)
    }, 50)
  },

  setOnComplete: (onComplete: () => void) => {
    set(_state => ({
      onComplete: onComplete,
    }))
  },

  setOnStep: (onStep: () => void) => {
    set(_state => ({
      onStep: onStep,
    }))
  },
}))

export { useProblemStore }
