import { debounce, makeVocalizable } from './utils'

async function vocalize(message: string, finishedCallback?: () => void) {
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
  audio.play()
  audio.onended = () => {
    if (finishedCallback) {
      finishedCallback()
    }
  }
}
export default vocalize

const AudioManager = (function () {
  let instance: {
    play: (src: string) => void
    pause: () => void
  }

  function createInstance() {
    const audio = new Audio()
    return {
      play: (src: string) => {
        audio.src = src
        audio.play()
      },
      pause: () => audio.pause(),
      // ... other audio control methods

      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/fastSeek
    }
  }

  return {
    getInstance: () => {
      if (!instance) {
        instance = createInstance()
      }
      return instance
    },
  }
})()

const audioManager = AudioManager.getInstance()
// audioManager.play('path/to/audio.mp3')
