import type { SetFn, GetFn } from './_types'

type varAss = {
  variable: string
  value: string | null
}

const submitOrganize = async (_set: SetFn, get: GetFn, equation: string) => {
  const problem = get().problem
  const session = get().session

  const body = {
    appKey: problem.appKey,
    sessionToken: session.sessionToken,
    equation: equation,
    varAssignments: session.schemaValues,
  }

  const response = await fetch(get().swapiUrl + '/submitOrganize/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await response.json()

  get().logAction({ page: 'none', activity: 'submitOrganize', data: data })
  return data
}

export default submitOrganize
