import jwt = require('jsonwebtoken')

const SECRET_KEY = 'gilho_toy_project'

export const generateToken = (email: string) => {
  const token = jwt.sign({ id: email }, SECRET_KEY, {
    expiresIn: '1d',
  })

  return token
}

export const checkToken = (token: string) => {
  try {
    const decode = jwt.verify(token, SECRET_KEY)
    return decode.id
  } catch (err) {
    return undefined
  }
}
