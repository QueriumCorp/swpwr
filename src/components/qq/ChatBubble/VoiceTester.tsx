import { FormEvent, useState } from "react";
import VoiceSelector from "./VoiceSelector";
import { Button } from "@/components/ui/button";

const synth = window.speechSynthesis;

const VoiceTester = () => {
  const [textValue, setTextValue] = useState<string>("");
  const [selectedVoice, setSelectedVoice] = useState<number>(159);

  if (!synth)
    return <span>Aw... your browser does not support Speech Synthesis</span>;

  const speak = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const synth = window.speechSynthesis;
    var utterance = new SpeechSynthesisUtterance(textValue);
    utterance.voice = synth.getVoices()[selectedVoice];

    synth.speak(utterance);
  };

  return (
    <form onSubmit={speak} className="flex flex-col gap-1 p-2">
      <VoiceSelector selected={selectedVoice} setSelected={setSelectedVoice} />
      <input
        type="text"
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        className="border-2 border-slate-300 rounded-lg p-2"
        placeholder="Type something to speak"
      />
      <Button type="submit">Speak</Button>
    </form>
  );
};

export default VoiceTester;
