import { create } from "zustand";
import { Problem, Student, Session, LogItem, State } from "./_types";
import heartbeat from "./heartbeat";
import initSession from "./initSession";
import submitTTable from "./submitT-Table";
import getHint from "./getHint";
import submitPickSchema from "./submitPickSchema";

export const useProblemStore = create<State>((set, get) => ({
  ///////////////////////////////////////////////////////////////////
  // DATA
  ///////////////////////////////////////////////////////////////////

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
