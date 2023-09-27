import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signinChecker } from '../utility/login-checker'

const Signin = ({
  getInfo,
  auth,
}: {
  getInfo: () => Promise<void>
  auth: boolean
}) => {
  const [id, setId] = useState<string>()
  const [pw, setPw] = useState<string>()
  const navigation = useNavigate()

  const checkLogin = async (id: string, pw: string) => {
    const res = await signinChecker(id, pw)
    if (res.ok) {
      await getInfo()
      alert('login success')
    } else {
      setId(undefined)
      setPw(undefined)
      alert('login fail')
    }
  }
  React.useEffect(() => {
    if (auth === true) navigation('/main')
  }, [auth, navigation])
  return (
    <>
      <div className="signin">
        <label>
          Id(email) :&emsp;
          <input type="text" onChange={(e) => setId(e.currentTarget.value)} />
        </label>
        <br />
        <br />
        <label>
          Password :&emsp;
          <input
            type="password"
            onChange={(e) => setPw(e.currentTarget.value)}
          />
        </label>
        <br />
        <br />
        <div className="btn2">
          <button
            type="button"
            onClick={() => {
              if (id && pw) {
                checkLogin(id, pw)
              } else {
                alert('ID or PWD not entered')
              }
            }}
          >
            Sign in!
          </button>
        </div>
      </div>
    </>
  )
}

export default Signin
