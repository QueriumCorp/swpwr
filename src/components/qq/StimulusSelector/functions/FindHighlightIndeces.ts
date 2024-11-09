import { type Highlight } from '@/store/_types'
import { type SentenceInfo } from './Sentences'

export function findHighlightIndeces(
  sentence: SentenceInfo | undefined,
  highlights: Highlight[],
) {
  let start,
    end: number = 0
  let highlight: Highlight | null = null

  if (highlights.length === 0 || !sentence) {
    return { start: 0, end: 0, highlight: '' }
  }

  highlights.some(element => {
    if (typeof element === 'string') {
      start = sentence.sentence.indexOf(element)
      if (start > -1) {
        end = start + element.length
        highlight = element
        return true // exit the loop
      }
    } else if (Array.isArray(element)) {
      // must be array of two strings
      let s = sentence.sentence
      let e0 = element[0]
      let start0 = s.indexOf(e0)
      let e1 = element[1]
      let start1 = s.indexOf(e1)

      if (start0 > -1 && start1 > -1) {
        // if both are found
        start = start0 > start1 ? start1 : start0
        end = start0 > start1 ? start1 + e0.length : start1 + e1.length
        return true // exit the loop
      }
    }
  })

  return { start, end, highlight }
}
