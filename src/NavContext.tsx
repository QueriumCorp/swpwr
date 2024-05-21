import { createContext } from "react";

import { type CarouselApi } from "./components/ui/carousel";

export type NavContextType = {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  api: CarouselApi;
};

export const NavContext = createContext<NavContextType | null>(null);
