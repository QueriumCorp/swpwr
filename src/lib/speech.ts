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
    if (voice.name.includes('Chrome OS UK English 2')) {
      return voice
    }
  })
  if (ChromeOsVoices.length > 0) {
    selectedVoice = ChromeOsVoices[0]
    return
  }

  // Find English Female Voice on Chrome OS
  ChromeOsVoices = voices.filter(voice => {
    if (voice.name.includes('Chrome OS US English 5')) {
      return voice
    }
  })
  if (ChromeOsVoices.length > 0) {
    selectedVoice = ChromeOsVoices[0]
    return
  }
}

function vocalize(message: string) {
  console.info('selectedVoice', selectedVoice)
  // cancel any current speech
  speechSynthesis.cancel()

  if (!message) {
    return
  }

  // remove crap from message
  const msg2Vocalize = message.replace(/\*\*/g, '') // double asterisks

  const utterance = new SpeechSynthesisUtterance(makeVocalizable(msg2Vocalize))
  utterance.lang = 'en-US'
  utterance.voice = selectedVoice
  utterance.rate = 1
  utterance.pitch = 1
  utterance.volume = 1

  speechSynthesis.speak(utterance)
}
export default vocalize
