export async function sessionResumable(
  swapiUrl: string,
  appKey: string,
  sessionToken: string,
) {
  const body = {
    appKey: appKey,
    sessionToken: sessionToken,
  }
  if (!appKey || !sessionToken) return false

  const response = await fetch(swapiUrl + '/resume/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await response.json()
  return data.resumable
}
