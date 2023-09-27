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
    body: method === 'POST' ? JSON.stringify(contents) : undefined,
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

/*
1. 가장 겉으로 보일 함수를 만든다. CallAPI
2. 해당 함수에서 호출할 wraper 함수를 만듬
3. 함수에 입력할 변수 타입을 설정
4. 변수 타입의 경우의 수를 정한다.
*/
