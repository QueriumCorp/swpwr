// React Imports
import React, { useEffect, useRef, useState, ChangeEvent, FC } from 'react'

// Querium Imports
import { SessionContext } from '../stores/sessionContext'
import { useStore } from 'zustand'

import { Submit } from './Submit/Submit'
import { Hint } from './Hint/Hint'
import { ShowMe } from './ShowMe/ShowMe'
import Keyboard from './Keyboard/Keyboard'

import './MathEditor.css'

import type { MathfieldElement, Selector } from 'mathlive'
import { MathViewRef } from '../types/mathlive'
import { Operator } from '../stores/solution'
import { cn } from '@/lib/utils'

/* eslint-disable */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'math-field': React.DetailedHTMLProps<
        React.HTMLAttributes<MathfieldElement>,
        MathfieldElement
      >
    }
  }
}
/* eslint-enable */

export interface InputPanelProps {
  onStepChange?: (step: string) => void
}
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

const InputPanel: FC<InputPanelProps> = ({ onStepChange }) => {
  ///////////////////////////////////////////////////////////////////
  // Contexts
  ///////////////////////////////////////////////////////////////////
  const session = React.useContext(SessionContext)
  if (!session) throw new Error('No SessionContext.Provider in the tree')
  const enableShowMe = useStore(session, s => s.enableShowMe)
  const displayHintButton = useStore(session, s => s.displayHintButton)
  const displaySubmitButton = useStore(session, s => s.displaySubmitButton)
  const identifiers = useStore(session, s => s.identifiers)
  const operators = useStore(session, s => s.operators)
  const submitStep = useStore(session, s => s.submitStep)
  const setEditingStep = useStore(session, s => s.setEditingStep)

  ///////////////////////////////////////////////////////////////////
  // Refs
  ///////////////////////////////////////////////////////////////////

  const mf = useRef<MathViewRef>(null)

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  const [value, setValue] = useState<string>('')

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  useEffect(() => {
    // submitStep on enter
    if (mf.current) {
      mf.current.mathVirtualKeyboardPolicy = 'manual'
      mf.current.addEventListener('beforeinput', evt => {
        if (evt.inputType === 'insertLineBreak' && mf.current) {
          submitStep(mf.current.value)
          evt.preventDefault()
        }
      })
    }
  }, [])

  useEffect(() => {
    setEditingStep(value)
    if (typeof onStepChange === 'function') {
      onStepChange(value)
    }
  }, [value])

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  const handleKeyPress = (operator: Operator) => {
    let cmd
    switch (operator.method) {
      case 'char':
        mf.current?.executeCommand(['insert', operator.latex])
        break
      case 'latex':
        mf.current?.executeCommand([
          'insert',
          operator.latex,
          { focus: true, selectionMode: 'placeholder' },
        ])

        break
      case 'identifier':
        mf.current?.executeCommand(['insert', operator.operator])
        break
      case 'cmd':
        mf.current?.executeCommand(operator.operator as Selector)
        break
      case 'enter':
        if (mf.current) {
          submitStep(mf.current.value)
        }
        break
      default:
        break
    }
    mf.current?.focus()
  }

  ///////////////////////////////////////////////////////////////////
  // JSX
  ///////////////////////////////////////////////////////////////////

  return (
    <>
      <div
        className={cn(
          'flex w-full max-w-[640px] items-center rounded-full bg-slate-100 py-2',
          displayHintButton ? '' : 'px-4',
        )}
      >
        {enableShowMe ? <ShowMe className="ml-3"></ShowMe> : null}
        {displayHintButton ? <Hint className="ml-0"></Hint> : null}
        <math-field
          ref={mf}
          onInput={(evt: React.FormEvent<MathfieldElement>) =>
            setValue(evt.currentTarget.value)
          }
          style={{
            flexGrow: 1,
            boxSizing: 'border-box',
            background: 'white',
            border: '1px white solid',
            borderRadius: '9999px',
            marginLeft: '-8px',
            paddingLeft: '16px',
            marginRight: '-8px',
          }}
        ></math-field>
        {displaySubmitButton ? <Submit className="mr-3" value={value} /> : null}
      </div>
      <Keyboard
        identifiers={identifiers}
        operators={operators}
        onKeyPress={key => handleKeyPress(key)}
      />
    </>
  )
}

export default InputPanel
