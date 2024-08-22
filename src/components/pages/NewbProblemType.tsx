'use client'

// React Imports
import { FC, ReactNode, useContext, useState } from 'react'

// Querium Imports
import { cn } from '@/lib/utils'
import { type YBRpage } from '../qq/YellowBrickRoad'
import { NavContext, NavContextType } from '@/NavContext'
import { NavBar } from '../qq/NavBar'
import { CarouselNext } from '../ui/carousel'
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
  const wpHints = problem.wpHints?.find(
    wpHint => wpHint.page === `${rank}${page.id}`,
  )
  const [aiHints, setAiHints] = useState<string[]>([])

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  async function handleSelectSchema(schema: string) {
    logAction('NewbProblemType : Selected Schema : ' + schema)
    setSchema(schema)
  }

  async function handleCheckSchema(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    console.log('handleCheckSchema')
    if (evt.metaKey) {
      onComplete(session, studentLog)
      api?.scrollNext()
    } else {
      setMsg('Just a moment while I verify your choice')
      logAction('NewbProblemType : Clicked Next')

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
          selectedSchema = 'additiveChangeSchema'
          break
        case 'EQUALGROUPS':
          selectedSchema = 'multiplicativeEqualGroupsSchema'
          break
        case 'COMPARE':
          selectedSchema = 'multiplicativeCompareSchema'
          break
      }

      logAction('NewbProblemType : Checking Schema : ' + selectedSchema)
      const result = await submitPickSchema(selectedSchema)
      logAction('NewbProblemType : Checked Schema : ' + JSON.stringify(result))
      setMsg(result.message)
      if (result.stepStatus == 'VALID') {
        api?.scrollNext()
        onComplete(session, studentLog)
      }
    }
  }

  async function getAiHints() {
    setBusy(true)
    setMsg('Hmmm...  let me see.')
    const hints: string[] = await getHint()
    setMsg('')
    setBusy(false)
    setAiHints(hints)
  }

  ///////////////////////////////////////////////////////////////////
  // JSX
  ///////////////////////////////////////////////////////////////////

  if (current !== index + 1) return null

  return (
    <div
      className={cn(
        'NewbProblemType m-0 mb-2 flex h-full w-full flex-col justify-stretch rounded-lg bg-card pl-2 pr-2 pt-2 text-card-foreground shadow-sm',
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
          <div>
            <h1>Stimulus</h1>
          </div>
          <StimulusSelector
            className={cn(
              'mb-2 flex w-full rounded-md border border-input bg-slate-300 px-3 py-2 text-sm',
              className,
            )}
            stimulusText={problem.stimulus}
          ></StimulusSelector>
          <div className="grid grow grid-cols-2 gap-2">
            <Card>
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
            <Card>
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
          <h2 className="ml-1 mr-1 mt-3">
            Click on the type of problem you think this is
          </h2>
          <div className="mb-4 flex grow flex-wrap justify-center gap-2">
            <Card
              className={cn(
                'w-[400px] sm:w-[250px] md:w-[48%] lg:w-[500] xl:w-[520px] 2xl:w-[300px]',
                disabledSchemas?.includes('additiveTotalSchema')
                  ? 'cursor-not-allowed bg-slate-400 text-slate-500'
                  : schema === 'TOTAL'
                    ? 'cursor-pointer bg-qqAccent'
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
                'w-[400px] sm:w-[250px] md:w-[48%] lg:w-[500] xl:w-[520px] 2xl:w-[300px]',
                disabledSchemas?.includes('additiveDifferenceSchema')
                  ? 'cursor-not-allowed bg-slate-400 text-slate-500'
                  : schema === 'DIFFERENCE'
                    ? 'cursor-pointer bg-qqAccent'
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
                'w-[400px] sm:w-[250px] md:w-[48%] lg:w-[500] xl:w-[520px] 2xl:w-[300px]',
                disabledSchemas?.includes('additiveChangeSchema')
                  ? 'cursor-not-allowed bg-slate-400 text-slate-500'
                  : schema === 'CHANGEINCREASE'
                    ? 'cursor-pointer bg-qqAccent'
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
                'w-[400px] sm:w-[250px] md:w-[48%] lg:w-[500] xl:w-[520px] 2xl:w-[300px]',
                disabledSchemas?.includes('additiveChangeSchema')
                  ? 'cursor-not-allowed bg-slate-400 text-slate-500'
                  : schema === 'CHANGEDECREASE'
                    ? 'cursor-pointer bg-qqAccent'
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
                'w-[400px] sm:w-[250px] md:w-[48%] lg:w-[500] xl:w-[520px] 2xl:w-[300px]',
                schema === 'EQUALGROUPS' ? 'bg-qqAccent' : 'bg-white',
                disabledSchemas?.includes('multiplicativeEqualGroupsSchema')
                  ? 'cursor-not-allowed bg-slate-400 text-slate-500'
                  : schema === 'EQUALGROUPS'
                    ? 'cursor-pointer bg-qqAccent'
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
                'w-[400px] sm:w-[250px] md:w-[48%] lg:w-[500] xl:w-[520px] 2xl:w-[300px]',
                disabledSchemas?.includes('multiplicativeCompareSchema')
                  ? 'cursor-not-allowed bg-slate-400 text-slate-500'
                  : schema === 'COMPARE'
                    ? 'cursor-pointer bg-qqAccent'
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
      <NavBar className="relative flex justify-end space-x-3 bg-slate-300 pr-2">
        <TinyTutor
          msg={msg}
          busy={busy}
          intro={page?.intro}
          psHints={page?.psHints}
          wpHints={wpHints?.hints}
          aiHints={aiHints}
          getAiHints={getAiHints}
        />

        <CarouselNext
          disabled={busy}
          className="relative right-0"
          onClick={evt => {
            handleCheckSchema(evt)
          }}
        >
          Next
        </CarouselNext>
        <h1 className="absolute bottom-0 left-0 text-slate-500">
          NewbProblemType
        </h1>
      </NavBar>
    </div>
  )
}

NewbProblemType.displayName = 'NewbProblemType'
export default NewbProblemType
