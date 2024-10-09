import { makeVocalizable } from './utils'
import AudioManager from './audio'

async function vocalize(message: string, finishedCallback?: () => void) {
  const swapiUrl =
    import.meta.env.VITE_SWAPI ||
    window.swpwr.options.swapiUrl ||
    'https://swapi2.onrender.com'

  const msgText = makeVocalizable(message)

  let data = await fetch(`${swapiUrl}/getVocalization`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      appKey: 'JiraTestPage',
      text: msgText,
    }),
  })

  if (data.status !== 200) {
    console.error('getVocalization failed:', data)
    const data2 = await fetch(`${swapiUrl}/getVocalization`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        appKey: 'JiraTestPage',
        text: msgText,
      }),
    })
    if (data2.status == 200) {
      console.log('second attempt getVocalization successed:', data2)
      data = data2
    } else {
      console.error('getVocalization failed again:', data2)
    }
  }

  if (data.status == 200) {
    const resp = await data.json()

    const audio = AudioManager.getInstance()

    // stop playing any audio that might be playing
    audio.pause()

    // setup callback to run when audio is finished playing
    if (finishedCallback) {
      audio.addEventListener('ended', () => {
        audio.removeEventListener('ended', finishedCallback)
        finishedCallback()
      })
    }

    // play the audio
    audio.play('data:audio/mp3;base64,' + resp.audio)

    return resp
  } else {
    if (finishedCallback) {
      finishedCallback()
    }
    return data
  }
}
export default vocalize
