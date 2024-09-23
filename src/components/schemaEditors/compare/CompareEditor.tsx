// React Imports
import { FC, ReactNode, useContext, useEffect, useState } from 'react'

// Third-party Imports
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'

// Querium Imports
import { cn } from '@/lib/utils'
import { NavContext, NavContextType } from '@/NavContext'
import { useProblemStore } from '@/store/_store'
import { CompareEquationGraphic } from './CompareEquationGraphic'
import { FactChicklet } from '@/components/qq/FactChicklet'

const CompareEditor: FC<{
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
  const [s, setS] = useState<string>('')
  const [m, setM] = useState<string>('')
  const [p, setP] = useState<string>('')
  console.log('CompareEditor', s, m, p)
  //
  // Side Effects
  //
  useEffect(() => {
    if (!onChange) return

    // If any are blank, equation is blank and disable Next
    if (s.length === 0 || m.length === 0 || p.length === 0) onChange('', [])
    console.info(`${s}\\times${m}=${p}`)
    onChange(`${s}\\times${m}=${p}`, [
      { variable: 'S', value: s === 'S' ? null : s },
      { variable: 'M', value: m === 'M' ? null : m },
      { variable: 'P', value: p === 'P' ? null : p },
    ])
  }, [s, m, p])

  //
  // Event Handlers
  //
  function handleDragEnd(event: DragEndEvent) {
    console.log('handleDragEnd', event)
    if (!event.over) return

    const rawValue = event.active.id as string
    if (!rawValue) return

    // Find fractional number or whole number
    const fractionRegex = /\d+\s\d+\/\d+/
    const wholeNumberRegex = /(-?\d+(\.\d+)?)/
    let values = rawValue.match(fractionRegex)
    if (!values) {
      values = rawValue.match(wholeNumberRegex)
    }

    // if no value found, use the box identifier
    let value
    if (!values) {
      value = event.over.id as string
    } else {
      value = values[0]
    }

    switch (event.over.id) {
      case 'S':
        setS(value)
        break
      case 'M':
        setM(value)
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
    <div className={cn('CompareEditor', 'z-10', className)}>
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
          <CompareEquationGraphic s={s} m={m} p={p} />
        </div>
      </DndContext>
    </div>
  )
}

CompareEditor.displayName = 'CompareEditor'
export default CompareEditor
