import { debounce, makeVocalizable } from './utils'

let speaking = false

async function vocalize(message: string, finishedCallback?: () => void) {
  console.log('vocalize speaking:', speaking)
  if (speaking) {
    return
  }
  const swapiUrl =
    import.meta.env.VITE_SWAPI ||
    window.swpwr.options.swapiUrl ||
    'https://swapi2.onrender.com'

  const msgText = makeVocalizable(message)
  const data = await fetch(`${swapiUrl}/getVocalization`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      appKey: 'JiraTestPage',
      text: msgText,
    }),
  })
  const resp = await data.json()

  const audio = new Audio()
  audio.src = 'data:audio/mp3;base64,' + resp.audio
  speaking = true
  audio.play()
  audio.onended = () => {
    if (finishedCallback) {
      speaking = false
      finishedCallback()
    }
  }
}
export default vocalize
