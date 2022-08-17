import React = require('react')

const StartPage = () => {
  return (
    <>
      <h2>Hello this is gilho's toy project</h2>
      <h2>if you have account</h2>
      <a href="Signin">
        <button type="button">Sign in</button>
      </a>
      <h2>if you do not have account</h2>
      <a href="Signup">
        <button type="button">Sign up</button>
      </a>
    </>
  )
}

export default StartPage
