import React = require("react")
import { useState } from "react"

const Signup = () => {
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [pwCheck, setPwCheck] = useState('')
  
  return (
    <>
    <form>
      <label>Email:
        <input type = "text"/>
      </label>
      <label>Password:
        <input type = "password"/>
      </label>
      <label>Password Check:
        <input type = "password"/>
      </label>
        <a href = 'Signin'>
        <button type = "button"
        >Sign up!</button>
        </a>
    </form>
    </>
  )
}

export default Signup