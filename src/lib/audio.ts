const AudioManager = (function () {
  let instance: {
    play: (src: string) => void
    playSync: (src: string) => Promise<unknown>
    pause: () => void
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

      playSync: (src: string) => {
        return new Promise(function (resolve, reject) {
          // return a promise
          audio.preload = 'auto' // intend to play through
          audio.autoplay = true // autoplay when loaded
          audio.onerror = reject // on error, reject
          audio.onended = resolve // when done, resolve

          audio.src = src
        })
      },

      pause: () => audio.pause(),
      // ... other audio control methods

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
