import React = require("react")
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import {SigninChecker} from './loginchecker'


const Signin = () => {
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const navi = useNavigate()

  const checkLogin = async (id, pw) => {

    if (await SigninChecker(id, pw)){
      alert('success')
      navi('/Mainpage')
    }
    else{
      setId('')
      setPw('')
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
      <button type = 'button' 
      onClick = {()=> checkLogin(id, pw)}>
      Sign in!</button>
    </form>
    </>
  )
}

export default Signin