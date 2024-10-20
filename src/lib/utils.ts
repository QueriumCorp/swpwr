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

  // Convert currency to spoken form
  const dollarsRegex = /\$\d+(\.\d{2})?/g
  const matches = noIcons.match(dollarsRegex) // find all dollar amounts
  const converted = matches?.map(match => {
    // convert to spoken form
    return currencyToWords(match)
  })
  let dollarized = noIcons
  matches?.forEach((match, index) => {
    // substitute back in
    dollarized = dollarized.replace(match, converted![index])
  })
  return dollarized
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

function currencyToWords(amount: string): string {
  // Remove $ and commas, then convert to a number
  const num: number = parseFloat(amount.replace(/[$,]/g, ''))

  if (isNaN(num)) return 'Invalid amount'

  const dollars: number = Math.floor(num)
  const cents: number = Math.round((num - dollars) * 100)

  const numberToWords = (n: number): string => {
    const ones: string[] = [
      '',
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
    ]
    const tens: string[] = [
      '',
      '',
      'twenty',
      'thirty',
      'forty',
      'fifty',
      'sixty',
      'seventy',
      'eighty',
      'ninety',
    ]
    const teens: string[] = [
      'ten',
      'eleven',
      'twelve',
      'thirteen',
      'fourteen',
      'fifteen',
      'sixteen',
      'seventeen',
      'eighteen',
      'nineteen',
    ]
    const scales: string[] = ['', 'thousand', 'million']

    if (n === 0) return ''
    if (n < 10) return ones[n]
    if (n < 20) return teens[n - 10]
    if (n < 100)
      return `${tens[Math.floor(n / 10)]}${n % 10 !== 0 ? '-' + ones[n % 10] : ''}`
    if (n < 1000)
      return `${ones[Math.floor(n / 100)]} hundred${n % 100 !== 0 ? ' ' + numberToWords(n % 100) : ''}`

    let result: string = ''
    let scaleIndex: number = 0
    while (n > 0) {
      if (n % 1000 !== 0) {
        result = `${numberToWords(n % 1000)} ${scales[scaleIndex]} ${result}`
      }
      n = Math.floor(n / 1000)
      scaleIndex++
    }
    return result.trim()
  }

  let result: string = ''

  if (dollars === 0 && cents === 0) {
    return 'zero dollars'
  }

  if (dollars > 0) {
    result += `${numberToWords(dollars)} dollar${dollars !== 1 ? 's' : ''}`
  }

  if (cents > 0) {
    if (dollars > 0) result += ' and '
    result += `${numberToWords(cents)} cent${cents !== 1 ? 's' : ''}`
  }

  return result
}
