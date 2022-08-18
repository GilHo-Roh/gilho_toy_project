import jwt = require('jsonwebtoken')
import dotenv = require('dotenv')
dotenv.config()

export const generateToken = (email: string) => {
  console.log(process.env.JWT_SECRET_KEY)
  const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1d',
  })

  return token
}

export const checkToken = (token: string) => {
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
    return decode.email
  } catch (err) {
    return undefined
  }
}
