import vocalize from '@/lib/speech'
import { HiMiniSpeakerWave } from 'react-icons/hi2'

function handleSpeak(
  evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  text: string,
) {
  vocalize(text, evt.altKey ? true : false)
}
export default function SpeakButton({ text }: { text: string }) {
  return (
    <button className="border-none text-xs" onClick={e => handleSpeak(e, text)}>
      <HiMiniSpeakerWave className="text-cyan-900" />
    </button>
  )
}
