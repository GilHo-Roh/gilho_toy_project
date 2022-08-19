/* eslint-disable @typescript-eslint/ban-types */
interface APIOptionBase<
  Path extends string,
  Method extends 'GET' | 'POST',
  Contents,
  Result
> {
  path: Path
  method: Method
  contents: Contents
  result: Result
}

export type APIOptions =
  | APIOptionBase<'/remove', 'POST', { title: string }, { ok: boolean }>
  | APIOptionBase<
      '/submit',
      'POST',
      { title: string; contents: string },
      { ok: boolean }
    >
  | APIOptionBase<'/articles', 'GET', {}, any>
  | APIOptionBase<`/read/${string}`, 'GET', {}, any>
  | APIOptionBase<`/auth`, 'GET', {}, any>
  | APIOptionBase<`/logout`, 'GET', {}, any>
  | APIOptionBase<`/read`, 'POST', { title: string }, any>
  | APIOptionBase<`/signin`, 'POST', { email: string; pw: string }, any>
  | APIOptionBase<`/signup`, 'POST', { email: string; pw: string }, any>
