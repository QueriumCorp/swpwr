// React Imports
import { FC, ReactNode, useContext, useEffect, useState } from 'react'

// Third-party Imports
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'

// Querium Imports
import { cn } from '@/lib/utils'
import { NavContext, NavContextType } from '@/NavContext'
import { useProblemStore } from '@/store/_store'
import { EqualGroupsEquationGraphic } from './EqualGroupsEquationGraphic'
import { FactChicklet } from '@/components/qq/FactChicklet'

const EqualGroupsEditor: FC<{
  onChange?: (
    latex: string,
    values: { variable: string; value: string | null }[],
  ) => void
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
  const [g, setG] = useState<string>('')
  const [n, setN] = useState<string>('')
  const [p, setP] = useState<string>('')

  //
  // Side Effects
  //
  useEffect(() => {
    if (!onChange) return

    // If any are blank, equation is blank and disable Next
    if (g.length === 0 || n.length === 0 || p.length === 0) onChange('', [])

    onChange(`${g}\\times${n}=${p}`, [
      { variable: 'G', value: g === 'G' ? null : g },
      { variable: 'N', value: n === 'N' ? null : n },
      { variable: 'P', value: p === 'P' ? null : p },
    ])
  }, [g, n, p])

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
    } else {
      value = values[0]
    }

    switch (event.over.id) {
      case 'G':
        setG(value)
        break
      case 'N':
        setN(value)
        break
      case 'P':
        setP(value)
        break
    }
  }

  //
  // JSX
  //
  return (
    <div className={cn('EqualGroupsEditor', 'z-10', className)}>
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
                <ul className="flex flex-wrap gap-2">
                  {session.unknowns.map(unknown => (
                    <FactChicklet key={unknown} fact={unknown}></FactChicklet>
                  ))}
                </ul>
              ) : null}
            </CardContent>
          </Card>
        </div>

        <div className={cn('DROPZONE', 'mt-5')}>
          <EqualGroupsEquationGraphic g={g} n={n} p={p} />
        </div>
      </DndContext>
    </div>
  )
}

EqualGroupsEditor.displayName = 'EqualGroupsEditor'
export default EqualGroupsEditor
