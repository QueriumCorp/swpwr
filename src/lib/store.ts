import { create } from "zustand";

type LogItem = {
  timestamp: Date;
  action: string;
};
interface State {
  studentLog: LogItem[];
  logAction: (action: string) => void;
}

export const useStore = create<State>((set) => ({
  studentLog: [],
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
