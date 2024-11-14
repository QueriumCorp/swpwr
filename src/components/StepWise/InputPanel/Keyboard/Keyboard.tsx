import React from 'react'
import type { Operator } from '../../stores/solution'
import { cn } from '../../utils'
import { Key } from './Key'
import { numberKeys } from './NumberKeys'
import { stdOperators } from './StdOperators'

export type KeyboardProps = {
  identifiers: string[]
  operators: Operator[]
  onKeyPress: (key: Operator) => void
}

const Keyboard = (props: KeyboardProps) => {
  const { identifiers, operators: specialOperators, onKeyPress } = props

  return (
    <div className="h-30 mt-2 flex w-full max-w-[640px] justify-between gap-1">
      <KeyboardHalve className="grid grow grid-cols-4 grid-rows-4 gap-1">
        <KeyboardNavigators
          className="col-span-4 grid grid-cols-4 gap-1"
          keyPress={onKeyPress}
        />
        {identifiers.map(i => (
          <IdentifierKey key={i} identifier={i} keyPress={onKeyPress} />
        ))}
        {specialOperators.map(operator => (
          <Key
            className="bg-slate-100"
            key={operator.operator}
            operator={operator}
            keyPress={onKeyPress}
          />
        ))}
      </KeyboardHalve>
      <KeyboardHalve className="grid grow grid-cols-2 gap-1">
        <div className="grid grid-cols-3 grid-rows-4 gap-1">
          {numberKeys.map(operator => (
            <Key
              className="bg-qqBrand text-white"
              key={operator.operator}
              operator={operator}
              keyPress={onKeyPress}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 grid-rows-4 gap-1">
          {stdOperators.map(operator => (
            <Key
              className="bg-slate-700 text-white"
              key={operator.operator}
              operator={operator}
              keyPress={onKeyPress}
            />
          ))}
        </div>
      </KeyboardHalve>
    </div>
  )
}

export default Keyboard

const KeyboardHalve = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={className} style={props.style} {...props} />
))

type KeyboardNavigatorsProps = {
  keyPress: (key: Operator) => void
}

const KeyboardNavigators = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & KeyboardNavigatorsProps
>(({ className, keyPress }, ref) => {
  const left = {
    method: 'cmd',
    cursorShift: '',
    atomic: false,
    enabled: false,
    latex: '',
    mma: '',
    operator: 'moveToPreviousChar',
    string: '',
    symbol_latex: '',
    symbol_style: { background: 'none', fontSize: '1.5rem' },
    symbol_html: '',
    symbol_icon: 'radix:thickArrowLeft',
    symbol_img: '',
    symbol_svg: '',
    symbol_utf8: '←',
    tooltip: 'Cursor Left',
  }
  const right = {
    method: 'cmd',
    cursorShift: '',
    atomic: false,
    enabled: false,
    latex: '',
    mma: '',
    operator: 'moveToNextChar',
    string: '',
    symbol_latex: '',
    symbol_style: { background: 'none', fontSize: '1.5rem' },
    symbol_html: '',
    symbol_icon: 'radix:thickArrowRight',
    symbol_img: '',
    symbol_svg: '',
    symbol_utf8: '',
    tooltip: 'Cursor Right',
  }
  return (
    <div ref={ref} className={cn('', className)}>
      <Key
        className="border-1 col-span-2 border-2 border-slate-700 bg-white text-slate-700"
        operator={left}
        keyPress={keyPress}
      ></Key>
      <Key
        className="border-1 col-span-2 border-2 border-slate-700 bg-white text-slate-700"
        operator={right}
        keyPress={keyPress}
      ></Key>
    </div>
  )
})

type IdentifierKeyProps = {
  identifier: string
  keyPress: (key: Operator) => void
}
const IdentifierKey = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & IdentifierKeyProps
>(({ identifier, keyPress }, _ref) => {
  const identifierBase = {
    method: 'identifier',
    cursorShift: '',
    atomic: false,
    enabled: false,
    latex: '',
    mma: '',
    operator: identifier,
    string: '',
    symbol_latex: '',
    symbol_style: { background: 'none', fontSize: '1rem' },
    symbol_html: '',
    symbol_icon: '',
    symbol_img: '',
    symbol_svg: '',
    symbol_utf8: identifier,
    tooltip: `Identifier: ${identifier}`,
  }
  return (
    <Key
      className="col-span-1 bg-qqAccent"
      operator={identifierBase}
      keyPress={keyPress}
    ></Key>
  )
})
