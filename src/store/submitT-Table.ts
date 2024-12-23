import type { SetFn, GetFn } from './_types'

const submitTTable = async (
  _set: SetFn,
  get: GetFn,
  knowns: string[],
  unknowns: string[],
) => {
  const problem = get().problem
  const session = get().session

  const body = {
    appKey: problem.appKey,
    sessionToken: session.sessionToken,
    known: knowns,
    unknown: unknowns,
  }

  const response = await fetch(get().swapiUrl + '/submitTTable/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await response.json()

  get().logAction({ page: 'none', activity: 'submitTTable', data: data })
  return data
}

export default submitTTable
