'use client'

// React Imports
import { FC, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

// Querium Imports
import { cn, randomClickNextMsg, randomThinkingMsg } from '@/lib/utils'
import { type YBRpage } from '../qq/YellowBrickRoad'
import { NavContext, NavContextType } from '@/NavContext'
import { NavBar } from '../qq/NavBar'
import { StimulusSelector } from '../qq/StimulusSelector'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { HdrBar } from '../qq/HdrBar'
import { useProblemStore } from '@/store/_store'
import { TotalSchemaGraphic } from '../schemas/total/graphic'
import { TotalEquationGraphic } from '../schemas/total/equation'
import { ChangeIncreaseSchemaGraphic } from '../schemas/changeIncrease/graphic'
import { ChangeIncreaseEquationGraphic } from '../schemas/changeIncrease/equation'
import { ChangeDecreaseEquationGraphic } from '../schemas/changeDecrease/equation'
import { ChangeDecreaseSchemaGraphic } from '../schemas/changeDecrease/graphic'
import { DifferenceEquationGraphic } from '../schemas/difference/equation'
import { DifferenceSchemaGraphic } from '../schemas/difference/graphic'
import { EqualGroupsEquationGraphic } from '../schemas/equalGroups/equation'
import { CompareEquationGraphic } from '../schemas/compare/equation'
import { SchemaType } from '@/store/_types'
import { HintStage, TinyTutor } from '../qq/TinyTutor'
import { NextButton } from '../qq/NextButton'
import CheckStepButton from '../qq/CheckStepButton'

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
const NewbProblemType: FC<{
  className?: string
  children?: ReactNode
  page: YBRpage
  index: number
}> = ({ className, page, index }) => {
  ///////////////////////////////////////////////////////////////////
  // Contexts
  ///////////////////////////////////////////////////////////////////

  const { api, current } = useContext(NavContext) as NavContextType

  ///////////////////////////////////////////////////////////////////
  // Store
  ///////////////////////////////////////////////////////////////////

  const {
    logAction,
    submitPickSchema,
    getHint,
    problem,
    session,
    studentLog,
    disabledSchemas,
    rank,
    onComplete,
  } = useProblemStore()

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  const [schema, setSchema] = useState('')
  const [msg, setMsg] = useState<string>('')
  const [busy, setBusy] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [complete, setComplete] = useState(false)

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

  useEffect(() => {
    if (schema === '') {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [schema])

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  async function handleSelectSchema(schema: string) {
    logAction({ page: page.id, activity: 'selectedSchema', data: { schema } })
    setSchema(schema)
  }

  async function handleCheckSchema(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    setMsg('Just a moment while I verify your choice')
    setBusy(true)

    let selectedSchema: SchemaType = 'additiveChangeSchema'
    switch (schema) {
      case 'TOTAL':
        selectedSchema = 'additiveTotalSchema'
        break
      case 'DIFFERENCE':
        selectedSchema = 'additiveDifferenceSchema'
        break
      case 'CHANGEINCREASE':
        selectedSchema = 'additiveChangeSchema'
        break
      case 'CHANGEDECREASE':
        selectedSchema = 'subtractiveChangeSchema'
        break
      case 'EQUALGROUPS':
        selectedSchema = 'multiplicativeEqualGroupsSchema'
        break
      case 'COMPARE':
        selectedSchema = 'multiplicativeCompareSchema'
        break
    }

    const fake = evt.altKey
    const result = await submitPickSchema(selectedSchema, fake)

    setBusy(false)
    if (fake) {
      // Bypass qEval validation
      logAction({
        page: page.id,
        activity: 'checkStep',
        data: {},
        action: 'skipped validation',
      })

      api?.scrollNext()
    } else {
      logAction({
        page: page.id,
        activity: 'checkStep',
        data: { result },
      })

      if (result.stepStatus == 'INVALID') {
        setMsg(`${result.message}\n\n${randomClickNextMsg()}`)
      }
      if (result.stepStatus == 'VALID') {
        setMsg(result.message)
        setComplete(true)
      }
    }
  }

  async function getAiHints() {
    if (complete) {
      setMsg('You have solved this part! Continue to the next page.')
      return
    }
    setBusy(true)
    setMsg(randomThinkingMsg())
    setMsg(await getHint())
    setBusy(false)
  }

  ///////////////////////////////////////////////////////////////////
  // JSX
  ///////////////////////////////////////////////////////////////////

  if (current !== index + 1) return null
  return (
    <div
      className={cn(
        'NewbSelectDiagram',
        'rounded-lg bg-card text-card-foreground shadow-sm',
        'm-0 mb-2 flex h-full w-full flex-col justify-stretch pl-2 pr-2 pt-2',
        className,
      )}
    >
      <div className="div relative mb-2 flex grow flex-col justify-stretch gap-2 p-2">
        <div className="absolute bottom-0 left-0 right-0 top-0 overflow-y-scroll">
          <HdrBar
            highlightLetter={page?.phase}
            subTitle={page?.phaseLabel}
            instructions={page?.title}
          ></HdrBar>

          <StimulusSelector
            className={cn(
              'mb-2 flex w-full rounded-md border border-input bg-slate-300 px-3 py-2 text-sm',
              className,
            )}
            stimulusText={problem.stimulus}
          ></StimulusSelector>

          <div className="grid grow grid-cols-2 gap-2">
            <Card className="bg-slate-300">
              <CardHeader className="pb-2">
                <CardTitle>Known</CardTitle>
              </CardHeader>
              <CardContent>
                {session.knowns ? (
                  <ul className="flex list-none flex-wrap gap-2">
                    {session.knowns.map(known => (
                      <li className="list-none" key={known}>
                        {known}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </CardContent>
            </Card>
            <Card className="bg-slate-300">
              <CardHeader className="pb-2">
                <CardTitle>Unknown</CardTitle>
              </CardHeader>
              <CardContent>
                {session.unknowns ? (
                  <ul className="flex list-none flex-wrap gap-2">
                    {session.unknowns.map(unknown => (
                      <li className="list-none" key={unknown}>
                        {unknown}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </CardContent>
            </Card>
          </div>

          <div className="mb-4 flex grow flex-wrap justify-center gap-2">
            <Card
              className={cn(
                'box-border w-[400px] sm:w-[250px] md:w-[48%] lg:w-[500] xl:w-[520px] 2xl:w-[300px]',
                disabledSchemas?.includes('additiveTotalSchema')
                  ? 'cursor-not-allowed bg-slate-400 text-slate-500'
                  : schema === 'TOTAL'
                    ? 'cursor-pointer border-4 border-qqAccent'
                    : 'cursor-pointer bg-white',
              )}
              onClick={() => handleSelectSchema('TOTAL')}
            >
              <CardHeader className="pb-2">
                <CardTitle>Total</CardTitle>
              </CardHeader>
              <CardContent>
                <TotalSchemaGraphic className="mb-4" />
                <TotalEquationGraphic />
              </CardContent>
            </Card>

            <Card
              className={cn(
                'box-border w-[400px] sm:w-[250px] md:w-[48%] lg:w-[500] xl:w-[520px] 2xl:w-[300px]',
                disabledSchemas?.includes('additiveDifferenceSchema')
                  ? 'cursor-not-allowed bg-slate-400 text-slate-500'
                  : schema === 'DIFFERENCE'
                    ? 'cursor-pointer border-4 border-qqAccent'
                    : 'cursor-pointer bg-white',
              )}
              onClick={() => handleSelectSchema('DIFFERENCE')}
            >
              <CardHeader className="pb-2">
                <CardTitle>Difference</CardTitle>
              </CardHeader>
              <CardContent>
                <DifferenceSchemaGraphic className="mb-4" />
                <DifferenceEquationGraphic />
              </CardContent>
            </Card>

            <Card
              className={cn(
                'box-border w-[400px] sm:w-[250px] md:w-[48%] lg:w-[500] xl:w-[520px] 2xl:w-[300px]',
                disabledSchemas?.includes('additiveChangeSchema')
                  ? 'cursor-not-allowed bg-slate-400 text-slate-500'
                  : schema === 'CHANGEINCREASE'
                    ? 'cursor-pointer border-4 border-qqAccent'
                    : 'cursor-pointer bg-white',
              )}
              onClick={() => handleSelectSchema('CHANGEINCREASE')}
            >
              <CardHeader className="pb-2">
                <CardTitle>Change Increase</CardTitle>
              </CardHeader>
              <CardContent>
                <ChangeIncreaseSchemaGraphic className="mb-4" />
                <ChangeIncreaseEquationGraphic />
              </CardContent>
            </Card>
            <Card
              className={cn(
                'box-border w-[400px] sm:w-[250px] md:w-[48%] lg:w-[500] xl:w-[520px] 2xl:w-[300px]',
                disabledSchemas?.includes('subtractiveChangeSchema')
                  ? 'cursor-not-allowed bg-slate-400 text-slate-500'
                  : schema === 'CHANGEDECREASE'
                    ? 'cursor-pointer border-4 border-qqAccent'
                    : 'cursor-pointer bg-white',
              )}
              onClick={() => handleSelectSchema('CHANGEDECREASE')}
            >
              <CardHeader className="pb-2">
                <CardTitle>Change Decrease</CardTitle>
              </CardHeader>
              <CardContent>
                <ChangeDecreaseSchemaGraphic className="mb-4" />
                <ChangeDecreaseEquationGraphic />
              </CardContent>
            </Card>
            <div className="h-0 basis-full"></div>
            <Card
              className={cn(
                'box-border w-[400px] sm:w-[250px] md:w-[48%] lg:w-[500] xl:w-[520px] 2xl:w-[300px]',
                schema === 'EQUALGROUPS'
                  ? 'border-4 border-qqAccent'
                  : 'bg-white',
                disabledSchemas?.includes('multiplicativeEqualGroupsSchema')
                  ? 'cursor-not-allowed bg-slate-400 text-slate-500'
                  : schema === 'EQUALGROUPS'
                    ? 'cursor-pointer border-4 border-qqAccent'
                    : 'cursor-pointer bg-white',
              )}
              onClick={() => handleSelectSchema('EQUALGROUPS')}
            >
              <CardHeader className="pb-2">
                <CardTitle>Equal Groups</CardTitle>
              </CardHeader>
              <CardContent>
                <EqualGroupsEquationGraphic />
              </CardContent>
            </Card>
            <Card
              className={cn(
                'box-border w-[400px] sm:w-[250px] md:w-[48%] lg:w-[500] xl:w-[520px] 2xl:w-[300px]',
                disabledSchemas?.includes('multiplicativeCompareSchema')
                  ? 'cursor-not-allowed bg-slate-400 text-slate-500'
                  : schema === 'COMPARE'
                    ? 'cursor-pointer border-4 border-qqAccent'
                    : 'cursor-pointer bg-white',
              )}
              onClick={() => handleSelectSchema('COMPARE')}
            >
              <CardHeader className="pb-2">
                <CardTitle>Compare</CardTitle>
              </CardHeader>
              <CardContent>
                <CompareEquationGraphic />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <NavBar className="relative flex items-center justify-end space-x-3 bg-slate-300 pr-0">
        <TinyTutor
          msg={msg}
          busy={busy}
          hintList={hintList}
          getAiHints={getAiHints}
        />
        <div className="flex h-20 w-20 items-center justify-center">
          {!complete ? (
            <CheckStepButton
              busy={busy}
              disabled={disabled}
              onClick={evt => handleCheckSchema(evt)}
            />
          ) : (
            <NextButton
              className="scale-[200%]"
              busy={busy}
              disabled={schema.length === 0}
            ></NextButton>
          )}
        </div>
      </NavBar>
    </div>
  )
}

NewbProblemType.displayName = 'NewbProblemType'
export default NewbProblemType
