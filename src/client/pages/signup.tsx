import React = require("react")

const Signup = () => {
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