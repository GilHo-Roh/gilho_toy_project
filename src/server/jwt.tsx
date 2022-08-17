import jwt = require('jsonwebtoken')

const SECRET_KEY = 'gilho_toy_project'

export const generateToken = (email: string) => {
  const token = jwt.sign({ email: email }, SECRET_KEY, {
    expiresIn: '1d',
  })

  return token
}

export const checkToken = (token: string) => {
  try {
    const decode = jwt.verify(token, SECRET_KEY)
    return decode.email
  } catch (err) {
    return undefined
  }
}
