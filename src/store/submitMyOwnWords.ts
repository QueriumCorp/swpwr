import type { SetFn, GetFn } from './_types'

const submitMyOwnWords = async (
  _set: SetFn,
  get: GetFn,
  myOwnWords: string,
) => {
  const problem = get().problem
  const session = get().session

  const body = {
    appKey: problem.appKey,
    sessionToken: session.sessionToken,
    myOwnWords: myOwnWords,
  }

  const response = await fetch(get().swapiUrl + '/submitMyOwnWords/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await response.json()

  get().logAction(
    `submitMyOwnWords: ${response.status} ${JSON.stringify(data)}`,
  )
  return data
}

export default submitMyOwnWords
