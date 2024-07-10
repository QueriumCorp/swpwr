import { useState } from "react";
import { AnimeTutor } from "../AnimeTutor";
import { ChatBubble } from "../qq/ChatBubble/ChatBubble";

type HintStage = "intro" | "psHints" | "aiHints" | "none";

export const TinyTutor = ({
  intro,
  psHints,
  className,
  getHint,
}: {
  intro?: string | string[];
  psHints?: string[];
  className?: string;
  getHint?: () => string;
}) => {
  //
  console.info("TinyTutor", { intro, psHints });
  // Prepare messages
  let introMsgs = normalizeIntro(intro);
  let psHintsMsgs = normalizePsHints(psHints);
  let aiHintsMsgs: string[] = [];
  let thinkingMsgs: string[] = ["Thinking..."];

  // State
  const [currentHintIndex, setCurrentHintIndex] = useState(-1);
  const [hintStage, setHintStage] = useState<HintStage>(
    intro ? "intro" : psHints ? "psHints" : getHint ? "aiHints" : "none",
  );
  const [bubbleShown, setBubbleShow] = useState(
    introMsgs.length ? true : false,
  );

  // Effects

  // Handlers
  function closeChatBubble() {
    setBubbleShow(false);
  }

  function nextHintStage() {
    if (hintStage === "intro") {
      setHintStage("psHints");
      setBubbleShow(true);
    } else if (hintStage === "psHints") {
      if (getHint) {
        //   getHint().then;
        aiHintsMsgs = ["Pretend this comes from qEval"];
        setBubbleShow(true);
      } else {
        setHintStage("none");
        setBubbleShow(false);
      }
    } else if (hintStage === "aiHints") {
      setHintStage("none");
      setBubbleShow(false);
    } else if (hintStage === "none") {
      setHintStage(
        intro ? "intro" : psHints ? "psHints" : getHint ? "aiHints" : "none",
      );
      setBubbleShow(false);
    }
  }

  //
  // JSX
  //

  function StagedChatBubble() {
    switch (hintStage) {
      case "intro":
        return (
          <ChatBubble
            className="font-irishGrover absolute right-[200px] bottom-[50%] h-fit w-fit min-h-[64px]"
            msgs={bubbleShown ? introMsgs : null}
            closeClicked={closeChatBubble}
          />
        );
      case "psHints":
        return (
          <ChatBubble
            className="font-irishGrover absolute right-[200px] bottom-[50%] h-fit w-fit min-h-[64px]"
            msgs={bubbleShown ? psHintsMsgs : null}
            closeClicked={closeChatBubble}
          />
        );
      case "aiHints":
        return (
          <ChatBubble
            className="font-irishGrover absolute right-[200px] bottom-[50%] h-fit w-fit min-h-[64px]"
            msgs={bubbleShown ? aiHintsMsgs : null}
            closeClicked={closeChatBubble}
          />
        );
    }
  }

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
        className="absolute h-full bottom-0 right-[100px] w-[100px] z-10 cursor-pointer"
        onClick={() => {
          console.info("Next Hint Stage");
          nextHintStage();
        }}
      ></div>
      <StagedChatBubble />
    </div>
  );
};

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
