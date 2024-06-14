import { create } from "zustand";
import { Problem, Student, LogItem, State } from "./_types";
import heartbeat from "./heartbeat";
import initSession from "./initSession";
import submitTTable from "./submitT-Table";
import getHint from "./getHint";
import submitPickSchema from "./submitPickSchema";
import closeSession from "./closeSession";
import saveTrace from "./saveTrace";

export const useProblemStore = create<State>((set, get) => ({
  ///////////////////////////////////////////////////////////////////
  // DATA
  ///////////////////////////////////////////////////////////////////

  swapiUrl: "https://swapi2.onrender.com",
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
    finalAnswer: "",
  },
  studentLog: [],

  ///////////////////////////////////////////////////////////////////
  // METHODS
  ///////////////////////////////////////////////////////////////////

  setSwapiUrl: (url: string) => {
    set((_state) => ({
      swapiUrl: url,
    }));
  },

  heartbeat: async () => {
    heartbeat(set, get);
  },

  initSession: async (problem: Problem, student: Student) => {
    set((_state) => ({
      problem: problem,
      student: student,
    }));
    initSession(set, get);
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
}));
