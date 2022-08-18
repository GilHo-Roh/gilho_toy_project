import React = require('react')
import { useState } from 'react'
import {
  validateEmail,
  validatePassword,
  signupChecker,
} from '../utility/loginchecker'
import { useNavigate } from 'react-router-dom'

const Signup = ({ auth }: { auth: boolean }) => {
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [pwCheck, setPwCheck] = useState('')
  const navigation = useNavigate()

  const checkSignup = async (id: string, pw: string, pwCheck: string) => {
    if (!validateEmail(id)) {
      alert('invalid email!')
    } else if (!validatePassword(pw)) {
      alert('invalid password!')
    } else if (pw != pwCheck) {
      alert('password different!')
    } else {
      if (await signupChecker(id, pw)) {
        alert('success sign up!')
        navigation('/Signin')
      } else {
        setId('')
        setPw('')
        setPwCheck('')
        alert('this account is alread exist!')
      }
    }
  }

  React.useEffect(() => {
    if (auth === true) navigation('/main')
  }, [auth, navigation])

  return (
    <>
      <form>
        <label>
          Email:
          <input type="text" onChange={(e) => setId(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" onChange={(e) => setPw(e.target.value)} />
        </label>
        <label>
          Password Check:
          <input type="password" onChange={(e) => setPwCheck(e.target.value)} />
        </label>
        <button type="button" onClick={() => checkSignup(id, pw, pwCheck)}>
          Sign up!
        </button>
      </form>
    </>
  )
}

export default Signup
