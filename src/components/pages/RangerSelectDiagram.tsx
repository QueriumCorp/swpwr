'use client'

// React Imports
import { FC, ReactNode, useContext, useState } from 'react'

// Querium Imports
import { cn } from '@/lib/utils'
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
import { TinyTutor } from '../qq/TinyTutor'
import { NextButton } from '../qq/NextButton'
import CheckStepButton from '../qq/CheckStepButton'

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
const RangerSelectDiagram: FC<{
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
    rank,
    disabledSchemas,
  } = useProblemStore()

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  const [schema, setSchema] = useState('')
  const [msg, setMsg] = useState<string>('')
  const [busy, setBusy] = useState(false)
  const [complete, setComplete] = useState(false)
  const wpHints = problem.wpHints?.find(
    wpHint => wpHint.page === `${rank}${page.id}`,
  )

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  async function handleSelectSchema(schema: string) {
    logAction('RangerSelectDiagram : Selected Schema : ' + schema)
    setSchema(schema)
  }

  async function handleCheckSchema(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    setMsg('Just a moment while I verify your choice')
    setBusy(true)
    logAction('RangerSelectDiagram : Clicked Next')

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

    const fake = evt.metaKey
    logAction('RangerSelectDiagram : Checking Schema : ' + selectedSchema)
    const result = await submitPickSchema(selectedSchema, fake)

    setBusy(false)
    if (fake) {
      // Bypass qEval validation
      api?.scrollNext()
    } else {
      logAction(
        'RangerSelectDiagram : Checked Schema : ' + JSON.stringify(result),
      )
      setMsg(result.message)
      if (result.stepStatus == 'VALID') {
        setComplete(true)
      }
    }
  }

  async function getAiHints() {
    setBusy(true)
    setMsg('Hmmm...  let me see.')
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
        'RangerSelectDiagram',
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
                <CardTitle>Knowns</CardTitle>
              </CardHeader>
              <CardContent>
                {session.knowns ? (
                  <ul>
                    {session.knowns.map(known => (
                      <li key={known}>{known}</li>
                    ))}
                  </ul>
                ) : null}
              </CardContent>
            </Card>
            <Card className="bg-slate-300">
              <CardHeader className="pb-2">
                <CardTitle>Unknowns</CardTitle>
              </CardHeader>
              <CardContent>
                {session.unknowns ? (
                  <ul>
                    {session.unknowns.map(unknown => (
                      <li key={unknown}>{unknown}</li>
                    ))}
                  </ul>
                ) : null}
              </CardContent>
            </Card>
          </div>
          <h2 className="ml-1 mr-1 mt-3 select-none">
            Click on the type of problem you think this is
          </h2>
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
      <NavBar className="relative flex items-center justify-end space-x-3 bg-slate-300 pr-2">
        <TinyTutor
          msg={msg}
          busy={busy}
          intro={page?.intro}
          psHints={page?.psHints}
          wpHints={wpHints?.hints}
          getAiHints={getAiHints}
        />
        {!complete ? (
          <CheckStepButton
            busy={busy}
            disabled={busy}
            onClick={evt => handleCheckSchema(evt)}
          />
        ) : (
          <NextButton busy={busy} disabled={schema.length === 0}></NextButton>
        )}
        <h1 className="absolute bottom-0 left-0 text-slate-500">
          RangerSelectDiagram
        </h1>
      </NavBar>
    </div>
  )
}

RangerSelectDiagram.displayName = 'RangerSelectDiagram'
export default RangerSelectDiagram
