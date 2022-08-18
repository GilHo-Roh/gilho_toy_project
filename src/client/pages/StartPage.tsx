import React = require('react')
import { useNavigate } from 'react-router-dom'

const StartPage = ({ auth }: { auth: boolean }) => {
  const navigation = useNavigate()

  React.useEffect(() => {
    if (auth === true) navigation('/main')
    console.log('auth', auth)
  }, [auth, navigation])
  return (
    <>
      <h2>Hello this is gilho-toy-project</h2>
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
