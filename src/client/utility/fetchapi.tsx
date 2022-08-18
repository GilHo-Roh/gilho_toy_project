const API_URL = 'http://localhost:3000/api/'

export const postFetch = async (api: string, contents) => {
  const res = await fetch(API_URL + api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contents),
  })
  return await res.json()
}

export const getFetch = async (api: string) => {
  const res = await fetch(API_URL + api)

  return await res.json()
}
