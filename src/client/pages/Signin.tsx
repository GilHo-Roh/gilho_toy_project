import React = require('react')
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signinChecker } from '../utility/loginchecker'

const Signin = ({
  getInfo,
  auth,
}: {
  getInfo: () => Promise<void>
  auth: boolean
}) => {
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const navigation = useNavigate()

  const checkLogin = async (id: string, pw: string) => {
    if (await signinChecker(id, pw)) {
      await getInfo()
      alert('login success')
    } else {
      setId('')
      setPw('')
      alert('login fail')
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
        <button type="button" onClick={() => checkLogin(id, pw)}>
          Sign in!
        </button>
      </form>
    </>
  )
}

export default Signin
