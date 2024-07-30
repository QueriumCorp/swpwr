// Zustand and Zod Imports
import { create } from "zustand";
import { generateErrorMessage } from "zod-error";

// Type Definitions
import {
  Problem,
  Student,
  Session,
  LogItem,
  State,
  ProblemSchema,
} from "./_types";

// Method Implementations
import heartbeat from "./heartbeat";
import initSession from "./initSession";
import submitTTable from "./submitT-Table";
import getHint from "./getHint";
import submitPickSchema from "./submitPickSchema";
import closeSession from "./closeSession";
import saveTrace from "./saveTrace";
import submitOrganize from "./submitOrganize";

export const useProblemStore = create<State>((set, get) => ({
  ///////////////////////////////////////////////////////////////////
  // DATA
  ///////////////////////////////////////////////////////////////////

  swapiUrl: "https://swapi2.onrender.com",
  gltfUrl: "",
  rank: "",
  disabledSchemas: [],

  problem: {
    appKey: "",
    id: "",
    title: "",
    stimulus: "",
    cmd: "unused",
    session: "unused",
    class: "",
    question: "",
    policies: "",
    qs1: "",
    qs2: "",
    qs3: "",
  },

  student: {
    studentId: "",
    studentName: "",
  },

  session: {
    sessionToken: "",
    identifiers: [],
    operators: [],
    knowns: [],
    unknowns: [],
    schema: "",
    explanations: [],
    selectedExplanation: "",
    finalAnswer: "",
  },

  studentLog: [],
  onComplete: () => {
    console.info("onComplete called but not customized.");
  },

  ///////////////////////////////////////////////////////////////////
  // METHODS
  ///////////////////////////////////////////////////////////////////

  setSwapiUrl: (url: string) => {
    if (url.substr(-1) == "/") url = url.slice(0, url.length - 1);

    set((_state) => ({
      swapiUrl: url,
    }));
  },
  setGltfUrl: (url: string) => {
    set((_state) => ({
      gltfUrl: url,
    }));
  },
  setRank: (rank: string) => {
    set((_state) => ({
      rank: rank,
    }));
  },
  setDisabledSchemas: (disabledSchemas: string[]) => {
    set((_state) => ({
      disabledSchemas: disabledSchemas,
    }));
  },
  setProblem: (problem: Problem) => {
    const problemValidation = ProblemSchema.safeParse(problem);
    // TODO: Do we need to add a check for the problem changing?

    if (problemValidation.success) {
      set((_state) => ({
        problem: problem,
      }));
      return {
        problemValid: true,
        problemStatusMsg: "Problem Loaded",
      };
    }

    console.error("Problem Validation Errors in: ", problem);
    return {
      problemValid: false,
      problemStatusMsg: generateErrorMessage(problemValidation.error.issues),
    };
  },

  setStudent: (student: Student) => {
    set((_state) => ({
      student: student,
    }));
  },

  setSession: (session: Session) => {
    set((_state) => ({
      session: session,
    }));
  },

  heartbeat: async () => {
    heartbeat(set, get);
  },

  initSession: async () => {
    return await initSession(set, get);
  },

  submitTTable: async (knowns: string[], unknowns: string[]) => {
    set((state) => ({
      session: {
        ...state.session,
        knowns: knowns,
        unknowns: unknowns,
      },
    }));
    return await submitTTable(set, get, knowns, unknowns);
  },

  submitPickSchema: async (schema: string) => {
    set((state) => ({
      session: {
        ...state.session,
        schema: schema,
      },
    }));
    return await submitPickSchema(set, get, schema);
  },

  submitOrganize: async (equation: string) => {
    set((state) => ({
      session: {
        ...state.session,
        equation: equation,
      },
    }));
    return await submitOrganize(set, get, equation);
  },
  submitExplanation: async (type: string) => {
    set((state) => ({
      session: {
        ...state.session,
        selectedExplanation: type,
      },
    }));
  },

  getHint: async () => {
    return await getHint(set, get);
  },

  closeSession: async () => {
    return await closeSession(set, get);
  },

  saveTrace: async (comment: string) => {
    return await saveTrace(set, get, comment);
  },

  logAction: (action: string) => {
    const actionLog: LogItem = {
      timestamp: new Date(),
      action: action,
    };
    set((state) => ({
      studentLog: [...state.studentLog, actionLog],
    }));
  },
  setOnComplete: (onComplete: () => void) => {
    set((_state) => ({
      onComplete: onComplete,
    }));
  },
}));
