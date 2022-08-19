import React = require('react')
import { useNavigate } from 'react-router-dom'

const StartPage = ({ auth }: { auth: boolean }) => {
  const navigation = useNavigate()

  React.useEffect(() => {
    if (auth === true) navigation('/main')
  }, [auth, navigation])
  return (
    <>
      <div className="start">
        <h2 className="head">GILHO_TOY_PROJECT</h2>
        <h2>Already have account?</h2>
        <a href="signin">
          <button type="button">Sign in</button>
        </a>
        <h2>Make new account!</h2>
        <a href="signup">
          <button type="button">Sign up</button>
        </a>
      </div>
    </>
  )
}

export default StartPage
