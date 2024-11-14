'use client'

// React Imports
import { useContext, useMemo, useState } from 'react'

// Querium Imports
import { cn } from '@/lib/utils'
import { type YBRpage } from '../qq/YellowBrickRoad'
import { NavContext, NavContextType } from '@/NavContext'
import { NavBar } from '../qq/NavBar'
import { useProblemStore } from '@/store/_store'
import { TinyTutor, type HintStage } from '../qq/TinyTutor'
import { NextButton } from '../qq/NextButton'

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
const NewbFindTutor: React.FC<{
  className?: string
  children?: React.ReactNode
  page: YBRpage
  index: number
}> = ({ className, children, page, index }) => {
  ///////////////////////////////////////////////////////////////////
  // Contexts
  ///////////////////////////////////////////////////////////////////

  const { current, api } = useContext(NavContext) as NavContextType

  ///////////////////////////////////////////////////////////////////
  // Store
  ///////////////////////////////////////////////////////////////////

  const { logAction, problem, rank } = useProblemStore()

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

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
    if (
      hintStage === 'psHints' &&
      count === hintList.psHints.length &&
      current === count
    ) {
      logAction({
        page: page.id,
        activity: 'hintChanged',
        data: { hintStage, current, count },
      })
      setMsg(pageHints[pageHints.length - 1])
      setNavDisabled(false)
    }
  }
  async function handleNext(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    if (evt.altKey) {
      //If Option+Enter just scroll to next page
      logAction({
        page: page.id,
        activity: 'clickNext',
        data: {},
        action: 'used option to skip',
      })
      api?.scrollNext()
    } else {
      logAction({ page: page.id, activity: 'clickNext', data: {} })
      api?.scrollNext()
    }
  }
  ///////////////////////////////////////////////////////////////////
  // JSX
  ///////////////////////////////////////////////////////////////////

  if (current !== index + 1) return null

  return (
    <div
      className={cn(
        'NewbFindTutor',
        'm-0 flex h-full w-full flex-col justify-stretch',
        'rounded-lg border bg-card p-0 text-card-foreground shadow-sm',
        className,
      )}
    >
      <div className="relative grow"></div>
      {children}
      <NavBar className="relative flex items-center justify-end space-x-3 bg-slate-100 pr-0">
        <TinyTutor
          msg={msg}
          hintList={hintList}
          hintChanged={hintChanged}
          closeable={false}
        />

        <div className="flex h-20 w-20 items-center justify-center">
          <NextButton
            className="scale-[200%]"
            disabled={navDisabled}
            onClick={handleNext}
          ></NextButton>
        </div>
      </NavBar>
    </div>
  )
}
NewbFindTutor.displayName = 'NewbFindTutor'
export default NewbFindTutor
