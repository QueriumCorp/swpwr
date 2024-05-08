import { createContext } from "react";

export type NavContextType = {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
};

export const NavContext = createContext<NavContextType | null>(null);
