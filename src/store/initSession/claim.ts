export function claim(
  str: string,
  startIndex: number,
  length: number,
  replaceWith: string,
): string {
  // Ensure the start index is within the string bounds
  if (startIndex < 0 || startIndex >= str.length) {
    return str
  }

  // Calculate the end index, ensuring it doesn't exceed the string length
  const endIndex = Math.min(startIndex + length, str.length)

  // Construct the new string
  return (
    str.slice(0, startIndex) +
    replaceWith.padEnd(endIndex - startIndex, replaceWith) +
    str.slice(endIndex)
  )
}
