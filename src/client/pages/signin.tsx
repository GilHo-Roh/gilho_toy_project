import React = require("react")

const Signin = () => {
  return (
    <>
    <form>
      <label>Email:
        <input type = "text"/>
      </label>
      <label>Password:
        <input type = "password"/>
      </label>
      <button type = 'button' onClick = {()=> alert('login')}>Sign in!</button>
    </form>
    </>
  )
}

export default Signin