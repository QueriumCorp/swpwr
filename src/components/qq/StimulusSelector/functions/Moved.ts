export function Moved(
  startPos: { x: number; y: number },
  endPos: { x: number; y: number },
) {
  let pointedMoveDistance = Math.hypot(
    endPos.x - startPos.x,
    endPos.y - startPos.y,
  )
  return pointedMoveDistance > 5
}
