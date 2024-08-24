import type { SetFn, GetFn } from './_types'

const submitExplanation = async (
  _set: SetFn,
  get: GetFn,
  explanation: string,
) => {
  const problem = get().problem
  const session = get().session

  const body = {
    appKey: problem.appKey,
    sessionToken: session.sessionToken,
    myOwnWords: explanation,
  }

  const response = await fetch(get().swapiUrl + '/submitExplain/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await response.json()

  get().logAction(
    `submitExplanation: ${response.status} ${JSON.stringify(data)}`,
  )
  return data
}

export default submitExplanation
