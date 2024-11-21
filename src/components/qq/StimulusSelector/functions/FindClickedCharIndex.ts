/*
  We are using document.caretPositionFromPoint or document.caretRangeFromPoint 
  depending on browser support. But their future support is not guaranteed. So
  leaving these two other paths for this functionality in case the current
  ones are removed.
*/

export function findClickedCharIndex(div: HTMLDivElement, clientX: number) {
  const rect = div.getBoundingClientRect()
  const x = clientX - rect.left

  const range = document.createRange()
  const textNode = div.firstChild
  if (!textNode) return

  let low = 0
  // @ts-ignore
  let high = textNode.length
  let mid

  while (low < high) {
    mid = Math.floor((low + high) / 2)
    range.setStart(textNode, 0)
    range.setEnd(textNode, mid)

    if (range.getBoundingClientRect().width <= x) {
      low = mid + 1
    } else {
      high = mid
    }
  }

  console.log(`Clicked character index: ${low - 1}`)
}

// THIS DOESNT WORK. I THINK IT COULD WITH SOME WORK.
export function highlightClickedChar(
  div: HTMLDivElement,
  clickLoc: { x: number; y: number },
): void {
  const rect: DOMRect = div.getBoundingClientRect()
  const x: number = clickLoc.x - rect.left
  const y: number = clickLoc.y - rect.top

  const range: Range = document.createRange()
  const textNode: Node | null = div.firstChild

  if (!textNode || textNode.nodeType !== Node.TEXT_NODE) {
    console.error('The div must contain a text node as its first child')
    return
  }

  let low: number = 0
  let high: number = textNode.textContent?.length || 0
  let mid: number

  // Find the line
  while (low < high) {
    mid = Math.floor((low + high) / 2)
    range.setStart(textNode, 0)
    range.setEnd(textNode, mid)

    if (range.getBoundingClientRect().bottom <= y) {
      low = mid + 1
    } else {
      high = mid
    }
  }

  const lineStartIndex: number = low - 1
  range.setStart(textNode, lineStartIndex)
  range.setEnd(textNode, lineStartIndex)

  // Find the character within the line
  while (
    range.getBoundingClientRect().right <= x &&
    range.endOffset < (textNode.textContent?.length || 0)
  ) {
    range.setEnd(textNode, range.endOffset + 1)
  }

  // Highlight the character
  const selection: Selection | null = window.getSelection()
  if (selection) {
    selection.removeAllRanges()
    selection.addRange(range)
  }

  console.log(
    `Clicked character: "${textNode.textContent?.[range.endOffset - 1] || ''}"`,
  )
}
