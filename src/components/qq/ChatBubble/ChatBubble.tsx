import { useRef, useLayoutEffect, useState, useEffect } from "react";

import { renderMathInElement } from "mathlive";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";

import { cn, makeVocalizable } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

export const ChatBubble = ({
  msg,
  className,
}: {
  msg: string | string[];
  className?: string;
}) => {
  // create a reference to the DOM element containing the mixed LaTeX
  const latexRef = useRef(null);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // let vocalizable;
  // if (Array.isArray(msg)) {
  //   console.error(
  //     "ChatBubble: msg is an array so need to code to vocalizable it",
  //   );
  //   vocalizable = msg.map((msg) => makeVocalizable(msg));
  // } else {
  //   const vocalizable = makeVocalizable(msg);
  // }

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // on initial render, tell MathLive to render the latex
  useLayoutEffect(() => {
    console.log("render");
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

  // Chat Paging Button
  function handleShowMeMore() {
    api?.scrollNext();
  }
  function handleStartOver() {
    api?.scrollTo(0);
  }
  function NavButton() {
    if (current === count) {
      return (
        <button className="border-none text-xs" onClick={handleStartOver}>
          Tell me again
        </button>
      );
    }
    return (
      <button className="border-none text-xs" onClick={handleShowMeMore}>
        Show me more
      </button>
    );
  }

  // Speak Button
  function handleSpeak() {
    console.log("handleSpeak:", makeVocalizable(msg));
    // const msg2Vocalize = typeof msg === "string" ? msg : msg[0];
    // const utterance = new SpeechSynthesisUtterance(
    //   makeVocalizable(msg2Vocalize),
    // );
    // utterance.lang = "en-US";
    // utterance.rate = 1.2;
    // utterance.pitch = 1;
    // utterance.volume = 1;
    // speechSynthesis.speak(utterance);
  }
  function SpeakButton() {
    return (
      <button className="border-none text-xs" onClick={handleSpeak}>
        <HiMiniSpeakerWave className="text-cyan-900" />
      </button>
    );
  }

  if (msg && typeof msg === "string") {
    return (
      <div
        ref={latexRef}
        className={cn(
          "rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-none bg-sky-400 text-cyan-900 relative block  w-[fit-content] px-4 py-[1rem] max-w-[90%] min-h-[2.75rem] min-w-[2.75rem] ml-2",
          "before:start-[99.9%]",
          "before:[mask-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMycgaGVpZ2h0PSczJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxwYXRoIGZpbGw9J2JsYWNrJyBkPSdtIDAgMyBMIDEgMyBMIDMgMyBDIDIgMyAwIDEgMCAwJy8+PC9zdmc+)]",
          "before:absolute before:bottom-[0] before:h-[.75rem] before:w-[.75rem] before:[background-color:inherit] before:content-[''] before:[mask-size:contain] before:[mask-repeat:no-repeat] before:[mask-position:center]",
          className,
        )}
      >
        <Markdown remarkPlugins={[remarkGfm]}>{msg}</Markdown>{" "}
        <div className="text-right text-black italic mt-2 flex justify-between items-center">
          <SpeakButton></SpeakButton>
        </div>
      </div>
    );
  }
  if (msg && Array.isArray(msg)) {
    return (
      <div
        ref={latexRef}
        className={cn(
          "rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-none bg-amber-400 text-cyan-700 overflow-hidden relative block  w-[fit-content] px-4 py-[.5rem] max-w-[90%] min-h-[2.75rem] min-w-[2.75rem] ml-2",
          "before:start-[99.9%]",
          "before:[mask-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMycgaGVpZ2h0PSczJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxwYXRoIGZpbGw9J2JsYWNrJyBkPSdtIDAgMyBMIDEgMyBMIDMgMyBDIDIgMyAwIDEgMCAwJy8+PC9zdmc+)]",
          "before:absolute before:bottom-[0] before:h-[.75rem] before:w-[.75rem] before:[background-color:inherit] before:content-[''] before:[mask-size:contain] before:[mask-repeat:no-repeat] before:[mask-position:center]",
          className,
        )}
      >
        <Carousel setApi={setApi} className="w-full max-w-xs">
          <CarouselContent>
            {msg.map((m, i) => (
              <CarouselItem key={i}>
                <p key={i} className="flex flex-col gap-1">
                  {m}
                </p>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="text-right text-black italic mt-2 flex justify-between items-center">
          <SpeakButton></SpeakButton>
          <NavButton></NavButton>
        </div>
      </div>
    );
  }
  return null;
};
