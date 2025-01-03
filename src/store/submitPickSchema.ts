import type { SetFn, GetFn } from './_types'

const submitPickSchema = async (_set: SetFn, get: GetFn, schema: string) => {
  const problem = get().problem
  const session = get().session

  const body = {
    appKey: problem.appKey,
    sessionToken: session.sessionToken,
    schema: schema,
  }

  const response = await fetch(get().swapiUrl + '/submitPickSchema/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await response.json()

  get().logAction({
    page: 'none',
    activity: 'submitPickSchema',
    data: { body, response, data },
  })
  return data
}

export default submitPickSchema
