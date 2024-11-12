export function wholeWordIndexOf(
  targetString: string,
  searchText: string,
): number {
  // Escape special characters in the search text
  const escapedSearchText = escapeRegExp(searchText)

  // Create a regular expression with word boundaries
  const regex = new RegExp(`\\b${escapedSearchText}\\b`, '')

  // Find the match
  const match = targetString.match(regex)

  // Return the index of the match or -1 if not found
  return match && match.index !== undefined ? match.index : -1
}

// Helper function to escape special characters in the search text
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
