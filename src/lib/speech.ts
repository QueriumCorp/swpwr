import { makeVocalizable } from './utils'

const synth = window.speechSynthesis
let voices: SpeechSynthesisVoice[]
let englishFemaleVoices: SpeechSynthesisVoice[]
let selectedVoice: SpeechSynthesisVoice

export function initSpeechSystem() {
  voices = synth.getVoices()

  // Find English Female Voice on Chrome OS
  englishFemaleVoices = voices.filter(voice => {
    if (voice.lang === 'en-GB' && voice.name.includes('Female')) {
      return voice
    }
  })
  if (englishFemaleVoices.length > 0) {
    selectedVoice = englishFemaleVoices[0]
    return
  }

  // Find English Female Voice on Chrome OS
  let ChromeOsVoices = voices.filter(voice => {
    if (voice.name.includes('Chrome OS US English 1')) {
      return voice
    }
  })
  if (ChromeOsVoices.length > 0) {
    selectedVoice = ChromeOsVoices[0]
    return
  }

  // Find English Female Voice on Chrome OS
  ChromeOsVoices = voices.filter(voice => {
    if (voice.name.includes('Chrome OS US English 3')) {
      return voice
    }
  })
  if (ChromeOsVoices.length > 0) {
    selectedVoice = ChromeOsVoices[0]
    return
  }
}

async function vocalize(message: string, finishedCallback?: () => void) {
  const swapiUrl =
    import.meta.env.VITE_SWAPI ||
    window.swpwr.options.swapiUrl ||
    'https://swapi2.onrender.com'

  const data = await fetch(`${swapiUrl}/getVocalization`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      appKey: 'JiraTestPage',
      text: message,
    }),
  })
  const resp = await data.json()

  const audio = new Audio('data:audio/mp3;base64,' + resp.audio)
  audio.play()
  audio.onended = () => {
    if (finishedCallback) {
      finishedCallback()
    }
  }
}
export default vocalize
