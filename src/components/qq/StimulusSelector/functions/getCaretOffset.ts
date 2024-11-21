declare global {
  type CaretPosition = {
    offsetNode: Node
    offset: number
  }

  interface Document {
    caretPositionFromPoint?(x: number, y: number): CaretPosition
  }
}

export function getCaretOffset(evt: React.PointerEvent<HTMLDivElement>) {
  let range
  let textNode
  let offset

  if (document.caretPositionFromPoint) {
    range = document.caretPositionFromPoint(evt.clientX, evt.clientY)
    textNode = range.offsetNode
    offset = range.offset
  } else if (document.caretRangeFromPoint) {
    // Use WebKit-proprietary fallback method
    range = document.caretRangeFromPoint(evt.clientX, evt.clientY)
    if (!range) {
      return -1
    }
    textNode = range.startContainer
    offset = range.startOffset
  } else {
    // Neither method is supported, do nothing
    return -1
  }
  return offset
}
