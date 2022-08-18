import { postFetch } from './fetchapi'

export const signinChecker = async (email: string, pw: string) => {
  return await postFetch('signin', { email, pw })
}

export const signupChecker = async (email: string, pw: string) => {
  return await postFetch('signup', { email, pw })
}

const emailRegex = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/
const passwordRegex = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/

export const validateEmail = (id: string) => emailRegex.test(id)
export const validatePassword = (pw: string) => passwordRegex.test(pw)
