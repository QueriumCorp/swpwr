import { type Highlight } from '@/store/_types'
import { findIndexes, findWholeWordPositions } from './findIndeces'

// TODO: We could make this a lot more sophissticated by filtering out
// the highlights by the sentence that contains the caretOffset.

// TODO: We could make this more sophisticated by considering the
// end of the highlight string as well as the beginning.

/*
export function findHighlightIndeces(
  caretOffset: number,
  sentence: string,
  highlights: Highlight[],
) {
  // if no caretOffset, return
  if (caretOffset === -1 || highlights.length === 0) {
    return { start: 0, end: Infinity, highlight: '' }
  }

  let start = 0,
    end: number = 0
  let highlight: Highlight | null = null

  if (highlights.length === 0 || !sentence) {
    return { start: 0, end: Infinity, highlight: '' }
  }

  // score each highlight for distance from caretOffset.
  // 0 is exact match while Infinity is no match.
  // Other values are character distance from caretOffset.
  const scores = highlights.map(element => {
    // highlight is a string
    if (typeof element === 'string') {
      let matches = findIndexes(sentence, element)
      if (matches.length == 1) {
        return Math.abs(matches[0] - caretOffset)
      } else if (matches.length > 1) {
        // find the closest match
        let closest = Infinity
        for (let i = 0; i < matches.length; i++) {
          let distance = Math.abs(matches[i] - caretOffset)
          if (distance < closest) {
            closest = distance
          }
        }
        return closest
      } else {
        return Infinity
      }
    }

    //  highlight is an array of two strings
    else if (Array.isArray(element)) {
      let matches0 = findIndexes(sentence, element[0])
      let matches1 = findIndexes(sentence, element[1])

      if (matches0.length == 0 || matches1.length == 0) {
        // at least one wasn't found
        return Infinity
      } else {
        // find the closest match for match0
        let closest0 = Infinity
        for (let i = 0; i < matches0.length; i++) {
          let distance = Math.abs(matches0[i] - caretOffset)
          if (distance < closest0) {
            closest0 = distance
          }
        }
        // find the closest match for match0
        let closest1 = Infinity
        for (let i = 0; i < matches1.length; i++) {
          let distance = Math.abs(matches1[i] - caretOffset)
          if (distance < closest1) {
            closest1 = distance
          }
        }
        return Math.min(closest0, closest1)
      }
    }
    return Infinity
  })

  console.info('caretOffset:', caretOffset)
  highlights.forEach((element, index) => {
    console.info(JSON.stringify(element), scores[index])
  })

  if (!scores) {
    return { start: 0, end: Infinity, highlight: '' }
  }

  const bestHighlight = highlights[indexOfSmallest(scores)]
  console.info('bestHighlight', bestHighlight)

  // Now find the start and end of the highlight
  if (typeof bestHighlight === 'string') {
    let matches = findIndexes(sentence, bestHighlight)
    if (matches.length == 1) {
      start = matches[0]
      end = start + bestHighlight.length
    } else if (matches.length > 1) {
      // find the closest match
      let closest = Infinity
      let bestMatch = 0
      for (let i = 0; i < matches.length; i++) {
        let distance = Math.abs(matches[i] - caretOffset)
        if (distance < closest) {
          closest = distance
          bestMatch = i
        }
      }
      start = matches[0]
      end = start + bestHighlight.length
    }
  } else {
    // find the closest match for match0
    let start0 = 0,
      end0 = 0
    let matches0 = findIndexes(sentence, bestHighlight[0])
    let closest0 = Infinity
    for (let i = 0; i < matches0.length; i++) {
      let distance = Math.abs(matches0[i] - caretOffset)
      if (distance < closest0) {
        closest0 = distance
        start0 = matches0[i]
        end0 = start0 + bestHighlight[0].length
      }
    }

    // find the closest match for match0
    let start1 = 0,
      end1 = 0
    let matches1 = findIndexes(sentence, bestHighlight[1])
    let closest1 = Infinity
    for (let i = 0; i < matches1.length; i++) {
      let distance = Math.abs(matches1[i] - caretOffset)
      if (distance < closest1) {
        closest1 = distance
        start1 = matches1[i]
        end1 = start1 + bestHighlight[1].length
      }
    }
    start = Math.min(start0, start1)
    end = Math.max(end0, end1)
  }
  return { start, end, bestHighlight }
}
*/

export function findHighlightIndeces(
  caretOffset: number,
  claims: string,
  highlights: Highlight[],
) {
  // if no caretOffset, return
  if (caretOffset === -1 || highlights.length === 0) {
    return { start: 0, end: Infinity, highlight: '' }
  }

  let highlight: Highlight | null = null

  if (highlights.length === 0 || !claims) {
    return { start: 0, end: Infinity, highlight: '' }
  }

  let claimKey = claims.charAt(caretOffset)
  console.log(claimKey)
  let start = caretOffset
  let end = caretOffset
  if (claimKey !== '_') {
    while (claims.charAt(start) == claimKey && start >= 0) {
      start--
    }
    start++
    while (claims.charAt(end) == claimKey && end < claims.length) {
      end++
    }
  }
  let bestHighlight = highlights.find(highlight => highlight.index == claimKey)
  return { start, end, bestHighlight }
}

function indexOfSmallest(arr: number[]) {
  if (arr.length === 0) {
    return -1 // Return -1 for an empty array
  }

  let minIndex = 0
  let minValue = arr[0]

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < minValue) {
      minValue = arr[i]
      minIndex = i
    }
  }

  return minIndex
}
