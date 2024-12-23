//  React Imports
import { useContext, useLayoutEffect, useRef } from 'react'

// Querium Imports
import { SessionContext } from '../stores/sessionContext'
import { useStore } from 'zustand'
import { renderMathInElement } from 'mathlive'

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

const Stimulus = () => {
  ///////////////////////////////////////////////////////////////////
  // Contexts
  ///////////////////////////////////////////////////////////////////

  const session = useContext(SessionContext)
  if (!session) throw new Error('No SessionContext.Provider in the tree')

  ///////////////////////////////////////////////////////////////////
  // Store
  ///////////////////////////////////////////////////////////////////

  const stimulus = useStore(session, s => s.stimulus)

  ///////////////////////////////////////////////////////////////////
  // Refs
  ///////////////////////////////////////////////////////////////////
  const latexRef = useRef(null)

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  useLayoutEffect(() => {
    // on initial render, tell MathLive to render the latex
    if (latexRef.current) {
      renderMathInElement(latexRef.current, {
        TeX: {
          delimiters: {
            // Allow math formulas surrounded by $$...$$ for display or \(...\) for inline
            inline: [['\\(', '\\)']],
            display: [['$$', '$$']],
          },
        },
      })
    }
  }, [])

  return (
    <div ref={latexRef} className="bg-slate-100">
      <p className="mt-2 text-sm text-slate-500">{stimulus}</p>
    </div>
  )
}

export default Stimulus
