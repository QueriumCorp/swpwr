import React from "react";
import { SessionContext } from "../stores/sessionContext";
import { useStore } from "zustand";

const Stimulus = () => {
  const session = React.useContext(SessionContext);
  if (!session) throw new Error("No SessionContext.Provider in the tree");

  const stimulus = useStore(session, (s) => s.stimulus);
  return (
    <>
      <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
        {stimulus}
      </p>
    </>
  );
};

export default Stimulus;
