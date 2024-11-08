export function getTextFromSelectionNodes(): string {
  const selection: Selection | null = window.getSelection()
  let text: string = ''

  if (selection && selection.rangeCount > 0) {
    const range: Range = selection.getRangeAt(0)
    let node: Node | null = range.startContainer

    while (node) {
      if (node.nodeType === Node.TEXT_NODE) {
        // If the node is a text node, append its text content
        const textNode = node as Text
        const startOffset =
          node === range.startContainer ? range.startOffset : 0
        const endOffset =
          node === range.endContainer ? range.endOffset : textNode.length
        text += textNode.textContent?.substring(startOffset, endOffset) || ''
      }

      // Move to the next node in the range
      if (node === range.endContainer) {
        break
      } else if (node.firstChild) {
        node = node.firstChild
      } else {
        while (node && !node.nextSibling) {
          node = node.parentNode
          if (node === range.commonAncestorContainer) {
            node = null
            break
          }
        }
        node = node?.nextSibling || null
      }
    }
  }

  return text
}
