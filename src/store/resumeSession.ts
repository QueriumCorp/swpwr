import type { SetFn, GetFn } from './_types'

export async function sessionResumable(_set: SetFn, get: GetFn) {
  const problem = get().problem
  const session = get().session

  const body = {
    appKey: problem.appKey,
    sessionToken: session.sessionToken,
  }
  const response = await fetch(get().swapiUrl + '/resume/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await response.json()
  return true
}
