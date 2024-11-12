import {
  SentenceInfo,
  splitIntoSentences,
} from '@/components/qq/StimulusSelector/functions/Sentences'
import { type Highlight } from '@/store/_types'
import { claim } from './claim'
import { wholeWordIndexOf } from './wholeWordIndexOf'

export function createHighlightClaims(
  stimulusText: string | undefined,
  rawHighlights: Highlight[],
) {
  if (!stimulusText || !rawHighlights) return ''

  let stimulusClaims: string = 'createHighlightClaims'

  // enhance and sort highlights array
  let highlights = sortAndEnhanceHighlights(rawHighlights)

  // get sentences
  let sentences = splitIntoSentences(stimulusText).map(
    sentence => sentence.sentence,
  )

  // create sentenceClaims initialized to 0
  let sentenceClaims = createUnscoreFilledCopies(sentences)

  // Find and claim for longest string highlight (longStr). Mark highlight done
  highlights.map(highlight => {
    // simple string
    if (
      highlight.type === 'string' &&
      typeof highlight.highlight === 'string'
    ) {
      let factoid = highlight.highlight as string
      let found = false
      sentences.some((sentence, index) => {
        // Look for the factoid in this sentence
        let offset = sentence.indexOf(factoid)

        /* TODO: NEED CHECK TO MAKE SURE NOT CLAIMED!!! */

        // Is the factoid in this sentence?
        if (offset !== -1) {
          found = true
          highlight.done = true
          sentenceClaims[index] = claim(
            sentenceClaims[index],
            offset,
            factoid.length,
            highlight.index,
          )
        }
      })
    }

    // [value, unit]
    if (highlight.type === 'valueUnit') {
      // define regex to find value some whitespace and unit
      const regex = new RegExp(
        `${highlight.highlight[0]}\\s+${highlight.highlight[1]}`,
      )

      // check each sentence
      sentences.some((sentence, index) => {
        let offset, length
        // is the value unit combo in this sentence?
        if (regex.test(sentence)) {
          offset = sentence.search(regex)
          let unitOffset = sentence.indexOf(highlight.highlight[1], offset)
          length = unitOffset + highlight.highlight[1].length - offset

          highlight.done = true
          sentenceClaims[index] = claim(
            sentenceClaims[index],
            offset,
            length,
            highlight.index,
          )
        }
        //
        else {
          // is just the value a whole word in this sentence?
          let value = highlight.highlight[0]
          offset = wholeWordIndexOf(sentence, value)
          length = value.length
          highlight.done = true
          sentenceClaims[index] = claim(
            sentenceClaims[index],
            offset,
            length,
            highlight.index,
          )
        }
      })
    }
  })

  // Find and claim for valueUnit highlights. Mark highlight done

  // Concat sentence arrays into stimulusClaims

  return sentenceClaims.join('')
}

// TEST

// console.info(
//   createHighlightClaims(
//     'Minh spent $6.25 on 5  sticker books to give his nephews. Find the cost of each sticker book.',
//     [['5', 'sticker books'], 'Find the cost of each sticker book.', '$6.25'],
//   ),
// )

export function sortAndEnhanceHighlights(rawHighlights: unknown): Highlight[] {
  let sortedHighlights = sortHighlights(rawHighlights as Highlight[])
  let highlights: unknown = sortedHighlights.map((highlight, index) => {
    return {
      highlight: highlight,
      index: String.fromCharCode(65 + index),
      type: Array.isArray(highlight) ? 'valueUnit' : 'string',
      done: false,
    }
  })
  return highlights as Highlight[]
}

// sortHighlights
function sortHighlights(highlights: Highlight[]): Highlight[] {
  return highlights.sort((a, b) => {
    // If both are strings
    if (a.type === 'string' && b.type === 'string') {
      return b.highlight.length - a.highlight.length // Sort by descending length
    }

    // If 'a' is a string and 'b' is an array, 'a' should come first
    if (a.type === 'string' && b.type === 'valueUnit') {
      return -1
    }

    // If 'a' is an array and 'b' is a string, 'b' should come first
    if (a.type === 'valueUnit' && b.type === 'string') {
      return 1
    }

    // If both are arrays, maintain their original order
    return 0
  })
}

function createUnscoreFilledCopies(strings: string[]): string[] {
  return strings.map(str => '_'.repeat(str.length))
}

function fragmentSentences(paragraph: string) {
  // @ts-ignore - Intl.Segmenter is not known to TypeScript
  const segmenter = new Intl.Segmenter('en', { granularity: 'sentence' })
  return segmenter.segment(paragraph)
}
