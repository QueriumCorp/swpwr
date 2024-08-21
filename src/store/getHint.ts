import type { SetFn, GetFn } from './_types'

const getHint = async (_set: SetFn, get: GetFn) => {
  const problem = get().problem
  const session = get().session

  const body = {
    appKey: problem.appKey,
    sessionToken: session.sessionToken,
  }

  const response = await fetch(get().swapiUrl + '/getHint/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await response.json()

  get().logAction(`getHint: ${response.status} ${JSON.stringify(data)}`)
  return data.hintsArray
}

export default getHint
