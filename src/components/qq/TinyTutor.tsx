import { useEffect, useState } from "react";
import { AnimeTutor } from "../AnimeTutor";
import { ChatBubble } from "../qq/ChatBubble/ChatBubble";
import { useProblemStore } from "@/store/_store";

type HintStage = "intro" | "psHints" | "aiHints" | "none";

export const TinyTutor = ({
  intro,
  psHints,
  aiHints,
  className,
}: {
  intro?: string | string[];
  psHints?: string[];
  aiHints?: boolean;
  className?: string;
}) => {
  // TODO: If we have problemSpecificHints, we'll show those instead of the psHints
  // TODO: Once the student clicked Next, we only provide aiHints
  // TODO: aiHints will be ondemand
  //
  console.info("TinyTutor", { intro, psHints });
  // Prepare messages
  let introMsgs = normalizeIntro(intro);
  let psHintsMsgs = normalizePsHints(psHints);

  // Store
  const { getHint, logAction } = useProblemStore();

  // State
  const [aiHintMsgs, setAiHintMsgs] = useState<string[]>([]);
  const [hintStage, setHintStage] = useState<HintStage>(
    intro ? "intro" : psHints ? "psHints" : aiHints ? "aiHints" : "none",
  );
  const [bubbleShown, setBubbleShow] = useState(
    introMsgs.length ? true : false,
  );
  const [thinking, setThinking] = useState<string>("");

  // Effects
  useEffect(() => {
    const fetchAiHints = async () => {
      const aiHints: string[] = ["an aiHint1", "an aiHint2", "an aiHint3"];
      let i = 0;
      while (i < 3) {
        const hint = await getHint();
        if (!hint) {
          break;
        }
        aiHints.push(hint);
        i++;
      }
      setAiHintMsgs(aiHints);
    };
    if (aiHints) {
      fetchAiHints().catch((err) => {
        console.error("Error fetching ai hints", err);
        setAiHintMsgs([]);
      });
    }
  }, []);

  // Handlers
  function closeChatBubble() {
    setBubbleShow(false);
  }

  function nextHintStage() {
    if (hintStage === "intro") {
      setHintStage("psHints");
      setBubbleShow(true);
    } else if (hintStage === "psHints") {
      if (aiHints) {
        setHintStage("aiHints");
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
        intro ? "intro" : psHints ? "psHints" : aiHints ? "aiHints" : "none",
      );
      setBubbleShow(false);
    }
  }

  // Event Handlers
  async function HandleGetHint() {
    setThinking("Hmmm...  Let me see");
    logAction("Getting aiHints");
    const aiHints = await getHint();
    setThinking("");
    setAiHintMsgs(aiHintMsgs.concat(aiHints));
  }

  //
  // JSX Support Components
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
            msgs={bubbleShown ? aiHintMsgs : null}
            closeClicked={closeChatBubble}
          />
        );
      case "none":
        return null;
    }
  }

  //
  // JSX
  //
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
      {thinking.length ? (
        <ChatBubble
          className="font-irishGrover absolute right-[200px] bottom-[50%] h-fit w-fit min-h-[64px]"
          msgs={[thinking]}
          closeClicked={closeChatBubble}
        />
      ) : null}
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
