import type { SetFn, GetFn } from './_types'

type varAss = {
  variable: string
  value: string | null
}

const submitOrganize = async (_set: SetFn, get: GetFn, equation: string) => {
  const problem = get().problem
  const session = get().session
  const varAssignments: varAss[] = []
  session.identifiers.map((variable, index) => {
    varAssignments.push({
      variable: variable,
      value:
        session.identifiers[index] == session.schemaValues[index]
          ? null
          : session.schemaValues[index],
    })
  })

  console.log(varAssignments)
  console.log(JSON.stringify(varAssignments))

  const body = {
    appKey: problem.appKey,
    sessionToken: session.sessionToken,
    equation: equation,
    varAssignments: varAssignments,
  }

  const response = await fetch(get().swapiUrl + '/submitOrganize/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await response.json()

  get().logAction(`submitOrganize: ${response.status} ${JSON.stringify(data)}`)
  return data
}

export default submitOrganize
