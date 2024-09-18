'use client'

// React Imports
import { useContext, useEffect, useMemo, useState } from 'react'

// Querium Imports
import { cn } from '@/lib/utils'
import { type YBRpage } from '../qq/YellowBrickRoad'
import { NavContext, NavContextType } from '@/NavContext'
import { NavBar } from '../qq/NavBar'
import { CarouselNext } from '../ui/carousel'
import { useProblemStore } from '@/store/_store'
import { TinyTutor, type HintStage } from '../qq/TinyTutor'

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
const DevFindTutor: React.FC<{
  className?: string
  children?: React.ReactNode
  page: YBRpage
  index: number
}> = ({ className, children, page, index }) => {
  console.log('RENDER: DevFindTutor')
  ///////////////////////////////////////////////////////////////////
  // Contexts
  ///////////////////////////////////////////////////////////////////

  const { current, api } = useContext(NavContext) as NavContextType

  ///////////////////////////////////////////////////////////////////
  // Store
  ///////////////////////////////////////////////////////////////////

  const { logAction, problem, rank } = useProblemStore()
  useEffect(() => {
    console.info('logAction changed')
  }, [logAction])
  useEffect(() => {
    console.info('problem changed')
  }, [problem])
  useEffect(() => {
    console.info('rank changed')
  }, [rank])

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  const [test, setTest] = useState('initialTestData')

  const [msg, setMsg] = useState('')
  const [navDisabled, setNavDisabled] = useState(true)
  const [pageHints, setPageHints] = useState<string[]>([])

  const hintList = useMemo(() => {
    // get page hints
    let pageHints: string[] = []
    let wpHints = problem.wpHints?.find(
      wpHint => wpHint.page === `${rank}${page.id}`,
    )
    if (wpHints?.hints) {
      pageHints = wpHints.hints
    } else if (page.psHints) {
      pageHints = page.psHints
    }

    // define hint stages
    let hintStages: HintStage[] = []
    if (page.intro?.length) {
      hintStages.push('intro')
    } else {
      hintStages.push('pre')
    }
    if (pageHints?.length) {
      hintStages.push('psHints')
    }
    if (page.aiHints) {
      hintStages.push('aiHints')
    }

    return {
      stages: hintStages,
      intro: page.intro,
      psHints: pageHints,
    }
  }, [])

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  function hintChanged(hintStage: string, current: number, count: number) {
    if (hintStage === 'psHints' && current === count) {
      setMsg(pageHints[pageHints.length - 1])
      setNavDisabled(false)
    }
  }

  ///////////////////////////////////////////////////////////////////
  // JSX
  ///////////////////////////////////////////////////////////////////

  if (current !== index + 1) return null

  return (
    <div
      className={cn(
        'DevFindTutor',
        'm-0 flex h-full w-full flex-col justify-stretch',
        'rounded-lg border bg-card p-0 text-card-foreground shadow-sm',
        className,
      )}
    >
      <div className="relative grow bg-yellow-200"></div>
      {children}
      <NavBar className="flex justify-end space-x-3 bg-slate-300 pr-2">
        <TinyTutor
          msg={msg}
          hintList={hintList}
          hintChanged={hintChanged}
          closeable={false}
        />
        <CarouselNext
          disabled={navDisabled}
          className="relative right-0"
          onClick={() => {
            logAction('DevFindTutor : Clicked Next')
            api?.scrollNext()
          }}
        >
          Next
        </CarouselNext>
      </NavBar>
    </div>
  )
}
DevFindTutor.displayName = 'DevFindTutor'
export default DevFindTutor
