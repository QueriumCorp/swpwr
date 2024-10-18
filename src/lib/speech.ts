import { makeVocalizable } from './utils'
import AudioManager from './audio'

import { useProblemStore } from '@/store/_store'

// const voiceId = 'FGY2WhTYpPnrIDTdsKH5'
// const voiceName = 'Laura'
// const voiceId = 'EXAVITQu4vr4xnSDxMaL'
// const voiceName = 'Sarah'
// const voiceId = '9BWtsMINqrJLrRacOk9x'
// const voiceName = 'Aria'
// const voiceId = 'pFZP5JQG7iQjIQuC4Bku'
// const voiceName = 'Lily'
// const voiceId = 'cgSgspJ2msm6clMCkdW9'
// const voiceName = 'Jessica'
// const voiceId = 'XrExE9yKIg1WjnnlVkGX'
// const voiceName = 'Matilda'
// const voiceId = 'Xb7hH8MSUJpSbSDYk0k2'
// const voiceName = 'Alice'

async function vocalize(message: string, finishedCallback?: () => void) {
  const voiceId = useProblemStore.getState().voiceId || 'cgSgspJ2msm6clMCkdW9'
  const voiceName = useProblemStore.getState().voiceName || 'Jessica'

  const swapiUrl =
    import.meta.env.VITE_SWAPI ||
    useProblemStore.getState().swapiUrl ||
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
      voiceId,
      voiceName,
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
        voiceId,
        voiceName,
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

export async function vocalizeList(
  messages: string[],
  finishedCallback?: () => void,
) {
  const voiceId = useProblemStore.getState().voiceId || 'cgSgspJ2msm6clMCkdW9'
  const voiceName = useProblemStore.getState().voiceName || 'Jessica'

  const swapiUrl =
    import.meta.env.VITE_SWAPI ||
    useProblemStore.getState().swapiUrl ||
    'https://swapi2.onrender.com'

  for (const message of messages) {
    const msgText = makeVocalizable(message)

    // Ask SWAPI for the audio
    let data = await fetch(`${swapiUrl}/getVocalization`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        appKey: 'JiraTestPage',
        text: msgText,
        voiceId,
        voiceName,
      }),
    })

    if (data.status == 200) {
      const resp = await data.json()

      const audio = AudioManager.getInstance()

      // stop playing any audio that might be playing
      audio.pause()

      // play the audio
      await audio.playSync('data:audio/mp3;base64,' + resp.audio)
    }
  }

  if (finishedCallback) {
    finishedCallback()
  }
}
export default vocalize
