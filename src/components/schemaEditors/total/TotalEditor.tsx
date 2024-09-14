// React Imports
import { FC, ReactNode, useContext, useEffect, useState } from 'react'

// Third-party Imports
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'

// Querium Imports
import { cn } from '@/lib/utils'
import { NavContext, NavContextType } from '@/NavContext'
import { useProblemStore } from '@/store/_store'
import { TotalEquationGraphic } from './TotalEquationGraphic'
import { FactChicklet } from '@/components/qq/FactChicklet'

const TotalEditor: FC<{
  onChange?: (latex: string, values: string[]) => void
  className?: string
  children?: ReactNode
}> = ({ onChange, className }) => {
  //
  // Nav Context
  //
  const { api, current } = useContext(NavContext) as NavContextType

  //
  // Store
  //
  const { session } = useProblemStore()

  //
  // State
  //
  const [p1, setP1] = useState<string>('')
  const [p2, setP2] = useState<string>('')
  const [t, setT] = useState<string>('')

  //
  // Side Effects
  //
  useEffect(() => {
    if (!onChange) return

    // If any are blank, equation is blank and disable Next
    if (p1.length === 0 || p2.length === 0 || t.length === 0) onChange('', [])

    onChange(`${p1}\\plus${p2}=${t}`, [p1, p2, t])
  }, [p1, p2, t])

  //
  // Event Handlers
  //
  function handleDragEnd(event: DragEndEvent) {
    if (!event.over) return

    const rawValue = event.active.id as string
    if (!rawValue) return

    let values = rawValue.match(/(-?\d+(\.\d+)?)/)

    // if no value found, use the box identifier
    let value
    if (!values) {
      value = event.over.id as string
    } else {
      value = values[0]
    }

    switch (event.over.id) {
      // Schema Editor
      case 'P1':
        setP1(value)
        break
      case 'P2':
        setP2(value)
        break
      case 'T':
        setT(value)
        break

      // Equation Editor
      case 'PART1':
        setP1(value)
        break
      case 'PART2':
        setP2(value)
        break
      case 'TOTAL':
        setT(value)
        break
    }
  }

  //
  // JSX
  //
  return (
    <div className={cn('TotalEditor', 'z-10', className)}>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grow grid-cols-2 gap-2">
          <Card className="">
            <CardHeader className="pb-2">
              <CardTitle>Known</CardTitle>
            </CardHeader>
            <CardContent>
              {session.knowns ? (
                <ul>
                  {session.knowns.map(known => (
                    <FactChicklet key={known} fact={known}></FactChicklet>
                  ))}
                </ul>
              ) : null}
            </CardContent>
          </Card>
          <Card className="">
            <CardHeader className="pb-2">
              <CardTitle>Unknown</CardTitle>
            </CardHeader>
            <CardContent>
              {session.unknowns ? (
                <ul>
                  {session.unknowns.map(unknown => (
                    <FactChicklet key={unknown} fact={unknown}></FactChicklet>
                  ))}
                </ul>
              ) : null}
            </CardContent>
          </Card>
        </div>

        <div className={cn('DROPZONE', 'mt-5')}>
          <TotalEquationGraphic p1={p1} p2={p2} t={t} />
        </div>
      </DndContext>
    </div>
  )
}

TotalEditor.displayName = 'TotalEditor'
export default TotalEditor
