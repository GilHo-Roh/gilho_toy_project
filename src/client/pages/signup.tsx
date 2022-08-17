import React = require('react')
import { useState } from 'react'
import {
  emailChecker,
  passwordChecker,
  SignupChecker,
} from '../utility/loginchecker'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [pwCheck, setPwCheck] = useState('')
  const navigation = useNavigate()

  const checkSignup = async (id: string, pw: string, pwCheck: string) => {
    if (!emailChecker(id)) {
      alert('invalid email!')
    } else if (!passwordChecker(pw)) {
      alert('invalid password!')
    } else if (pw != pwCheck) {
      alert('password different!')
    } else {
      if (await SignupChecker(id, pw)) {
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
