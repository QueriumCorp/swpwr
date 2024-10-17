import { shuffle } from '@/lib/utils'
import type { SetFn, GetFn } from './_types'

const initSession = async (set: SetFn, get: GetFn) => {
  const problem = get().problem
  const student = get().student

  const theHints = []
  if (problem.qs1) {
    theHints.push(problem.qs1)
  }
  if (problem.qs2) {
    theHints.push(problem.qs2)
  }
  if (problem.qs3) {
    theHints.push(problem.qs3)
  }

  const theProblem = {
    appKey: problem.appKey,
    studentId: student.studentId,
    id: problem.problemId,
    title: problem.title,
    definition: problem.question,
    stimulus: problem.stimulus,
    topic: problem.class,
    hints: theHints,
  }

  // Abort if Hot Module Reload (HMR) wipes the store
  if (
    !theProblem.appKey ||
    !theProblem.studentId ||
    !theProblem.id ||
    !theProblem.definition ||
    !theProblem.topic
  ) {
    console.error('Missing required fields in problem: ', theProblem)
    return
  }

  const response = await fetch(get().swapiUrl + '/start/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(theProblem),
  })

  const data = await response.json()

  set(state => ({
    session: {
      ...state.session,
      sessionToken: data.sessionToken,
      identifiers: data.identifiers,
      operators: data.operators,
      explanations: shuffle(data.explanation),
      endPhaseWEqn: data.endPhaseWEqn,
      phaseESentence: data.phaseESentence,
      selectedExplanation: { type: '', text: '' },
    },
  }))
  get().logAction({
    page: 'none',
    activity: 'initSession',
    data: { theProblem, response, data },
  })
}

export default initSession
