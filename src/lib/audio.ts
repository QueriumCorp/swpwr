const AudioManager = (function () {
  let instance: {
    play: (src: string) => void
    pause: () => void
    onended: unknown
    addEventListener: (event: string, callback: (event: Event) => void) => void
    removeEventListener: (
      event: string,
      callback: (event: Event) => void,
    ) => void
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

      onended: audio.onended,

      addEventListener: (event: string, callback: (event: Event) => void) => {
        audio.addEventListener(event, callback)
      },
      removeEventListener: (
        event: string,
        callback: (event: Event) => void,
      ) => {
        audio.removeEventListener(event, callback)
      },
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

export default AudioManager
