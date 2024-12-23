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
import { initializeValue } from '../initializeValue'

const TotalEditor: FC<{
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
  const [p1, setP1] = useState<string>(initializeValue('P1', initialValues))
  const [p2, setP2] = useState<string>(initializeValue('P2', initialValues))
  const [t, setT] = useState<string>(initializeValue('T', initialValues))

  //
  // Side Effects
  //
  useEffect(() => {
    if (!onChange) return

    // If any are blank, equation is blank and disable Next
    if (p1.length === 0 || p2.length === 0 || t.length === 0) onChange('', [])

    onChange(`${p1}\\plus${p2}=${t}`, [
      { variable: 'P1', value: p1 === 'P1' ? null : p1 },
      { variable: 'P2', value: p2 === 'P2' ? null : p2 },
      { variable: 'T', value: t === 'T' ? null : t },
    ])
  }, [p1, p2, t])

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
      switch (event.over.id) {
        case 'PART1':
          value = 'P1'
          break
        case 'PART2':
          value = 'P2'
          break
        case 'TOTAL':
          value = 'T'
          break
      }
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
          <TotalEquationGraphic p1={p1} p2={p2} t={t} />
        </div>
      </DndContext>
    </div>
  )
}

TotalEditor.displayName = 'TotalEditor'
export default TotalEditor
