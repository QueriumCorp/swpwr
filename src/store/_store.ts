import { create } from "zustand";
import { Problem, Student, Session, LogItem, State } from "./_types";
import heartbeat from "./heartbeat";
import initSession from "./initSession";
import submitTTable from "./submitT-Table";
import getHint from "./getHint";

export const useProblemStore = create<State>((set, get) => ({
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
  },
  studentLog: [],

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
    return await submitTTable(set, get, knowns, unknowns);
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
