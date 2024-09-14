// React Imports
import { FC, ReactNode, useContext, useEffect, useState } from 'react'

// Third-party Imports
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'

// Querium Imports
import { cn } from '@/lib/utils'
import { NavContext, NavContextType } from '@/NavContext'
import { useProblemStore } from '@/store/_store'
import { ChangeDecreaseEquationGraphic } from './ChangeDecreaseEquationGraphic'
import { FactChicklet } from '@/components/qq/FactChicklet'

const ChangeDecreaseEditor: FC<{
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
  const [s, setS] = useState<string>('')
  const [c, setC] = useState<string>('')
  const [e, setE] = useState<string>('')

  //
  // Side Effects
  //
  useEffect(() => {
    if (!onChange) return

    // If any are blank, equation is blank and disable Next
    if (s.length === 0 || c.length === 0 || e.length === 0) onChange('', [])

    console.log(`${s}\\minus${c}\=${e}`)
    onChange(`${s}\\minus${c}\=${e}`, [s, c, e])
  }, [s, c, e])

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
      value = value.charAt(0).toUpperCase()
    } else {
      value = values[0]
    }

    switch (event.over.id) {
      // Schema Editor
      case 'S':
        setS(value)
        break
      case 'C':
        setC(value)
        break
      case 'E':
        setE(value)
        break

      // Equation Editor
      case 'START':
        setS(value)
        break
      case 'CHANGE':
        setC(value)
        break
      case 'END':
        setE(value)
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
          <ChangeDecreaseEquationGraphic c={c} e={e} s={s} />
        </div>
      </DndContext>
    </div>
  )
}

ChangeDecreaseEditor.displayName = 'ChangeDecreaseEditor'
export default ChangeDecreaseEditor
