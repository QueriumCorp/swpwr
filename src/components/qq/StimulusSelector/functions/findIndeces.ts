export function findIndexes(str: string, pattern: string): number[] {
  // escape special characters in the pattern
  const regexPattern = pattern.replace(/\$/g, '\\$')

  const wholeNumberRegex = /\b-?\d+(\.\d+)?\b/g

  const indexes = []
  let match
  const regex = new RegExp(regexPattern, 'gi')

  while ((match = regex.exec(str)) !== null) {
    indexes.push(match.index)
  }

  return indexes
}

export function findWholeWordPositions(text: string, searchWord: string) {
  const regex = new RegExp(`\\b${searchWord}\\b`, 'gi')
  const results = []
  let match

  while ((match = regex.exec(text)) !== null) {
    results.push({
      word: match[0],
      index: match.index,
    })
  }

  return results
}
