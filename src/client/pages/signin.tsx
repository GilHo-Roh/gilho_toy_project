import React = require("react")
import { useState } from "react"
import {DBChecker, emailChecker, passwordChecker} from './loginchecker'
import axios from "axios"

const Signin = () => {
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')

  const Checker = (id, pw) => {
    if (DBChecker(id, pw)){
      alert('success')
    }
    else{
      alert('fail')
    }
  }

  return (
    <>
    <form>
      <label>Email:
        <input type = "text"
        onChange={e => setId(e.target.value)}/>
      </label>
      <label>Password:
        <input type = "password"
        onChange={e => setPw(e.target.value)}/>
      </label>
      <a href = 'Mainpage'>
      <button type = 'button' 
      onClick = {()=> Checker(id, pw)}>
      Sign in!</button>
      </a>
    </form>
    </>
  )
}

export default Signin