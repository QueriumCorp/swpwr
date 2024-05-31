export interface State {
  problem: Problem;
  student: Student;
  session: Session;
  studentLog: LogItem[];
  heartbeat: () => Promise<void>;
  initSession: (problem: Problem, student: Student) => void;
  logAction: (action: string) => void;
}

export type Problem = {
  appKey: string;
  id: string;
  title: string;
  stimulus: string;
  cmd: string;
  session: string;
  class: string;
  question: string;
  policies: string;
  qs1: string;
  qs2: string;
  qs3: string;
};

export type Student = {
  studentId: string;
  studentName: string;
};

export type Session = {
  sessionToken: string;
  identifiers: string[];
  operators: string[];
};

export type LogItem = {
  timestamp: Date;
  action: string;
};

export type SetFn = (
  partial: State | Partial<State> | ((state: State) => State | Partial<State>),
  replace?: boolean | undefined,
) => void;

export type GetFn = () => State;
