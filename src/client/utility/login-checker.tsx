import { callAPI } from './fetch-api'

export const signinChecker = async (email: string, pw: string) => {
  return callAPI({
    path: '/signin',
    method: 'POST',
    contents: {
      email,
      pw,
    },
  })
}

export const signupChecker = async (email: string, pw: string) => {
  return callAPI({
    path: '/signup',
    method: 'POST',
    contents: {
      email,
      pw,
    },
  })
}

const emailRegex = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/
const passwordRegex = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/

export const validateEmail = (id: string) => emailRegex.test(id)
export const validatePassword = (pw: string) => passwordRegex.test(pw)
