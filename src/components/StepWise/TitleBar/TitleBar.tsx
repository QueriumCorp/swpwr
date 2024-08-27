import React from 'react'
import { SessionContext } from '../stores/sessionContext'
import { useStore } from 'zustand'

const TitleBar = () => {
  const session = React.useContext(SessionContext)
  if (!session) throw new Error('No SessionContext.Provider in the tree')

  const id = useStore(session, s => s.problemId)
  const title = useStore(session, s => s.title)
  return (
    <>
      <div className="TitleBar text-base font-medium tracking-tight text-slate-900">
        {id} {title}
      </div>
    </>
  )
}

export default TitleBar
