import { useContext, useLayoutEffect, useRef } from "react";
import { SessionContext } from "../stores/sessionContext";
import { useStore } from "zustand";
import { renderMathInElement } from "mathlive";

const Stimulus = () => {
  //
  // CONTEXT
  //
  const session = useContext(SessionContext);
  if (!session) throw new Error("No SessionContext.Provider in the tree");

  //
  // Refs
  //
  const latexRef = useRef(null);

  //
  // Side Effects
  //
  // on initial render, tell MathLive to render the latex
  useLayoutEffect(() => {
    console.log("Stimulus.tsx: useLayoutEffect()");
    if (latexRef.current) {
      renderMathInElement(latexRef.current, {
        TeX: {
          delimiters: {
            // Allow math formulas surrounded by $$...$$ for display or \(...\) for inline
            inline: [["\\(", "\\)"]],
            display: [["$$", "$$"]],
          },
        },
      });
    }
  }, []);

  const stimulus = useStore(session, (s) => s.stimulus);
  return (
    <div ref={latexRef}>
      <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
        {stimulus}!!!
      </p>
    </div>
  );
};

export default Stimulus;
