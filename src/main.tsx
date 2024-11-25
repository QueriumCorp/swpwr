import React from 'react'
import ReactDOM from 'react-dom/client'
import StepWisePower from './SWPower.tsx'
import './index.css'
import './swReact.css'
import './animeTutor.css'

// Extend window namespace so TS knows about it
declare global {
  interface Window {
    swpwr: any
  }
}
window.swpwr = window.swpwr || {}

var gltfUrl
console.info('ENVIRONMENT', import.meta.env)

// get rank from url
let params = new URLSearchParams(window.location.search)
let urlRank = params.get('rank')
let urlSWAPI = params.get('swapi')

let problem: any = {},
  student: any = {},
  options: any = {},
  session: any = {},
  log: any = [],
  handlers: any = {}

if (window.swpwr) {
  problem.appKey = window.swpwr.problem.appKey
  problem.policyId = window.swpwr.problem.policyId
  problem.problemId = window.swpwr.problem.problemId
  problem.title = window.swpwr.problem.title
  problem.stimulus = window.swpwr.problem.stimulus
  problem.class = window.swpwr.problem.topic
  problem.question = window.swpwr.problem.definition
  problem.hints = window.swpwr.problem.mathHints

  problem.wpHints = window.swpwr.problem.wpHints.map(
    (page: { pageId?: string; page?: string; hints: any }) => {
      return {
        page: page.pageId ? page.pageId : page.page,
        hints: page.hints,
      }
    },
  )

  student.studentId = window.swpwr.student.studentId
  student.studentName = window.swpwr.student.fullName

  session = { ...window.swpwr.oldSession }
  log = { ...window.swpwr.oldLog }

  options.swapiUrl =
    urlSWAPI ||
    import.meta.env.VITE_SWAPI ||
    window.swpwr.options.swapiUrl ||
    'https://swapi2.onrender.com'
  options.gltfUrl = window.swpwr.options.gltfUrl
  options.voiceId = window.swpwr.options.voiceId
  options.voiceName = window.swpwr.options.voiceName
  options.rank =
    urlRank || import.meta.env.VITE_RANK || window.swpwr.options.rank || 'newb'
  options.disabledSchemas = window.swpwr.options.disabledSchemas

  handlers.onComplete = window.swpwr.handlers.onComplete
  handlers.onStep = window.swpwr.handlers.onStep
} else {
  problem = {
    appKey: 'JiraTestPage',
    policyId: '$A9$',
    problemId: 'QUES-30533',
    title: 'Sticker Book Cost',
    stimulus:
      'Minh spent $6.25 on 5 sticker books to give his nephews. Find the cost of each sticker book.',
    class: 'gradeBasicAlgebra',
    question:
      'SolveWordProblemAns[{"Minh spent $6.25 on 5 sticker books to give his nephews. Find the cost of each sticker book."}]',
    hints: [],
  }

  student = {
    studentId: 'PokeyLoki',
    studentName: 'Loki Van Riper',
  }

  handlers.onComplete = () => {
    console.info("I'm a built-in onComplete Handler")
  }

  options = {
    swapiUrl:
      urlSWAPI ||
      import.meta.env.VITE_SWAPI ||
      window.swpwr.options.swapiUrl ||
      'https://swapi2.onrender.com',
    gltfUrl,
    rank:
      urlRank ||
      import.meta.env.VITE_RANK ||
      window.swpwr.options.rank ||
      'newb',
    disabledSchemas: [],
  }
}

console.table('PROBLEM', problem)
console.table('STUDENT', student)
console.table('OPTIONS', options)
console.table('SESSION', session)

ReactDOM.createRoot(document.getElementById('qqROOT')!).render(
  <React.StrictMode>
    <div className="SWPowerComponent relative h-dvh w-dvw overflow-hidden">
      <StepWisePower
        className="absolute bottom-0 left-0 right-0 top-0 flex flex-col"
        problem={problem}
        student={student}
        oldSession={session}
        oldStudentLog={log}
        options={options}
        onComplete={handlers.onComplete}
        onStep={handlers.onStep}
      />
    </div>
  </React.StrictMode>,
)
