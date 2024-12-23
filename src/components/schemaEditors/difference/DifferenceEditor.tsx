// React Imports
import { FC, ReactNode, useContext, useEffect, useState } from 'react'

// Third-party Imports
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'

// Querium Imports
import { cn } from '@/lib/utils'
import { NavContext, NavContextType } from '@/NavContext'
import { useProblemStore } from '@/store/_store'
import { DifferenceEquationGraphic } from './DifferenceEquationGraphic'
import { FactChicklet } from '@/components/qq/FactChicklet'
import { initializeValue } from '../initializeValue'

const DifferenceEditor: FC<{
  initialValues: { variable: string; value: string | null }[]
  onChange?: (
    latex: string,
    values: { variable: string; value: string | null }[],
  ) => void
  className?: string
  children?: ReactNode
}> = ({ initialValues, onChange, className }) => {
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
  const [l, setL] = useState<string>(initializeValue('L', initialValues))
  const [d, setD] = useState<string>(initializeValue('D', initialValues))
  const [g, setG] = useState<string>(initializeValue('G', initialValues))

  //
  // Side Effects
  //
  useEffect(() => {
    if (!onChange) return

    // If any are blank, equation is blank and disable Next
    if (l.length === 0 || d.length === 0 || g.length === 0) onChange('', [])

    onChange(`${g}\\minus${l}\=${d}`, [
      { variable: 'L', value: l == 'L' ? null : l },
      { variable: 'D', value: d == 'D' ? null : d },
      { variable: 'G', value: g == 'G' ? null : g },
    ])
  }, [l, d, g])

  //
  // Event Handlers
  //
  function handleDragEnd(event: DragEndEvent) {
    if (!event.over) return

    const rawValue = event.active.id as string
    if (!rawValue) return

    // Find fractional number or whole number
    const mixedFractionRegex = /\d+\s\d+\/\d+/
    const mixedFractionMatches = rawValue.match(mixedFractionRegex)

    const fractionRegex = /\d+\/\d+/
    const fractionMatches = rawValue.match(fractionRegex)

    const wholeNumberRegex = /(-?\d+(\.\d+)?)/
    const wholeNumberMatches = rawValue.match(wholeNumberRegex)

    let values = mixedFractionMatches ? mixedFractionMatches : null // mixed fraction
    values = values ? values : fractionMatches // fraction
    values = values ? values : wholeNumberMatches // whole number

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
      case 'L':
        setL(value)
        break
      case 'D':
        setD(value)
        break
      case 'G':
        setG(value)
        break

      // Equation Editor
      case 'LESS':
        setL(value)
        break
      case 'DIFF':
        setD(value)
        break
      case 'GREATER':
        setG(value)
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
                <ul className="flex flex-wrap gap-2">
                  {session.knowns.map(known => (
                    <FactChicklet
                      key={known}
                      fact={known}
                      className="text-xl"
                    ></FactChicklet>
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
                <ul className="flex flex-wrap gap-2">
                  {session.unknowns.map(unknown => (
                    <FactChicklet
                      key={unknown}
                      fact={unknown}
                      className="text-xl"
                    ></FactChicklet>
                  ))}
                </ul>
              ) : null}
            </CardContent>
          </Card>
        </div>

        <div className={cn('DROPZONE', 'mt-5')}>
          <DifferenceEquationGraphic l={l} d={d} g={g} />
        </div>
      </DndContext>
    </div>
  )
}

DifferenceEditor.displayName = 'DifferenceEditor'
export default DifferenceEditor
