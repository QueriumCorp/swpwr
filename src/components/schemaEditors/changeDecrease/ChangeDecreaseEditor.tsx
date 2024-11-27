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
  let S = initialValues.find(el => el.variable == 'S')?.value
  S = typeof S == 'string' ? S : S == null ? 'S' : ''

  let C = initialValues.find(el => el.variable == 'C')?.value
  C = typeof C == 'string' ? C : C == null ? 'C' : ''

  let E = initialValues.find(el => el.variable == 'E')?.value
  E = typeof E == 'string' ? E : E == null ? 'E' : ''
  const [s, setS] = useState<string>(S)
  const [c, setC] = useState<string>(C)
  const [e, setE] = useState<string>(E)

  //
  // Side Effects
  //
  useEffect(() => {
    if (!onChange) return

    // If any are blank, equation is blank and disable Next
    if (s.length === 0 || c.length === 0 || e.length === 0) onChange('', [])

    onChange(`${s}\\minus${c}\=${e}`, [
      { variable: 'S', value: s === 'S' ? null : s },
      { variable: 'C', value: c === 'C' ? null : c },
      { variable: 'E', value: e === 'E' ? null : e },
    ])
  }, [s, c, e])

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
          <ChangeDecreaseEquationGraphic c={c} e={e} s={s} />
        </div>
      </DndContext>
    </div>
  )
}

ChangeDecreaseEditor.displayName = 'ChangeDecreaseEditor'
export default ChangeDecreaseEditor
