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
  result: CommonResult | (CommonResult & Result)
}

type CommonResult = { ok: boolean }

export type APIOptions =
  | APIOptionBase<'/articles', 'GET', {}, any>
  | APIOptionBase<`/auth`, 'GET', {}, any>
  | APIOptionBase<`/logout`, 'GET', {}, any>
  | APIOptionBase<'/remove', 'POST', { title: string }, CommonResult>
  | APIOptionBase<
      '/submit',
      'POST',
      { title: string; contents: string },
      { ok: boolean }
    >
  | APIOptionBase<
      `/read`,
      'POST',
      { title: string },
      CommonResult & { res?: string }
    >
  | APIOptionBase<`/signin`, 'POST', { email: string; pw: string }, any>
  | APIOptionBase<`/signup`, 'POST', { email: string; pw: string }, any>
