import jwt = require('jsonwebtoken')
import dotenv = require('dotenv')
dotenv.config()

const { JWT_SECRET_KEY } = process.env

if (!JWT_SECRET_KEY) {
  throw new Error('JWT_SECRET_KEY not defined.')
}

export const generateToken = (email: string) => {
  const token = jwt.sign({ email }, JWT_SECRET_KEY, {
    expiresIn: '1d',
  })

  return token
}

function isUnknownObject(x: unknown): x is { email: string } {
  return (typeof x === 'object' && x && 'email' in x) ?? false
}

export const checkToken = (token: string) => {
  const _decoded = jwt.verify(token, JWT_SECRET_KEY)

  if (typeof _decoded === 'string') {
    throw new Error('Unexpected decoded value.')
  }

  const decoded: unknown = _decoded

  if (isUnknownObject(decoded)) {
    return decoded.email
  }
}
