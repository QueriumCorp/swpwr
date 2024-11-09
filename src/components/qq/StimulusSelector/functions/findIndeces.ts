export function findIndexes(str: string, pattern: string): number[] {
  // escape special characters in the pattern
  const regexPattern = pattern.replace(/\$/g, '\\$')

  const indexes = []
  let match
  const regex = new RegExp(regexPattern, 'gi')

  while ((match = regex.exec(str)) !== null) {
    indexes.push(match.index)
  }

  return indexes
}
