import { type ClassValue, clsx } from 'clsx'
import { convertLatexToSpeakableText } from 'mathlive'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

  return chunks.join('')
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
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
