// React Imports
import React, { useEffect, useRef, useState, ChangeEvent } from 'react'

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

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

const InputPanel = () => {
  ///////////////////////////////////////////////////////////////////
  // Contexts
  ///////////////////////////////////////////////////////////////////
  const session = React.useContext(SessionContext)
  if (!session) throw new Error('No SessionContext.Provider in the tree')
  const enableShowMe = useStore(session, s => s.enableShowMe)
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
      <div className="flex w-full items-center rounded-full bg-slate-300 py-2">
        {enableShowMe ? <ShowMe className="ml-3"></ShowMe> : null}
        <Hint className="ml-0"></Hint>
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
            borderRadius: '6px',
          }}
        >
          {value}
        </math-field>
        <Submit className="mr-3" value={value} />
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
