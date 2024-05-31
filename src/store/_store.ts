import { create } from "zustand";
import { Problem, Student, Session, LogItem, State } from "./_types";
import heartbeat from "./heartbeat";

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
    set((state) => ({
      problem: problem,
      student: student,
    }));

    const theProblem = {
      appKey: problem.appKey,
      studentId: student.studentId,
      id: problem.id,
      title: problem.title,
      definition: problem.question,
      stimulus: problem.stimulus,
      topic: problem.class,
      hints: [],
    };

    const response = await fetch("http://localhost:3002/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(theProblem),
    });
    const data = await response.json();
    console.info(response.status, data);
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
