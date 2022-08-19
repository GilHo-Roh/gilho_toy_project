import type { APIOptions } from '../../shared/api'

// TODO: fix
const API_SERVER_URL = 'http://localhost:3000/api'

async function wrapFetch({
  path,
  method,
  contents,
}: {
  path: string
  method: 'GET' | 'POST'
  contents: unknown
}) {
  const res = await fetch(API_SERVER_URL + path, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contents),
  })
  return res.json()
}

export function callAPI<T extends APIOptions>(
  options: Omit<T, 'result'>
): Promise<T['result']> {
  return wrapFetch({
    path: options.path,
    method: options.method,
    contents: options.contents,
  })
}
