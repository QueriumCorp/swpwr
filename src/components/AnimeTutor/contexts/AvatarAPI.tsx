import { createContext, useContext, useState } from "react";

export type Emote = {
  name: string;
  variants: string[];
};

type RawEmote = {
  name: string;
  variant: string;
};

export type AvatarAPIType = {
  msg: string | null;
  emote: string | null;
  setEmote: React.Dispatch<React.SetStateAction<string>>;
  emotes: Emote[];
  setEmotes: React.Dispatch<React.SetStateAction<Emote[]>>;
  sayMsg: (message: string, emote: string, variant?: string) => void;
};

const AvatarAPIContext = createContext<AvatarAPIType | null>(null);

export function parseEmotes(emotes: string[]) {
  const rawListOfEmotes = emotes
    .map((emote) => parseEmote(emote))
    .filter((emote) => emote.name.length > 0);

  let unique_emote_names = [
    ...new Set(rawListOfEmotes.map((element) => element.name)),
  ];

  const listOfParsedEmotes: Emote[] = [];

  unique_emote_names.forEach((emoteName) => {
    const variants = rawListOfEmotes.filter(
      (emote) => emote.name === emoteName,
    );
    listOfParsedEmotes.push({
      name: emoteName,
      variants: variants.map((variant) => variant.variant),
    });
  });

  console.info("Parsed Emotes:", listOfParsedEmotes);
  return listOfParsedEmotes;
}

function parseEmote(emoteStr: string) {
  const parts = emoteStr.split(":");
  if (parts.length != 2 || parts[0]?.length == 0 || parts[1]?.length == 0)
    return { name: "", variant: "" };

  const emote = parts[0];
  const variant = parts[1];

  return { name: emote, variant: variant } as RawEmote;
}

export declare interface AvatarAPIProviderProps {
  children?: React.ReactNode; // best, accepts everything React can render
}

export const AvatarAPIProvider = (props: AvatarAPIProviderProps) => {
  const [msg, setMsg] = useState<string | null>(null);
  const [emote, setEmote] = useState<string>("idle:01");
  const [emotes, setEmotes] = useState<Emote[]>([]);

  function sayMsg(message: string, emote: string, variant?: string) {
    console.log("sayMsg:", message, emote, variant);

    setMsg(message);
    if (typeof variant === "string" && variant.length === 2) {
      setEmote(`${emote}:${variant}`);
    } else {
      const emoteCandidates = emotes.filter(
        (focusedRemote) => focusedRemote.name === emote,
      );
      if (emoteCandidates.length === 0) return;

      const targetEmote = emoteCandidates[0];
      if (!targetEmote) return;

      const randomVariantIndex = Math.floor(
        Math.random() * targetEmote.variants.length,
      );
      const newEmote = `${emote}:${targetEmote.variants[randomVariantIndex]}`;
      console.info("New Emote:", newEmote);
      setEmote(newEmote);
    }
  }

  return (
    <AvatarAPIContext.Provider
      value={{
        msg,
        emote,
        setEmote,
        emotes,
        setEmotes,
        sayMsg,
      }}
    >
      {props.children}
    </AvatarAPIContext.Provider>
  );
};

export const useAvatarAPI = () => {
  return useContext(AvatarAPIContext);
};
