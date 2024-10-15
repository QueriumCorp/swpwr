import { type ClassValue, clsx } from 'clsx'
import { convertLatexToSpeakableText } from 'mathlive'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// splits [STIMULUS] and [EXPLANATION] into a message list
export function splitMessages(
  text: string,
  stimulus?: string,
  explanation?: string,
) {
  let messages = []
  const stimTag = '[STIMULUS]'
  const stimLen = stimTag.length
  const explTag = '[EXPLANATION]'
  const explLen = explTag.length

  // Provided a stimulus and [STIMULUS] tag in text
  const stimulusIndex = text.indexOf(stimTag)
  if (stimulus && stimulusIndex !== -1) {
    if (stimulusIndex === 0) {
      // stimulus is at the beginning
      messages.push(stimulus)
      messages.push(text.slice(stimLen))
    } else if (stimulusIndex >= text.length - stimLen) {
      // stimulus is at the end
      messages.push(text.slice(0, stimulusIndex))
      messages.push(stimulus)
    } else {
      // stimulus is in the middle
      messages = text.split(stimTag)
      messages.splice(1, 0, stimulus)
    }
    return messages
  }

  // Provided an explanation and [EXPLANATION] tag in text
  let explanationIndex = text.indexOf(explTag)
  if (explanation && explanationIndex !== -1) {
    if (explanationIndex === 0) {
      // explanation is at the beginning
      messages.push(explanation)
      messages.push(text.slice(explLen))
    } else if (explanationIndex >= text.length - explLen) {
      // explanation is at the end
      messages.push(text.slice(0, explanationIndex))
      messages.push(explanation)
    } else {
      // explanation is in the middle
      messages = text.split(explTag)
      messages.splice(1, 0, explanation)
    }
    return messages
  }

  // Nothing to do, so wrap the text in an array so vocalizeList can process it
  return [text]
}

// converts LaTeX in a string into a vocalizable string
export function makeVocalizable(text: string) {
  // inline LaTeX delimiters "\\(", "\\)"
  // display LaTeX delimiters "$$", "$$"
  let chunks = []
  let index = 0
  const inlineStartRegEx = /\\+\(/
  const inlineEndRegEx = /\\+\)/

  // INLINE - split into plain and latex chunks
  while (index !== -1) {
    let start = regexIndexOf(text, inlineStartRegEx, index)
    let end = regexIndexOf(text, inlineEndRegEx, index)

    if (start !== -1 && end !== -1) {
      // non-LaTeX chunk
      chunks.push(text.slice(index, start))
      // LaTeX chunk
      let latexChunk = text.slice(start + 1, end)
      let firstChar = latexChunk.indexOf('(')
      chunks.push(
        convertLatexToSpeakableText(latexChunk.slice(firstChar + 1, end)),
      )
      index = text.indexOf(')', end) + 1
    } else {
      // trailing non-LaTeX chunk
      chunks.push(text.slice(index))
      break
    }
  }
  let inlined = chunks.join('')

  // DISPLAY - split into plain and latex chunks
  chunks = []
  index = 0
  while (index !== -1) {
    let start = inlined.indexOf('$$', index)
    let end = inlined.indexOf('$$', start + 1)

    if (start !== -1 && end !== -1) {
      // non-LaTeX chunk
      chunks.push(inlined.slice(index, start))
      // LaTeX chunk
      chunks.push(convertLatexToSpeakableText(inlined.slice(start + 2, end)))
      index = end + 2
    } else {
      // trailing non-LaTeX chunk
      chunks.push(inlined.slice(index))
      break
    }
  }
  const noLatex = chunks.join('')

  // Remove Markdown
  const noMarkdown = noLatex.replace(/\*\*/g, '')

  // Substitute labels for icons
  const noIcons = noMarkdown
    .replace(/\[MORE\]/g, 'the more button')
    .replace(/▶️/g, 'play')
    .replace(/➜/g, 'the arrow button')
    .replace(/\\"/g, '')
    .replace(/Read\s/g, 'Reed ')
    .replace(/✔/g, 'the check button')
    .replace(/\n1\.\s/g, ' <break time="0.5s" /> ')

  return noIcons
}

function regexIndexOf(string: string, regex: RegExp, startpos: number) {
  var indexOf = string.substring(startpos || 0).search(regex)
  return indexOf >= 0 ? indexOf + (startpos || 0) : indexOf
}

function regexLastIndexOf(string: string, regex: RegExp, startpos: number) {
  regex = regex.global
    ? regex
    : new RegExp(
        regex.source,
        'g' + (regex.ignoreCase ? 'i' : '') + (regex.multiline ? 'm' : ''),
      )
  if (typeof startpos == 'undefined') {
    startpos = string.length
  } else if (startpos < 0) {
    startpos = 0
  }
  var stringToWorkWith = string.substring(0, startpos + 1)
  var lastIndexOf = -1
  var nextStop = 0
  var result
  while ((result = regex.exec(stringToWorkWith)) != null) {
    lastIndexOf = result.index
    regex.lastIndex = ++nextStop
  }
  return lastIndexOf
}

export function shuffle<T>(array: T[]): T[] {
  if (!Array.isArray(array)) {
    return array
  }
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export const debounce = <T extends (...args: any[]) => any>(
  callback: T,
  waitFor: number,
) => {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>): ReturnType<T> => {
    let result: any
    timeout && clearTimeout(timeout)
    timeout = setTimeout(() => {
      result = callback(...args)
    }, waitFor)
    return result
  }
}

export function randomThinkingMsg() {
  const thinkingMsgs = [
    'Hmmm...  Let me see...',
    'Let me think...',
    "Let's see...",
    "Ok, I'm thinking...",
    'Just a second...',
  ]
  return thinkingMsgs[Math.floor(Math.random() * thinkingMsgs.length)]
}
export function randomClickNextMsg() {
  const clickNextMsgs = [
    'Click me if you want a hint.',
    `If you're having trouble, click me for a hint.`,
    `If you don’t know what to do, click me to get a hint.`,
    `If you’re stuck, click me for a hint.`,
    `If you want a hint, click me.`,
    `Click me to get a hint.`,
    `If you don’t see how to fix it, click me for a hint.`,
    `If you’re not sure how to fix it, click me for a hint.`,
    `If you can’t find it, click me to get a hint.`,
    `Don’t give up. Click me if you want a hint.`,
  ]
  return clickNextMsgs[Math.floor(Math.random() * clickNextMsgs.length)]
}
