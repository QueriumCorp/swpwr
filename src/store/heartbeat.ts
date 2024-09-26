import { GetFn, SetFn } from './_types'

const heartbeat = async (_set: SetFn, get: GetFn) => {
  const response = await fetch(get().swapiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()
  get().logAction({ page: 'none', activity: 'heartbeat', data: data })
}

export default heartbeat
