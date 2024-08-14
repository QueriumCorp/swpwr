import { useEffect, useState } from "react";
import { AnimeTutor } from "../AnimeTutor";
import { ChatBubble } from "../qq/ChatBubble/ChatBubble";
import { cn } from "@/lib/utils";

type HintStage = "intro" | "psHints" | "aiHints" | "none";

export const TinyTutor = ({
  msg,
  busy,
  intro,
  psHints,
  wpHints,
  aiHints,
  getAiHints,
  className,
}: {
  msg?: string;
  busy?: boolean;
  intro?: string | string[];
  psHints?: string[];
  wpHints?: string[];
  aiHints?: string[];
  getAiHints?: () => void;
  className?: string;
}) => {
  ///////////////////////////////////////////////////////////////////
  // Prepare messages
  ///////////////////////////////////////////////////////////////////

  let introMsgs = normalizeIntro(intro);
  let psHintsMsgs = normalizePsHints(wpHints || psHints);
  let aiHintsMsgs = normalizePsHints(aiHints);
  let hintStages: HintStage[] = ["none"];
  if (introMsgs.length) hintStages.push("intro");
  if (psHintsMsgs.length) hintStages.push("psHints");
  if (getAiHints) hintStages.push("aiHints");

  ///////////////////////////////////////////////////////////////////
  // Store
  ///////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  const [hintStage, setHintStage] = useState<HintStage>("none");
  const [bubbleShown, setBubbleShow] = useState(
    introMsgs.length ? true : false,
  );

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (aiHints && aiHints?.length > 0) {
      setHintStage("aiHints");
      setBubbleShow(true);
    }
  }, [aiHints]);

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  function closeChatBubble() {
    setBubbleShow(false);
  }

  function nextHintStage() {
    if (busy) {
      return;
    }
    let stageIndex = hintStages.findIndex((stage) => stage === hintStage);
    stageIndex = stageIndex == hintStages.length - 1 ? 0 : stageIndex + 1;
    const nextStage = hintStages[stageIndex];
    if (nextStage === "aiHints" && getAiHints) {
      getAiHints();
    }

    setHintStage(nextStage);
    setBubbleShow(nextStage === "none" ? false : true);
  }

  ///////////////////////////////////////////////////////////////////
  // JSX Support Components
  ///////////////////////////////////////////////////////////////////

  function StagedChatBubble() {
    console.log("StagedChatBubble", hintStage);
    switch (hintStage) {
      case "intro":
        return (
          <ChatBubble
            className="font-irishGrover absolute right-[200px] bottom-[50%] h-fit w-fit min-h-[64px]"
            msgs={bubbleShown ? introMsgs : null}
            closeable={true}
            closeClicked={closeChatBubble}
          />
        );
      case "psHints":
        return (
          <ChatBubble
            className="font-irishGrover absolute right-[200px] bottom-[50%] h-fit w-fit min-h-[64px]"
            msgs={bubbleShown ? psHintsMsgs : null}
            closeable={true}
            closeClicked={closeChatBubble}
          />
        );
      case "aiHints":
        return (
          <ChatBubble
            className="font-irishGrover absolute right-[200px] bottom-[50%] h-fit w-fit min-h-[64px]"
            msgs={bubbleShown ? aiHintsMsgs : null}
            closeable={true}
            closeClicked={closeChatBubble}
          />
        );
      case "none":
        return null;
    }
  }

  ///////////////////////////////////////////////////////////////////
  // JSX
  ///////////////////////////////////////////////////////////////////

  return (
    <div className={className}>
      <AnimeTutor
        emote={"wave:01"}
        style={{
          bottom: "0px",
          right: "0px",
          height: "100%",
          // border: "solid 1px red",
        }}
      />
      <div
        className={cn(
          "absolute h-full bottom-0 right-[100px] w-[100px] z-10",
          busy ? "cursor-wait" : "cursor-pointer",
        )}
        onClick={() => {
          console.info("Next Hint Stage");
          nextHintStage();
        }}
      ></div>
      {msg?.length ? (
        <ChatBubble
          className="font-irishGrover absolute right-[200px] bottom-[50%] h-fit w-fit min-h-[64px]"
          msgs={[msg]}
          closeable={true}
          closeClicked={closeChatBubble}
        />
      ) : (
        <StagedChatBubble />
      )}
    </div>
  );
};

///////////////////////////////////////////////////////////////////
// Support Functions
///////////////////////////////////////////////////////////////////

function normalizeIntro(intro: string | string[] | undefined): string[] {
  if (typeof intro === "string") {
    return [intro];
  } else if (Array.isArray(intro)) {
    return intro;
  } else {
    return [];
  }
}

function normalizePsHints(psHints: string | string[] | undefined): string[] {
  if (typeof psHints === "string") {
    return [psHints];
  } else if (Array.isArray(psHints)) {
    return psHints;
  } else {
    return [];
  }
}
