export async function sessionResumable(swapiUrl: string, sessionToken: string) {
  const response = await fetch(swapiUrl + '/resume/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sessionToken }),
  })

  const data = await response.json()
  return true
}
