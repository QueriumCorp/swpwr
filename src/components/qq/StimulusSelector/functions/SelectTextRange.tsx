export function selectTextRange(
  element: HTMLElement,
  start: number,
  end: number,
): void {
  if (window.getSelection && document.createRange) {
    const selection: Selection | null = window.getSelection()
    const range: Range = document.createRange()
    const textNodes: Node[] = getTextNodes(element)
    let currentLength: number = 0
    let startNode: Node | null = null
    let startOffset: number = 0
    let endNode: Node | null = null
    let endOffset: number = 0

    // Find start and end nodes and offsets
    for (let i: number = 0; i < textNodes.length; i++) {
      const nodeLength: number = textNodes[i].textContent?.length || 0
      if (!startNode && currentLength + nodeLength > start) {
        startNode = textNodes[i]
        startOffset = start - currentLength
      }
      if (!endNode && currentLength + nodeLength >= end) {
        endNode = textNodes[i]
        endOffset = end - currentLength
        break
      }
      currentLength += nodeLength
    }

    // Set the range
    if (startNode && endNode && selection) {
      range.setStart(startNode, startOffset)
      range.setEnd(endNode, endOffset)
      selection.removeAllRanges()
      selection.addRange(range)
    }
  }
}

// Helper function to get all text nodes within an element
function getTextNodes(node: Node): Node[] {
  const textNodes: Node[] = []
  if (node.nodeType === Node.TEXT_NODE) {
    textNodes.push(node)
  } else {
    const children: NodeListOf<ChildNode> = node.childNodes
    for (let i: number = 0; i < children.length; i++) {
      textNodes.push(...getTextNodes(children[i]))
    }
  }
  return textNodes
}
