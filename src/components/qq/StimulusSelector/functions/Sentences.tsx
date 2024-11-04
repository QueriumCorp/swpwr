export interface SentenceInfo {
  sentence: string
  startIndex: number
  endIndex: number
}

export function splitIntoSentences(paragraph: string): SentenceInfo[] {
  // @ts-ignore - Intl.Segmenter is not known to TypeScript
  const segmenter = new Intl.Segmenter('en', { granularity: 'sentence' })
  const segments = segmenter.segment(paragraph)

  const sentences: SentenceInfo[] = []
  let currentIndex = 0

  for (const { segment, index } of segments) {
    sentences.push({
      sentence: segment.trim(),
      startIndex: index,
      endIndex: index + segment.length - 1,
    })
    currentIndex = index + segment.length
  }

  return sentences
}
