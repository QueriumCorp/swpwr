import { GetFn, SetFn } from './_types'

const closeSession = async (_set: SetFn, get: GetFn) => {
  const problem = get().problem
  const session = get().session

  const body = {
    appKey: problem.appKey,
    sessionToken: session.sessionToken,
  }
  const response = await fetch(get().swapiUrl + '/close/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await response.json()
  get().logAction({
    page: 'none',
    activity: 'closeSession',
    data: data,
  })
  return `closeSession: ${response.status} ${JSON.stringify(data)}`
}

export default closeSession
