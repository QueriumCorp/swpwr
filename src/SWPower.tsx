// General imports
import { forwardRef, useEffect, useState } from 'react'
import z from 'zod'
import { useHotkeys } from 'react-hotkeys-hook'
import { BsBugFill } from 'react-icons/bs'

// ShadCN/UI imports
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { Drawer, DrawerTrigger, DrawerContent } from '@/components/ui/drawer'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// SWPWR-specific imports
import { AvatarAPIProvider } from '@/components/AnimeTutor'
import { YellowBrickRoad } from '@/components/qq/YellowBrickRoad'
import { renderPage } from '@/components/qq/RenderPage'
import { NavContext } from '@/NavContext'
import { cn } from '@/lib/utils'
import {
  LogItemArraySchema,
  OptionsSchema,
  ProblemSchema,
  SessionSchema,
  StudentSchema,
} from '@/store/_types'

import { useProblemStore } from '@/store/_store'
import buildInfo from '@/buildInfo.json'

// ShadCN/UI Components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import VoiceTester from '@/components/qq/ChatBubble/VoiceTester'
import FullScreen from '@/components/qq/FullScreen/FullScreen'
import testNetworkSpeed from '@/lib/network'
import BusyIndicator from './components/qq/BusyIndicator/BusyIndicator'
import { base64Img } from './components/qq/KettuAvatarImg'

// Props
const StepWisePowerProps = z.object({
  problem: ProblemSchema,
  student: StudentSchema,
  oldSession: SessionSchema,
  oldStudentLog: LogItemArraySchema,
  options: OptionsSchema.optional(),
  onComplete: z.function().optional(),
  onStep: z.function().optional(),
})
export type StepWisePowerProps = z.infer<typeof StepWisePowerProps> | undefined

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
const StepWisePower = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & StepWisePowerProps
>((props, _ref) => {
  ///////////////////////////////////////////////////////////////////
  // Contexts
  ///////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  // Store
  ///////////////////////////////////////////////////////////////////

  const {
    setSwapiUrl,
    setGltfUrl,
    setVoiceId,
    setVoiceName,
    setRank,
    setDisabledSchemas,
    setProblem,
    setStudent,
    setYBR,
    studentLog,
    problem,
    student,
    session,
    ybr,
    swapiUrl,
    gltfUrl,
    rank,
    disabledSchemas,
    initSession,
    setSessionResumable,
    resumeSession,
    closeSession,
    saveTrace,
    onComplete,
    setOnComplete,
    setOnStep,
    toggleChatty,
    setCriticalError,
    criticalError,
    setNetworkSpeedMbps,
    setCurrentPageIndex,
    logAction,
  } = useProblemStore()

  ///////////////////////////////////////////////////////////////////
  // State
  ///////////////////////////////////////////////////////////////////

  const [detectingResumable, setDetectingResumable] = useState(true)
  const [ready, setReady] = useState(false)
  const [started, setStarted] = useState(false)
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [closeMsg, setCloseMsg] = useState('')
  const [traceComment, setTraceComment] = useState('')
  const [traceMsg, setTraceMsg] = useState('')
  const [enableDebugger, setEnableDebugger] = useState(
    document.location.hostname.includes('localhostXXX') ? true : false,
  )
  const [chiggerOpen, setchiggerOpen] = useState(false)
  const [propError, setPropError] = useState('')

  ///////////////////////////////////////////////////////////////////
  // Effects
  ///////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (props.problem) {
      if (props.problem.stimulus) {
        props.problem.stimulus = props.problem.stimulus.replace(/\s{2,}/g, ' ')
      }
      const probResult = setProblem(props.problem)
      if (probResult && !probResult.problemValid) {
        setPropError(probResult.problemStatusMsg)
      } else {
        setPropError('')
      }
    }

    if (props.student) {
      setStudent(props.student)
    }
    if (props.options?.swapiUrl) {
      setSwapiUrl(props.options.swapiUrl)
    }
    if (props.options?.gltfUrl) {
      setGltfUrl(props.options.gltfUrl)
    }
    if (props.options?.voiceId) {
      setVoiceId(props.options.voiceId)
    }
    if (props.options?.voiceName) {
      setVoiceName(props.options.voiceName)
    }
    if (props.options?.rank) {
      setRank(props.options.rank)
    }
    if (props.options?.disabledSchemas) {
      setDisabledSchemas(props.options.disabledSchemas)
    }

    if (props.onComplete) {
      setOnComplete(props.onComplete)
    }
    if (props.onStep) {
      setOnStep(props.onStep)
    }
  }, [props])

  // test network speed
  useEffect(() => {
    const testSpeed = async () => {
      let result = await testNetworkSpeed()
      setNetworkSpeedMbps(result.type, result.speed)
    }
    testSpeed()
  }, [])

  // check if session resumable.
  useEffect(() => {
    // if no oldSession, set resumable to false
    if (!props?.oldSession || !props?.oldSession.sessionToken) {
      setSessionResumable('')
      return
    }

    // if we have a problem and an oldSession sessionToken, see if qEval has it
    if (problem?.question?.length > 10 && props?.oldSession?.sessionToken) {
      setSessionResumable(props.oldSession.sessionToken)
    }
  }, [problem, props.oldSession])
  useEffect(() => {
    if (typeof session.sessionResumable == 'undefined') {
      setReady(false)
      return
    }
    // sessionResumable is a boolean once we know
    if (typeof session.sessionResumable === 'boolean') {
      setDetectingResumable(false)
      setReady(true)
    }
  }, [session.sessionResumable])

  //
  // Prep YellowBrickRoad
  //
  useEffect(() => {
    var ybr
    if (props.options?.rank) {
      ybr = YellowBrickRoad.filter(page => {
        return page.rank == props.options!.rank
      })
    } else {
      ybr = YellowBrickRoad
    }
    setYBR(ybr)
  }, [])

  // When navigating to a new page
  useEffect(() => {
    if (!api) {
      return
    }
    setCurrent(api.selectedScrollSnap() + 1)
    // This fires when the user selects a new page
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
      setCurrentPageIndex(api.selectedScrollSnap())
      logAction({
        page: ybr[api.selectedScrollSnap()].id,
        activity: 'ARRIVED',
        data: {},
      })
    })
  }, [api])

  useEffect(() => {
    if (criticalError) {
      setEnableDebugger(true)
      setchiggerOpen(true)
    }
  }, [criticalError])

  ///////////////////////////////////////////////////////////////////
  // Event Handlers
  ///////////////////////////////////////////////////////////////////

  const handleCloseSession = async () => {
    const msg = await closeSession()
    setCloseMsg(msg)
  }

  const handleSaveTrace = async () => {
    const msg = await saveTrace(traceComment)
    setTraceMsg(msg)
  }

  const handleCompleteProblem = async () => {
    onComplete(session, studentLog)
  }

  function handleStart() {
    if (problem?.question?.length > 10 && session?.sessionToken?.length == 0) {
      initSession()
    }

    // Are we in edX?
    const swReactJSxBlocks =
      document.getElementsByClassName('sw-reactjs-xblock')

    const qqROOT = document.getElementById('qqROOT') as HTMLElement
    const isFullscreen = Boolean(document.fullscreenElement)

    // If we're in edX, then we need to go fullscreen when student presses Start
    if (swReactJSxBlocks.length > 0 && !isFullscreen) {
      qqROOT.requestFullscreen()
    }

    setStarted(true)
    toggleChatty()
  }

  async function handleResume() {
    // reload our state's session and logs
    resumeSession(props.oldSession, props.oldStudentLog)

    // scroll to the last page the student accessed
    if (props.oldSession.lastPageIndex) {
      api?.scrollTo(props.oldSession.lastPageIndex)
    }

    // Are we in edX?
    const swReactJSxBlocks =
      document.getElementsByClassName('sw-reactjs-xblock')

    const qqROOT = document.getElementById('qqROOT') as HTMLElement
    const isFullscreen = Boolean(document.fullscreenElement)

    // If we're in edX, then we need to go fullscreen when student presses Start
    if (swReactJSxBlocks.length > 0 && !isFullscreen) {
      qqROOT.requestFullscreen()
    }

    setStarted(true)
    toggleChatty()
  }

  ///////////////////////////////////////////////////////////////////
  // Hotkeys
  ///////////////////////////////////////////////////////////////////

  useHotkeys('shift+ctrl+alt+q', () => {
    setEnableDebugger(!!!enableDebugger)
  })

  ///////////////////////////////////////////////////////////////////
  // JSX
  ///////////////////////////////////////////////////////////////////

  return (
    <NavContext.Provider value={{ current, setCurrent, api }}>
      <div
        className={cn(
          'StepWisePower relative min-h-24 w-full border-none',
          props.className,
          !criticalError ? '' : 'bg-sad-panda',
        )}
      >
        <Drawer open={chiggerOpen}>
          <DrawerTrigger asChild>
            {enableDebugger && (
              <div className="absolute bottom-0 left-2 z-10 m-1 flex cursor-pointer gap-2 rounded-full bg-transparent text-xs">
                <button
                  id="chigger"
                  aria-label="Chigger"
                  className="cursor-pointer rounded-full bg-transparent text-xs"
                  onClick={() => {
                    setchiggerOpen(true)
                  }}
                >
                  <BsBugFill
                    aria-labelledby="chigger"
                    className="text-lg text-red-500"
                  />
                </button>
                <div>{buildInfo.version}</div>
                <div>{formattedDate(buildInfo.buildDate)}</div>
                <div>{ybr[current - 1]?.rank}</div>
                <div>{ybr[current - 1]?.id}</div>
                <div>
                  {api?.selectedScrollSnap()} vs {session.lastPageIndex}
                </div>
              </div>
            )}
          </DrawerTrigger>
          <DrawerContent>
            <button
              onClick={() => {
                setchiggerOpen(false)
              }}
              aria-label="Close Chigger"
              className="absolute right-3 top-0 cursor-pointer"
            >
              ⨉
            </button>
            <div className="relative mx-auto h-[600px] w-full">
              <Tabs defaultValue="speech" className="h-[95%] w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="props">Props</TabsTrigger>
                  <TabsTrigger value="log">Log</TabsTrigger>
                  <TabsTrigger value="store">Store</TabsTrigger>
                  <TabsTrigger value="ybr">YBR</TabsTrigger>
                  <TabsTrigger value="cmds">Commands</TabsTrigger>
                  <TabsTrigger value="errors">Errors</TabsTrigger>
                  <TabsTrigger value="speech">Speech</TabsTrigger>
                </TabsList>

                {/* PROPS */}
                <TabsContent value="props" className="h-[90%] w-full">
                  <div className="h-full w-full p-4 pb-0">
                    <div className="h-full w-full overflow-x-auto overflow-y-scroll p-2">
                      <pre>{JSON.stringify(props, null, 2)}</pre>
                    </div>
                  </div>
                </TabsContent>

                {/* LOG */}
                <TabsContent value="log" className="h-[90%] w-full">
                  <div className="h-full w-full p-4 pb-0">
                    <div className="h-full w-full overflow-x-auto overflow-y-scroll p-2">
                      <table className="w-full border-collapse border border-slate-400 bg-white text-sm shadow-sm dark:border-slate-500 dark:bg-slate-800">
                        <thead className="bg-slate-50 dark:bg-slate-700">
                          <tr>
                            <th className="w-1/2 border border-slate-300 p-4 text-left font-semibold text-slate-900 dark:border-slate-600 dark:text-slate-200">
                              TimeStamp
                            </th>
                            <th className="w-1/2 border border-slate-300 p-4 text-left font-semibold text-slate-900 dark:border-slate-600 dark:text-slate-200">
                              Page
                            </th>
                            <th className="w-1/2 border border-slate-300 p-4 text-left font-semibold text-slate-900 dark:border-slate-600 dark:text-slate-200">
                              Activity
                            </th>
                            <th className="w-1/2 border border-slate-300 p-4 text-left font-semibold text-slate-900 dark:border-slate-600 dark:text-slate-200">
                              Data
                            </th>
                            <th className="w-1/2 border border-slate-300 p-4 text-left font-semibold text-slate-900 dark:border-slate-600 dark:text-slate-200">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {studentLog.map((item, index) => {
                            return (
                              <tr
                                key={index}
                                className="odd:bg-slate-700 even:bg-slate-500"
                              >
                                <td className="select-text border border-slate-300 p-4 align-text-top text-xs text-slate-50">
                                  {item.timestamp.toLocaleString('en-us', {
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    second: '2-digit',
                                  })}
                                </td>
                                <td className="select-text border border-slate-300 p-4 align-text-top text-xs text-slate-50">
                                  {item.page}
                                </td>
                                <td className="select-text border border-slate-300 p-4 align-text-top text-xs text-slate-50">
                                  {item.activity}
                                </td>
                                <td className="select-text border border-slate-300 p-4 align-text-top text-xs text-slate-50">
                                  <pre>
                                    {item.data
                                      ? JSON.stringify(item.data, null, 2)
                                      : ''}
                                  </pre>
                                </td>
                                <td className="select-text border border-slate-300 p-4 align-text-top text-xs text-slate-50">
                                  {item.action}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>

                {/* STORE */}
                <TabsContent value="store" className="h-[90%] w-full">
                  <div className="h-full w-full p-4 pb-0">
                    <div className="h-full w-full overflow-x-auto overflow-y-scroll p-2">
                      <h3 className="bg-qqAccent font-sans font-black">
                        Student
                      </h3>
                      <pre className="select-text font-mono text-xs">
                        {JSON.stringify(student, null, 2)}
                      </pre>
                      <h3 className="bg-qqAccent font-sans font-black">
                        Problem
                      </h3>
                      <pre className="select-text font-mono text-xs">
                        {JSON.stringify(problem, null, 2)}
                      </pre>
                      <h3 className="bg-qqAccent font-sans font-black">
                        Session
                      </h3>
                      <pre className="select-text font-mono text-xs">
                        {JSON.stringify(session, null, 2)}
                      </pre>
                      <h3 className="bg-qqAccent font-sans font-black">
                        Options
                      </h3>
                      <pre className="select-text font-mono text-xs">
                        {JSON.stringify(
                          { swapiUrl, gltfUrl, rank, disabledSchemas },
                          null,
                          2,
                        )}
                      </pre>
                    </div>
                  </div>
                </TabsContent>

                {/* YellowBrickRoad */}
                <TabsContent value="ybr" className="h-[90%] w-full">
                  <div className="h-full w-full p-4 pb-0">
                    <div className="h-full w-full overflow-x-auto overflow-y-scroll p-2">
                      <pre>{JSON.stringify(ybr, null, 2)}</pre>
                    </div>
                  </div>
                </TabsContent>

                {/* COMMANDS */}
                <TabsContent value="cmds" className="h-[90%] w-full">
                  <div className="h-full w-full p-4 pb-0">
                    <div className="flex w-full items-center justify-start border-b-2 border-b-slate-600">
                      <Button
                        className="mr-2 w-48"
                        onClick={() => handleResume()}
                      >
                        Session Resumeable
                      </Button>
                      <p className="select-text text-xs">{closeMsg}</p>
                    </div>
                    <div className="flex w-full items-center justify-start border-b-2 border-b-slate-600">
                      <Button
                        className="mr-2 w-48"
                        onClick={() => handleCloseSession()}
                      >
                        Close Session
                      </Button>
                      <p className="select-text text-xs">{closeMsg}</p>
                    </div>
                    <div className="mt-4 flex w-full items-center justify-start border-b-2 border-b-slate-600">
                      <Button
                        className="mr-2 w-48"
                        onClick={() => handleSaveTrace()}
                      >
                        Save Trace
                      </Button>
                      <div className="flex flex-col">
                        <Input
                          type="text"
                          className="w-full"
                          value={traceComment}
                          onChange={e => setTraceComment(e.target.value)}
                          placeholder="Enter your Comment"
                        />
                        <p className="select-text text-xs">{traceMsg}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex w-full items-center justify-start border-b-2 border-b-slate-600">
                      <Button
                        className="mr-2 w-48"
                        onClick={() => handleCompleteProblem()}
                      >
                        Complete Problem
                      </Button>
                      <p className="select-text text-xs">{closeMsg}</p>
                    </div>
                  </div>
                </TabsContent>

                {/* ERRORS */}
                <TabsContent value="errors" className="h-[90%] w-full">
                  <div className="h-full w-full p-4 pb-0">
                    <h1>Errors</h1>
                    <div>{propError}</div>
                  </div>
                </TabsContent>

                {/* SPEECH */}
                <TabsContent value="speech" className="h-[90%] w-full">
                  <VoiceTester />
                </TabsContent>
              </Tabs>
            </div>
          </DrawerContent>
        </Drawer>
        <Carousel
          setApi={setApi}
          opts={{ watchDrag: false }}
          className="Carousel flex flex-grow flex-col"
        >
          <AvatarAPIProvider>
            <CarouselContent
              className="CarouselContent relative m-0 flex-grow pr-0"
              style={{ paddingRight: '0px' }}
            >
              {ybr.length === 0 && (
                <div className="flex h-full w-full items-center justify-center">
                  <h1 className="text-2xl font-bold">
                    Invalid Rank therefore No Data
                  </h1>
                </div>
              )}
              {ybr.map((page, index) => (
                <CarouselItem
                  key={page.rank + ':' + page.id}
                  className="CarouselItem m-0 h-full p-0"
                >
                  {renderPage(page, index)}
                </CarouselItem>
              ))}
            </CarouselContent>
          </AvatarAPIProvider>
        </Carousel>
        <FullScreen />
        {started ? null : (
          <div className="fixed flex h-full w-full flex-col items-center justify-center gap-2 bg-black bg-opacity-80">
            <div className="relative flex h-[200px] w-[200px] items-center justify-center bg-none">
              <BusyIndicator
                busy={detectingResumable}
                size={460}
                strokeWidth={2}
                className="h-[200px] w-[200px]"
              />
              <Avatar className="h-[200px] w-[200px] border-4 border-white">
                <AvatarImage src={base64Img} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            {ready ? (
              <div className="z-10 flex items-center justify-center gap-2">
                <Button
                  size="lg"
                  className="min-w-32 bg-qqBrand text-xl hover:bg-qqAccent"
                  onClick={() => handleStart()}
                >
                  START
                </Button>
                {session.sessionResumable ? (
                  <Button
                    size="lg"
                    className="min-w-32 bg-purple-500 text-xl hover:bg-purple-800"
                    onClick={() => handleResume()}
                  >
                    RESUME
                  </Button>
                ) : null}
              </div>
            ) : (
              <div className="h-11" />
            )}
          </div>
        )}
      </div>
    </NavContext.Provider>
  )
})

export default StepWisePower

function formattedDate(timestamp: number) {
  const date = new Date(timestamp)
  return date.toLocaleString()
}
