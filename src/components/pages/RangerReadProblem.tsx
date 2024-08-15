"use client";

// React Imports
import { useContext, useEffect, useState } from "react";

// Querium Imports
import { cn } from "@/lib/utils";
import { type YBRpage } from "../qq/YellowBrickRoad";
import { NavContext, NavContextType } from "@/NavContext";
import { NavBar } from "../qq/NavBar";
import { CarouselNext } from "../ui/carousel";
import { StimulusSelector } from "../qq/StimulusSelector";
import { HdrBar } from "../qq/HdrBar";
import { useProblemStore } from "@/store/_store";
import { TinyTutor } from "../qq/TinyTutor";

const RangerReadProblem: React.FC<{
  className?: string;
  children?: React.ReactNode;
  page: YBRpage;
  index: number;
}> = ({ className, page, index }) => {
  ///////////////////////////////////////////////////////////////////
  // Contexts
  ///////////////////////////////////////////////////////////////////

  const { api, current } = useContext(NavContext) as NavContextType;

  ///////////////////////////////////////////////////////////////////
  // Store
  ///////////////////////////////////////////////////////////////////

  const { logAction, problem, rank, initSession, session, getHint } =
    useProblemStore();

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  const [busy, setBusy] = useState(true);
  const [msg, setMsg] = useState<string>(
    "Please read the problem while I get things ready to go.",
  );
  const wpHints = problem.wpHints?.find(
    (wpHint) => wpHint.page === `${rank}:${page.id}`,
  );
  const [aiHints, setAiHints] = useState<string[]>([]);

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  useEffect(() => {
    console.info("INITSESSION!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    initSession();
  }, []);

  useEffect(() => {
    if (session.sessionToken.length > 0) {
      setBusy(false);
      setMsg("");
    }
  }, [session]);

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  async function getAiHints() {
    setMsg("Hmmm...  let me see.");
    const hints = [];
    hints.push(await getHint());
    setMsg("");
    setAiHints(hints);
  }

  ///////////////////////////////////////////////////////////////////
  // JSX
  ///////////////////////////////////////////////////////////////////

  if (current !== index + 1) return null;
  return (
    <div
      className={cn(
        "RangerReadProblem",
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        "w-full h-full m-0 p-0 flex flex-col justify-stretch",
        className,
      )}
    >
      <HdrBar
        highlightLetter={page?.phase}
        subTitle={page?.phaseLabel}
        instructions={page?.title}
      ></HdrBar>
      <div className="flex flex-col p-2 gap-2 justify-stretch grow relative">
        <StimulusSelector
          className={cn(
            "flex",
            "w-full rounded-md border border-input bg-slate-200 px-3 py-2",
            "text-sm ring-offset-background placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
            "inline",
          )}
          stimulusText={problem.stimulus}
        ></StimulusSelector>

        <div className="flex grow gap-2"></div>
      </div>
      <NavBar className="flex justify-end pr-2 space-x-3 bg-slate-300 relative">
        <TinyTutor
          msg={msg}
          busy={busy}
          intro={page?.intro}
          psHints={page?.psHints}
          wpHints={wpHints?.hints}
          aiHints={aiHints}
          getAiHints={getAiHints}
        />
        <CarouselNext disabled={busy} className="relative right-0">
          Next
        </CarouselNext>
        <h1 className="absolute bottom-0 left-0 text-slate-500">
          RangerReadProblem
        </h1>
      </NavBar>
    </div>
  );
};
RangerReadProblem.displayName = "RangerReadProblem";
export default RangerReadProblem;

///////////////////////////////////////////////////////////////////
// Support Functions
///////////////////////////////////////////////////////////////////
